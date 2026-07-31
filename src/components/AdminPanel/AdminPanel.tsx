import React, { useState, useEffect } from 'react';
import { ShieldAlert, LogOut, Search, FileDown, Eye, Calendar, Award, Phone, Mail, GraduationCap, Briefcase, Layers } from 'lucide-react';
import './adminpanel.css';
import { API_BASE_URL } from '../../utils/api';

interface Lead {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  createdAt: string;
}

interface CorporateQuote {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  teamSize: string;
  trainingDomain: string;
  message: string;
  createdAt: string;
}

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [corporateQuotes, setCorporateQuotes] = useState<CorporateQuote[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [filteredCorpQuotes, setFilteredCorpQuotes] = useState<CorporateQuote[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [activeCorpQuote, setActiveCorpQuote] = useState<CorporateQuote | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'corporate'>('courses');

  // Restore token from localStorage
  useEffect(() => {
    if (false) console.log(token);
    const savedToken = localStorage.getItem('caddverse_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchLeads(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('caddverse_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        fetchLeads(data.token);
      } else {
        setError(data.message || 'Invalid admin credentials.');
      }
    } catch (err) {
      setError('Connection failed. Verify server is running.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('caddverse_admin_token');
    setToken('');
    setIsAuthenticated(false);
    setLeads([]);
    setCorporateQuotes([]);
    setFilteredLeads([]);
    setFilteredCorpQuotes([]);
    setActiveLead(null);
    setActiveCorpQuote(null);
  };

  const fetchLeads = async (sessionToken: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/inquiries`, {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.inquiries || []);
        setCorporateQuotes(data.corporateQuotes || []);
        setFilteredLeads(data.inquiries || []);
        setFilteredCorpQuotes(data.corporateQuotes || []);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    }
  };

  // Search & Filter leads & corporate quotes
  useEffect(() => {
    // Course Inquiries
    let courseResult = leads;
    if (search.trim()) {
      const query = search.toLowerCase();
      courseResult = courseResult.filter(lead => 
        lead.fullName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.includes(query) ||
        (lead.companyName || '').toLowerCase().includes(query)
      );
    }
    if (selectedCourse) {
      courseResult = courseResult.filter(lead => lead.course === selectedCourse);
    }
    setFilteredLeads(courseResult);

    // Corporate Quotes
    let corpResult = corporateQuotes;
    if (search.trim()) {
      const query = search.toLowerCase();
      corpResult = corpResult.filter(quote => 
        quote.contactPerson.toLowerCase().includes(query) ||
        quote.companyName.toLowerCase().includes(query) ||
        quote.email.toLowerCase().includes(query) ||
        quote.phone.includes(query) ||
        (quote.trainingDomain || '').toLowerCase().includes(query)
      );
    }
    setFilteredCorpQuotes(corpResult);
  }, [search, selectedCourse, leads, corporateQuotes]);

  // Export to CSV helper
  const handleExportCSV = () => {
    if (activeTab === 'courses') {
      if (filteredLeads.length === 0) return;
      const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Company/College', 'Course Interested', 'Message'];
      const rows = filteredLeads.map(lead => [
        lead.id,
        new Date(lead.createdAt).toLocaleDateString(),
        `"${lead.fullName.replace(/"/g, '""')}"`,
        lead.email,
        lead.phone,
        `"${(lead.companyName || '').replace(/"/g, '""')}"`,
        `"${lead.course.replace(/"/g, '""')}"`,
        `"${(lead.message || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `CADDverse_Course_Leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      if (filteredCorpQuotes.length === 0) return;
      const headers = ['ID', 'Date', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Team Size', 'Training Domain', 'Message'];
      const rows = filteredCorpQuotes.map(quote => [
        quote.id,
        new Date(quote.createdAt).toLocaleDateString(),
        `"${quote.companyName.replace(/"/g, '""')}"`,
        `"${quote.contactPerson.replace(/"/g, '""')}"`,
        quote.email,
        quote.phone,
        quote.teamSize,
        `"${quote.trainingDomain.replace(/"/g, '""')}"`,
        `"${(quote.message || '').replace(/"/g, '""')}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `CADDverse_Corporate_Leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Get unique courses for filter dropdown
  const uniqueCourses = Array.from(new Set(leads.map(lead => lead.course)));

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          <div className="admin-lock-icon">
            <ShieldAlert size={36} />
          </div>
          <h2 className="admin-login-title">CADDverse Techlabs</h2>
          <p className="admin-login-subtitle">SECURE ADMIN PORTAL ACCESS</p>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '1px', fontWeight: '800' }}>EMAIL ADDRESS</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anshul.caddverse@gmail.com" 
                className="form-input-field" 
                style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                required 
              />
            </div>
            
            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '1px', fontWeight: '800' }}>PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="form-input-field" 
                style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                required 
              />
            </div>

            {error && <div className="admin-login-error">{error}</div>}
            
            <button type="submit" className="btn-admin-login">
              Authenticate Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Dashboard Top Header bar */}
      <header className="admin-dashboard-header">
        <div className="admin-header-logo">
          <span className="logo-brand text-gradient-blue">CADDverse</span>
          <span className="logo-sub">Techlabs Dashboard</span>
        </div>
        <button className="btn-admin-logout" onClick={handleLogout}>
          <LogOut size={16} style={{ marginRight: '6px' }} /> Logout
        </button>
      </header>

      {/* Main dashboard stats cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="stat-card-label">COURSE INQUIRIES</span>
          <span className="stat-card-value">{leads.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-card-label">CORPORATE REQUESTS</span>
          <span className="stat-card-value">{corporateQuotes.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-card-label">TOTAL LEADS</span>
          <span className="stat-card-value">{leads.length + corporateQuotes.length}</span>
        </div>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="admin-tabs" style={{ display: 'flex', gap: '20px', borderBottom: '2px solid rgba(15, 23, 42, 0.05)', paddingBottom: '2px' }}>
        <button 
          onClick={() => setActiveTab('courses')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            fontWeight: activeTab === 'courses' ? '800' : '600',
            color: activeTab === 'courses' ? '#0044FF' : '#64748B',
            borderBottom: activeTab === 'courses' ? '3px solid #0044FF' : '3px solid transparent',
            paddingBottom: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Course Inquiries ({leads.length})
        </button>
        <button 
          onClick={() => setActiveTab('corporate')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            fontWeight: activeTab === 'corporate' ? '800' : '600',
            color: activeTab === 'corporate' ? '#0044FF' : '#64748B',
            borderBottom: activeTab === 'corporate' ? '3px solid #0044FF' : '3px solid transparent',
            paddingBottom: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Corporate Quotes ({corporateQuotes.length})
        </button>
      </div>

      {/* Control panel bars */}
      <div className="admin-controls-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder={activeTab === 'courses' ? "Search inquiries by name, email, phone, college..." : "Search quotes by company, contact person, domain..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-field"
          />
        </div>

        <div className="filters-actions-wrapper">
          {activeTab === 'courses' && (
            <select 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="filter-select"
            >
              <option value="">Filter by Program Interest</option>
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          )}

          <button 
            className="btn-export-csv" 
            onClick={handleExportCSV} 
            disabled={activeTab === 'courses' ? filteredLeads.length === 0 : filteredCorpQuotes.length === 0}
          >
            <FileDown size={16} style={{ marginRight: '6px' }} /> Export Spreadsheet
          </button>
        </div>
      </div>

      {/* Leads Table split view */}
      <div className="admin-split-table-layout">
        
        {/* Table list */}
        <div className="admin-table-wrapper">
          {activeTab === 'courses' ? (
            <table className="admin-leads-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Full Name</th>
                  <th>Course Interested In</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="table-empty-row">No matching inquiries found.</td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={activeLead?.id === lead.id ? 'active-table-row' : ''}
                      onClick={() => setActiveLead(lead)}
                    >
                      <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="td-name-cell">
                          <strong>{lead.fullName}</strong>
                          <span>{lead.companyName || 'No Company/College'}</span>
                        </div>
                      </td>
                      <td><span className="td-badge-course">{lead.course}</span></td>
                      <td>{lead.phone}</td>
                      <td>
                        <button className="btn-view-lead" onClick={(e) => { e.stopPropagation(); setActiveLead(lead); }}>
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="admin-leads-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Contact Person / Company</th>
                  <th>Domain Requested</th>
                  <th>Team Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCorpQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="table-empty-row">No matching corporate quotes found.</td>
                  </tr>
                ) : (
                  filteredCorpQuotes.map((quote) => (
                    <tr 
                      key={quote.id} 
                      className={activeCorpQuote?.id === quote.id ? 'active-table-row' : ''}
                      onClick={() => setActiveCorpQuote(quote)}
                    >
                      <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="td-name-cell">
                          <strong>{quote.contactPerson}</strong>
                          <span>{quote.companyName}</span>
                        </div>
                      </td>
                      <td><span className="td-badge-course" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10B981' }}>{quote.trainingDomain}</span></td>
                      <td>{quote.teamSize} Engineers</td>
                      <td>
                        <button className="btn-view-lead" onClick={(e) => { e.stopPropagation(); setActiveCorpQuote(quote); }}>
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* View Details panel */}
        <div className="admin-detail-side-panel">
          {activeTab === 'courses' ? (
            activeLead ? (
              <div className="lead-panel-details">
                <h3 className="lead-panel-title">Inquiry Record Details</h3>
                <div className="lead-info-block">
                  <div className="lead-info-title-badge">
                    <GraduationCap size={20} className="info-title-icon" />
                    <div>
                      <h4>{activeLead.fullName}</h4>
                      <span>{activeLead.companyName || 'Individual Lead'}</span>
                    </div>
                  </div>
                </div>

                <div className="lead-fields-grid">
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Mail size={12} /> Email</span>
                    <a href={`mailto:${activeLead.email}`} className="lead-field-value">{activeLead.email}</a>
                  </div>
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Phone size={12} /> Phone</span>
                    <a href={`tel:${activeLead.phone}`} className="lead-field-value">{activeLead.phone}</a>
                  </div>
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Award size={12} /> Course Requested</span>
                    <span className="lead-field-value-strong">{activeLead.course}</span>
                  </div>
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Calendar size={12} /> Time Captured</span>
                    <span className="lead-field-value">{new Date(activeLead.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="lead-message-box">
                  <h5>STUDENT MESSAGE / GOALS</h5>
                  <p>"{activeLead.message || 'No additional message provided.'}"</p>
                </div>
              </div>
            ) : (
              <div className="lead-panel-empty">
                <Eye size={36} className="empty-panel-icon" />
                <p>Select a student row to view full details and contact information.</p>
              </div>
            )
          ) : (
            activeCorpQuote ? (
              <div className="lead-panel-details">
                <h3 className="lead-panel-title">Corporate Quote Details</h3>
                <div className="lead-info-block">
                  <div className="lead-info-title-badge" style={{ background: 'rgba(0, 68, 255, 0.05)', color: '#0044FF' }}>
                    <Briefcase size={20} className="info-title-icon" />
                    <div>
                      <h4>{activeCorpQuote.contactPerson}</h4>
                      <span>{activeCorpQuote.companyName}</span>
                    </div>
                  </div>
                </div>

                <div className="lead-fields-grid">
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Mail size={12} /> Email</span>
                    <a href={`mailto:${activeCorpQuote.email}`} className="lead-field-value">{activeCorpQuote.email}</a>
                  </div>
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Phone size={12} /> Phone</span>
                    <a href={`tel:${activeCorpQuote.phone}`} className="lead-field-value">{activeCorpQuote.phone}</a>
                  </div>
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Award size={12} /> Domain Requested</span>
                    <span className="lead-field-value-strong">{activeCorpQuote.trainingDomain}</span>
                  </div>
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Layers size={12} /> Team Size</span>
                    <span className="lead-field-value">{activeCorpQuote.teamSize} Engineers</span>
                  </div>
                  <div className="lead-field-item">
                    <span className="lead-field-label"><Calendar size={12} /> Time Captured</span>
                    <span className="lead-field-value">{new Date(activeCorpQuote.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="lead-message-box">
                  <h5>REQUIREMENTS & NOTES</h5>
                  <p>"{activeCorpQuote.message || 'No additional requirements provided.'}"</p>
                </div>
              </div>
            ) : (
              <div className="lead-panel-empty">
                <Eye size={36} className="empty-panel-icon" />
                <p>Select a corporate quote row to view full details and contact information.</p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
};
