document.addEventListener("DOMContentLoaded", function () {
  // Menu déroulant pour les appareils mobiles
  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });

  // Animation de scrolling fluide
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  for (const link of smoothScrollLinks) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        window.scrollTo(0, startPosition + (distance * easeInOutQuad(progress / duration)));

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }

      window.requestAnimationFrame(step);
    });
  }
});
