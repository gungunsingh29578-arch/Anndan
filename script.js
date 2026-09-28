document.addEventListener("DOMContentLoaded", () => {
  // Scroll elevation for the sticky header
  const header = document.getElementById("annadanHeader");
  const elevateOnScroll = () => {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 8);
  };

  elevateOnScroll();
  window.addEventListener("scroll", elevateOnScroll);

  // Fade-in on scroll (IntersectionObserver)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Basic form validation
  const form = document.getElementById("donationForm");
  if (!form) return;

  const fields = {
    name: { input: document.getElementById("donorName"), error: document.getElementById("nameError") },
    foodType: { input: document.getElementById("foodType"), error: document.getElementById("foodTypeError") },
    quantity: { input: document.getElementById("quantity"), error: document.getElementById("quantityError") },
  };

  const setError = (key, message) => {
    const { input, error } = fields[key];
    if (input) input.setAttribute("aria-invalid", "true");
    if (!error) return;
    error.textContent = message;
    error.classList.remove("hidden");
  };

  const clearErrors = () => {
    Object.keys(fields).forEach((key) => {
      const { input, error } = fields[key];
      if (input) input.removeAttribute("aria-invalid");
      if (error) {
        error.textContent = "";
        error.classList.add("hidden");
      }
    });

    const status = document.getElementById("formStatus");
    if (status) {
      status.textContent = "";
      status.className = "hidden";
    }
  };

  const showStatus = (message, isSuccess) => {
    const status = document.getElementById("formStatus");
    if (!status) return;
    status.className = `mt-3 text-sm ${isSuccess ? "text-emerald-700" : "text-red-600"}`;
    status.textContent = message;
  };

  const goToLoginPage = () => {
    window.location.href = "./login.html?from=home";
  };

  const donateNowBtn = document.getElementById("donateNowBtn");
  if (donateNowBtn) donateNowBtn.addEventListener("click", goToLoginPage);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = fields.name.input?.value?.trim() ?? "";
    const foodType = fields.foodType.input?.value ?? "";
    const quantityRaw = fields.quantity.input?.value ?? "";
    const quantity = Number(quantityRaw);

    let firstInvalid = null;

    if (!name) {
      setError("name", "Please enter your name.");
      firstInvalid = fields.name.input;
    }
    if (!foodType) {
      setError("foodType", "Please choose a food type.");
      firstInvalid = firstInvalid ?? fields.foodType.input;
    }
    if (!quantityRaw || Number.isNaN(quantity) || quantity <= 0) {
      setError("quantity", "Quantity must be a positive number.");
      firstInvalid = firstInvalid ?? fields.quantity.input;
    }
    if (firstInvalid) {
      firstInvalid.focus({ preventScroll: true });
      showStatus("Please fix the highlighted fields and try again.", false);
      return;
    }

    // Demo submit (no backend)
    showStatus("Thanks! Your donation request has been saved (demo).", true);
    form.reset();
  });

});

document.addEventListener("DOMContentLoaded", () => {
  // Scroll elevation for the sticky header
  const header = document.getElementById("annadanHeader");
  const elevateOnScroll = () => {
    if (!header) return;
    header.classList.toggle("shadow-sm", window.scrollY > 8);
  };
  elevateOnScroll();
  window.addEventListener("scroll", elevateOnScroll);

  // Fade-in on scroll (IntersectionObserver)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Basic form validation
  const form = document.getElementById("donationForm");
  if (!form) return;

  const fields = {
    name: { input: document.getElementById("donorName"), error: document.getElementById("nameError") },
    foodType: { input: document.getElementById("foodType"), error: document.getElementById("foodTypeError") },
    quantity: { input: document.getElementById("quantity"), error: document.getElementById("quantityError") },
    location: { input: document.getElementById("location"), error: document.getElementById("locationError") },
  };

  const setError = (key, message) => {
    const { input, error } = fields[key];
    if (input) input.setAttribute("aria-invalid", "true");
    if (!error) return;
    error.textContent = message;
    error.classList.remove("hidden");
  };

  const clearErrors = () => {
    Object.keys(fields).forEach((key) => {
      const { input, error } = fields[key];
      if (input) input.removeAttribute("aria-invalid");
      if (error) {
        error.textContent = "";
        error.classList.add("hidden");
      }
    });
    const status = document.getElementById("formStatus");
    if (status) {
      status.textContent = "";
      status.className = "hidden";
    }
  };

  const showStatus = (message, isSuccess) => {
    const status = document.getElementById("formStatus");
    if (!status) return;
    status.className = `mt-3 text-sm ${isSuccess ? "text-emerald-700" : "text-red-600"}`;
    status.textContent = message;
  };

  const goToLoginPage = () => {
    window.location.href = "./login.html?from=home";
  };

  const donateNowBtn = document.getElementById("donateNowBtn");
  if (donateNowBtn) donateNowBtn.addEventListener("click", goToLoginPage);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = fields.name.input?.value?.trim() ?? "";
    const foodType = fields.foodType.input?.value ?? "";
    const quantityRaw = fields.quantity.input?.value ?? "";
    const location = fields.location.input?.value?.trim() ?? "";
    const quantity = Number(quantityRaw);

    let firstInvalid = null;

    if (!name) {
      setError("name", "Please enter your name.");
      firstInvalid = fields.name.input;
    }
    if (!foodType) {
      setError("foodType", "Please choose a food type.");
      firstInvalid = firstInvalid ?? fields.foodType.input;
    }
    if (!quantityRaw || Number.isNaN(quantity) || quantity <= 0) {
      setError("quantity", "Quantity must be a positive number.");
      firstInvalid = firstInvalid ?? fields.quantity.input;
    }
    if (!location) {
      setError("location", "Please enter the donation location.");
      firstInvalid = firstInvalid ?? fields.location.input;
    }

    if (firstInvalid) {
      firstInvalid.focus({ preventScroll: true });
      showStatus("Please fix the highlighted fields and try again.", false);
      return;
    }

    // Demo submit (no backend)
    showStatus("Thanks! Your donation request has been saved (demo).", true);
    form.reset();
  });

});
