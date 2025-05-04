// Smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to check if element is partially in viewport
function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // Check if at least 30% of the element is in the viewport
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

    return (visibleHeight * visibleWidth) > (rect.height * rect.width * 0.6);
}

// Set up the scroll listener when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initial check on page load
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Also check on window resize
    window.addEventListener('resize', handleScroll);
});

document.addEventListener('DOMContentLoaded', function () {
  const external = document.querySelector('.external');
  let hasScrolledToElement = false;

  // Helper to check screen size
  function isLargeScreen() {
    return window.innerWidth > 991;
  }

  if (external) {
    window.addEventListener('scroll', function () {
      if (!isLargeScreen()) return; // Disable scroll-triggered animation on small screens

      const rect = external.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const isEnteringViewport =
        (rect.top <= windowHeight * 0.6 && rect.top >= 0) ||
        (rect.bottom >= windowHeight * 0.4 && rect.bottom <= windowHeight);

      const isLeavingViewport =
        (rect.top < 0 && rect.top > -100) ||
        (rect.bottom > windowHeight && rect.bottom < windowHeight + 100);

      if (isEnteringViewport && !hasScrolledToElement) {
        external.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        hasScrolledToElement = true;
      } else if (!isEnteringViewport && !isLeavingViewport) {
        hasScrolledToElement = false;
      }
    });
  }
});


// Intersection Observer for in-view class with halfway trigger
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.5) { // Trigger when 50% of the element is visible
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, { threshold: [0.5] });

document.querySelectorAll('.celebrity-card').forEach(card => {
    observer.observe(card);
});

// Bubble image click handler
document.querySelectorAll('.bubble-image').forEach(image => {
    image.addEventListener('click', function () {
        const section = document.getElementById('hero');
        const imageUrl = this.getAttribute('data-src');
        section.style.backgroundImage = `url(${imageUrl})`;
        section.style.backgroundSize = 'cover';
        section.style.backgroundPosition = 'center';
        section.style.transition = 'background 0.5s ease-in-out';
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // Initialize GSAP ScrollTrigger animations for the gallery rows
  gsap.registerPlugin(ScrollTrigger);
  
  // Set initial positions for each row
  gsap.set('.gallery-row-right:nth-of-type(1)', { x: '-25%' });
  gsap.set('.gallery-row-left', { x: '25%' });
  gsap.set('.gallery-row-right:nth-of-type(3)', { x: '-25%' });
  
  // Animate the top row (move to the right)
  gsap.to('.gallery-row-right:nth-of-type(1)', {
    x: '25%', // Move to the right
    ease: 'none',
    scrollTrigger: {
      trigger: '#gallery',
      start: 'top bottom', // Start when the top of the gallery hits the bottom of the viewport
      end: 'bottom top', // End when the bottom of the gallery hits the top of the viewport
      scrub: 1, // Smooth scrolling effect with slight delay
    },
  });

  // Animate the middle row (move to the left)
  gsap.to('.gallery-row-left', {
    x: '-25%', // Move to the left
    ease: 'none',
    scrollTrigger: {
      trigger: '#gallery',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // Animate the bottom row (move to the right)
  gsap.to('.gallery-row-right:nth-of-type(3)', {
    x: '25%', // Move to the right
    ease: 'none',
    scrollTrigger: {
      trigger: '#gallery',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
});