// Shared behavior: email link, theme toggle, abstract toggles.
document.querySelectorAll("a.mail").forEach(a => a.addEventListener("click", e => {
  e.preventDefault(); location.href = "mailto:" + a.dataset.u + "@" + a.dataset.d;
}));
document.querySelectorAll(".theme-toggle").forEach(b => b.addEventListener("click", () => {
  const dark = document.documentElement.classList.toggle("dark");
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
}));
const btns = [...document.querySelectorAll("button.btn[aria-controls]")];
btns.forEach(btn => btn.addEventListener("click", () => {
  const willOpen = btn.getAttribute("aria-expanded") !== "true";
  btns.forEach(o => {
    const on = o === btn && willOpen;
    o.setAttribute("aria-expanded", on);

    document.getElementById(o.getAttribute("aria-controls")).classList.toggle("open", on);
  });
}));
