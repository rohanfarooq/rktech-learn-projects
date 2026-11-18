// Works, but you attach 18 listeners, and any button you add later is left out.
document.querySelectorAll(".keys button").forEach((button) => {
  button.addEventListener("click", () => {
    // handle this one button
  });
});
