const body = document.body;
const header = document.querySelector("[data-nav]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const hero = document.querySelector(".hero");
let heroFrame = 0;

const setMenuState = (isOpen) => {
  body.classList.toggle("menu-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  mobileMenu?.setAttribute("aria-hidden", String(!isOpen));
};

menuToggle?.addEventListener("click", () => {
  setMenuState(!body.classList.contains("menu-open"));
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const updateHeroParallax = () => {
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, Math.abs(rect.top) / Math.max(rect.height, 1)));
  hero.style.setProperty("--hero-scroll", `${progress * 44}px`);
  heroFrame = 0;
};

const queueHeroParallax = () => {
  if (heroFrame) return;
  heroFrame = window.requestAnimationFrame(updateHeroParallax);
};

window.addEventListener("scroll", queueHeroParallax, { passive: true });
window.addEventListener(
  "pointermove",
  (event) => {
    if (!hero || window.matchMedia("(max-width: 720px)").matches) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 28;
    const y = (event.clientY / window.innerHeight - 0.5) * 28;
    hero.style.setProperty("--hero-pointer-x", `${x}px`);
    hero.style.setProperty("--hero-pointer-y", `${y}px`);
  },
  { passive: true },
);

updateHeroParallax();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});
