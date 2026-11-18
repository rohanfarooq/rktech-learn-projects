const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");
const themeBtn = document.querySelector("#theme-btn");

// Mobile menu: open and close
menuBtn.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.textContent = isOpen ? "Close" : "Menu";
});

// Close the menu after tapping a link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
    menuBtn.textContent = "Menu";
  });
});

// Dark mode, remembered with localStorage
function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("theme", theme);
}

themeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

setTheme(localStorage.getItem("theme") || "light");

// Footer year, always up to date
document.querySelector("#year").textContent = new Date().getFullYear();
