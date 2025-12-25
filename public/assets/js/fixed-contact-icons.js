// Fixed Contact Icons Script
// Automatically adds call and WhatsApp icons to all pages

(function() {
    'use strict';
    
    // Configuration
    const config = {
        phoneNumber: '+917991334444',
        whatsappNumber: '+917523082381',
        whatsappMessage: 'Contact%20for%20Free%20Consultation'
    };
    
    // Create fixed contact icons
    function createFixedContactIcons() {
        // Check if icons already exist
        if (document.querySelector('.fixed-contact-icons')) {
            return;
        }
        
        // Create container
        const container = document.createElement('div');
        container.className = 'fixed-contact-icons';
        
        // Create call icon
        const callIcon = document.createElement('a');
        callIcon.href = `tel:${config.phoneNumber}`;
        callIcon.className = 'contact-icon call-icon';
        callIcon.innerHTML = '<i class="fa fa-phone"></i>';
        callIcon.setAttribute('aria-label', 'Call us');
        
        // Create WhatsApp icon
        const whatsappIcon = document.createElement('a');
        whatsappIcon.href = `https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${config.whatsappMessage}`;
        whatsappIcon.className = 'contact-icon whatsapp-icon';
        whatsappIcon.target = '_blank';
        whatsappIcon.innerHTML = '<i class="fa fa-whatsapp"></i>';
        whatsappIcon.setAttribute('aria-label', 'WhatsApp us');
        
        // Add icons to container
        container.appendChild(callIcon);
        container.appendChild(whatsappIcon);
        
        // Add container to body
        document.body.appendChild(container);
    }
    
    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createFixedContactIcons);
        } else {
            createFixedContactIcons();
        }
    }
    
    // Start initialization
    init();
    
})();