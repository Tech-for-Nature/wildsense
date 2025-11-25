document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script loaded");

  // Highlight the active navbar link based on the current page
  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPath.split("/").pop()) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
