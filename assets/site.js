document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Dark/light toggle — dark is the default; choice persists via localStorage
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const dark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
  });

  // Expandable abstracts — only one open at a time.
  // Panels are authored open so they stay readable without JS; collapse them here.
  const toggles = Array.from(document.querySelectorAll(".abstract-toggle"));
  const panelFor = btn => document.getElementById(btn.getAttribute("aria-controls"));

  const setOpen = (btn, isOpen) => {
    const panel = panelFor(btn);
    if (!panel) return;
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    panel.classList.toggle("collapsed", !isOpen);
  };

  toggles.forEach(btn => {
    setOpen(btn, false);
    btn.addEventListener("click", () => {
      const willOpen = btn.getAttribute("aria-expanded") !== "true";
      toggles.forEach(other => setOpen(other, other === btn && willOpen));
    });
  });
});
