

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // MOBILE MENU TOGGLE WITH ANIMATIONS
  // ========================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.getElementById('mobile-links');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      mobileLinks?.classList.toggle('active');
      
      // Animate hamburger
      const bars = menuBtn.querySelectorAll('span');
      menuBtn.classList.toggle('active');
      
      if (menuBtn.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        bars[0].style.transform = 'rotate(0) translate(0, 0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0) translate(0, 0)';
      }
    });

    // Close menu when clicking a link
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileLinks?.classList.remove('active');
        menuBtn.classList.remove('active');
        
        const bars = menuBtn.querySelectorAll('span');
        bars[0].style.transform = 'rotate(0) translate(0, 0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0) translate(0, 0)';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileLinks?.classList.remove('active');
        menuBtn.classList.remove('active');
        
        const bars = menuBtn.querySelectorAll('span');
        bars[0].style.transform = 'rotate(0) translate(0, 0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0) translate(0, 0)';
      }
    });
  }

  // ========================================
  // SCROLL INTERACTION - ADD SCROLLED CLASS
  // ========================================
  const mainNav = document.getElementById('main-nav');

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      if (mainNav) {
        mainNav.classList.add('scrolled');
      }
    } else {
      if (mainNav) {
        mainNav.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);

  // ========================================
  // FAQ ACCORDION TOGGLE
  // ========================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

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
  // PORTFOLIO SLIDER CONTROLS
  // ========================================
  const slider = document.getElementById('portfolioSlider');
  const scrollLeft = document.getElementById('scrollLeft');
  const scrollRight = document.getElementById('scrollRight');

  if (slider && scrollLeft && scrollRight) {
    const getScrollStep = () => {
      const firstCard = slider.querySelector('div');
      return firstCard ? firstCard.offsetWidth + 24 : 350; // 24 is gap-6
    };

    scrollLeft.addEventListener('click', () => {
      slider.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    scrollRight.addEventListener('click', () => {
      slider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    // Auto-slide
    let isPaused = false;
    let autoSlideInterval = setInterval(() => {
      if (!isPaused) {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        }
      }
    }, 4000);

    slider.addEventListener('mouseenter', () => isPaused = true);
    slider.addEventListener('mouseleave', () => isPaused = false);
    slider.addEventListener('touchstart', () => isPaused = true);
    slider.addEventListener('touchend', () => {
      setTimeout(() => isPaused = false, 2000);
    });
  }

  // ========================================
  // CUSTOM CURSOR EFFECT
  // ========================================
  const cursor = document.getElementById('cursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
    });

    // Interactive elements for cursor effect
    const interactables = document.querySelectorAll('a, button, .group, input, .cursor-pointer, [role="button"]');

    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
      });
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  }

  // ========================================
  // FORM SUBMISSION
  // ========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      const formMessage = document.createElement('div');
      formMessage.className = 'text-green-600 text-center py-4';
      formMessage.textContent = 'Thank you for your inquiry. We will respond within 48 hours.';
      contactForm.parentNode.insertBefore(formMessage, contactForm.nextSibling);
      
      contactForm.reset();
      
      setTimeout(() => {
        formMessage.remove();
      }, 5000);
    });
  }

});

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