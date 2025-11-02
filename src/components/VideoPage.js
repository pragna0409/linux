import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';
import ByeOverlay from './ByeOverlay';
import '../styles/App.css';

const VideoPage = ({ videoFile, os }) => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [showBye, setShowBye] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        const video = videoRef.current;

        if (audio) {
            audio.volume = 0.3;
            audio.play().catch(error => {
                console.log('Audio autoplay prevented:', error);
            });
        }

        if (video) {
            video.play().catch(error => {
                console.log('Video autoplay prevented:', error);
            });

            // Show registration modal when video ends
            video.addEventListener('ended', () => {
                setShowModal(true);
            });
        }
    }, []);

    const handleAdminLogin = (formData) => {
        navigate(`/dashboard?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`);
    };

    const handleShowBye = () => {
        setShowBye(true);
        // Close window/tab after bye image is shown for 7 seconds (static)
        setTimeout(() => {
            // Try multiple methods to close the tab
            // Method 1: Direct close
            window.close();
            
            // Method 2: Open blank page and close
            setTimeout(() => {
                window.location.href = 'about:blank';
                setTimeout(() => {
                    window.close();
                    // If still open, show message
                    if (!document.hidden) {
                        alert('Thank you for registering! This tab will close automatically.');
                        // Final attempt
                        setTimeout(() => {
                            window.close();
                        }, 1000);
                    }
                }, 100);
            }, 100);
        }, 7000);
    };

    return (
        <div className="landing-container">
            {/* Background Image */}
            <div className="bg-image"></div>
            
            {/* Video Container */}
            <div className="video-container">
                <video 
                    ref={videoRef}
                    id={`${os}Video`}
                    autoPlay 
                    playsInline
                >
                    <source src={process.env.PUBLIC_URL + `/${videoFile}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Registration Popup Modal */}
            {showModal && (
                <RegistrationModal 
                    os={os}
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    onAdminLogin={handleAdminLogin}
                    onShowBye={handleShowBye}
                />
            )}

            {/* Bye Overlay */}
            {showBye && <ByeOverlay />}
            
            {/* Background Music */}
            <audio ref={audioRef} id="bgMusic" autoPlay loop>
                <source src={process.env.PUBLIC_URL + "/bgmusic.mp3"} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default VideoPage;

