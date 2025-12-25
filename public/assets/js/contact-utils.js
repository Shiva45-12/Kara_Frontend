// Contact Utilities - Call and Location Functionality
(function() {
    const PHONE_NUMBER = '+917991334444';
    const LOCATION_COORDS = 'Kara+Group+Alambagh+Lucknow';
    const LOCATION_NAME = 'Kara Group, Alambagh';

    // Make phone numbers clickable
    function initializePhoneLinks() {
        document.querySelectorAll('[data-phone]').forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'tel:' + PHONE_NUMBER;
            });
        });

        // Also handle existing phone text
        document.querySelectorAll('a[href*="tel:"]').forEach(link => {
            link.href = 'tel:' + PHONE_NUMBER;
        });
    }

    // Make locations clickable
    function initializeLocationLinks() {
        document.querySelectorAll('[data-location]').forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(`https://maps.google.com/?q=${LOCATION_COORDS}`, '_blank');
            });
        });

        // Also handle existing location links
        document.querySelectorAll('a[href*="maps.google.com"]').forEach(link => {
            link.href = `https://maps.google.com/?q=${LOCATION_COORDS}`;
            link.target = '_blank';
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializePhoneLinks();
            initializeLocationLinks();
        });
    } else {
        initializePhoneLinks();
        initializeLocationLinks();
    }

    // Export for manual use
    window.ContactUtils = {
        callClient: function() {
            window.location.href = 'tel:' + PHONE_NUMBER;
        },
        openLocation: function() {
            window.open(`https://maps.google.com/?q=${LOCATION_COORDS}`, '_blank');
        },
        getPhoneNumber: function() {
            return PHONE_NUMBER;
        },
        getLocationName: function() {
            return LOCATION_NAME;
        }
    };
})();
