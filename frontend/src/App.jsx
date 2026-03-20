import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Plus, Eye, EyeOff, BarChart3, Clock, AlertCircle, Trash2, Edit2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PatentReminderSystem = () => {
  const [currentDrafter, setCurrentDrafter] = useState(null);
  const [view, setView] = useState('dashboard');
  const [reminders, setReminders] = useState([]);
  const [patents, setPatents] = useState([]);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showPatentForm, setShowPatentForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [editingPatent, setEditingPatent] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const drafters = [
    { id: 1, name: 'Abhishek', email: 'abhishek.drafter@gmail.com', color: 'from-blue-600 to-blue-400' },
    { id: 2, name: 'Ayush M Anchan', email: 'ayush.drafters@gmail.com', color: 'from-purple-600 to-purple-400' },
    { id: 3, name: 'Pramith Nayak', email: 'pramith.drafters@gmail.com', color: 'from-orange-600 to-orange-400' },
    { id: 4, name: 'Thilak', email: 'thilak.drafters@gmail.com', color: 'from-teal-600 to-teal-400' },
  ];

  const reminderTypes = [
    'IDF', 'FORM1', 'PS DRAFT', 'PS ACK', 'CS CHECKLIST', 'CS DRAFT', 'CS ACK',
    'FORM 9', 'FORM 18', 'FORM 26', 'PUBLICATION ACK', 'FER NOTICE', 'FER REPLY',
    'HEARING NOTICE', 'HEARING', 'WS SUBMISSION', 'GRANT'
  ];

  const [formData, setFormData] = useState({
    trackingCode: '',
    clientName: '',
    reminderType: 'IDF',
    dueDate: '',
    reminderDays: 3,
    additionalComment: '',
  });

  const [patentData, setPatentData] = useState({
    patentNumber: '',
    title: '',
    clientName: '',
    applicationType: 'Utility',
    status: 'Pending',
    description: '',
  });

  // ── Fetch all data from Supabase on mount ──────────────────────────────────
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [{ data: remindersData }, { data: patentsData }] = await Promise.all([
        supabase.from('reminders').select('*').order('due_date', { ascending: true }),
        supabase.from('patents').select('*').order('created_date', { ascending: false }),
      ]);
      if (remindersData) setReminders(remindersData.map(mapReminderFromDB));
      if (patentsData) setPatents(patentsData.map(mapPatentFromDB));
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ── DB row ↔ JS object mappers (snake_case ↔ camelCase) ──────────────────
  const mapReminderFromDB = (r) => ({
    id: r.id,
    drafterId: r.drafter_id,
    drafterName: r.drafter_name,
    drafterEmail: r.drafter_email,
    trackingCode: r.tracking_code,
    clientName: r.client_name,
    reminderType: r.reminder_type,
    dueDate: r.due_date,
    reminderDays: r.reminder_days,
    additionalComment: r.additional_comment,
    createdDate: r.created_date,
    status: r.status,
  });

  const mapPatentFromDB = (p) => ({
    id: p.id,
    drafterId: p.drafter_id,
    drafterName: p.drafter_name,
    patentNumber: p.patent_number,
    title: p.title,
    clientName: p.client_name,
    applicationType: p.application_type,
    status: p.status,
    description: p.description,
    createdDate: p.created_date,
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDrafterSelect = (drafter) => {
    setCurrentDrafter(drafter);
    setView('drafterDashboard');
    setShowReminderForm(false);
    setShowPatentForm(false);
  };

  const handleSetReminder = async () => {
    if (!formData.trackingCode || !formData.clientName || !formData.dueDate) {
      alert('Please fill all required fields');
      return;
    }

    const row = {
      id: editingReminder?.id || Date.now(),
      drafter_id: currentDrafter.id,
      drafter_name: currentDrafter.name,
      drafter_email: currentDrafter.email,
      tracking_code: formData.trackingCode,
      client_name: formData.clientName,
      reminder_type: formData.reminderType,
      due_date: formData.dueDate,
      reminder_days: formData.reminderDays,
      additional_comment: formData.additionalComment,
      created_date: editingReminder?.createdDate || new Date().toISOString().split('T')[0],
      status: 'Active',
    };

    let error;
    if (editingReminder) {
      ({ error } = await supabase.from('reminders').update(row).eq('id', editingReminder.id));
    } else {
      ({ error } = await supabase.from('reminders').insert(row));
    }

    if (error) {
      console.error('Supabase error:', error);
      alert('❌ Failed to save reminder: ' + error.message);
      return;
    }

    await fetchAllData();
    await sendReminderEmail({ ...mapReminderFromDB(row) });

    setFormData({ trackingCode: '', clientName: '', reminderType: 'IDF', dueDate: '', reminderDays: 3, additionalComment: '' });
    setEditingReminder(null);
    setShowReminderForm(false);
  };

  const handleAddPatent = async () => {
    if (!patentData.patentNumber || !patentData.title || !patentData.clientName) {
      alert('Please fill all required fields');
      return;
    }

    const row = {
      id: editingPatent?.id || Date.now(),
      drafter_id: currentDrafter.id,
      drafter_name: currentDrafter.name,
      patent_number: patentData.patentNumber,
      title: patentData.title,
      client_name: patentData.clientName,
      application_type: patentData.applicationType,
      status: patentData.status,
      description: patentData.description,
      created_date: editingPatent?.createdDate || new Date().toISOString().split('T')[0],
    };

    let error;
    if (editingPatent) {
      ({ error } = await supabase.from('patents').update(row).eq('id', editingPatent.id));
    } else {
      ({ error } = await supabase.from('patents').insert(row));
    }

    if (error) {
      console.error('Supabase error:', error);
      alert('❌ Failed to save patent: ' + error.message);
      return;
    }

    await fetchAllData();
    setPatentData({ patentNumber: '', title: '', clientName: '', applicationType: 'Utility', status: 'Pending', description: '' });
    setEditingPatent(null);
    setShowPatentForm(false);
  };

  const sendReminderEmail = async (reminderData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/send-reminder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reminderData),
      });

      if (response.ok) {
        alert(`✅ Reminder set successfully!\n📧 Email sent to ${reminderData.drafterEmail}`);
      } else {
        alert(`⚠️ Reminder saved but email may not have been sent.\nPlease check backend server.`);
      }
    } catch (error) {
      console.log('Backend not running - reminder saved to cloud:', error);
      alert(`✅ Reminder saved to cloud successfully!\n⚠️ Email notification requires backend server.`);
    }
  };

  const deleteReminder = async (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      const { error } = await supabase.from('reminders').delete().eq('id', id);
      if (error) { alert('Failed to delete: ' + error.message); return; }
      await fetchAllData();
    }
  };

  const deletePatent = async (id) => {
    if (window.confirm('Are you sure you want to delete this patent?')) {
      const { error } = await supabase.from('patents').delete().eq('id', id);
      if (error) { alert('Failed to delete: ' + error.message); return; }
      await fetchAllData();
    }
  };

  const editReminder = (reminder) => {
    setFormData({
      trackingCode: reminder.trackingCode,
      clientName: reminder.clientName,
      reminderType: reminder.reminderType,
      dueDate: reminder.dueDate,
      reminderDays: reminder.reminderDays,
      additionalComment: reminder.additionalComment,
    });
    setEditingReminder(reminder);
    setShowReminderForm(true);
  };

  const editPatent = (patent) => {
    setPatentData({
      patentNumber: patent.patentNumber,
      title: patent.title,
      clientName: patent.clientName,
      applicationType: patent.applicationType,
      status: patent.status,
      description: patent.description,
    });
    setEditingPatent(patent);
    setShowPatentForm(true);
  };

  const getDrafterReminders = () => reminders.filter(r => r.drafterId === currentDrafter.id);
  const getDrafterPatents = () => patents.filter(p => p.drafterId === currentDrafter.id);

  const getUpcomingReminders = () =>
    getDrafterReminders()
      .filter(r => r.status === 'Active')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (daysUntilDue) => {
    if (daysUntilDue < 0) return 'bg-red-100 border-red-300 text-red-700';
    if (daysUntilDue <= 7) return 'bg-orange-100 border-orange-300 text-orange-700';
    if (daysUntilDue <= 14) return 'bg-yellow-100 border-yellow-300 text-yellow-700';
    return 'bg-green-100 border-green-300 text-green-700';
  };

  // ── Auth screen ───────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Patent Reminder System</h1>
            <p className="text-slate-600">Secure Access Required</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Master Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && authPassword === 'patent2024' && setIsAuthenticated(true)}
                  className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Hint: Patent-related year (patent2024)</p>
            </div>

            <button
              onClick={() => authPassword === 'patent2024' && setIsAuthenticated(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Patent Reminder System</h1>
            </div>
            <div className="flex items-center gap-4">
              {loading && <span className="text-slate-400 text-sm animate-pulse">Syncing…</span>}
              <button
                onClick={() => { setIsAuthenticated(false); setAuthPassword(''); }}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drafters.map((drafter) => (
              <button
                key={drafter.id}
                onClick={() => handleDrafterSelect(drafter)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${drafter.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 group-hover:border-transparent p-8 h-64 flex flex-col items-center justify-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${drafter.color} flex items-center justify-center mb-4 group-hover:shadow-xl transition-all`}>
                    <span className="text-2xl font-bold text-white">{drafter.name.charAt(0)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white text-center mb-2 group-hover:text-white transition-colors">
                    {drafter.name}
                  </h2>
                  <div className="text-center text-sm text-slate-400 group-hover:text-slate-300 mb-4">
                    <p className="text-xs">{reminders.filter(r => r.drafterId === drafter.id).length} Reminders</p>
                    <p className="text-xs">{patents.filter(p => p.drafterId === drafter.id).length} Patents</p>
                  </div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-slate-700 group-hover:bg-white group-hover:shadow-lg flex items-center justify-center transition-all">
                    <span className="text-slate-400 group-hover:text-slate-900 font-bold">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">Total Reminders</p>
                  <p className="text-3xl font-bold text-white">{reminders.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">Total Patents</p>
                  <p className="text-3xl font-bold text-white">{patents.length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-purple-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">Active Drafters</p>
                  <p className="text-3xl font-bold text-white">{drafters.length}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">Due This Week</p>
                  <p className="text-3xl font-bold text-white">
                    {reminders.filter(r => {
                      const days = calculateDaysUntilDue(r.dueDate);
                      return days >= 0 && days <= 7;
                    }).length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-500 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Drafter Dashboard ─────────────────────────────────────────────────────
  if (view === 'drafterDashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setView('dashboard');
                  setCurrentDrafter(null);
                  setShowReminderForm(false);
                  setShowPatentForm(false);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentDrafter.color} flex items-center justify-center`}>
                  <span className="text-xl font-bold text-white">{currentDrafter.name.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{currentDrafter.name}</h1>
                  <p className="text-sm text-slate-400">{currentDrafter.email}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setView('dashboardSummary')}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <BarChart3 size={16} className="inline mr-2" />
                Summary
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-4 mb-8 border-b border-slate-700">
            <button
              onClick={() => { setShowReminderForm(false); setShowPatentForm(false); }}
              className="px-4 py-3 font-semibold text-white border-b-2 border-blue-500 text-sm"
            >
              <Clock size={16} className="inline mr-2" />
              Reminders
            </button>
            <button
              onClick={() => { setShowReminderForm(false); setShowPatentForm(true); }}
              className="px-4 py-3 font-semibold text-slate-400 hover:text-white transition-colors text-sm"
            >
              <AlertCircle size={16} className="inline mr-2" />
              Patent Portfolio
            </button>
          </div>

          {!showPatentForm ? (
            <>
              <button
                onClick={() => {
                  setFormData({ trackingCode: '', clientName: '', reminderType: 'IDF', dueDate: '', reminderDays: 3, additionalComment: '' });
                  setEditingReminder(null);
                  setShowReminderForm(!showReminderForm);
                }}
                className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
              >
                <Plus size={20} />
                {showReminderForm ? 'Cancel' : 'New Reminder'}
              </button>

              {showReminderForm && (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-8 max-w-2xl">
                  <h2 className="text-xl font-bold text-white mb-6">
                    {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Tracking Code *</label>
                      <input
                        type="text"
                        value={formData.trackingCode}
                        onChange={(e) => setFormData({ ...formData, trackingCode: e.target.value })}
                        placeholder="e.g., APP-2024-001234"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Client Name *</label>
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g., Acme Corp"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Reminder Type *</label>
                      <select
                        value={formData.reminderType}
                        onChange={(e) => setFormData({ ...formData, reminderType: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {reminderTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Due Date *</label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Remind Me {formData.reminderDays} Days Before
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={formData.reminderDays}
                        onChange={(e) => setFormData({ ...formData, reminderDays: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Additional Comment</label>
                      <textarea
                        value={formData.additionalComment}
                        onChange={(e) => setFormData({ ...formData, additionalComment: e.target.value })}
                        placeholder="Any additional notes or details..."
                        rows="3"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>

                    <button
                      onClick={handleSetReminder}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      <Mail size={18} className="inline mr-2" />
                      {editingReminder ? 'Update & Send Email' : 'Set Reminder & Send Email'}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {getDrafterReminders().length === 0 ? (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-12 text-center">
                    <Clock size={48} className="mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400 text-lg">No reminders yet. Create one to get started!</p>
                  </div>
                ) : (
                  getDrafterReminders()
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .map(reminder => {
                      const daysUntil = calculateDaysUntilDue(reminder.dueDate);
                      return (
                        <div
                          key={reminder.id}
                          className={`border-l-4 rounded-lg p-6 ${getStatusColor(daysUntil)} bg-opacity-10 flex items-center justify-between`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-semibold">
                                {reminder.reminderType}
                              </span>
                              <span className="text-sm font-medium">
                                {reminder.trackingCode}
                              </span>
                            </div>
                            <p className="text-lg font-semibold mb-2">{reminder.clientName}</p>
                            <div className="flex gap-4 text-sm">
                              <span className="text-slate-400">Due: {new Date(reminder.dueDate).toLocaleDateString()}</span>
                              <span className="font-semibold">
                                {daysUntil < 0 ? `Overdue by ${Math.abs(daysUntil)} days` : `${daysUntil} days remaining`}
                              </span>
                            </div>
                            {reminder.additionalComment && (
                              <p className="text-sm text-slate-600 mt-2 italic">"{reminder.additionalComment}"</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => editReminder(reminder)}
                              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              <Edit2 size={18} className="text-slate-400" />
                            </button>
                            <button
                              onClick={() => deleteReminder(reminder.id)}
                              className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setPatentData({ patentNumber: '', title: '', clientName: '', applicationType: 'Utility', status: 'Pending', description: '' });
                  setEditingPatent(null);
                  setShowPatentForm(!showPatentForm);
                }}
                className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
              >
                <Plus size={20} />
                {showPatentForm ? 'Cancel' : 'Add Patent'}
              </button>

              {showPatentForm && (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-8 max-w-2xl">
                  <h2 className="text-xl font-bold text-white mb-6">
                    {editingPatent ? 'Edit Patent' : 'Add Patent to Portfolio'}
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Patent Number *</label>
                      <input
                        type="text"
                        value={patentData.patentNumber}
                        onChange={(e) => setPatentData({ ...patentData, patentNumber: e.target.value })}
                        placeholder="e.g., US 10,234,567"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Patent Title *</label>
                      <input
                        type="text"
                        value={patentData.title}
                        onChange={(e) => setPatentData({ ...patentData, title: e.target.value })}
                        placeholder="e.g., Advanced Widget System"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Client Name *</label>
                      <input
                        type="text"
                        value={patentData.clientName}
                        onChange={(e) => setPatentData({ ...patentData, clientName: e.target.value })}
                        placeholder="e.g., Tech Innovations Inc"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Application Type</label>
                        <select
                          value={patentData.applicationType}
                          onChange={(e) => setPatentData({ ...patentData, applicationType: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option>Utility</option>
                          <option>Design</option>
                          <option>Plant</option>
                          <option>International</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
                        <select
                          value={patentData.status}
                          onChange={(e) => setPatentData({ ...patentData, status: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option>Pending</option>
                          <option>Under Review</option>
                          <option>Approved</option>
                          <option>Granted</option>
                          <option>Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
                      <textarea
                        value={patentData.description}
                        onChange={(e) => setPatentData({ ...patentData, description: e.target.value })}
                        placeholder="Brief description of the patent..."
                        rows="3"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      ></textarea>
                    </div>

                    <button
                      onClick={handleAddPatent}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      {editingPatent ? 'Update Patent' : 'Add Patent'}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getDrafterPatents().length === 0 ? (
                  <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-12 text-center">
                    <AlertCircle size={48} className="mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400 text-lg">No patents in portfolio. Add one to get started!</p>
                  </div>
                ) : (
                  getDrafterPatents().map(patent => (
                    <div key={patent.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{patent.title}</h3>
                          <p className="text-sm text-slate-400">{patent.patentNumber}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editPatent(patent)}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} className="text-slate-400" />
                          </button>
                          <button
                            onClick={() => deletePatent(patent.id)}
                            className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Client</p>
                          <p className="text-slate-300">{patent.clientName}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Type</p>
                            <p className="text-slate-300">{patent.applicationType}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
                            <p className={`font-semibold ${
                              patent.status === 'Granted' ? 'text-green-400' :
                              patent.status === 'Rejected' ? 'text-red-400' :
                              patent.status === 'Approved' ? 'text-blue-400' :
                              'text-yellow-400'
                            }`}>
                              {patent.status}
                            </p>
                          </div>
                        </div>

                        {patent.description && (
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Description</p>
                            <p className="text-slate-400 text-sm">{patent.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Performance Summary ───────────────────────────────────────────────────
  if (view === 'dashboardSummary') {
    const drafterReminders = getDrafterReminders();
    const drafterPatents = getDrafterPatents();

    const statusCounts = {
      active: drafterReminders.filter(r => r.status === 'Active').length,
      overdue: drafterReminders.filter(r => calculateDaysUntilDue(r.dueDate) < 0).length,
      dueThisWeek: drafterReminders.filter(r => {
        const days = calculateDaysUntilDue(r.dueDate);
        return days >= 0 && days <= 7;
      }).length,
    };

    const patentStatusCounts = {
      pending: drafterPatents.filter(p => p.status === 'Pending').length,
      underReview: drafterPatents.filter(p => p.status === 'Under Review').length,
      approved: drafterPatents.filter(p => p.status === 'Approved').length,
      granted: drafterPatents.filter(p => p.status === 'Granted').length,
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('drafterDashboard')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-white">Performance Summary</h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 rounded-2xl p-6">
              <p className="text-blue-200 text-sm font-medium mb-2">Active Reminders</p>
              <p className="text-3xl font-bold text-white">{statusCounts.active}</p>
              <p className="text-xs text-blue-300 mt-2">Total assigned</p>
            </div>

            <div className="bg-gradient-to-br from-orange-900 to-orange-800 border border-orange-700 rounded-2xl p-6">
              <p className="text-orange-200 text-sm font-medium mb-2">Overdue</p>
              <p className="text-3xl font-bold text-white">{statusCounts.overdue}</p>
              <p className="text-xs text-orange-300 mt-2">Requires attention</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 border border-yellow-700 rounded-2xl p-6">
              <p className="text-yellow-200 text-sm font-medium mb-2">Due This Week</p>
              <p className="text-3xl font-bold text-white">{statusCounts.dueThisWeek}</p>
              <p className="text-xs text-yellow-300 mt-2">Upcoming deadlines</p>
            </div>

            <div className="bg-gradient-to-br from-green-900 to-green-800 border border-green-700 rounded-2xl p-6">
              <p className="text-green-200 text-sm font-medium mb-2">Total Patents</p>
              <p className="text-3xl font-bold text-white">{drafterPatents.length}</p>
              <p className="text-xs text-green-300 mt-2">In portfolio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Patent Status Distribution</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Pending</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{width: `${(patentStatusCounts.pending / drafterPatents.length * 100) || 0}%`}}></div>
                    </div>
                    <span className="text-white font-semibold w-8">{patentStatusCounts.pending}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Under Review</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{width: `${(patentStatusCounts.underReview / drafterPatents.length * 100) || 0}%`}}></div>
                    </div>
                    <span className="text-white font-semibold w-8">{patentStatusCounts.underReview}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Approved</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{width: `${(patentStatusCounts.approved / drafterPatents.length * 100) || 0}%`}}></div>
                    </div>
                    <span className="text-white font-semibold w-8">{patentStatusCounts.approved}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Granted</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{width: `${(patentStatusCounts.granted / drafterPatents.length * 100) || 0}%`}}></div>
                    </div>
                    <span className="text-white font-semibold w-8">{patentStatusCounts.granted}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Next 5 Deadlines</h2>
              {getUpcomingReminders().length === 0 ? (
                <p className="text-slate-400">No upcoming reminders</p>
              ) : (
                <div className="space-y-3">
                  {getUpcomingReminders().map(reminder => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{reminder.reminderType}</p>
                        <p className="text-xs text-slate-400">{reminder.clientName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-yellow-400">
                          {calculateDaysUntilDue(reminder.dueDate)} days
                        </p>
                        <p className="text-xs text-slate-400">{new Date(reminder.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PatentReminderSystem;
