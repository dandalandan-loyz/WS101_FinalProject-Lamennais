// Mobile menu toggle + header shadow on scroll
(function () {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  function setHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }

  function toggleMobileNav() {
    const isOpen = mobileNav && !mobileNav.hasAttribute("hidden");
    if (!mobileNav || !burger) return;

    if (isOpen) {
      mobileNav.setAttribute("hidden", "");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
    } else {
      mobileNav.removeAttribute("hidden");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
    }
  }

  window.addEventListener("scroll", setHeaderShadow);
  window.addEventListener("load", setHeaderShadow);

  if (burger) burger.addEventListener("click", toggleMobileNav);

  // Close menu when clicking a mobile link
  if (mobileNav) {
    mobileNav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a")) {
        mobileNav.setAttribute("hidden", "");
        burger?.setAttribute("aria-expanded", "false");
      }
    });
  }

  const contactForm = document.getElementById("contactForm");
  const messageModal = document.getElementById("messageModal");
  const messageModalClose = document.getElementById("messageModalClose");
  const messageModalOk = document.getElementById("messageModalOk");

  function closeMessageModal() {
    if (!messageModal) return;
    messageModal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  function openMessageModal() {
    if (!messageModal) return;
    messageModal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    messageModalClose?.focus();
  }

  if (contactForm && messageModal) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      openMessageModal();
      contactForm.reset();
    });

    messageModalClose?.addEventListener("click", closeMessageModal);
    messageModalOk?.addEventListener("click", closeMessageModal);

    messageModal.addEventListener("click", (e) => {
      if (e.target === messageModal) {
        closeMessageModal();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !messageModal.hasAttribute("hidden")) {
        closeMessageModal();
      }
    });
  }

  // SCROLL BUTTONS
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const scrollBottomBtn = document.getElementById("scrollBottomBtn");

  // Scroll to top
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Scroll to bottom
  scrollBottomBtn?.addEventListener("click", () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  // Show/hide logic
  window.addEventListener("scroll", () => {
    if (!scrollTopBtn || !scrollBottomBtn) return;
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Show top button when scrolled down
    if (scrollY > 200) {
      scrollTopBtn.classList.remove("hide");
    } else {
      scrollTopBtn.classList.add("hide");
    }

    // Hide bottom button if already near bottom
    if (scrollY > maxScroll - 200) {
      scrollBottomBtn.classList.add("hide");
    } else {
      scrollBottomBtn.classList.remove("hide");
    }
  });
})();
