document.addEventListener("DOMContentLoaded", function() {

  // --- 1. PRELOADER CLOSURE SYSTEM ---
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", function() {
      preloader.style.transition = "opacity 0.6s ease";
      preloader.style.opacity = "0";
      setTimeout(() => preloader.style.display = "none", 600);
    });
  }

  // --- 2. MOBILE HAMBURGER MENU NAV DRAWER TOGGLE ---
  const body = document.body;
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector("#navmenu, .navigation-menu");

  if (navToggle) {
    navToggle.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      body.classList.toggle("mobile-nav-active");
      
      // Swap icon visuals cleanly between hamburger bars and close symbols
      if (body.classList.contains("mobile-nav-active")) {
        navToggle.classList.remove("fa-bars");
        navToggle.classList.add("fa-times");
      } else {
        navToggle.classList.remove("fa-times");
        navToggle.classList.add("fa-bars");
      }
    });
  }

  // --- 3. AUTO-TYPING HERO MATRIX TEXT EFFECT ---
  const typedTarget = document.querySelector(".typed-text-target");
  if (typedTarget) {
    const stringsData = typedTarget.getAttribute("data-typed-strings");
    const stringsArray = stringsData ? stringsData.split(",").map(s => s.trim()) : ["Developer", "Designer"];
    
    let stringIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function runTypingLoop() {
      const currentString = stringsArray[stringIndex];
      
      if (isDeleting) {
        characterIndex--;
      } else {
        characterIndex++;
      }

      typedTarget.textContent = currentString.substring(0, characterIndex);
      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && characterIndex === currentString.length) {
        speed = 2000; // Time the complete phrase rests on screen
        isDeleting = true;
      } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % stringsArray.length;
        speed = 500; // Delay before starting next word
      }

      setTimeout(runTypingLoop, speed);
    }
    runTypingLoop();
  }


  // --- 4. NUMERICAL MILESTONE COUNTERS ENGINE ---
  const statsSection = document.getElementById("stats");
  const counters = document.querySelectorAll(".ticker-number-display");
  let statsTriggered = false;

  function runStatsCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-count-end") || 0;
      const duration = parseFloat(counter.getAttribute("data-count-duration")) * 1000 || 1500;
      const stepTime = Math.max(Math.floor(duration / target), 15);
      let current = 0;

      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, stepTime);
    });
  }


  // --- 5. UNSTYLED NATIVE GALLERY CARDS FILTERS ---
  const filterItems = document.querySelectorAll(".gallery-filter-menu li");
  const galleryCards = document.querySelectorAll(".gallery-card-item");

  filterItems.forEach(item => {
    item.addEventListener("click", function() {
      filterItems.forEach(i => i.classList.remove("filter-active"));
      this.classList.add("filter-active");

      const filterValue = this.getAttribute("data-filter");

      galleryCards.forEach(card => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => card.style.display = "none", 400);
        }
      });
    });
  });


  // --- 6. FAQ ACCORDION TRANSITIONS INTERACTS ---
  const faqItems = document.querySelectorAll(".faq-accordion-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-item-header");
    if (header) {
      header.addEventListener("click", function() {
        const isActive = item.classList.contains("faq-active");
        faqItems.forEach(i => i.classList.remove("faq-active"));
        if (!isActive) {
          item.classList.add("faq-active");
        }
      });
    }
  });


    // --- 6. NATIVE SLIDING TESTIMONIAL SLIDER ---
  const sliderTrack = document.querySelector(".testimonials-slider-section .swiper-wrapper");
  const testimonialSlides = document.querySelectorAll(".testimonials-slider-section .swiper-slide");
  const paginationContainer = document.querySelector(".testimonial-bullets-wrap");
  let currentSlide = 0;

  if (testimonialSlides.length && sliderTrack) {
    
    // Clear out any old duplicated indicator bullet loops first
    if (paginationContainer) paginationContainer.innerHTML = "";

    // Generate dynamic tracking pagination indicator dots
    testimonialSlides.forEach((slide, i) => {
      const bullet = document.createElement("span");
      bullet.className = i === 0 ? "swiper-pagination-bullet swiper-pagination-bullet-active" : "swiper-pagination-bullet";
      bullet.addEventListener("click", () => goToSlide(i));
      if (paginationContainer) paginationContainer.appendChild(bullet);
    });

    function goToSlide(index) {
      currentSlide = index;
      
      // THE FIX: Moves the unbroken conveyor row belt left/right by multiples of 100% wide bounds
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update structural indicator active state dot highlights
      const bullets = document.querySelectorAll(".testimonial-bullets-wrap .swiper-pagination-bullet");
      bullets.forEach((bullet, i) => {
        if (i === currentSlide) {
          bullet.classList.add("swiper-pagination-bullet-active");
        } else {
          bullet.classList.remove("swiper-pagination-bullet-active");
        }
      });
    }

    // Set automatic sliding transitions sequence timer to fire every 5 seconds flat
    let autoSlideTimer = setInterval(() => {
      let nextSlide = (currentSlide + 1) % testimonialSlides.length;
      goToSlide(nextSlide);
    }, 5000);

    // Stops slide jump skips conflicting if user interacts/clicks dot controls directly
    if (paginationContainer) {
      paginationContainer.addEventListener("click", () => {
        clearInterval(autoSlideTimer);
      });
    }
  }


   // --- 7. ASYNCHRONOUS FORM PROCESSING TO INBOX ---
  const form = document.getElementById("portfolio-contact-form");
  if (form) {
    const loading = form.querySelector(".form-loading");
    const errorMsg = form.querySelector(".form-error");
    const sentMsg = form.querySelector(".form-sent");

    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      loading.style.display = "block";
      errorMsg.style.display = "none";
      sentMsg.style.display = "none";

      const data = new FormData(form);
      
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        loading.style.display = "none";
        
        if (response.ok) {
          sentMsg.style.display = "block";
          form.reset();
        } else {
          const result = await response.json();
          errorMsg.textContent = result.errors ? result.errors.map(e => e.message).join(", ") : "Oops! Something went wrong.";
          errorMsg.style.display = "block";
        }
      } catch (err) {
        loading.style.display = "none";
        errorMsg.textContent = "Network error. Please try again later.";
        errorMsg.style.display = "block";
      }
    });
  }


   // --- 8. SCROLL WATCHER ACTIVATION INTERFACES ---
  const scrollTopBtn = document.getElementById("scroll-top");

  window.addEventListener("scroll", function() {
    const scrollPos = window.scrollY;

    // Show/hide scroll to top button
    if (scrollTopBtn) {
      if (scrollPos > 100) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    }

    // Toggle fixed scrolled header treatment parameters on body background canvas
    if (scrollPos > 50) {
      body.classList.add("viewport-scrolled");
    } else {
      body.classList.remove("viewport-scrolled");
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }



});