/**
 * Universal Mobile Slider Initialization
 * Ensures all sliders work properly on mobile devices across all pages
 */

$(document).ready(function() {
    
    // Initialize Bootstrap Carousel with mobile-friendly settings
    function initBootstrapCarousel() {
        $('.carousel').each(function() {
            var $carousel = $(this);
            
            // Universal carousel settings with slower transitions
            $carousel.carousel({
                interval: 10000, // 10 seconds
                pause: 'hover',
                wrap: true,
                keyboard: true,
                touch: true
            });
            
            // Add touch/swipe support for mobile
            if (window.innerWidth <= 768) {
                var startX = 0;
                var endX = 0;
                
                $carousel.on('touchstart', function(e) {
                    startX = e.originalEvent.touches[0].clientX;
                });
                
                $carousel.on('touchend', function(e) {
                    endX = e.originalEvent.changedTouches[0].clientX;
                    var diffX = startX - endX;
                    
                    if (Math.abs(diffX) > 50) { // Minimum swipe distance
                        if (diffX > 0) {
                            $carousel.carousel('next');
                        } else {
                            $carousel.carousel('prev');
                        }
                    }
                });
            }
        });
    }
    
    // Initialize Swiper sliders with mobile optimization
    function initSwiperSliders() {
        // Testimonial Swiper with slower transitions
        if ($('.testimonial-container').length) {
            var testimonialSwiper = new Swiper('.testimonial-container', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 10000, // 10 seconds
                    disableOnInteraction: false,
                },
                speed: 1500, // 1.5 seconds smooth transition
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    }
                },
                // Enhanced mobile settings
                allowTouchMove: true,
                simulateTouch: true,
                touchRatio: 2,
                touchAngle: 45,
                grabCursor: true,
                centeredSlides: true,
                effect: 'slide'
            });
        }
        
        // Product/Gallery Swiper (if exists)
        if ($('.product-slider, .gallery-slider').length) {
            $('.product-slider, .gallery-slider').each(function() {
                var $slider = $(this);
                var swiper = new Swiper($slider[0], {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    loop: true,
                    autoplay: {
                        delay: 8000, // 8 seconds
                        disableOnInteraction: false,
                    },
                    speed: 1200, // 1.2 seconds smooth transition
                    pagination: {
                        el: $slider.find('.swiper-pagination')[0],
                        clickable: true,
                    },
                    navigation: {
                        nextEl: $slider.find('.swiper-button-next')[0],
                        prevEl: $slider.find('.swiper-button-prev')[0],
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        576: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    },
                    touchRatio: 1,
                    grabCursor: true,
                });
            });
        }
    }
    
    // Initialize FlexSlider with mobile settings
    function initFlexSlider() {
        if ($('.flexslider').length) {
            $('.flexslider').each(function() {
                var $slider = $(this);
                $slider.flexslider({
                    animation: "slide",
                    animationLoop: true,
                    itemWidth: window.innerWidth <= 768 ? 300 : 400,
                    itemMargin: window.innerWidth <= 768 ? 10 : 20,
                    minItems: 1,
                    maxItems: window.innerWidth <= 768 ? 1 : 3,
                    controlNav: true,
                    directionNav: true,
                    slideshow: true,
                    slideshowSpeed: 4000,
                    animationSpeed: 600,
                    touch: true,
                    keyboard: true,
                    pauseOnHover: true,
                    start: function(slider) {
                        // Mobile-specific adjustments after initialization
                        if (window.innerWidth <= 768) {
                            slider.find('.flex-direction-nav a').css({
                                'width': '40px',
                                'height': '40px',
                                'line-height': '40px',
                                'margin-top': '-20px'
                            });
                        }
                    }
                });
            });
        }
    }
    
    // Handle window resize for responsive behavior
    function handleResize() {
        var resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Reinitialize sliders on significant size changes
                if (window.innerWidth <= 768) {
                    // Mobile view
                    $('.carousel').carousel('dispose');
                    initBootstrapCarousel();
                } else {
                    // Desktop view
                    $('.carousel').carousel({
                        interval: 10000, // 10 seconds
                        pause: 'hover'
                    });
                }
            }, 250);
        });
    }
    
    // Fix for slider images not loading properly
    function fixSliderImages() {
        $('.carousel-item img, .swiper-slide img, .flexslider img').each(function() {
            var $img = $(this);
            if (!$img.attr('src') && $img.data('src')) {
                $img.attr('src', $img.data('src'));
            }
            
            // Ensure images are properly sized on mobile
            if (window.innerWidth <= 768) {
                $img.css({
                    'width': '100%',
                    'height': 'auto',
                    'object-fit': 'cover'
                });
            }
        });
    }
    
    // Prevent slider conflicts
    function preventSliderConflicts() {
        // Stop autoplay when user interacts with slider
        $('.carousel, .swiper-container, .flexslider').on('touchstart mousedown', function() {
            $(this).carousel('pause');
            if (this.swiper) {
                this.swiper.autoplay.stop();
            }
        });
        
        // Resume autoplay after interaction ends
        $('.carousel, .swiper-container, .flexslider').on('touchend mouseup', function() {
            var $this = $(this);
            setTimeout(function() {
                $this.carousel('cycle');
                if ($this[0].swiper) {
                    $this[0].swiper.autoplay.start();
                }
            }, 3000);
        });
    }
    
    // Initialize all slider functionality
    function initAllSliders() {
        fixSliderImages();
        initBootstrapCarousel();
        initSwiperSliders();
        initFlexSlider();
        preventSliderConflicts();
        handleResize();
    }
    
    // Run initialization
    initAllSliders();
    
    // Reinitialize on page load complete
    $(window).on('load', function() {
        setTimeout(initAllSliders, 500);
    });
    
    // Handle orientation change on mobile
    $(window).on('orientationchange', function() {
        setTimeout(function() {
            initAllSliders();
        }, 500);
    });
    
    // Add loading states for better UX
    $('.carousel, .swiper-container, .flexslider').addClass('slider-loading');
    
    setTimeout(function() {
        $('.slider-loading').removeClass('slider-loading');
    }, 1000);
});

// CSS for loading state and smooth transitions
var loadingCSS = `
<style>
.slider-loading {
    opacity: 0.7;
    pointer-events: none;
}

.slider-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #53a92c;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 1000;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Smooth carousel transitions */
.carousel-item {
    transition: transform 1.5s ease-in-out !important;
}

/* Smooth swiper transitions */
.swiper-wrapper {
    transition-timing-function: ease-in-out !important;
}

.swiper-slide {
    transition: all 0.8s ease-in-out !important;
}

/* Mobile-specific slider improvements */
@media (max-width: 768px) {
    .carousel-item,
    .swiper-slide,
    .flexslider .slides > li {
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    
    /* Smooth transitions */
    .carousel-item img,
    .swiper-slide img,
    .flexslider img {
        transition: transform 0.3s ease-out;
    }
    
    /* Touch feedback */
    .carousel-control-prev:active,
    .carousel-control-next:active,
    .swiper-button-prev:active,
    .swiper-button-next:active,
    .flex-direction-nav a:active {
        transform: scale(0.95) !important;
    }
}
</style>
`;

$('head').append(loadingCSS);