import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllRegistrations, loadRegistrationsFromFile, exportRegistrationsToJSON } from '../utils/registrationHandler';
import '../styles/App.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Check credentials
        const name = searchParams.get('name') || '';
        const email = searchParams.get('email') || '';
        const phone = searchParams.get('phone') || '';

        const isAdmin = 
            name.toLowerCase() === 'pragna s' &&
            email.toLowerCase() === 'pragnabharadwaj09@gmail.com' &&
            phone === '8310438668';

        if (!isAdmin) {
            // Show login form
            setLoading(false);
        } else {
            // Fetch directly from Supabase
            loadRegistrationsFromSupabase();
            // Auto-refresh every 30 seconds
            const interval = setInterval(() => {
                loadRegistrationsFromSupabase();
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [searchParams]);

    const loadRegistrationsFromSupabase = async () => {
        setLoading(true);
        setError('');
        try {
            // Fetch directly from Supabase
            const regs = await getAllRegistrations();
            setRegistrations(regs);
            setLoading(false);
            setError('');
            if (regs.length === 0) {
                setError('No registrations found.');
            }
        } catch (err) {
            setLoading(false);
            setError('Error loading registrations from Supabase: ' + err.message);
            console.error('Error fetching from Supabase:', err);
        }
    };

    const handleImport = async (e) => {
        try {
            const regs = await loadRegistrationsFromFile(e.target);
            alert('JSON file imported successfully! ' + regs.length + ' registration(s) imported to Supabase.');
            await loadRegistrationsFromSupabase();
            e.target.value = '';
        } catch (err) {
            alert('Error importing JSON file: ' + err);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();

        if (name.toLowerCase() === 'pragna s' &&
            email.toLowerCase() === 'pragnabharadwaj09@gmail.com' &&
            phone === '8310438668') {
            navigate(`/dashboard?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
        } else {
            alert('Invalid credentials. Access denied.');
        }
    };

    const name = searchParams.get('name') || '';
    const email = searchParams.get('email') || '';
    const phone = searchParams.get('phone') || '';
    const isAdmin = 
        name.toLowerCase() === 'pragna s' &&
        email.toLowerCase() === 'pragnabharadwaj09@gmail.com' &&
        phone === '8310438668';

    if (!isAdmin) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">ADMIN LOGIN</h1>
                    <form id="loginForm" onSubmit={handleLogin} style={{
                        maxWidth: '400px',
                        margin: '0 auto',
                        padding: '40px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '10px'
                    }}>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff', fontWeight: 'bold' }}>
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                required 
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    color: '#ffffff',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff', fontWeight: 'bold' }}>
                                Email
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                required 
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    color: '#ffffff',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ffffff', fontWeight: 'bold' }}>
                                Phone Number
                            </label>
                            <input 
                                type="tel" 
                                name="phone" 
                                required 
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    color: '#ffffff',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                        <button type="submit" className="refresh-button" style={{ width: '100%' }}>
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title glitch-text" data-text="ADMIN DASHBOARD">
                    ADMIN DASHBOARD
                </h1>
                <div className="stats">
                    <div className="stat-card">
                        <div className="stat-number">{registrations.length}</div>
                        <div className="stat-label">Total Registrations</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                        className="refresh-button" 
                        onClick={loadRegistrationsFromSupabase}
                    >
                        REFRESH
                    </button>
                    <button 
                        className="refresh-button" 
                        onClick={async () => {
                            await exportRegistrationsToJSON();
                        }}
                    >
                        EXPORT JSON
                    </button>
                    <button 
                        className="refresh-button" 
                        onClick={() => fileInputRef.current?.click()}
                    >
                        IMPORT JSON
                    </button>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".json" 
                        style={{ display: 'none' }} 
                        onChange={handleImport} 
                    />
                </div>
            </div>

            <div className="table-container">
                {loading && <div className="loading">Loading registrations...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && registrations.length > 0 && (
                    <table id="registrationsTable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>OS</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg, index) => {
                                const date = reg.timestamp ? new Date(reg.timestamp).toLocaleString() : 'N/A';
                                const os = reg.os || 'N/A';
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{reg.name}</td>
                                        <td>{reg.email}</td>
                                        <td>{reg.phone}</td>
                                        <td>{os.toUpperCase()}</td>
                                        <td>{date}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;


