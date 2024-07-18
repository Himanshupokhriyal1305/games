document.addEventListener("DOMContentLoaded", function() {
    var slideContainer = document.querySelector('.slide-container');
    
    // Initialize Slick using jQuery
    $(slideContainer).slick();
  
    var images = document.querySelectorAll('.clash-card__image img');
    images.forEach(function(img) {
        img.style.display = 'none';
    });
  
    function fadeIn(element, duration) {
        element.style.opacity = 0;
        element.style.display = 'block';
    
        var start = null;
    
        function animate(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            element.style.opacity = Math.min(progress / duration, 1);
            if (progress < duration) {
                window.requestAnimationFrame(animate);
            }
        }
    
        window.requestAnimationFrame(animate);
    }
  
    function fadeOut(element, duration) {
        element.style.opacity = 1;
    
        var start = null;
    
        function animate(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            element.style.opacity = Math.max(1 - progress / duration, 0);
            if (progress < duration) {
                window.requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
    
        window.requestAnimationFrame(animate);
    }
  
    function handleBeforeChange(event, slick, currentSlide, nextSlide) {
        var activeImages = document.querySelectorAll('.slick-active .clash-card img');
        activeImages.forEach(function(img) {
            fadeOut(img, 1000);
        });
    }
  
    function handleAfterChange(event, slick, currentSlide) {
        var activeImages = document.querySelectorAll('.slick-active .clash-card img');
        activeImages.forEach(function(img) {
            fadeIn(img, 200);
        });
    }
  
    // Attach event listeners using jQuery because Slick uses jQuery events
    $(slideContainer).on('beforeChange', handleBeforeChange);
    $(slideContainer).on('afterChange', handleAfterChange);
  
    // Initial fadeIn for the first slide
    var initialActiveImages = document.querySelectorAll('.slick-active .clash-card img');
    initialActiveImages.forEach(function(img) {
        fadeIn(img, 200);
    });
});
