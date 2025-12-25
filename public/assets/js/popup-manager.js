// Popup Manager - Shows popup on page load
document.addEventListener('DOMContentLoaded', function() {
    // Show popup after 2 seconds
    setTimeout(function() {
        var popup = document.getElementById('contactPopup');
        var overlay = document.getElementById('popupOverlay');
        if (popup && overlay) {
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }
    }, 2000);
});

function closePopup() {
    var popup = document.getElementById('contactPopup');
    var overlay = document.getElementById('popupOverlay');
    if (popup) popup.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

// Close popup when clicking overlay
document.addEventListener('DOMContentLoaded', function() {
    var overlay = document.getElementById('popupOverlay');
    if (overlay) {
        overlay.addEventListener('click', closePopup);
    }
});
