import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Registration = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [showGlitch, setShowGlitch] = useState(false);
    const [selectedOS, setSelectedOS] = useState(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, []);

    const handlePillClick = (os) => {
        setSelectedOS(os.toUpperCase());
        setShowGlitch(true);
        
        // Navigate after glitch animation completes
        setTimeout(() => {
            if (os === 'linux') {
                navigate('/linux');
            } else {
                navigate('/windows');
            }
        }, 800);
    };

    return (
        <div className="register-container">
            {/* Background Image */}
            <div 
                className="register-bg-image"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/bg.png)`
                }}
            ></div>
            
            {/* Overlay 1: distro.png */}
            <div className="register-overlay1-container">
                <img 
                    src={process.env.PUBLIC_URL + "/distro.png"} 
                    alt="Distro" 
                    className="register-overlay1-image" 
                />
            </div>
            
            {/* Question Text */}
            <div className="question-text-container">
                <h2 className="question-text glitch-text" data-text="Which operating system do you use?">
                    Which operating system<br />do you use?
                </h2>
            </div>
            
            {/* Overlay 2: Red Pill and Blue Pill Buttons */}
            <div className="register-pills-container">
                <button 
                    className="pill-button red-pill" 
                    onClick={() => handlePillClick('linux')}
                >
                    <span className="pill-text">LINUX</span>
                    <img 
                        src={process.env.PUBLIC_URL + "/redpill.png"} 
                        alt="Red Pill - Linux" 
                        className="pill-image" 
                    />
                </button>
                <button 
                    className="pill-button blue-pill" 
                    onClick={() => handlePillClick('windows')}
                >
                    <span className="pill-text">WINDOWS</span>
                    <img 
                        src={process.env.PUBLIC_URL + "/bluepill.png"} 
                        alt="Blue Pill - Windows" 
                        className="pill-image" 
                    />
                </button>
            </div>

            {/* Glitch Overlay */}
            {showGlitch && (
                <div className="glitch-transition-overlay">
                    <div className="glitch-transition-text" data-text={selectedOS}>{selectedOS}</div>
                </div>
            )}

            {/* Background Music */}
            <audio ref={audioRef} id="bgMusic" autoPlay loop>
                <source src={process.env.PUBLIC_URL + "/bgmusic.mp3"} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Registration;

