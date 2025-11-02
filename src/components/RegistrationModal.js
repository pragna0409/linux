import React, { useState } from 'react';
import { saveRegistration } from '../utils/registrationHandler';

const RegistrationModal = ({ os, onClose, onAdminLogin, showModal, onShowBye }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const trimmedData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            timestamp: new Date().toISOString()
        };

        // Check if it's admin credentials
        const isAdmin = 
            trimmedData.name.toLowerCase() === 'pragna s' &&
            trimmedData.email.toLowerCase() === 'pragnabharadwaj09@gmail.com' &&
            trimmedData.phone === '8310438668';

        if (isAdmin) {
            // Call admin login handler
            onAdminLogin(trimmedData);
        } else {
            try {
                // Save student registration (will throw error if duplicate)
                await saveRegistration(trimmedData, os);
                
                // Close modal and show bye image immediately
                onClose();
                setFormData({ name: '', email: '', phone: '' });
                
                // Call parent component to show bye overlay
                if (onShowBye) {
                    onShowBye();
                }
            } catch (error) {
                if (error.message === 'DUPLICATE') {
                    setError('This email or phone number is already registered!');
                } else {
                    setError('An error occurred. Please try again.');
                }
            }
        }
    };

    if (!showModal) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title glitch-text" data-text="EVENT REGISTRATION">
                                EVENT REGISTRATION
                            </h2>
                            <button className="close-button" onClick={onClose}>&times;</button>
                        </div>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            {error && (
                                <div style={{
                                    color: '#ff4444',
                                    fontSize: '0.9rem',
                                    padding: '10px',
                                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                    borderRadius: '8px',
                                    textAlign: 'center'
                                }}>
                                    {error}
                                </div>
                            )}
                            <button type="submit" className="submit-button">
                                <span>REGISTER</span>
                            </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistrationModal;

