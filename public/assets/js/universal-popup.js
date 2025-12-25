// Universal Popup System for KARA GROUP
let popupTimeout;
let recurringPopup;
let popupShown = false;

// Configuration
const POPUP_CONFIG = {
    initialDelay: 3000,      // Show popup after 3 seconds
    autoCloseDelay: 8000,    // Auto close after 8 seconds
    recurringInterval: 45000, // Show again every 45 seconds
    maxRecurrences: 3        // Maximum times to show popup
};

let popupCount = 0;

function showUniversalPopup() {
    if (popupCount >= POPUP_CONFIG.maxRecurrences) return;
    
    const popup = document.getElementById('universalPopup');
    const overlay = document.getElementById('universalPopupOverlay');
    
    if (popup && overlay) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        popupShown = true;
        popupCount++;
        
        // Auto close after delay
        popupTimeout = setTimeout(() => {
            closeUniversalPopup();
        }, POPUP_CONFIG.autoCloseDelay);
    }
}

function closeUniversalPopup() {
    const popup = document.getElementById('universalPopup');
    const overlay = document.getElementById('universalPopupOverlay');
    
    if (popup && overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        popupShown = false;
        
        if (popupTimeout) {
            clearTimeout(popupTimeout);
            popupTimeout = null;
        }
    }
}

function initUniversalPopup() {
    // Show initial popup
    setTimeout(() => {
        showUniversalPopup();
    }, POPUP_CONFIG.initialDelay);
    
    // Set up recurring popup
    recurringPopup = setInterval(() => {
        if (!popupShown && popupCount < POPUP_CONFIG.maxRecurrences) {
            showUniversalPopup();
        }
    }, POPUP_CONFIG.recurringInterval);
    
    // Clear timeout when user interacts with form
    const formInputs = document.querySelectorAll('#universalPopupForm input, #universalPopupForm textarea, #universalPopupForm select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (popupTimeout) {
                clearTimeout(popupTimeout);
                popupTimeout = null;
            }
        });
    });
    
    // Handle form submission
    const form = document.getElementById('universalPopupForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your inquiry! We will contact you soon.');
            this.reset();
            closeUniversalPopup();
            // Stop recurring popups after form submission
            if (recurringPopup) {
                clearInterval(recurringPopup);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add popup HTML if it doesn't exist
    if (!document.getElementById('universalPopup')) {
        const popupHTML = `
            <!-- Universal Popup -->
            
            <div id="universalPopupOverlay" onclick="closeUniversalPopup()" 
                 style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9998;">
            </div>
            
            <div id="universalPopup" 
                 style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 0; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); z-index: 9999; width: 90vw; height: 90vh; max-width: 1000px; max-height: 600px; overflow: hidden;">
                
                <button onclick="closeUniversalPopup()" 
                        style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10000; color: #333;">&times;</button>
                
                <div style="display: flex; height: 100%;">
                    <div style="width: 60%; background: #f5f5f5; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px;">
                        <img src="assets/images/home01/modi.jpg" style="width: 90%; max-height: 40%; object-fit: cover; border-radius: 8px; margin-bottom: 10px;" alt="Government Support">
                        <img src="assets/images/home01/popop.jpg" style="width: 90%; max-height: 60%; object-fit: contain;" alt="Solar Solutions">
                    </div>
                    
                    <div style="width: 40%; padding: 25px; overflow-y: auto;">
                        <h3 style="color: #53a92c; margin-bottom: 10px; font-size: 20px;">Free Solar Consultation</h3>
                        <p style="color: #666; font-size: 13px; margin-bottom: 20px; line-height: 1.5;">Get expert advice on solar solutions with government subsidies. No pressure, genuine guidance only.</p>
                        
                        <form id="universalPopupForm">
                            <input type="text" name="name" placeholder="Your Name" required 
                                   style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; font-size: 14px;">
                            
                            <input type="tel" name="phone" placeholder="Phone Number" required 
                                   style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; font-size: 14px;">
                            
                            <input type="email" name="email" placeholder="Email Address" required 
                                   style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; font-size: 14px;">
                            
                            <input type="text" name="city" placeholder="Your City" required 
                                   style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; font-size: 14px;">
                            
                            <select name="interest" required 
                                    style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; font-size: 14px;">
                                <option value="">Select Your Interest</option>
                                <option value="residential">Residential Solar</option>
                                <option value="commercial">Commercial Solar</option>
                                <option value="agricultural">Agricultural Solar Pump</option>
                                <option value="micro-udyog">Micro Udyog Setup</option>
                            </select>
                            
                            <button type="submit" 
                                    style="width: 100%; padding: 12px; background: #53a92c; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 15px;">
                                Get Free Consultation
                            </button>
                        </form>
                        
                        <div style="margin-top: 15px; text-align: center;">
                            <p style="font-size: 12px; color: #888;">Call us directly: <a href="tel:+917991334444" style="color: #53a92c; text-decoration: none;">+91 7991334444</a></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                /* Fixed Icons Styling */
                .fixed-icons {
                    position: fixed;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                
                .fixed-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-decoration: none;
                    font-size: 24px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .fixed-icon:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                }
                
                .whatsapp-icon {
                    background: #25D366;
                }
                
                .whatsapp-icon:hover {
                    background: #128C7E;
                }
                
                .call-icon {
                    background: #007bff;
                }
                
                .call-icon:hover {
                    background: #0056b3;
                }
                
                .email-icon {
                    background: #dc3545;
                }
                
                .email-icon:hover {
                    background: #c82333;
                }
                
                .quote-icon {
                    background: #28a745;
                }
                
                .quote-icon:hover {
                    background: #1e7e34;
                }
                
                @media (max-width: 768px) {
                    .fixed-icons {
                        right: 10px;
                        gap: 10px;
                    }
                    
                    .fixed-icon {
                        width: 45px;
                        height: 45px;
                        font-size: 20px;
                    }
                    
                    #universalPopup {
                        width: 95vw !important;
                        height: 95vh !important;
                        max-height: 90vh !important;
                    }
                    
                    #universalPopup > div {
                        flex-direction: column !important;
                    }
                    
                    #universalPopup > div > div:first-child {
                        width: 100% !important;
                        height: 60% !important;
                        padding: 5px !important;
                    }
                    
                    #universalPopup > div > div:last-child {
                        width: 100% !important;
                        padding: 15px !important;
                        height: 40% !important;
                    }
                    
                    #universalPopup img {
                        width: 100% !important;
                        max-height: 52% !important;
                        object-fit: cover !important;
                    }
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }
    
    // Initialize popup system
    initUniversalPopup();
});

// Make functions globally available
window.showUniversalPopup = showUniversalPopup;
window.closeUniversalPopup = closeUniversalPopup;