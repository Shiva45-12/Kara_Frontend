// Clickable Phone Numbers and Locations Utility
// This script makes all phone numbers and locations clickable across the website

(function() {
    'use strict';

    // Phone number patterns to match
    const phonePatterns = [
        /(\+91\s?)?[789]\d{9}/g,
        /(\+91\s?)?[0-9]{10}/g,
        /(\+91[\s-]?)?[0-9]{4}[\s-]?[0-9]{6}/g
    ];

    // Location patterns and their corresponding Google Maps URLs
    const locationMappings = {
        'Kara Group, Alambagh': 'https://maps.google.com/?q=Kara+Group+Alambagh+Lucknow',
        'Alambagh': 'https://maps.google.com/?q=Alambagh+Lucknow',
        'Lucknow': 'https://maps.google.com/?q=Lucknow+Uttar+Pradesh',
        'Unnao': 'https://maps.google.com/?q=Unnao+Uttar+Pradesh',
        'Prayagraj': 'https://maps.google.com/?q=Prayagraj+Uttar+Pradesh',
        'Barabanki': 'https://maps.google.com/?q=Barabanki+Uttar+Pradesh',
        'Ayodhya': 'https://maps.google.com/?q=Ayodhya+Uttar+Pradesh',
        'Varanasi': 'https://maps.google.com/?q=Varanasi+Uttar+Pradesh',
        'Kanpur': 'https://maps.google.com/?q=Kanpur+Uttar+Pradesh',
        'Rampur Bhagan Ayodhya': 'https://maps.google.com/?q=Rampur+Bhagan+Ayodhya+Uttar+Pradesh'
    };

    // Function to make phone numbers clickable
    function makePhoneNumbersClickable() {
        const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, li, td');
        
        elements.forEach(element => {
            // Skip if element already has clickable phone numbers or is already a link
            if (element.querySelector('a[href^="tel:"]') || element.tagName === 'A') {
                return;
            }

            let html = element.innerHTML;
            let hasChanges = false;

            phonePatterns.forEach(pattern => {
                html = html.replace(pattern, (match) => {
                    // Clean the phone number
                    const cleanNumber = match.replace(/\s+/g, '').replace(/[^\d+]/g, '');
                    hasChanges = true;
                    return `<a href="tel:${cleanNumber}" style="color: #53a92c; text-decoration: none; font-weight: 600; cursor: pointer;" 
                            onmouseover="this.style.textDecoration='underline'" 
                            onmouseout="this.style.textDecoration='none'"
                            title="Click to call ${match}">${match}</a>`;
                });
            });

            if (hasChanges) {
                element.innerHTML = html;
            }
        });
    }

    // Function to make locations clickable
    function makeLocationsClickable() {
        const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, li, td');
        
        elements.forEach(element => {
            // Skip if element already has clickable locations or is already a link
            if (element.querySelector('a[href*="maps.google"]') || element.tagName === 'A') {
                return;
            }

            let html = element.innerHTML;
            let hasChanges = false;

            // Sort locations by length (longest first) to avoid partial matches
            const sortedLocations = Object.keys(locationMappings).sort((a, b) => b.length - a.length);

            sortedLocations.forEach(location => {
                const regex = new RegExp(`\\b${location.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
                html = html.replace(regex, (match) => {
                    hasChanges = true;
                    return `<a href="${locationMappings[location]}" target="_blank" 
                            style="color: #53a92c; text-decoration: none; font-weight: 600; cursor: pointer;" 
                            onmouseover="this.style.textDecoration='underline'" 
                            onmouseout="this.style.textDecoration='none'"
                            title="Click to view ${match} on Google Maps">${match}</a>`;
                });
            });

            if (hasChanges) {
                element.innerHTML = html;
            }
        });
    }

    // Function to handle elements with data attributes
    function handleDataAttributes() {
        // Handle phone elements with data-phone attribute
        const phoneElements = document.querySelectorAll('[data-phone]');
        phoneElements.forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                const phoneText = this.textContent || this.innerText;
                const phoneMatch = phoneText.match(/(\+91\s?)?[789]\d{9}/);
                if (phoneMatch) {
                    const cleanNumber = phoneMatch[0].replace(/\s+/g, '');
                    window.location.href = `tel:${cleanNumber}`;
                }
            });
        });

        // Handle location elements with data-location attribute
        const locationElements = document.querySelectorAll('[data-location]');
        locationElements.forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                const locationText = this.textContent || this.innerText;
                const location = Object.keys(locationMappings).find(loc => 
                    locationText.toLowerCase().includes(loc.toLowerCase())
                );
                if (location) {
                    window.open(locationMappings[location], '_blank');
                }
            });
        });
    }

    // Initialize the utility
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(() => {
                    makePhoneNumbersClickable();
                    makeLocationsClickable();
                    handleDataAttributes();
                }, 100);
            });
        } else {
            setTimeout(() => {
                makePhoneNumbersClickable();
                makeLocationsClickable();
                handleDataAttributes();
            }, 100);
        }

        // Re-run after dynamic content loads
        setTimeout(() => {
            makePhoneNumbersClickable();
            makeLocationsClickable();
            handleDataAttributes();
        }, 2000);
    }

    // Start the utility
    init();

    // Export functions for manual use if needed
    window.ClickableUtils = {
        makePhoneNumbersClickable: makePhoneNumbersClickable,
        makeLocationsClickable: makeLocationsClickable,
        handleDataAttributes: handleDataAttributes,
        refresh: function() {
            makePhoneNumbersClickable();
            makeLocationsClickable();
            handleDataAttributes();
        }
    };

})();