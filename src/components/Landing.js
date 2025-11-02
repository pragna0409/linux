import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Landing = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);

    useEffect(() => {
        // Ensure music plays
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, []);

    const handleStart = () => {
        navigate('/register');
    };

    return (
        <div className="landing-container">
            {/* Background Image */}
            <div 
                className="bg-image"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/bg.png)`
                }}
            ></div>
            
            {/* Welcome Text (behind overlay) */}
            <div className="welcome-text-behind">
                <h1 className="glitch-text" data-text="WELCOME TO">WELCOME TO</h1>
            </div>
            
            {/* Overlay Image */}
            <div className="overlay-container">
                <img src={process.env.PUBLIC_URL + "/overlay1.png"} alt="Overlay" className="overlay-image" />
            </div>
            
            {/* Welcome Text (in front of overlay) */}
            <div className="welcome-text-front">
                <h2 className="glitch-text" data-text="CIPHER UNIVERSE">CIPHER UNIVERSE</h2>
            </div>
            
            {/* Start Button */}
            <div className="button-container">
                <button className="start-button" onClick={handleStart}>
                    <span>START</span>
                </button>
            </div>

            {/* Background Music */}
            <audio ref={audioRef} id="bgMusic" autoPlay loop>
                <source src={process.env.PUBLIC_URL + "/bgmusic.mp3"} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Landing;


