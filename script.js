document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );
      menuToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
      lucide.createIcons();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  const toast = document.querySelector(".toast");
  document.querySelectorAll('a[href^="https://wa.me"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (toast) {
        toast.textContent = "Opening WhatsApp enquiry...";
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2200);
      }
    });
  });

  const enquiryForm = document.querySelector("#enquiry-form");
  if (enquiryForm) {
    const formMessage = enquiryForm.querySelector(".form-message");
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!enquiryForm.checkValidity()) {
        formMessage.textContent = "Please complete the fields above.";
        formMessage.classList.remove("valid");
        enquiryForm.reportValidity();
        return;
      }

      const formData = new FormData(enquiryForm);
      const message = `Hello KS Electric & Supplier, my name is ${formData.get("name")}. Phone: ${formData.get("phone")}. Requirement: ${formData.get("requirement")}`;
      formMessage.textContent = "Opening WhatsApp with your enquiry...";
      formMessage.classList.add("valid");
      window.open(
        `https://wa.me/9779824285902?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener",
      );
    });
  }

  lucide.createIcons();
});
