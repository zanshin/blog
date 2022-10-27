var toggle = document.getElementById("dark-mode-toggle");
var darkTheme = document.getElementById("dark-mode-theme");

var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

// the default theme is the systme theme, unless the user has
// explicitly overridden it.
var savedTheme = localStorage.getItem("dark-mode-storage") || systemTheme;
setTheme(savedTheme);

// set the approproiate theme when the user toggles the button
toggle.addEventListener("click", () => {
  if (toggle.className == "fa fa-moon-o") {
    setTheme("dark");
    localStorage.setItem("dark-mode-storage", "dark");
  } else if (toggle.className == "fa fa-sun-o") {
    setTheme("light");
    localStorage.setItem("dark-mode-storage", "light");
  }
});

// add an event listener when the browser theme changes.
// the user defined theme does take precedence, so if the
// changed the browser theme, do not persist the change
// across refreshes.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });

function setTheme(mode) {
  if (mode == "dark") {
    darkTheme.disabled = false;
    toggle.className = "fa fa-sun-o";
    toggle.title = "Enable Light Mode";
  } else if (mode == "light") {
    darkTheme.disabled = true;
    toggle.className = "fa fa-moon-o";
    toggle.title = "Enable Dark Mode";
  }
}
