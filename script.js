

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const overlayTrigger = document.getElementById('overlay-trigger');
  const navbarOverlay = document.getElementById('navbar-overlay');

  if (overlayTrigger && navbarOverlay) {
    overlayTrigger.addEventListener('click', function() {
      overlayTrigger.classList.toggle('active');
      navbarOverlay.classList.toggle('active');
    });

    // Close overlay when clicking a link
    const overlayLinks = navbarOverlay.querySelectorAll('.nav-links a');
    overlayLinks.forEach(link => {
      link.addEventListener('click', function() {
        overlayTrigger.classList.remove('active');
        navbarOverlay.classList.remove('active');
      });
    });

    // Close overlay when clicking outside
    navbarOverlay.addEventListener('click', function(e) {
      if (e.target === navbarOverlay) {
        overlayTrigger.classList.remove('active');
        navbarOverlay.classList.remove('active');
      }
    });
  }

  // ========================================
  // SCROLL INTERACTION - ADD .SCROLLED CLASS
  // ========================================
  const navbarClassic = document.getElementById('navbar-classic');
  const navbarFloating = document.getElementById('navbar-floating');

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      if (navbarClassic) navbarClassic.classList.add('scrolled');
      if (navbarFloating) navbarFloating.classList.add('scrolled');
    } else {
      if (navbarClassic) navbarClassic.classList.remove('scrolled');
      if (navbarFloating) navbarFloating.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);

  // ========================================
  // HOTSPOT INTERACTIVITY
  // ========================================
  const hotspots = document.querySelectorAll('.hotspot');
  const specTooltip = document.getElementById('spec-tooltip');

  if (hotspots.length > 0 && specTooltip) {
    hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', function(e) {
        e.stopPropagation();
        const specText = this.getAttribute('data-spec');
        const rect = this.getBoundingClientRect();

        // Position tooltip above the hotspot
        specTooltip.textContent = specText;
        specTooltip.style.left = `${rect.left + window.scrollX}px`;
        specTooltip.style.top = `${rect.top + window.scrollY - 50}px`;
        specTooltip.classList.add('active');

        // Remove other active states
        hotspots.forEach(h => h.style.backgroundColor = '');
        this.style.backgroundColor = 'var(--warm-walnut)';
        this.style.color = 'var(--off-white)';
      });

      hotspot.addEventListener('mouseenter', function() {
        const specText = this.getAttribute('data-spec');
        const rect = this.getBoundingClientRect();

        specTooltip.textContent = specText;
        specTooltip.style.left = `${rect.left + window.scrollX}px`;
        specTooltip.style.top = `${rect.top + window.scrollY - 50}px`;
        specTooltip.classList.add('active');
      });

      hotspot.addEventListener('mouseleave', function() {
        setTimeout(() => {
          if (!specTooltip.matches(':hover')) {
            specTooltip.classList.remove('active');
          }
        }, 100);
      });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.classList.contains('hotspot')) {
        specTooltip.classList.remove('active');
        hotspots.forEach(h => {
          h.style.backgroundColor = '';
          h.style.color = '';
        });
      }
    });
  }

  // ========================================
  // REVEAL ANIMATIONS - INTERSECTION OBSERVER
  // ========================================
  const sections = document.querySelectorAll('.section');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    sections.forEach(section => {
      section.classList.add('revealed');
    });
  }

  // ========================================
  // CONTACT FORM HANDLING
  // ========================================
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        projectType: document.getElementById('project-type').value,
        timeline: document.getElementById('timeline').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value
      };

      // Show success message
      formMessage.style.display = 'block';
      formMessage.style.color = 'var(--warm-walnut)';
      formMessage.textContent = 'Thank you for your inquiry. We will respond within 48 hours.';

      // Reset form
      contactForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);

      // In a real application, you would send this data to a server
      console.log('Form submitted:', formData);
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // ELEVATION DRAWING RESPONSIVE ADJUSTMENT
  // ========================================
  function adjustElevationScale() {
    const elevationDrawing = document.querySelector('.elevation-drawing');

    if (elevationDrawing && window.innerWidth < 768) {
      elevationDrawing.style.transform = 'scale(0.8)';
      elevationDrawing.style.transformOrigin = 'top center';
    } else if (elevationDrawing) {
      elevationDrawing.style.transform = 'scale(1)';
    }
  }

  window.addEventListener('resize', adjustElevationScale);
  adjustElevationScale();

  // ========================================
  // PRELOAD HERO SECTION
  // ========================================
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '1';
  }

  // ========================================
  // LAZY LOAD OPTIMIZATION
  // ========================================
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // ========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ========================================
  // Add keyboard navigation for hotspots
  hotspots.forEach((hotspot, index) => {
    hotspot.setAttribute('tabindex', '0');
    hotspot.setAttribute('role', 'button');
    hotspot.setAttribute('aria-label', `Technical detail ${index + 1}`);

    hotspot.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add aria-label to navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const text = link.textContent.trim();
    link.setAttribute('aria-label', `Navigate to ${text} page`);
  });

  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  if ('PerformanceObserver' in window) {
    try {
      const perfObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.renderTime || entry.loadTime);
          }
        });
      });

      perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Browser doesn't support this observer type
      console.log('Performance observer not supported');
    }
  }

  // ========================================
  // CONSOLE GREETING
  // ========================================
  console.log('%cStudio Elevation', 'font-family: Playfair Display, serif; font-size: 24px; color: #6B513E;');
  console.log('%cArchitectural Interior Design', 'font-family: Inter, sans-serif; font-size: 12px; letter-spacing: 0.2em; color: #1A1A1A;');
  console.log('%chttps://studioelevation.com', 'font-family: Inter, sans-serif; font-size: 10px; color: #888;');

});


function toggleService(btn) {
        const card = btn.closest('.service-card');
        const span = btn.querySelector('span');
        
        // Close other expanded cards (optional)
        document.querySelectorAll('.service-card').forEach(c => {
            if (c !== card) {
                c.classList.remove('expanded');
                c.querySelector('.read-more-btn span').innerText = "Read More";
            }
        });

        card.classList.toggle('expanded');
        span.innerText = card.classList.contains('expanded') ? "Read Less" : "Read More";
    }




const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.getElementById('mobile-links');
    const spans = menuBtn.querySelectorAll('span');

    menuBtn.addEventListener('click', () => {
        // 1. Toggle the Slide Class
        const isHidden = mobileMenu.classList.toggle('-translate-y-full');
        
        if (!isHidden) {
            // --- MENU OPEN STATE ---
            mobileMenu.classList.add('translate-y-0');
            mobileMenu.classList.remove('pointer-events-none', 'opacity-0'); // Background visible aagum
            mobileLinks.classList.replace('opacity-0', 'opacity-100');
            
            // Hamburger to "X"
            spans[0].style.transform = "translateY(7.5px) rotate(45deg)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "translateY(-7.5px) rotate(-45deg)";
            
            document.body.style.overflow = 'hidden'; 
        } else {
            // --- MENU CLOSE STATE ---
            mobileMenu.classList.remove('translate-y-0');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none'); // Background moththama poidum
            mobileLinks.classList.replace('opacity-100', 'opacity-0');
            
            // "X" back to Hamburger
            spans[0].style.transform = "translateY(0) rotate(0)";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "translateY(0) rotate(0)";
            
            document.body.style.overflow = 'auto';
        }
    });

    // Link click panna udane menu background poga ithu mukkiyam
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.click(); // Trigger close logic
        });
    });