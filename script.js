const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Закрытие меню при клике вне его
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });
}
const navLinks = document.querySelectorAll(".nav-link");
const currentLocation = location.pathname;

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentLocation) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
window.addEventListener("scroll", () => {
  updateActiveLink();
});
function updateActiveLink() {
  let fromTop = window.scrollY + 100;

  navLinks.forEach((link) => {
    let section = document.querySelector(link.getAttribute("href"));
    if (section) {
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document
  .querySelectorAll(
    ".feature-card, .tool-card, .function-card, .screenshot-item, .faq-item"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "") return;

    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
const cards = document.querySelectorAll(
  ".feature-card, .tool-card, .function-card, .sidebar-card, .faq-item"
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = document.createElement("div");
    glow.style.position = "absolute";
    glow.style.left = x + "px";
    glow.style.top = y + "px";
    glow.style.width = "40px";
    glow.style.height = "40px";
    glow.style.background =
      "radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent)";
    glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.animation = "pulse 0.6s ease-out forwards";
    if (card.style.position !== "absolute" && card.style.position !== "fixed") {
      card.style.position = "relative";
    }
    card.appendChild(glow);
    setTimeout(() => glow.remove(), 600);
  });
});
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .sidebar-card {
        position: relative;
        overflow: hidden;
    }

    .feature-card,
    .tool-card,
    .function-card,
    .faq-item {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-count"));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach((counter) => counterObserver.observe(counter));
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    // Добавляем атрибут loading="lazy" для нативной ленивой загрузки
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
    if (img.complete) {
      img.style.opacity = "1";
    } else {
      img.style.opacity = "0.7";
    }
  });

  // Оптимизация производительности для мобильных
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      // Загружаем дорогие операции когда браузер свободен
    });
  }
});
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => imageObserver.observe(img));
}
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });
});
const hero = document.querySelector(".hero");
if (hero) {
  document.addEventListener("mousemove", (e) => {
    const cards = hero.querySelectorAll(".floating-card");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {
      const moveX = (x - 0.5) * 20 * (index + 1);
      const moveY = (y - 0.5) * 20 * (index + 1);
      card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
console.log("RINZO SEARCH - Interactive features loaded successfully");
