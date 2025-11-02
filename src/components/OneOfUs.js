import React, { useEffect, useRef } from 'react';
import '../styles/App.css';

const OneOfUs = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, []);

    return (
        <div className="landing-container">
            {/* Background Image */}
            <div className="bg-image"></div>
            
            {/* Message Text */}
            <div className="message-container">
                <h1 className="message-text glitch-text" data-text="SO YOU ONE OF US">
                    SO YOU ONE OF US
                </h1>
            </div>

            {/* Background Music */}
            <audio ref={audioRef} id="bgMusic" autoPlay loop>
                <source src={process.env.PUBLIC_URL + "/bgmusic.mp3"} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default OneOfUs;


