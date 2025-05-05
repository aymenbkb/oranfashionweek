// Initialize GSAP and plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize custom cursor
  initCustomCursor();
  
  // Initialize preloader animation
  initPreloader();
  
  // Initialize all scroll animations
  initScrollAnimations();
  
  // Initialize calendar timeline
  initCalendarTimeline();
  
  // Initialize countdown timer
  initCountdownTimer();
});

// Custom cursor functionality
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power1.out'
      });
    });
    
    // Scale cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, .event-card, .program-card');
    clickables.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          scale: 3.0,
          opacity: 0.7,
          backgroundColor: 'rgba(147, 112, 219, 0.7)',
          duration: 0.3
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3
        });
      });
    });
  }
}

// Preloader animation
function initPreloader() {
  const preloader = document.querySelector('.preloader-container');
  const logo = document.querySelector('.preloader-logo');
  
  if (preloader && logo) {
    // Create a timeline for preloader animation
    const tl = gsap.timeline();
    
    // Shimmer effect on logo
    tl.to(logo.querySelector('::after'), {
      x: '100%',
      duration: 0.5, // Reduced duration for smoother animation
      ease: 'power1.inOut'
    });
    
    // Fade in logo
    tl.from(logo, {
      y: 50, // Reduced movement for smoother effect
      opacity: 0,
      duration: 1.2, // Shorter duration
      delay: 0.2,
      ease: 'power2.inOut'
    }, 0);
    
    // Fade out preloader
    tl.to(preloader, {
      opacity: 0,
      duration: 0.5, // Shorter fade-out duration
      onComplete: () => {
        preloader.style.display = 'none';
        // Start hero animations after preloader
        heroAnimations();
      }
    });
  } else {
    // If preloader elements don't exist, start hero animations immediately
    heroAnimations();
  }
}


// Initialize all scroll animations
function initScrollAnimations() {
  
  // Calendar section animations
  ScrollTrigger.create({
    trigger: '#fasolader',
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo('.event-card', {
        y: 30,
        opacity: 1,
        rotateX: -15,
        transformPerspective: 1000
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  });
  
  // Experience section animations
  ScrollTrigger.create({
    trigger: '#experience',
    start: 'top 80%',
    onEnter: () => {
      // Animate images
      gsap.fromTo(['.experience-image-1', '.experience-image-2', '.experience-image-3'], {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      // Animate content
      gsap.fromTo('#experience .section-title, #experience p, .experience-feature', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
      });
    }
  });
  
  // Program section animations
  ScrollTrigger.create({
    trigger: '#program',
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo('.program-card', {
        y: 30,
        opacity: 0,
        rotateX: -15,
        transformPerspective: 1000
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  });
  
  // Timeline section functionality
  initTimelineScroll();
  
  // Contact section animations
  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 80%',
    onEnter: () => {
      // Animate contact info
      gsap.fromTo('.contact-info', {
        x: -50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      // Animate form fields
      gsap.fromTo('.contact-form-container .form-control, .contact-form-container button', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
      });
    }
  });
}


// Initialize calendar timeline
function initCalendarTimeline() {
  const timeline = document.querySelector('.calendar-timeline');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards = document.querySelectorAll('.event-card');
  
  if (timeline && cards.length > 0) {
    // Set initial scroll position
    let cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
    
    // Navigation buttons functionality
    if (prevBtn && nextBtn) {
      // Previous button click
      prevBtn.addEventListener('click', () => {
        gsap.to(timeline, {
          scrollLeft: `-=${cardWidth * 2}`,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
      
      // Next button click
      nextBtn.addEventListener('click', () => {
        gsap.to(timeline, {
          scrollLeft: `+=${cardWidth * 2}`,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }
    
    // Hover effects for event cards
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          borderColor: '#6841EA',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 1)',
          boxShadow: 'none',
          duration: 0.3
        });
      });
      
      // Click event for details
      card.addEventListener('click', () => {
        const designerName = card.querySelector('.designer-name').textContent;
        const eventDay = card.querySelector('.event-day').textContent;
        const eventMonth = card.querySelector('.event-month').textContent;
        const location = card.querySelector('.event-location').textContent;
        
        console.log(`Event details: ${designerName} on ${eventDay} ${eventMonth} at ${location}`);
        // Here you can implement a modal or detailed view
      });
    });
  }
}

// Initialize timeline scroll functionality
function initTimelineScroll() {
  const scroller = document.getElementById('yearScroller');
  const marker = document.getElementById('marker');
  const yearLinks = document.querySelectorAll('.timeline-year a');
  const sections = document.querySelectorAll('.year-section');
  
  if (!scroller || !marker || !yearLinks.length || !sections.length) return;
  
  // Handle clicking on year links
  yearLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Smooth scroll to target section
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update active link
        yearLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Update marker position and active link on scroll
  scroller.addEventListener('scroll', function() {
    // Calculate which section is in view
    const scrollPosition = scroller.scrollLeft;
    const windowWidth = window.innerWidth;
    const currentIndex = Math.floor(scrollPosition / windowWidth);
    
    // Update active year link
    yearLinks.forEach(link => link.classList.remove('active'));
    if (yearLinks[currentIndex]) {
      yearLinks[currentIndex].classList.add('active');
    }
    
    // Calculate and update marker position
    const navWidth = document.querySelector('.timeline-years').offsetWidth;
    const markerPosition = (currentIndex / (sections.length - 1)) * navWidth;
    
    marker.style.left = `${markerPosition + 50}px`;
  });
  
  // Initial setup for marker position
  yearLinks[0].classList.add('active');
}
