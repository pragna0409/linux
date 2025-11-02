// Registration Handler Utility
// Saves registrations to localStorage and provides JSON file download functionality

// Function to check if registration already exists
export function isDuplicateRegistration(formData) {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const email = formData.email.toLowerCase().trim();
    const phone = formData.phone.trim();
    
    return registrations.some(reg => 
        reg.email.toLowerCase().trim() === email || 
        reg.phone.trim() === phone
    );
}

// Function to save registration to localStorage
export function saveRegistration(formData, os = null) {
    // Check for duplicates
    if (isDuplicateRegistration(formData)) {
        throw new Error('DUPLICATE');
    }
    
    // Get existing registrations from localStorage
    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Add timestamp if not present
    if (!formData.timestamp) {
        formData.timestamp = new Date().toISOString();
    }
    
    // Add OS field if provided
    if (os) {
        formData.os = os;
    }
    
    // Add new registration
    registrations.push(formData);
    
    // Save to localStorage only (no auto-download)
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    return registrations;
}

// Function to download/update registrations.json file
function downloadRegistrationsJSON(registrations) {
    const jsonStr = JSON.stringify(registrations, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to load registrations from JSON file
export function loadRegistrationsFromFile(fileInput) {
    return new Promise((resolve, reject) => {
        const file = fileInput.files[0];
        if (!file) {
            reject('No file selected');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const registrations = JSON.parse(e.target.result);
                // Save to localStorage
                localStorage.setItem('registrations', JSON.stringify(registrations));
                resolve(registrations);
            } catch (error) {
                reject('Invalid JSON file: ' + error.message);
            }
        };
        reader.onerror = function() {
            reject('Error reading file');
        };
        reader.readAsText(file);
    });
}

// Function to get all registrations from localStorage
export function getAllRegistrations() {
    return JSON.parse(localStorage.getItem('registrations') || '[]');
}

// Function to export registrations to JSON file
export function exportRegistrationsToJSON() {
    const registrations = getAllRegistrations();
    if (registrations.length === 0) {
        alert('No registrations to export.');
        return;
    }
    downloadRegistrationsJSON(registrations);
}

