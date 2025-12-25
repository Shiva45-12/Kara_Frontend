// Simple testimonial mobile slider fix
$(document).ready(function() {
    // Wait for page to load completely
    setTimeout(function() {
        if ($('.testimonial-container').length) {
            // Force initialize testimonial swiper for mobile
            var testimonialSwiper = new Swiper('.testimonial-container', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false,
                },
                speed: 1500,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // Mobile touch settings
                allowTouchMove: true,
                simulateTouch: true,
                touchRatio: 1,
                grabCursor: true,
                on: {
                    init: function() {
                        console.log('Testimonial slider initialized');
                    }
                }
            });
        }
    }, 1000);
});