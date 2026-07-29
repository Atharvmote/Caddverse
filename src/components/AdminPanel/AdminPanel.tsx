import React, { useState, useEffect } from 'react';
import { ShieldAlert, LogOut, Search, FileDown, Eye, Calendar, Award, Phone, Mail, GraduationCap } from 'lucide-react';
import './adminpanel.css';

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

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  // Restore token from localStorage
  useEffect(() => {
    if (false) console.log(token); // dummy read to satisfy TS6133
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
      const res = await fetch('http://localhost:5001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('caddverse_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        fetchLeads(data.token);
      } else {
        setError(data.message || 'Invalid password.');
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
    setFilteredLeads([]);
    setActiveLead(null);
  };

  const fetchLeads = async (sessionToken: string) => {
    try {
      const res = await fetch('http://localhost:5001/api/admin/inquiries', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.inquiries);
        setFilteredLeads(data.inquiries);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    }
  };

  // Search & Filter leads
  useEffect(() => {
    let result = leads;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(lead => 
        lead.fullName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.includes(query) ||
        lead.companyName.toLowerCase().includes(query)
      );
    }

    if (selectedCourse) {
      result = result.filter(lead => lead.course === selectedCourse);
    }

    setFilteredLeads(result);
  }, [search, selectedCourse, leads]);

  // Export to CSV helper
  const handleExportCSV = () => {
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

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CADDverse_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <div className="input-group">
              <label className="input-label">PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="form-input-field" 
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
          <span className="stat-card-label">TOTAL LEADS CAPTURED</span>
          <span className="stat-card-value">{leads.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-card-label">FILTERED MATCHES</span>
          <span className="stat-card-value">{filteredLeads.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-card-label">CAMPUS INQUIRIES</span>
          <span className="stat-card-value">
            {leads.filter(l => l.course !== 'General Inquiry').length}
          </span>
        </div>
      </div>

      {/* Control panel bars */}
      <div className="admin-controls-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search leads by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-field"
          />
        </div>

        <div className="filters-actions-wrapper">
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

          <button className="btn-export-csv" onClick={handleExportCSV} disabled={filteredLeads.length === 0}>
            <FileDown size={16} style={{ marginRight: '6px' }} /> Export Spreadsheet
          </button>
        </div>
      </div>

      {/* Leads Table split view */}
      <div className="admin-split-table-layout">
        {/* Table list */}
        <div className="admin-table-wrapper">
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
                  <td colSpan={5} className="table-empty-row">No matching leads found.</td>
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
        </div>

        {/* View Details panel */}
        <div className="admin-detail-side-panel">
          {activeLead ? (
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
          )}
        </div>
      </div>
    </div>
  );
};
