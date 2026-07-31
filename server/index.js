const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Enable trust proxy for Render reverse proxy (fixes express-rate-limit warning)
app.set('trust proxy', 1);

// Setup Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Path to backup data file (in case DB is temporarily offline)
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');
const CORP_QUOTE_FILE = path.join(DATA_DIR, 'corporate_quotes.json');
const PARTNER_FILE = path.join(DATA_DIR, 'partners.json');
const NOTIFY_FILE = path.join(DATA_DIR, 'notify_requests.json');
const CAREER_APP_FILE = path.join(DATA_DIR, 'career_applications.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const BROCHURE_PATH = path.join(__dirname, '..', 'src', 'assets', 'brochure.pdf');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(CORP_QUOTE_FILE)) {
  fs.writeFileSync(CORP_QUOTE_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(PARTNER_FILE)) {
  fs.writeFileSync(PARTNER_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(NOTIFY_FILE)) {
  fs.writeFileSync(NOTIFY_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(CAREER_APP_FILE)) {
  fs.writeFileSync(CAREER_APP_FILE, JSON.stringify([], null, 2));
}

// Active sessions memory
const activeSessions = new Set();

// --- DATABASE CONNECTION (MongoDB Atlas) ---
let dbConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (!MONGODB_URI || MONGODB_URI.includes('<password>')) {
    console.error('\n======================================================');
    console.error(' WARNING: MONGODB_URI is not fully configured in server/.env!');
    console.error(' Please replace <password> with your Atlas password.');
    console.error(' Falling back to local JSON storage for inquiries.');
    console.error('======================================================\n');
    return;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI);
    dbConnected = true;
    console.log('>>> MongoDB Atlas Connected Successfully!');
  } catch (err) {
    console.error('>>> MongoDB Atlas Connection Failure:', err.message);
    console.log('>>> Running with Local File fallback active.');
  }
}

connectDB();

// --- MONGOOSE SCHEMA & MODEL ---
const InquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

const CorporateQuoteSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  teamSize: { type: String, required: true },
  trainingDomain: { type: String, required: true },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const CorporateQuote = mongoose.model('CorporateQuote', CorporateQuoteSchema);

const PartnerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  resumeLink: { type: String, required: true },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Partner = mongoose.model('Partner', PartnerSchema);

const NotifyRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  portal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const NotifyRequest = mongoose.model('NotifyRequest', NotifyRequestSchema);

const CareerApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  coverLetter: { type: String, default: '' },
  resumeFilename: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CareerApplication = mongoose.model('CareerApplication', CareerApplicationSchema);

// --- ANTI-FRAUD RATE LIMITING ---
// Limit submissions to 5 inquiries per 15 minutes from an IP
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5,
  message: {
    success: false,
    message: 'Security alert: Too many submissions from this IP address. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// --- ANTI-FRAUD SECURITY SANITIZATION ---
function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  return text
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .substring(0, 1000); // Prevent buffer overflow attacks
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length < 254;
}

function isValidPhone(phone) {
  // Verifies format matches global digits (e.g. +91 9999999999, 080-123456)
  const phoneRegex = /^[0-9+\-\s()]{8,18}$/;
  return phoneRegex.test(phone);
}

// --- MAIL CONFIGURATION ---
let transporter;

async function initMailer() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('>>> Initializing Authenticated SMTP Transport:');
    console.log(`    Host: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
    console.log(`    User: ${process.env.SMTP_USER}`);
    
    if (process.env.SMTP_HOST.includes('gmail')) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: { rejectUnauthorized: false }
      });
    }
  } else {
    console.log('>>> Warning: No SMTP config found. Setting up Ethereal Mock Mailer...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log(`Ethereal Mock Account active. User: ${testAccount.user}`);
    } catch (err) {
      console.error('Mock SMTP Setup Failed:', err);
    }
  }
}

initMailer();

// Hash Password Helper (SHA-256 secure hash)
function hashPassword(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

// Local File Helper Fallbacks
function getLocalInquiries() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveLocalInquiry(inquiry) {
  const inquiries = getLocalInquiries();
  inquiries.unshift(inquiry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));
}

function getLocalCorpQuotes() {
  try {
    const data = fs.readFileSync(CORP_QUOTE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveLocalCorpQuote(quote) {
  const list = getLocalCorpQuotes();
  list.unshift(quote);
  fs.writeFileSync(CORP_QUOTE_FILE, JSON.stringify(list, null, 2));
}

function getLocalPartners() {
  try {
    const data = fs.readFileSync(PARTNER_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveLocalPartner(partner) {
  const list = getLocalPartners();
  list.unshift(partner);
  fs.writeFileSync(PARTNER_FILE, JSON.stringify(list, null, 2));
}

function getLocalNotifyRequests() {
  try {
    const data = fs.readFileSync(NOTIFY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveLocalNotifyRequest(req) {
  const list = getLocalNotifyRequests();
  list.unshift(req);
  fs.writeFileSync(NOTIFY_FILE, JSON.stringify(list, null, 2));
}

function getLocalCareerApps() {
  try {
    const data = fs.readFileSync(CAREER_APP_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveLocalCareerApp(appData) {
  const list = getLocalCareerApps();
  list.unshift(appData);
  fs.writeFileSync(CAREER_APP_FILE, JSON.stringify(list, null, 2));
}

// --- MODERN PROFESSIONAL EMAIL TEMPLATES ---

// --- MODERN CORPORATE EMAIL BUILDERS ---

function buildCorpQuoteUserEmail(contactPerson, companyName, trainingDomain) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Corporate Training Request | CADDverse Techlabs</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F3F4F6; margin: 0; padding: 0; }
      .email-wrapper { width: 100%; max-width: 600px; margin: 20px auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #E5E7EB; }
      .email-header { background: linear-gradient(135deg, #090d16 0%, #1e3a8a 100%); padding: 40px 30px; text-align: center; }
      .logo-brand { font-size: 26px; font-weight: 850; color: #FFFFFF; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; }
      .logo-sub { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.85); letter-spacing: 3px; display: block; margin-top: 4px; text-transform: uppercase; }
      .email-content { padding: 35px 30px; line-height: 1.6; color: #1F2937; }
      .greeting { font-size: 20px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 12px; }
      .intro-text { font-size: 15px; color: #4B5563; margin-bottom: 25px; }
      .quote-card { background-color: #F8FAFC; border-left: 4px solid #1e3a8a; padding: 18px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #E2E8F0; }
      .quote-label { font-size: 10px; font-weight: 800; color: #64748B; letter-spacing: 1px; text-transform: uppercase; }
      .quote-value { font-size: 16px; font-weight: 700; color: #1e3a8a; margin-top: 4px; }
      .email-footer { background-color: #090d16; padding: 30px; text-align: center; font-size: 11.5px; color: #9CA3AF; line-height: 1.5; }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1 class="logo-brand">CADDverse</h1>
        <span class="logo-sub">Techlabs Enterprise</span>
      </div>
      <div class="email-content">
        <h2 class="greeting">Dear ${contactPerson},</h2>
        <p class="intro-text">
          Thank you for reaching out to CADDverse Techlabs. We have successfully logged your organization's request for customized corporate training.
        </p>
        
        <div class="quote-card">
          <div class="quote-label">Organization</div>
          <div class="quote-value">${companyName}</div>
          <div class="quote-label" style="margin-top: 10px;">Training Domain</div>
          <div class="quote-value">${trainingDomain}</div>
        </div>
        
        <p class="intro-text">
          An Enterprise Learning Consultant has been assigned to your request and is currently drafting a custom curriculum outline and commercial proposal. We will contact you shortly to coordinate batch sizes, schedules, and learning deliverables.
        </p>
      </div>
      <div class="email-footer">
        CADDverse Techlabs Enterprise Division &copy; ${new Date().getFullYear()} All Rights Reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

function buildCorpQuoteAdminEmail(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Corporate Lead | CADDverse Techlabs</title>
    <style>
      body { font-family: sans-serif; background-color: #F9FAFB; padding: 20px; }
      .card { background: #fff; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
      .header { background: #1e3a8a; padding: 20px; color: #fff; text-align: center; }
      .content { padding: 30px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      .table th, .table td { padding: 12px; border-bottom: 1px solid #F3F4F6; text-align: left; }
      .table th { background: #F8FAFC; color: #4B5563; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header"><h2>New Corporate Quote Request</h2></div>
      <div class="content">
        <table class="table">
          <tr><th>Company</th><td>${data.companyName}</td></tr>
          <tr><th>Contact</th><td>${data.contactPerson}</td></tr>
          <tr><th>Email</th><td>${data.email}</td></tr>
          <tr><th>Phone</th><td>${data.phone}</td></tr>
          <tr><th>Team Size</th><td>${data.teamSize}</td></tr>
          <tr><th>Domain</th><td>${data.trainingDomain}</td></tr>
          <tr><th>Requirements</th><td>${data.message || 'None provided'}</td></tr>
        </table>
      </div>
    </div>
  </body>
  </html>
  `;
}

function buildPartnerUserEmail(fullName, role) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Partnership Application | CADDverse Techlabs</title>
    <style>
      body { font-family: -apple-system, sans-serif; background-color: #F3F4F6; padding: 0; }
      .wrapper { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; }
      .header { background: linear-gradient(135deg, #090d16 0%, #0044ff 100%); padding: 35px; text-align: center; color: #fff; }
      .content { padding: 35px; line-height: 1.6; color: #1F2937; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header"><h2>CADDverse Techlabs Partnerships</h2></div>
      <div class="content">
        <h3>Hi ${fullName},</h3>
        <p>Thank you for expressing your interest to partner with CADDverse Techlabs as a <strong>${role}</strong>.</p>
        <p>Our Strategic Partnerships team has received your application and resume. We will review your qualifications and proposal details, and connect with you shortly to discuss potential synergy opportunities.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

function buildPartnerAdminEmail(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Partner Application | CADDverse Techlabs</title>
    <style>
      body { font-family: sans-serif; background: #F9FAFB; padding: 20px; }
      .card { background: #fff; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; max-width: 600px; margin: 0 auto; }
      .header { background: #0044ff; color: #fff; padding: 20px; text-align: center; }
      .content { padding: 30px; }
      .table { width: 100%; border-collapse: collapse; }
      .table th, .table td { padding: 12px; border-bottom: 1px solid #F3F4F6; text-align: left; }
      .table th { background: #F8FAFC; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header"><h2>New Career/Partner Application</h2></div>
      <div class="content">
        <table class="table">
          <tr><th>Full Name</th><td>${data.fullName}</td></tr>
          <tr><th>Email</th><td>${data.email}</td></tr>
          <tr><th>Phone</th><td>${data.phone}</td></tr>
          <tr><th>Role/Interest</th><td>${data.role}</td></tr>
          <tr><th>Resume URL</th><td><a href="${data.resumeLink}" target="_blank">${data.resumeLink}</a></td></tr>
          <tr><th>Proposal Note</th><td>${data.message || 'None'}</td></tr>
        </table>
      </div>
    </div>
  </body>
  </html>
  `;
}

function buildCareerUserEmail(fullName, coverLetter) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Application Received | CADDverse Techlabs</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #F3F4F6; margin: 0; padding: 0; }
      .wrapper { width: 100%; max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E5E7EB; }
      .header { background: linear-gradient(135deg, #090d16 0%, #1e3a8a 100%); padding: 35px 30px; text-align: center; }
      .brand { font-size: 24px; font-weight: 900; color: #ffffff; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; }
      .content { padding: 30px; line-height: 1.6; color: #374151; }
      .title { font-size: 18px; font-weight: 700; color: #111827; margin-top: 0; }
      .footer { background: #090d16; padding: 20px; text-align: center; font-size: 11px; color: #9CA3AF; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">
        <h1 class="brand">CADDVERSE TEACHLABS</h1>
      </div>
      <div class="content">
        <h2 class="title">Dear ${fullName},</h2>
        <p>Thank you for expressing interest in joining <strong>CADDVERSE TEACHLABS</strong>. We have successfully received your career application and attached your resume document for review.</p>
        <p>Our Human Resources team will review your qualifications against our active engineering and academic trainer openings. If your background aligns with our requirements, we will contact you directly to schedule an introductory call.</p>
        ${coverLetter ? `<p><strong>Your Message:</strong><br/><em>${coverLetter}</em></p>` : ''}
      </div>
      <div class="footer">
        CADDVERSE TEACHLABS &copy; ${new Date().getFullYear()} All Rights Reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

function buildCareerAdminEmail(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Job Applicant | CADDverse</title>
    <style>
      body { font-family: sans-serif; background-color: #F9FAFB; padding: 20px; }
      .card { background: #fff; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
      .header { background: #1e3a8a; padding: 20px; color: #fff; text-align: center; }
      .content { padding: 30px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      .table th, .table td { padding: 12px; border-bottom: 1px solid #F3F4F6; text-align: left; }
      .table th { background: #F8FAFC; color: #4B5563; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header"><h2>New Job Application Received</h2></div>
      <div class="content">
        <p>A new applicant has submitted their resume document via the CADDverse Careers portal. The resume is attached to this email.</p>
        <table class="table">
          <tr><th>Full Name</th><td>${data.fullName}</td></tr>
          <tr><th>Email Address</th><td>${data.email}</td></tr>
          <tr><th>Contact Number</th><td>${data.phone}</td></tr>
          <tr><th>Message</th><td>${data.coverLetter || 'No cover message provided.'}</td></tr>
          <tr><th>Resume File</th><td>${data.resumeFilename}</td></tr>
        </table>
      </div>
    </div>
  </body>
  </html>
  `;
}

function buildNotifyUserEmail(email, portal) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Early Access Registered | CADDverse Techlabs</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F3F4F6; margin: 0; padding: 0; }
      .email-wrapper { width: 100%; max-width: 600px; margin: 20px auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #E5E7EB; }
      .email-header { background: linear-gradient(135deg, #090d16 0%, #1e3a8a 100%); padding: 40px 30px; text-align: center; }
      .logo-brand { font-size: 26px; font-weight: 850; color: #FFFFFF; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; }
      .logo-sub { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.85); letter-spacing: 3px; display: block; margin-top: 4px; text-transform: uppercase; }
      .email-content { padding: 35px 30px; line-height: 1.6; color: #1F2937; }
      .greeting { font-size: 20px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 12px; }
      .intro-text { font-size: 15px; color: #4B5563; margin-bottom: 25px; }
      .portal-card { background-color: #F8FAFC; border-left: 4px solid #0044FF; padding: 18px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #E2E8F0; }
      .portal-label { font-size: 10px; font-weight: 800; color: #64748B; letter-spacing: 1px; text-transform: uppercase; }
      .portal-value { font-size: 16px; font-weight: 700; color: #0044FF; margin-top: 4px; }
      .email-footer { background-color: #090d16; padding: 30px; text-align: center; font-size: 11.5px; color: #9CA3AF; line-height: 1.5; }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1 class="logo-brand">CADDverse</h1>
        <span class="logo-sub">Techlabs</span>
      </div>
      <div class="email-content">
        <h2 class="greeting">Hello!</h2>
        <p class="intro-text">
          Thank you for your interest! We have successfully registered your email for early access notification.
        </p>
        
        <div class="portal-card">
          <div class="portal-label">Portal Interest</div>
          <div class="portal-value">${portal} Portal</div>
          <div class="portal-label" style="margin-top: 10px;">Registered Email</div>
          <div class="portal-value" style="color: #334155; font-size: 14.5px;">${email}</div>
        </div>
        
        <p class="intro-text">
          You will be among the first to receive updates and exclusive early access once the ${portal} portal goes live. Stay tuned!
        </p>
      </div>
      <div class="email-footer">
        CADDverse Techlabs &copy; ${new Date().getFullYear()} All Rights Reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

function buildNotifyAdminEmail(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Early Access Request | CADDverse Techlabs</title>
    <style>
      body { font-family: sans-serif; background-color: #F9FAFB; padding: 20px; }
      .card { background: #fff; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
      .header { background: #0044FF; padding: 20px; color: #fff; text-align: center; }
      .content { padding: 30px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      .table th, .table td { padding: 12px; border-bottom: 1px solid #F3F4F6; text-align: left; }
      .table th { background: #F8FAFC; color: #4B5563; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header"><h2>New Early Access Request</h2></div>
      <div class="content">
        <table class="table">
          <tr><th>Email</th><td>${data.email}</td></tr>
          <tr><th>Portal Interest</th><td>${data.portal}</td></tr>
          <tr><th>Timestamp</th><td>${new Date(data.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td></tr>
        </table>
      </div>
    </div>
  </body>
  </html>
  `;
}

// 1. Student Confirmation Email
function buildUserEmail(fullName, course) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Confirmation | CADDverse Techlabs</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F3F4F6; margin: 0; padding: 0; }
      .email-wrapper { width: 100%; max-width: 600px; margin: 20px auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #E5E7EB; }
      .email-header { background: linear-gradient(135deg, #090d16 0%, #2563eb 100%); padding: 40px 30px; text-align: center; }
      .logo-brand { font-size: 26px; font-weight: 850; color: #FFFFFF; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; }
      .logo-sub { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.85); letter-spacing: 3px; display: block; margin-top: 4px; text-transform: uppercase; }
      .email-content { padding: 35px 30px; line-height: 1.6; color: #1F2937; }
      .greeting { font-size: 20px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 12px; }
      .intro-text { font-size: 15px; color: #4B5563; margin-bottom: 25px; }
      .course-card { background-color: #F8FAFC; border-left: 4px solid #2563eb; padding: 18px; border-radius: 8px; margin-bottom: 30px; border-top: 1px solid #F1F5F9; border-right: 1px solid #F1F5F9; border-bottom: 1px solid #F1F5F9; }
      .course-label { font-size: 10px; font-weight: 800; color: #64748B; letter-spacing: 1px; text-transform: uppercase; }
      .course-value { font-size: 16px; font-weight: 700; color: #2563eb; margin-top: 4px; }
      .steps-title { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #F3F4F6; padding-bottom: 8px; }
      .step-row { display: flex; margin-bottom: 18px; align-items: flex-start; }
      .step-badge { background-color: rgba(37, 99, 235, 0.08); color: #2563eb; font-weight: 700; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 12px; flex-shrink: 0; }
      .step-desc { font-size: 14.5px; color: #374151; margin-top: 3px; }
      .btn-whatsapp { display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 700; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-size: 15px; margin: 20px 0; text-align: center; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25); transition: background-color 0.2s ease; }
      .features-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 30px; border-top: 1px solid #E5E7EB; padding-top: 25px; }
      .feature-item { text-align: center; }
      .feature-item-title { font-size: 11px; font-weight: 800; color: #111827; margin-bottom: 3px; text-transform: uppercase; }
      .feature-item-desc { font-size: 9.5px; color: #6B7280; }
      .email-footer { background-color: #090d16; padding: 30px; text-align: center; font-size: 11.5px; color: #9CA3AF; line-height: 1.5; }
      .footer-links a { color: #FFFFFF; text-decoration: none; margin: 0 10px; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1 class="logo-brand">CADDverse</h1>
        <span class="logo-sub">Techlabs</span>
      </div>
      <div class="email-content">
        <h2 class="greeting">Hi ${fullName},</h2>
        <p class="intro-text">
          Thank you for choosing CADDverse Techlabs. Your enrollment paths and training inquiry has been successfully logged. Our Admissions Counselor will connect with you shortly.
        </p>
        
        <div class="course-card">
          <div class="course-label">Registered Program</div>
          <div class="course-value">${course}</div>
        </div>
        
        <h3 class="steps-title">What's Next?</h3>
        <div class="step-row">
          <div class="step-badge">1</div>
          <div class="step-desc"><strong>Academic Profile Mapping:</strong> Our engineer counselor will evaluate your educational background over a short call within 2 hours.</div>
        </div>
        <div class="step-row">
          <div class="step-badge">2</div>
          <div class="step-desc"><strong>Syllabus Delivery:</strong> An official verified curriculum file matching your course will be emailed to you.</div>
        </div>
        <div class="step-row">
          <div class="step-badge">3</div>
          <div class="step-desc"><strong>Lab Timing Options:</strong> Live hands-on batch configurations will be coordinated.</div>
        </div>

        <div style="text-align: center; margin: 25px 0;">
          <a href="https://wa.me/919049000010" class="btn-whatsapp">Connect on WhatsApp</a>
        </div>

        <div class="features-container">
          <div class="feature-item">
            <div class="feature-item-title">ISO Certified</div>
            <div class="feature-item-desc">Verifiable Credentials</div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">100% Labs</div>
            <div class="feature-item-desc">Real Coordination Projects</div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Placements</div>
            <div class="feature-item-desc">Direct Partner MNCs</div>
          </div>
        </div>
      </div>
      <div class="email-footer">
        <div class="footer-links">
          <a href="#">Terms</a> | <a href="#">Privacy</a> | <a href="#">About Us</a>
        </div>
        &copy; ${new Date().getFullYear()} CADDverse Techlabs. All Rights Reserved.<br>
        1st Floor, Landmark Building, Outer Ring Road, Marathahalli, Bengaluru - 560037
      </div>
    </div>
  </body>
  </html>
  `;
}

// 2. Admin Alert Email
function buildAdminEmail(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Alert | CADDverse Techlabs</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F9FAFB; margin: 0; padding: 0; }
      .admin-wrapper { width: 100%; max-width: 600px; margin: 20px auto; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
      .admin-header { background-color: #EF4444; padding: 25px 30px; border-bottom: 3px solid #DC2626; }
      .admin-title { font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; }
      .admin-content { padding: 30px; }
      .lead-header-desc { font-size: 15px; color: #374151; margin-bottom: 20px; }
      .lead-table { width: 100%; border-collapse: collapse; margin-top: 15px; border-radius: 8px; overflow: hidden; border: 1px solid #F3F4F6; }
      .lead-table th, .lead-table td { padding: 12px 16px; text-align: left; font-size: 14.5px; border-bottom: 1px solid #F3F4F6; }
      .lead-table th { background-color: #F8FAFC; color: #4B5563; font-weight: 700; width: 160px; }
      .lead-table td { color: #111827; font-weight: 550; }
      .admin-btn-wrapper { text-align: center; margin-top: 30px; }
      .btn-portal { display: inline-block; background-color: #2563eb; color: #FFFFFF; padding: 12px 25px; border-radius: 8px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 10px rgba(37,99,235,0.2); }
      .admin-footer { background-color: #F9FAFB; padding: 20px; text-align: center; font-size: 11.5px; color: #9CA3AF; border-top: 1px solid #E5E7EB; }
    </style>
  </head>
  <body>
    <div class="admin-wrapper">
      <div class="admin-header">
        <h2 class="admin-title">New Lead Alert</h2>
      </div>
      <div class="admin-content">
        <p class="lead-header-desc">A new student training request has been logged in the lead capture system. Details follow:</p>
        
        <table class="lead-table">
          <tr>
            <th>Student Name</th>
            <td>${data.fullName}</td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td><a href="tel:${data.phone}">${data.phone}</a></td>
          </tr>
          <tr>
            <th>College / Company</th>
            <td>${data.companyName || 'Not Provided'}</td>
          </tr>
          <tr>
            <th>Course Requested</th>
            <td>${data.course}</td>
          </tr>
          <tr>
            <th>Message</th>
            <td>${data.message || 'No additional message.'}</td>
          </tr>
          <tr>
            <th>Timestamp</th>
            <td>${new Date(data.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
          </tr>
        </table>

      </div>
      <div class="admin-footer">
        CADDverse Techlabs &copy; ${new Date().getFullYear()} Lead Capture System
      </div>
    </div>
  </body>
  </html>
  `;
} 

/**
 * Returns attachment object for the brochure PDF.
 * Logs error and returns null if the file is missing.
 */
function getBrochureAttachment() {
  if (fs.existsSync(BROCHURE_PATH)) {
    return {
      filename: path.basename(BROCHURE_PATH),
      path: BROCHURE_PATH,
      contentType: 'application/pdf'
    };
  }
  console.error('Brochure file not found at', BROCHURE_PATH);
  return null;
}


// --- API ENDPOINTS ---

// 1. Submit Inquiry (Secure endpoint with Rate Limiting and strict Validations)
app.post('/api/inquiry', inquiryLimiter, async (req, res) => {
  let { fullName, companyName, email, phone, course, message } = req.body;

  // Anti-Spam / Anti-Fraud Sanitizations
  fullName = sanitizeText(fullName);
  companyName = sanitizeText(companyName);
  email = sanitizeText(email);
  phone = sanitizeText(phone);
  course = sanitizeText(course);
  message = sanitizeText(message);

  // Strict Validations
  if (!fullName || fullName.length < 2) {
    return res.status(400).json({ success: false, message: 'Invalid name. Must contain at least 2 characters.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address configuration.' });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ success: false, message: 'Invalid phone digits. Format: digits, +, -, spaces.' });
  }
  if (!course) {
    return res.status(400).json({ success: false, message: 'Valid program of interest selection is required.' });
  }

  const newInquiryData = {
    fullName,
    companyName,
    email,
    phone,
    course,
    message,
    createdAt: new Date()
  };

  try {
    let savedInquiry;
    if (dbConnected) {
      savedInquiry = await Inquiry.create(newInquiryData);
    } else {
      // Local file fallback if Database connectivity fails
      const backupInquiry = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        ...newInquiryData,
        createdAt: newInquiryData.createdAt.toISOString()
      };
      saveLocalInquiry(backupInquiry);
      savedInquiry = backupInquiry;
    }

    // Send Professional Emails
    if (transporter) {
      const senderAddress = process.env.SMTP_USER || 'anshul.caddverse@gmail.com';

      // 1. Direct confirmation mail to Student
      const userMailOptions = {
        from: `"CADDverse Techlabs" <${senderAddress}>`,
        to: email,
        subject: `Your CADDverse Techlabs seat reservation: ${course}`,
        html: buildUserEmail(fullName, course),
        attachments: getBrochureAttachment() ? [getBrochureAttachment()] : []
      };

      // 2. Alert notification mail to Admin
      const adminMailOptions = {
        from: `"CADDverse Lead Capture" <${senderAddress}>`,
        to: senderAddress, // Admin recipient email
        subject: `[New Lead Alert] ${fullName} - ${course}`,
        html: buildAdminEmail(savedInquiry)
      };

      // Dispatch mail promises asynchronously to minimize response delays
      transporter.sendMail(userMailOptions)
        .then((info) => {
          const previewUrl = nodemailer.getTestMessageUrl(info);
          if (previewUrl) {
            console.log(`[USER EMAIL TEST PREVIEW]: ${previewUrl}`);
          }
        })
        .catch(err => console.error('Student email send error:', err.message));

      transporter.sendMail(adminMailOptions)
        .then((info) => {
          const previewUrl = nodemailer.getTestMessageUrl(info);
          if (previewUrl) {
            console.log(`[ADMIN EMAIL TEST PREVIEW]: ${previewUrl}`);
          }
        })
        .catch(err => console.error('Admin email send error:', err.message));
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry successfully saved. Emails dispatched.'
    });

  } catch (err) {
    console.error('Failed to submit inquiry:', err.message);
    return res.status(500).json({ success: false, message: 'Server database transaction failure.' });
  }
});

// Corporate Quote Submission Endpoint
app.post('/api/corporate-quote', inquiryLimiter, async (req, res) => {
  let { companyName, contactPerson, email, phone, teamSize, trainingDomain, message } = req.body;

  companyName = sanitizeText(companyName);
  contactPerson = sanitizeText(contactPerson);
  email = sanitizeText(email);
  phone = sanitizeText(phone);
  teamSize = sanitizeText(teamSize);
  trainingDomain = sanitizeText(trainingDomain);
  message = sanitizeText(message);

  if (!companyName || !contactPerson) {
    return res.status(400).json({ success: false, message: 'Company Name and Contact Person are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ success: false, message: 'Invalid phone format.' });
  }

  const quoteData = {
    companyName,
    contactPerson,
    email,
    phone,
    teamSize,
    trainingDomain,
    message,
    createdAt: new Date()
  };

  try {
    let savedQuote;
    if (dbConnected) {
      savedQuote = await CorporateQuote.create(quoteData);
    } else {
      const backupQuote = {
        id: 'q-' + Date.now().toString(36),
        ...quoteData,
        createdAt: quoteData.createdAt.toISOString()
      };
      saveLocalCorpQuote(backupQuote);
      savedQuote = backupQuote;
    }

    if (transporter) {
      const senderAddress = process.env.SMTP_USER || 'anshul.caddverse@gmail.com';
      const userMailOptions = {
        from: `"CADDverse Enterprise" <${senderAddress}>`,
        to: email,
        subject: `Corporate Training Quote Request: ${trainingDomain}`,
        html: buildCorpQuoteUserEmail(contactPerson, companyName, trainingDomain)
      };

      const adminMailOptions = {
        from: `"CADDverse Lead Capture" <${senderAddress}>`,
        to: senderAddress,
        subject: `[Corporate Lead Alert] ${companyName} - ${trainingDomain}`,
        html: buildCorpQuoteAdminEmail(savedQuote)
      };

      transporter.sendMail(userMailOptions).catch(err => console.error('Corp student email send error:', err.message));
      transporter.sendMail(adminMailOptions).catch(err => console.error('Corp admin email send error:', err.message));
    }

    return res.status(200).json({ success: true, message: 'Corporate quote inquiry received.' });
  } catch (err) {
    console.error('Corporate Quote API error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Partner Submission Endpoint
app.post('/api/partner', inquiryLimiter, async (req, res) => {
  let { fullName, email, phone, role, resumeLink, message } = req.body;

  fullName = sanitizeText(fullName);
  email = sanitizeText(email);
  phone = sanitizeText(phone);
  role = sanitizeText(role);
  resumeLink = sanitizeText(resumeLink);
  message = sanitizeText(message);

  if (!fullName || !role || !resumeLink) {
    return res.status(400).json({ success: false, message: 'FullName, role, and Resume URL are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ success: false, message: 'Invalid phone format.' });
  }

  const partnerData = {
    fullName,
    email,
    phone,
    role,
    resumeLink,
    message,
    createdAt: new Date()
  };

  try {
    let savedPartner;
    if (dbConnected) {
      savedPartner = await Partner.create(partnerData);
    } else {
      const backupPartner = {
        id: 'p-' + Date.now().toString(36),
        ...partnerData,
        createdAt: partnerData.createdAt.toISOString()
      };
      saveLocalPartner(backupPartner);
      savedPartner = backupPartner;
    }

    if (transporter) {
      const senderAddress = process.env.SMTP_USER || 'anshul.caddverse@gmail.com';
      const userMailOptions = {
        from: `"CADDverse Partnerships" <${senderAddress}>`,
        to: email,
        subject: `Thank you for applying to CADDverse Techlabs: ${role}`,
        html: buildPartnerUserEmail(fullName, role)
      };

      const adminMailOptions = {
        from: `"CADDverse Lead Capture" <${senderAddress}>`,
        to: senderAddress,
        subject: `[Partner Lead Alert] ${fullName} - ${role}`,
        html: buildPartnerAdminEmail(savedPartner)
      };

      transporter.sendMail(userMailOptions).catch(err => console.error('Partner student email send error:', err.message));
      transporter.sendMail(adminMailOptions).catch(err => console.error('Partner admin email send error:', err.message));
    }

    return res.status(200).json({ success: true, message: 'Partnership inquiry received.' });
  } catch (err) {
    console.error('Partner API error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Multer File Upload setup for Career applications
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'resume-' + uniqueSuffix + ext);
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.post('/api/apply-career', upload.single('resume'), inquiryLimiter, async (req, res) => {
  let { fullName, email, phone, coverLetter } = req.body;

  fullName = sanitizeText(fullName);
  email = sanitizeText(email);
  phone = sanitizeText(phone);
  coverLetter = sanitizeText(coverLetter);

  if (!fullName || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Full name, email, and phone are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ success: false, message: 'Invalid phone format.' });
  }
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Resume document file is required.' });
  }

  const appData = {
    fullName,
    email,
    phone,
    coverLetter,
    resumeFilename: req.file.filename,
    createdAt: new Date()
  };

  try {
    let savedApp;
    if (dbConnected) {
      savedApp = await CareerApplication.create(appData);
    } else {
      const backupApp = {
        id: 'app-' + Date.now().toString(36),
        ...appData,
        createdAt: appData.createdAt.toISOString()
      };
      saveLocalCareerApp(backupApp);
      savedApp = backupApp;
    }

    if (transporter) {
      const senderAddress = process.env.SMTP_USER || 'anshul.caddverse@gmail.com';
      
      const userMailOptions = {
        from: `"CADDverse Careers" <${senderAddress}>`,
        to: email,
        subject: 'Application Received | CADDVERSE TEACHLABS',
        html: buildCareerUserEmail(fullName, coverLetter),
        attachments: [
          {
            filename: req.file.originalname,
            path: req.file.path
          }
        ]
      };

      const adminMailOptions = {
        from: `"CADDverse Careers Portal" <${senderAddress}>`,
        to: senderAddress,
        subject: `[Career Application Alert] ${fullName}`,
        html: buildCareerAdminEmail(savedApp),
        attachments: [
          {
            filename: req.file.originalname,
            path: req.file.path
          }
        ]
      };

      transporter.sendMail(userMailOptions).catch(err => console.error('Career candidate email error:', err.message));
      transporter.sendMail(adminMailOptions).catch(err => console.error('Career admin email error:', err.message));
    }

    return res.status(200).json({ success: true, message: 'Application submitted successfully.' });
  } catch (err) {
    console.error('Career Application API error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// 1.5 Early Access Notify Route
app.post('/api/notify-early-access', inquiryLimiter, async (req, res) => {
  let { email, portal } = req.body;

  email = sanitizeText(email);
  portal = sanitizeText(portal);

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }
  if (!portal) {
    return res.status(400).json({ success: false, message: 'Portal name is required.' });
  }

  const newNotifyData = {
    email,
    portal,
    createdAt: new Date()
  };

  try {
    let savedRequest;
    if (dbConnected) {
      savedRequest = await NotifyRequest.create(newNotifyData);
    } else {
      const backupRequest = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        ...newNotifyData,
        createdAt: newNotifyData.createdAt.toISOString()
      };
      saveLocalNotifyRequest(backupRequest);
      savedRequest = backupRequest;
    }

    // Send emails
    if (transporter) {
      const senderAddress = process.env.SMTP_USER || 'anshul.caddverse@gmail.com';

      const userMailOptions = {
        from: `"CADDverse Techlabs" <${senderAddress}>`,
        to: email,
        subject: `Early Access Registration: CADDverse ${portal} Portal`,
        html: buildNotifyUserEmail(email, portal)
      };

      const adminMailOptions = {
        from: `"CADDverse Early Access" <${senderAddress}>`,
        to: senderAddress,
        subject: `[Early Access Lead] ${email} interested in ${portal}`,
        html: buildNotifyAdminEmail(savedRequest)
      };

      transporter.sendMail(userMailOptions).catch(err => console.error('Early access user email error:', err.message));
      transporter.sendMail(adminMailOptions).catch(err => console.error('Early access admin email error:', err.message));
    }

    return res.status(200).json({ success: true, message: 'Early access registration successful.' });
  } catch (err) {
    console.error('Failed to register notification request:', err.message);
    return res.status(500).json({ success: false, message: 'Database error while saving request.' });
  }
});

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and Password are required.' });
  }

  const targetEmail = 'anshul.caddverse@gmail.com';
  const targetPassword = process.env.ADMIN_PASSWORD || '9049000010';
  
  const isMatch = (email.toLowerCase().trim() === targetEmail && password === targetPassword);

  if (isMatch) {
    const token = 'session-' + crypto.randomBytes(16).toString('hex');
    activeSessions.add(token);
    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }
});

// 3. Get Inquiries (Secured Endpoint)
app.get('/api/admin/inquiries', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token missing.' });
  }

  const token = authHeader.split(' ')[1];

  if (!activeSessions.has(token)) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }

  try {
    let list;
    let corpList;
    if (dbConnected) {
      list = await Inquiry.find().sort({ createdAt: -1 });
      corpList = await CorporateQuote.find().sort({ createdAt: -1 });
    } else {
      list = getLocalInquiries();
      corpList = getLocalCorpQuotes();
    }
    return res.status(200).json({ 
      success: true, 
      inquiries: list,
      corporateQuotes: corpList
    });
  } catch (err) {
    console.error('Failed to fetch admin inquiries:', err.message);
    return res.status(500).json({ success: false, message: 'Database query execution failure.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  CADDverse Techlabs Backend running on port ${PORT} `);
  console.log(`  MongoDB Connection URI: ${MONGODB_URI ? 'Configured' : 'Missing'} `);
  console.log(`  Local Storage DB active at server/data/ fallback `);
  console.log(`=================================================`);
});
