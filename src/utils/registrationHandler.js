// Registration Handler Utility
// Saves registrations to Supabase database only

import supabase from './supabaseClient';

// Function to check if registration already exists in Supabase
export async function isDuplicateRegistration(formData) {
    const email = formData.email.toLowerCase().trim();
    const phone = formData.phone.trim();
    
    try {
        // Check in Supabase for duplicate email or phone
        const { data, error } = await supabase
            .from('registrations')
            .select('email, phone')
            .or(`email.eq.${email},phone.eq.${phone}`)
            .limit(1);
        
        if (error) {
            console.error('Error checking duplicate in Supabase:', error);
            throw error;
        }
        
        return data && data.length > 0;
    } catch (error) {
        console.error('Error checking duplicate:', error);
        throw error;
    }
}

// Function to save registration to Supabase
export async function saveRegistration(formData, os = null) {
    // Check for duplicates
    const isDuplicate = await isDuplicateRegistration(formData);
    if (isDuplicate) {
        throw new Error('DUPLICATE');
    }
    
    // Prepare registration data
    const registrationData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        os: os || null,
        timestamp: formData.timestamp || new Date().toISOString()
    };
    
    try {
        // Save to Supabase
        const { data, error } = await supabase
            .from('registrations')
            .insert([registrationData])
            .select()
            .single();
        
        if (error) {
            console.error('Error saving to Supabase:', error);
            throw new Error('Failed to save registration: ' + error.message);
        }
        
        return [data];
    } catch (error) {
        console.error('Error saving registration:', error);
        throw error;
    }
}

// Function to get all registrations from Supabase
export async function getAllRegistrations() {
    try {
        // Fetch from Supabase
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('timestamp', { ascending: false });
        
        if (error) {
            console.error('Error fetching from Supabase:', error);
            throw new Error('Failed to fetch registrations: ' + error.message);
        }
        
        return data || [];
    } catch (error) {
        console.error('Error in getAllRegistrations:', error);
        throw error;
    }
}


// Function to load registrations from JSON file and import to Supabase
export async function loadRegistrationsFromFile(fileInput) {
    return new Promise((resolve, reject) => {
        const file = fileInput.files[0];
        if (!file) {
            reject('No file selected');
            return;
        }

        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const registrations = JSON.parse(e.target.result);
                
                if (!Array.isArray(registrations)) {
                    reject('Invalid JSON format. Expected an array of registrations.');
                    return;
                }
                
                // Import registrations to Supabase
                const importPromises = registrations.map(async (reg) => {
                    try {
                        const { data, error } = await supabase
                            .from('registrations')
                            .insert([{
                                name: reg.name,
                                email: reg.email.toLowerCase().trim(),
                                phone: reg.phone.trim(),
                                os: reg.os || null,
                                timestamp: reg.timestamp || new Date().toISOString()
                            }])
                            .select()
                            .single();
                        
                        if (error) {
                            // If duplicate (constraint violation), skip it
                            if (error.code === '23505') {
                                console.log('Skipping duplicate registration:', reg.email);
                                return null;
                            }
                            throw error;
                        }
                        
                        return data;
                    } catch (error) {
                        console.error('Error importing registration:', error);
                        // Skip duplicates and continue
                        if (error.code === '23505') {
                            return null;
                        }
                        throw error;
                    }
                });
                
                const results = await Promise.allSettled(importPromises);
                const imported = results.filter(r => r.status === 'fulfilled' && r.value !== null).map(r => r.value);
                const failed = results.filter(r => r.status === 'rejected').length;
                
                if (failed > 0) {
                    console.warn(`Failed to import ${failed} registration(s)`);
                }
                
                resolve(imported);
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

// Function to export registrations to JSON file
export async function exportRegistrationsToJSON() {
    try {
        const registrations = await getAllRegistrations();
        
        if (registrations.length === 0) {
            alert('No registrations to export.');
            return;
        }
        
        // Download JSON file
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
    } catch (error) {
        alert('Error exporting registrations: ' + error.message);
        console.error('Error exporting registrations:', error);
    }
}
