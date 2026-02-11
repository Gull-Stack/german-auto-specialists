/* ===================================
   German Auto Specialists — Main JS
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // --- Scroll Fade-in Animation ---
  const faders = document.querySelectorAll('.fade-up');
  if (faders.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    faders.forEach(el => observer.observe(el));
  } else {
    faders.forEach(el => el.classList.add('visible'));
  }

  // --- Header Background on Scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.background = window.scrollY > 50
        ? 'rgba(10,10,10,.98)'
        : 'rgba(10,10,10,.95)';
    }, { passive: true });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Scroll-Triggered Frame Animation ---
  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (canvas && heroSection) {
    const ctx = canvas.getContext('2d');
    const TOTAL_FRAMES = 96;
    const frames = [];
    let imagesLoaded = 0;
    let currentFrame = 0;
    let animActive = true;

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame);
    }
    window.addEventListener('resize', resizeCanvas);

    // Preload all frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `images/frames/frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 1) { resizeCanvas(); drawFrame(0); }
        if (imagesLoaded === TOTAL_FRAMES) { resizeCanvas(); }
      };
      frames.push(img);
    }

    function drawFrame(index) {
      if (!frames[index] || !frames[index].complete) return;
      const img = frames[index];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw image centered/cover
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    }

    // Scroll handler
    window.addEventListener('scroll', () => {
      if (!animActive) return;
      const rect = heroSection.getBoundingClientRect();
      const scrollableHeight = heroSection.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      
      const frameIndex = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }

      // Fade out text as animation progresses
      if (heroContent) {
        const textOpacity = Math.max(1 - (progress * 3), 0);
        heroContent.style.opacity = textOpacity;
      }

      // Show/hide fixed canvas based on hero visibility
      const container = document.getElementById('scroll-animation-container');
      if (container) {
        container.style.display = (rect.bottom > 0) ? 'block' : 'none';
      }
    }, { passive: true });
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('./', '').replace('../', ''))) {
      link.classList.add('active');
    }
  });

});
