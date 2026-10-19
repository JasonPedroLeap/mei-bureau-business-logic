(() => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  const sections = [...document.querySelectorAll("[data-slide]")];
  let index = 0;

  const focusSlide = (i) => {
    if (!sections.length) return;
    index = Math.max(0, Math.min(sections.length - 1, i));
    sections.forEach((s) => s.classList.remove("present-focus"));
    const el = sections[index];
    el.classList.add("present-focus");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const bar = document.querySelector("[data-presenter]");
  if (bar && sections.length) {
    bar.querySelector("[data-prev]")?.addEventListener("click", () => focusSlide(index - 1));
    bar.querySelector("[data-next]")?.addEventListener("click", () => focusSlide(index + 1));
    bar.querySelector("[data-reset]")?.addEventListener("click", () => focusSlide(0));
  }

  document.addEventListener("keydown", (e) => {
    if (!sections.length) return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      focusSlide(index + 1);
    }
    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      focusSlide(index - 1);
    }
    if (e.key === "Home") {
      e.preventDefault();
      focusSlide(0);
    }
  });
})();
