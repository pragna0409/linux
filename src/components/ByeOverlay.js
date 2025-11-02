import React from 'react';
import '../styles/App.css';

const ByeOverlay = () => {
    return (
        <div className="bye-overlay">
            <img 
                src={process.env.PUBLIC_URL + "/bye.jpg"} 
                alt="Goodbye" 
                className="bye-image" 
            />
        </div>
    );
};

export default ByeOverlay;

