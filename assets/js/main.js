/**
 * LiPan Restaurant - Main JavaScript
 * Modern & Professional Website Functionality
 */

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    
    if (!selectHeader) return;
    
    if (!selectHeader.classList.contains('scroll-up-sticky') && 
        !selectHeader.classList.contains('sticky-top') && 
        !selectHeader.classList.contains('fixed-top')) return;
    
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }, 500);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    }
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      
      let position = window.scrollY + 200;
      
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Set minimum date for reservation (tomorrow)
   */
  window.addEventListener('load', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      
      dateInput.min = `${year}-${month}-${day}`;
    }
  });

  /**
   * Character counter for message textarea
   */
  const messageTextarea = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  
  if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', function() {
      const currentLength = this.value.length;
      charCount.textContent = currentLength;
      
      // Visual feedback when approaching limit
      if (currentLength > 450) {
        charCount.style.color = '#dc3545';
      } else if (currentLength > 400) {
        charCount.style.color = '#ffc107';
      } else {
        charCount.style.color = '';
      }
    });
  }

  /**
   * Enhanced Form Validation untuk Reservasi
   */
  const reservationForm = document.getElementById('reservationForm');
  const formInfo = document.getElementById('formInfo');
  const formError = document.getElementById('formError');
  const infoMessage = document.getElementById('infoMessage');
  const errorMessage = document.getElementById('errorMessage');

  if (reservationForm) {
    // Real-time validation
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const peopleSelect = document.getElementById('people');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');

    // Name validation
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        if (this.value.trim().length < 3) {
          this.classList.add('is-invalid');
        } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        }
      });
    }

    // Phone validation (Indonesian format)
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        // Remove non-numeric characters
        this.value = this.value.replace(/\D/g, '');
      });

      phoneInput.addEventListener('blur', function() {
        const phoneValue = this.value.replace(/\D/g, '');
        const phonePattern = /^(08|628)[0-9]{8,11}$/;
        
        if (!phonePattern.test(phoneValue)) {
          this.classList.add('is-invalid');
        } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        }
      });
    }

    // Date validation
    if (dateInput) {
      dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          this.classList.add('is-invalid');
        } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        }
      });
    }

    // Select validation
    [peopleSelect, timeSelect].forEach(select => {
      if (select) {
        select.addEventListener('change', function() {
          if (this.value === '') {
            this.classList.add('is-invalid');
          } else {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
          }
        });
      }
    });

    // WhatsApp Link Builder
    const submitBtn = document.getElementById('submitBtn');
    
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        if (formInfo) formInfo.style.display = 'none';
        if (formError) formError.style.display = 'none';
        
        // Validate all fields
        let isValid = true;
        const formData = {};

        // Validate name
        if (nameInput && nameInput.value.trim().length < 3) {
          nameInput.classList.add('is-invalid');
          isValid = false;
        } else if (nameInput) {
          nameInput.classList.remove('is-invalid');
          formData.name = nameInput.value.trim();
        }

        // Validate phone
        if (phoneInput) {
          const phoneValue = phoneInput.value.replace(/\D/g, '');
          const phonePattern = /^(08|628)[0-9]{8,11}$/;
          
          if (!phonePattern.test(phoneValue)) {
            phoneInput.classList.add('is-invalid');
            isValid = false;
          } else {
            phoneInput.classList.remove('is-invalid');
            formData.phone = phoneValue;
          }
        }

        // Validate people
        if (peopleSelect && peopleSelect.value === '') {
          peopleSelect.classList.add('is-invalid');
          isValid = false;
        } else if (peopleSelect) {
          peopleSelect.classList.remove('is-invalid');
          formData.people = peopleSelect.value;
        }

        // Validate date
        if (dateInput) {
          const selectedDate = new Date(dateInput.value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (!dateInput.value || selectedDate < today) {
            dateInput.classList.add('is-invalid');
            isValid = false;
          } else {
            dateInput.classList.remove('is-invalid');
            formData.date = dateInput.value;
          }
        }

        // Validate time
        if (timeSelect && timeSelect.value === '') {
          timeSelect.classList.add('is-invalid');
          isValid = false;
        } else if (timeSelect) {
          timeSelect.classList.remove('is-invalid');
          formData.time = timeSelect.value;
        }

        // Get optional message
        if (messageTextarea) {
          formData.message = messageTextarea.value.trim();
        }

        if (!isValid) {
          if (formError && errorMessage) {
            errorMessage.textContent = 'Mohon lengkapi semua field yang wajib diisi dengan benar.';
            formError.style.display = 'block';
          }
          
          // Scroll to first invalid field
          const firstInvalid = reservationForm.querySelector('.is-invalid');
          if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalid.focus();
          }
          return;
        }

        // Build WhatsApp message
        const formatDate = (dateStr) => {
          const date = new Date(dateStr);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          return date.toLocaleDateString('id-ID', options);
        };

        let message = `*RESERVASI MEJA LIPAN RESTAURANT*%0A%0A`;
        message += `👤 *Nama:* ${formData.name}%0A`;
        message += `📱 *WhatsApp:* ${formData.phone}%0A`;
        message += `👥 *Jumlah Orang:* ${formData.people}%0A`;
        message += `📅 *Tanggal:* ${formatDate(formData.date)}%0A`;
        message += `⏰ *Waktu:* ${formData.time}%0A`;
        
        if (formData.message) {
          message += `%0A📝 *Catatan:*%0A${encodeURIComponent(formData.message)}`;
        }
        
        message += `%0A%0A_Mohon konfirmasi ketersediaan meja. Terima kasih!_`;

        // Update WhatsApp link
        const whatsappUrl = `https://wa.me/6281392813981?text=${message}`;
        
        // Show success message
        if (formInfo && infoMessage) {
          infoMessage.textContent = 'Anda akan diarahkan ke WhatsApp untuk konfirmasi...';
          formInfo.style.display = 'block';
        }

        // Redirect to WhatsApp after short delay
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 500);
      });
    }
  }

  /**
   * Smooth scroll for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Add animation class on scroll (Intersection Observer)
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.menu-item, .contact-card, .reservation-form-container').forEach(el => {
    observer.observe(el);
  });

  /**
   * Counter animation for stats in hero section
   */
  function animateCounter(element, target, duration = 2000) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const targetNum = parseInt(text.replace(/\D/g, ''));
    
    let start = 0;
    const increment = targetNum / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        element.textContent = targetNum + (hasPlus ? '+' : '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + (hasPlus ? '+' : '');
      }
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (statNumber && !statNumber.classList.contains('animated')) {
          statNumber.classList.add('animated');
          animateCounter(statNumber, 0);
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
  });

  /**
   * Menu tab memory (remember last selected tab)
   */
  const menuTabs = document.querySelectorAll('#menuTabs button');
  
  menuTabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function() {
      try {
        localStorage.setItem('lastMenuTab', this.id);
      } catch (e) {
        // Ignore localStorage errors
      }
    });
  });

  // Restore last selected tab on page load
  window.addEventListener('load', function() {
    try {
      const lastTab = localStorage.getItem('lastMenuTab');
      if (lastTab) {
        const tabButton = document.getElementById(lastTab);
        if (tabButton && typeof bootstrap !== 'undefined') {
          const tab = new bootstrap.Tab(tabButton);
          tab.show();
        }
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  });

  /**
   * Lazy loading for images
   */
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  /**
   * Menu item hover effects
   */
  window.addEventListener('load', function() {
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
      });
    });
  });

  /**
   * Form field animations
   */
  const formInputs = document.querySelectorAll('.form-control, .form-select');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  /**
   * Prevent form submission on Enter key (except textarea)
   */
  if (reservationForm) {
    reservationForm.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    });
  }

  /**
   * Initialize Bootstrap tooltips (if available)
   */
  window.addEventListener('load', function() {
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  });

  /**
   * Floating elements parallax effect
   */
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-badge, .experience-badge');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  /**
   * Smooth reveal animations for sections
   */
  const revealSections = document.querySelectorAll('section');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15
  });

  revealSections.forEach(section => {
    revealObserver.observe(section);
  });

  /**
   * Console branding
   */
  console.log(
    '%cLiPan Restaurant', 
    'color: #eb5f2d; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'
  );
  console.log(
    '%c🍽️ Kuliner Nusantara Indonesia Sejak 2004', 
    'color: #666; font-size: 14px; font-weight: 500;'
  );
  console.log(
    '%cWebsite designed with ❤️ and modern technology', 
    'color: #999; font-size: 12px; font-style: italic;'
  );

  /**
   * Performance monitoring
   */
  window.addEventListener('load', function() {
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #28a745; font-weight: bold;');
    }
  });

  /**
   * Easter egg: Konami code
   */
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        console.log('%c🎉 Konami Code Activated! Selamat datang di LiPan!', 'color: #eb5f2d; font-size: 20px; font-weight: bold;');
        // Add a subtle animation to the logo
        const logo = document.querySelector('.logo');
        if (logo) {
          logo.style.animation = 'bounce 1s ease';
        }
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

})();