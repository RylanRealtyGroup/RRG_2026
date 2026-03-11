(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close when clicking a link (mobile UX)
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeNav());
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside) closeNav();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
})();

<script>
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        status.textContent = "Thanks! Your message has been sent. A member of Rylan Realty Group will reach out soon.";
        status.classList.add("is-success");
        status.classList.remove("is-error");
        form.reset();
      } else {
        status.textContent = "Sorry, something went wrong. Please try again.";
        status.classList.add("is-error");
        status.classList.remove("is-success");
      }
    } catch (error) {
      status.textContent = "Sorry, something went wrong. Please try again.";
      status.classList.add("is-error");
      status.classList.remove("is-success");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
</script>
