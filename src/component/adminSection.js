import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import initialData from '../Data/portfolioData.json';

const AVAILABLE_ICONS = [
    'Monitor', 'Smartphone', 'PenTool', 'Braces', 'Server', 
    'Atom', 'Database', 'GitBranch', 'Award', 'Terminal', 
    'Cpu', 'Globe', 'Layers', 'HeartPulse', 'CalendarCheck', 
    'ShieldPlus', 'BadgeCheck', 'Code'
];

function AdminSection() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    
    // Portfolio data state
    const [portfolioData, setPortfolioData] = useState(initialData);
    
    // UI state
    const [activeTab, setActiveTab] = useState('hero');
    const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
    const [serverOffline, setServerOffline] = useState(false);
    
    // Temporary States for Adding Items
    const [newService, setNewService] = useState({ title: '', projectsCount: 10, iconName: 'Code', color: 'teal' });
    const [newExperience, setNewExperience] = useState({ company: '', dates: '', role: '', description: '' });
    const [newWork, setNewWork] = useState({ title: '', category: '', colorTheme: 'teal', imageUrl: 'images/project_food_app.png' });
    const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', quote: '', avatarName: 'User' });

    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('portfolio_admin_auth');
        if (sessionAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin') {
            setIsAuthenticated(true);
            sessionStorage.setItem('portfolio_admin_auth', 'true');
            setAuthError('');
        } else {
            setAuthError('Incorrect passcode. Please try again.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('portfolio_admin_auth');
        window.location.hash = '';
    };

    useEffect(() => {
        if (saveStatus.message) {
            const timer = setTimeout(() => {
                setSaveStatus({ type: '', message: '' });
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [saveStatus]);

    // Handle Hero changes
    const handleHeroChange = (field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            hero_data: {
                ...prev.hero_data,
                [field]: value
            }
        }));
    };

    // Handle Contact & Links changes
    const handleContactChange = (field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            contactLinks: {
                ...prev.contactLinks,
                [field]: value
            }
        }));
    };

    // Handle Services changes
    const handleServiceChange = (index, field, value) => {
        setPortfolioData(prev => {
            const updated = [...prev.services_data];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, services_data: updated };
        });
    };

    const handleAddService = () => {
        if (!newService.title.trim()) return;
        setPortfolioData(prev => ({
            ...prev,
            services_data: [...prev.services_data, { ...newService }]
        }));
        setNewService({ title: '', projectsCount: 10, iconName: 'Code', color: 'teal' });
    };

    const handleRemoveService = (index) => {
        setPortfolioData(prev => ({
            ...prev,
            services_data: prev.services_data.filter((_, idx) => idx !== index)
        }));
    };

    // Handle Experience changes
    const handleExperienceChange = (index, field, value) => {
        setPortfolioData(prev => {
            const updated = [...prev.experience_data];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, experience_data: updated };
        });
    };

    const handleAddExperience = () => {
        if (!newExperience.company.trim() || !newExperience.role.trim()) return;
        setPortfolioData(prev => ({
            ...prev,
            experience_data: [...prev.experience_data, { ...newExperience }]
        }));
        setNewExperience({ company: '', dates: '', role: '', description: '' });
    };

    const handleRemoveExperience = (index) => {
        setPortfolioData(prev => ({
            ...prev,
            experience_data: prev.experience_data.filter((_, idx) => idx !== index)
        }));
    };

    // Handle Works/Projects changes
    const handleWorkChange = (index, field, value) => {
        setPortfolioData(prev => {
            const updated = [...prev.works_data];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, works_data: updated };
        });
    };

    const handleAddWork = () => {
        if (!newWork.title.trim()) return;
        setPortfolioData(prev => ({
            ...prev,
            works_data: [...prev.works_data, { ...newWork }]
        }));
        setNewWork({ title: '', category: '', colorTheme: 'teal', imageUrl: 'images/project_food_app.png' });
    };

    const handleRemoveWork = (index) => {
        setPortfolioData(prev => ({
            ...prev,
            works_data: prev.works_data.filter((_, idx) => idx !== index)
        }));
    };

    // Handle Testimonials changes
    const handleTestimonialChange = (index, field, value) => {
        setPortfolioData(prev => {
            const updated = [...prev.testimonials_data];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, testimonials_data: updated };
        });
    };

    const handleAddTestimonial = () => {
        if (!newTestimonial.name.trim() || !newTestimonial.quote.trim()) return;
        setPortfolioData(prev => ({
            ...prev,
            testimonials_data: [...prev.testimonials_data, { ...newTestimonial }]
        }));
        setNewTestimonial({ name: '', role: '', quote: '', avatarName: 'User' });
    };

    const handleRemoveTestimonial = (index) => {
        setPortfolioData(prev => ({
            ...prev,
            testimonials_data: prev.testimonials_data.filter((_, idx) => idx !== index)
        }));
    };

    // Save functionality
    const handleSave = async () => {
        try {
            setSaveStatus({ type: 'info', message: 'Saving changes...' });
            
            const response = await fetch('http://localhost:3001/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(portfolioData),
            });

            if (response.ok) {
                const resData = await response.json();
                if (resData.success) {
                    setSaveStatus({ type: 'success', message: 'Changes saved successfully to local codebase! The website will hot-reload.' });
                    setServerOffline(false);
                } else {
                    throw new Error(resData.message || 'Server failed to save.');
                }
            } else {
                throw new Error('Server responded with error code.');
            }
        } catch (error) {
            console.warn('Backend save failed, offering configuration download.', error);
            setServerOffline(true);
            setSaveStatus({ 
                type: 'danger', 
                message: 'Local save server offline. Download the updated configuration file using the button below and replace src/Data/portfolioData.json in your codebase.' 
            });
        }
    };

    // Download JSON config
    const handleDownloadJSON = () => {
        const dataStr = JSON.stringify(portfolioData, null, 4);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'portfolioData.json');
        linkElement.click();
    };

    // Passcode lock view
    if (!isAuthenticated) {
        return (
            <div className="admin-dashboard-wrapper min-vh-100 d-flex align-items-center justify-content-center py-5">
                <div className="card p-5 border-0 shadow text-center" style={{ maxWidth: '420px', width: '100%', borderRadius: '24px' }}>
                    <div className="mb-4 d-inline-flex p-3 bg-secondary bg-opacity-10 text-teal rounded-circle mx-auto">
                        <Lucide.Lock size={32} className="text-teal" />
                    </div>
                    <h2 className="text-teal fw-bold mb-2 font-display">Admin Portal</h2>
                    <p className="text-muted small mb-4">Enter your passcode to manage your portfolio site content.</p>
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                className="form-control text-center py-3 text-dark placeholder-secondary" 
                                style={{ borderRadius: '12px' }}
                                placeholder="Enter passcode"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {authError && <p className="text-danger small mb-3">{authError}</p>}
                        <button type="submit" className="btn w-100 py-3 fw-semibold text-white shadow-sm" style={{ borderRadius: '12px', backgroundColor: 'var(--primary-teal)' }}>
                            Unlock Dashboard
                        </button>
                    </form>
                    <div className="mt-4 pt-3 border-top border-secondary border-opacity-10">
                        <a href="#/" className="text-coral text-decoration-none small d-inline-flex align-items-center gap-1 fw-bold">
                            <Lucide.ArrowLeft size={14} /> Back to Portfolio
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-wrapper min-vh-100 py-5 text-start">
            <div className="container-xl">
                
                {/* Header Row */}
                <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4 mb-5 pb-4 border-bottom border-secondary border-opacity-10">
                    <div className="text-start">
                        <span className="pill-badge text-uppercase small fw-bold mb-2 d-inline-block" style={{ backgroundColor: 'var(--primary-coral)', color: 'white', padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem' }}>Control Center</span>
                        <h1 className="display-6 text-teal fw-bold mb-0 font-display">Portfolio Dashboard</h1>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                        <a href="#/" className="btn btn-outline-dark d-inline-flex align-items-center gap-2 px-4 py-2 border-secondary" style={{ borderRadius: '30px', fontWeight: 600 }}>
                            <Lucide.Globe size={16} /> View Site
                        </a>
                        <button onClick={handleLogout} className="btn btn-outline-danger d-inline-flex align-items-center gap-2 px-4 py-2" style={{ borderRadius: '30px', fontWeight: 600 }}>
                            <Lucide.LogOut size={16} /> Exit
                        </button>
                    </div>
                </header>

                {/* Save Feedback Banner */}
                {saveStatus.message && (
                    <div className={`alert alert-${saveStatus.type === 'danger' ? 'danger' : saveStatus.type === 'success' ? 'success' : 'info'} p-4 mb-4 border-0 d-flex gap-3 align-items-start shadow-sm`} style={{ borderRadius: '16px' }}>
                        <div className="pt-1">
                            {saveStatus.type === 'danger' ? <Lucide.AlertCircle size={22} className="text-danger" /> : <Lucide.CheckCircle size={22} className="text-success" />}
                        </div>
                        <div className="flex-grow-1 text-start">
                            <p className="mb-0 fw-semibold text-dark">{saveStatus.message}</p>
                            {serverOffline && (
                                <button onClick={handleDownloadJSON} className="btn btn-light text-dark fw-bold btn-sm mt-3 d-inline-flex align-items-center gap-2 px-3 py-2" style={{ borderRadius: '8px' }}>
                                    <Lucide.Download size={15} /> Download Config JSON
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Dashboard layout */}
                <div className="row g-4">
                    
                    {/* Navigation Sidebar */}
                    <div className="col-lg-3">
                        <div className="card p-3 border-0 h-100 shadow-sm" style={{ borderRadius: '20px' }}>
                            <p className="text-uppercase text-muted fw-bold small px-3 mb-3 text-start" style={{ letterSpacing: '1px' }}>Sections</p>
                            <nav className="nav flex-column gap-2">
                                <button 
                                    onClick={() => setActiveTab('hero')}
                                    className={`nav-link text-start py-3 px-4 border-0 d-flex align-items-center gap-3 w-100 ${activeTab === 'hero' ? 'text-white fw-bold shadow-sm' : 'text-dark bg-transparent'}`}
                                    style={{ 
                                        borderRadius: '12px', 
                                        transition: 'all 0.2s', 
                                        backgroundColor: activeTab === 'hero' ? 'var(--primary-teal)' : 'transparent',
                                        color: activeTab === 'hero' ? '#fff' : 'var(--text-color)',
                                        fontWeight: activeTab === 'hero' ? 600 : 500
                                    }}
                                >
                                    <Lucide.FileText size={16} /> Hero & Header
                                </button>
                                <button 
                                    onClick={() => setActiveTab('services')}
                                    className={`nav-link text-start py-3 px-4 border-0 d-flex align-items-center gap-3 w-100 ${activeTab === 'services' ? 'text-white fw-bold shadow-sm' : 'text-dark bg-transparent'}`}
                                    style={{ 
                                        borderRadius: '12px', 
                                        transition: 'all 0.2s', 
                                        backgroundColor: activeTab === 'services' ? 'var(--primary-teal)' : 'transparent',
                                        color: activeTab === 'services' ? '#fff' : 'var(--text-color)',
                                        fontWeight: activeTab === 'services' ? 600 : 500
                                    }}
                                >
                                    <Lucide.Cpu size={16} /> Services List
                                </button>
                                <button 
                                    onClick={() => setActiveTab('experience')}
                                    className={`nav-link text-start py-3 px-4 border-0 d-flex align-items-center gap-3 w-100 ${activeTab === 'experience' ? 'text-white fw-bold shadow-sm' : 'text-dark bg-transparent'}`}
                                    style={{ 
                                        borderRadius: '12px', 
                                        transition: 'all 0.2s', 
                                        backgroundColor: activeTab === 'experience' ? 'var(--primary-teal)' : 'transparent',
                                        color: activeTab === 'experience' ? '#fff' : 'var(--text-color)',
                                        fontWeight: activeTab === 'experience' ? 600 : 500
                                    }}
                                >
                                    <Lucide.Layers size={16} /> Career Timeline
                                </button>
                                <button 
                                    onClick={() => setActiveTab('works')}
                                    className={`nav-link text-start py-3 px-4 border-0 d-flex align-items-center gap-3 w-100 ${activeTab === 'works' ? 'text-white fw-bold shadow-sm' : 'text-dark bg-transparent'}`}
                                    style={{ 
                                        borderRadius: '12px', 
                                        transition: 'all 0.2s', 
                                        backgroundColor: activeTab === 'works' ? 'var(--primary-teal)' : 'transparent',
                                        color: activeTab === 'works' ? '#fff' : 'var(--text-color)',
                                        fontWeight: activeTab === 'works' ? 600 : 500
                                    }}
                                >
                                    <Lucide.Layers size={16} /> Works / Portfolio
                                </button>
                                <button 
                                    onClick={() => setActiveTab('testimonials')}
                                    className={`nav-link text-start py-3 px-4 border-0 d-flex align-items-center gap-3 w-100 ${activeTab === 'testimonials' ? 'text-white fw-bold shadow-sm' : 'text-dark bg-transparent'}`}
                                    style={{ 
                                        borderRadius: '12px', 
                                        transition: 'all 0.2s', 
                                        backgroundColor: activeTab === 'testimonials' ? 'var(--primary-teal)' : 'transparent',
                                        color: activeTab === 'testimonials' ? '#fff' : 'var(--text-color)',
                                        fontWeight: activeTab === 'testimonials' ? 600 : 500
                                    }}
                                >
                                    <Lucide.Layers size={16} /> Testimonials
                                </button>
                            </nav>

                            <div className="mt-5 pt-4 border-top border-secondary border-opacity-10 px-3">
                                <button onClick={handleSave} className="btn w-100 py-3 fw-bold text-white d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '30px', backgroundColor: 'var(--primary-coral)' }}>
                                    <Lucide.Save size={18} /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Editor Content Area */}
                    <div className="col-lg-9">
                        <div className="card p-5 border-0 text-start shadow-sm" style={{ borderRadius: '24px', minHeight: '500px' }}>
                            
                            {/* TAB: HERO SECTION */}
                            {activeTab === 'hero' && (
                                <section>
                                    
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-4">
                                            <label className="form-label text-white-50 small">Developer Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.hero_data.name}
                                                onChange={(e) => handleHeroChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label text-white-50 small">Experience Value</label>
                                            <input 
                                                type="number" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.hero_data.experienceYears}
                                                onChange={(e) => handleHeroChange('experienceYears', parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label text-white-50 small">Experience Unit</label>
                                            <select 
                                                className="form-select bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.hero_data.experienceUnit || 'Years'}
                                                onChange={(e) => handleHeroChange('experienceUnit', e.target.value)}
                                            >
                                                <option value="Years">Years</option>
                                                <option value="Months">Months</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small">Public Contact Email</label>
                                            <input 
                                                type="email" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.hero_data.email}
                                                onChange={(e) => handleHeroChange('email', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small">Contact Phone Number</label>
                                            <input 
                                                type="text" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.hero_data.phone}
                                                onChange={(e) => handleHeroChange('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-white-50 small">Hero Title (Greeting Headline)</label>
                                        <input 
                                            type="text" 
                                            className="form-control bg-dark border-secondary text-white py-3 px-4" 
                                            style={{ borderRadius: '10px' }}
                                            value={portfolioData.hero_data.title}
                                            onChange={(e) => handleHeroChange('title', e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-white-50 small">Hero Subtitle (Editorial Description)</label>
                                        <input 
                                            type="text" 
                                            className="form-control bg-dark border-secondary text-white py-3 px-4" 
                                            style={{ borderRadius: '10px' }}
                                            value={portfolioData.hero_data.subtitle}
                                            onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-white-50 small">Developer Description Biography</label>
                                        <textarea 
                                            rows={2}
                                            className="form-control bg-dark border-secondary text-white py-3 px-4" 
                                            style={{ borderRadius: '10px' }}
                                            value={portfolioData.hero_data.description}
                                            onChange={(e) => handleHeroChange('description', e.target.value)}
                                        />
                                    </div>

                                    <h4 className="h5 text-white fw-bold mb-3 mt-5 border-top border-secondary border-opacity-10 pt-4">Social Network Links</h4>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small">GitHub Link</label>
                                            <input 
                                                type="url" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.contactLinks.github}
                                                onChange={(e) => handleContactChange('github', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-white-50 small">LinkedIn Link</label>
                                            <input 
                                                type="url" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.contactLinks.linkedin}
                                                onChange={(e) => handleContactChange('linkedin', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-white-50 small">Office Address</label>
                                            <input 
                                                type="text" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.contactLinks.address}
                                                onChange={(e) => handleContactChange('address', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-white-50 small">Resume Download Link</label>
                                            <input 
                                                type="text" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.contactLinks.resume}
                                                onChange={(e) => handleContactChange('resume', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-white-50 small">WhatsApp Link ("Start by saying hi" URL)</label>
                                            <input 
                                                type="text" 
                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                style={{ borderRadius: '8px' }}
                                                value={portfolioData.contactLinks.whatsapp || ''}
                                                onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* TAB: SERVICES */}
                            {activeTab === 'services' && (
                                <section>
                                    <h3 className="h4 text-white fw-bold mb-4">Manage Services Stack</h3>
                                    
                                    <div className="d-flex flex-column gap-3 mb-5">
                                        {portfolioData.services_data.map((service, index) => (
                                            <div key={index} className="card p-3 bg-dark bg-opacity-30 border-secondary border-opacity-40 d-flex flex-row align-items-center gap-3" style={{ borderRadius: '16px' }}>
                                                <div className="flex-grow-1 row g-2">
                                                    <div className="col-md-4">
                                                        <label className="form-label text-white-50 small">Service Title</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={service.title}
                                                            onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label text-white-50 small">Projects Count</label>
                                                        <input 
                                                            type="number" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={service.projectsCount}
                                                            onChange={(e) => handleServiceChange(index, 'projectsCount', parseInt(e.target.value) || 0)}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label text-white-50 small">Icon</label>
                                                        <select 
                                                            className="form-select bg-dark border-secondary text-white py-2"
                                                            style={{ borderRadius: '8px' }}
                                                            value={service.iconName}
                                                            onChange={(e) => handleServiceChange(index, 'iconName', e.target.value)}
                                                        >
                                                            {AVAILABLE_ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className="form-label text-white-50 small">Color Theme</label>
                                                        <select 
                                                            className="form-select bg-dark border-secondary text-white py-2"
                                                            style={{ borderRadius: '8px' }}
                                                            value={service.color}
                                                            onChange={(e) => handleServiceChange(index, 'color', e.target.value)}
                                                        >
                                                            <option value="teal">Teal Green</option>
                                                            <option value="yellow">Yellow</option>
                                                            <option value="coral">Coral Orange</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleRemoveService(index)} className="btn btn-sm btn-outline-danger mt-3 align-self-end py-2 px-3" style={{ borderRadius: '8px' }}>
                                                    <Lucide.Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add New Service */}
                                    <div className="card p-4 border-secondary border-opacity-30" style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.01)' }}>
                                        <h4 className="h5 text-white fw-bold mb-3"><Lucide.Plus size={18} className="text-info" /> Add New Service</h4>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Service Title"
                                                    value={newService.title}
                                                    onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input 
                                                    type="number" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Projects Completed"
                                                    value={newService.projectsCount}
                                                    onChange={(e) => setNewService(prev => ({ ...prev, projectsCount: parseInt(e.target.value) || 0 }))}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <select 
                                                    className="form-select bg-dark border-secondary text-white py-2"
                                                    style={{ borderRadius: '8px' }}
                                                    value={newService.iconName}
                                                    onChange={(e) => setNewService(prev => ({ ...prev, iconName: e.target.value }))}
                                                >
                                                    {AVAILABLE_ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <select 
                                                    className="form-select bg-dark border-secondary text-white py-2"
                                                    style={{ borderRadius: '8px' }}
                                                    value={newService.color}
                                                    onChange={(e) => setNewService(prev => ({ ...prev, color: e.target.value }))}
                                                >
                                                    <option value="teal">Teal Green</option>
                                                    <option value="yellow">Yellow</option>
                                                    <option value="coral">Coral Orange</option>
                                                </select>
                                            </div>
                                            <div className="col-12 text-end mt-3">
                                                <button onClick={handleAddService} className="btn btn-info px-4 text-dark fw-bold" style={{ borderRadius: '8px' }}>
                                                    Add Service
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* TAB: EXPERIENCE */}
                            {activeTab === 'experience' && (
                                <section>
                                    <h3 className="h4 text-white fw-bold mb-4">Manage Career Timeline</h3>
                                    
                                    <div className="d-flex flex-column gap-4 mb-5">
                                        {portfolioData.experience_data.map((exp, index) => (
                                            <div key={index} className="card p-3 bg-dark bg-opacity-30 border-secondary border-opacity-40" style={{ borderRadius: '16px' }}>
                                                <div className="row g-3 mb-2">
                                                    <div className="col-md-6">
                                                        <label className="form-label text-white-50 small">Company / Employer</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={exp.company}
                                                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label text-white-50 small">Job Role Title</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={exp.role}
                                                            onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label text-white-50 small">Duration Dates</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={exp.dates}
                                                            placeholder="e.g. 2023 - 2024"
                                                            onChange={(e) => handleExperienceChange(index, 'dates', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label text-white-50 small">Job Description</label>
                                                    <textarea 
                                                        rows={2}
                                                        className="form-control bg-dark border-secondary text-white py-2" 
                                                        style={{ borderRadius: '8px' }}
                                                        value={exp.description}
                                                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                                    />
                                                </div>
                                                <div className="text-end">
                                                    <button onClick={() => handleRemoveExperience(index)} className="btn btn-sm btn-outline-danger px-3 py-2" style={{ borderRadius: '8px' }}>
                                                        <Lucide.Trash2 size={16} /> Delete Entry
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add New Experience */}
                                    <div className="card p-4 border-secondary border-opacity-30" style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.01)' }}>
                                        <h4 className="h5 text-white fw-bold mb-3"><Lucide.Plus size={18} className="text-info" /> Add New Career Entry</h4>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Company Name"
                                                    value={newExperience.company}
                                                    onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Job Role Title"
                                                    value={newExperience.role}
                                                    onChange={(e) => setNewExperience(prev => ({ ...prev, role: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Dates (e.g. 2024 - Present)"
                                                    value={newExperience.dates}
                                                    onChange={(e) => setNewExperience(prev => ({ ...prev, dates: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <textarea 
                                                    rows={2}
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Brief role responsibilities and accomplishments"
                                                    value={newExperience.description}
                                                    onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-12 text-end mt-3">
                                                <button onClick={handleAddExperience} className="btn btn-info px-4 text-dark fw-bold" style={{ borderRadius: '8px' }}>
                                                    Add Experience
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* TAB: WORKS */}
                            {activeTab === 'works' && (
                                <section>
                                    <h3 className="h4 text-white fw-bold mb-4">Manage Works & Portfolio</h3>
                                    
                                    <div className="row g-3 mb-5">
                                        {portfolioData.works_data.map((work, index) => (
                                            <div key={index} className="col-md-6">
                                                <div className="card p-3 bg-dark bg-opacity-30 border-secondary border-opacity-40" style={{ borderRadius: '16px' }}>
                                                    <div className="mb-2">
                                                        <label className="form-label text-white-50 small">Project Title</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={work.title}
                                                            onChange={(e) => handleWorkChange(index, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label text-white-50 small">Category</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={work.category}
                                                            onChange={(e) => handleWorkChange(index, 'category', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="row g-2 mb-3">
                                                        <div className="col-6">
                                                            <label className="form-label text-white-50 small">Color Card Theme</label>
                                                            <select 
                                                                className="form-select bg-dark border-secondary text-white py-2"
                                                                style={{ borderRadius: '8px' }}
                                                                value={work.colorTheme}
                                                                onChange={(e) => handleWorkChange(index, 'colorTheme', e.target.value)}
                                                            >
                                                                <option value="yellow">Yellow</option>
                                                                <option value="teal">Teal Green</option>
                                                                <option value="mint">Mint Green</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="form-label text-white-50 small">Image Path</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control bg-dark border-secondary text-white py-2" 
                                                                style={{ borderRadius: '8px' }}
                                                                value={work.imageUrl}
                                                                onChange={(e) => handleWorkChange(index, 'imageUrl', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <button onClick={() => handleRemoveWork(index)} className="btn btn-sm btn-outline-danger px-3 py-2" style={{ borderRadius: '8px' }}>
                                                            <Lucide.Trash2 size={16} /> Remove Project
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add New Work */}
                                    <div className="card p-4 border-secondary border-opacity-30" style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.01)' }}>
                                        <h4 className="h5 text-white fw-bold mb-3"><Lucide.Plus size={18} className="text-info" /> Add New Project</h4>
                                        <div className="row g-3">
                                            <div className="col-md-5">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Project Title"
                                                    value={newWork.title}
                                                    onChange={(e) => setNewWork(prev => ({ ...prev, title: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Category"
                                                    value={newWork.category}
                                                    onChange={(e) => setNewWork(prev => ({ ...prev, category: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <select 
                                                    className="form-select bg-dark border-secondary text-white py-2"
                                                    style={{ borderRadius: '8px' }}
                                                    value={newWork.colorTheme}
                                                    onChange={(e) => setNewWork(prev => ({ ...prev, colorTheme: e.target.value }))}
                                                >
                                                    <option value="yellow">Yellow</option>
                                                    <option value="teal">Teal Green</option>
                                                    <option value="mint">Mint Green</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Image path"
                                                    value={newWork.imageUrl}
                                                    onChange={(e) => setNewWork(prev => ({ ...prev, imageUrl: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-12 text-end mt-3">
                                                <button onClick={handleAddWork} className="btn btn-info px-4 text-dark fw-bold" style={{ borderRadius: '8px' }}>
                                                    Add Project
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* TAB: TESTIMONIALS */}
                            {activeTab === 'testimonials' && (
                                <section>
                                    <h3 className="h4 text-white fw-bold mb-4">Manage Testimonials</h3>
                                    
                                    <div className="d-flex flex-column gap-4 mb-5">
                                        {portfolioData.testimonials_data.map((test, index) => (
                                            <div key={index} className="card p-3 bg-dark bg-opacity-30 border-secondary border-opacity-40" style={{ borderRadius: '16px' }}>
                                                <div className="row g-3 mb-2">
                                                    <div className="col-md-6">
                                                        <label className="form-label text-white-50 small">Author Name</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={test.name}
                                                            onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label text-white-50 small">Author Role</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control bg-dark border-secondary text-white py-2" 
                                                            style={{ borderRadius: '8px' }}
                                                            value={test.role}
                                                            onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label text-white-50 small">Client Quote</label>
                                                    <textarea 
                                                        rows={2}
                                                        className="form-control bg-dark border-secondary text-white py-2" 
                                                        style={{ borderRadius: '8px' }}
                                                        value={test.quote}
                                                        onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)}
                                                    />
                                                </div>
                                                <div className="text-end">
                                                    <button onClick={() => handleRemoveTestimonial(index)} className="btn btn-sm btn-outline-danger px-3 py-2" style={{ borderRadius: '8px' }}>
                                                        <Lucide.Trash2 size={16} /> Delete Testimonial
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add New Testimonial */}
                                    <div className="card p-4 border-secondary border-opacity-30" style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.01)' }}>
                                        <h4 className="h5 text-white fw-bold mb-3"><Lucide.Plus size={18} className="text-info" /> Add New Testimonial</h4>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Client Name"
                                                    value={newTestimonial.name}
                                                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input 
                                                    type="text" 
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Client Role / Title"
                                                    value={newTestimonial.role}
                                                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <textarea 
                                                    rows={2}
                                                    className="form-control bg-dark border-secondary text-white py-2" 
                                                    style={{ borderRadius: '8px' }}
                                                    placeholder="Quote description"
                                                    value={newTestimonial.quote}
                                                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, quote: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-12 text-end mt-3">
                                                <button onClick={handleAddTestimonial} className="btn btn-info px-4 text-dark fw-bold" style={{ borderRadius: '8px' }}>
                                                    Add Testimonial
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminSection;
