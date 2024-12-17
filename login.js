const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const login = document.getElementById("login-btn");

login.addEventListener("click", () => {
  if (username.value.length !== 0 && password.value.length !== 0) {
    location.href = "index.html";
  } else {
    if (username.value.length === 0) {
      username.classList.add("error-field");
    }
    if (password.value.length === 0) {
      password.classList.add("error-field");
    }
  }
});

hamburgerBar.addEventListener("click", () => {
  hamburgerBarContents.classList.add("hamburger-bar-toggled");
});

hamburgerBarCloser.addEventListener("click", () => {
  hamburgerBarContents.classList.remove("hamburger-bar-toggled");
});

button.addEventListener("click", () => {
  closeLangButton();
});

function closeLangButton() {
  dropdown.classList.toggle("toggle-div");
}

userInputField.addEventListener("focus", () => {
  searchIcon.classList.add("search-icon-invisible");
});

userInputField.addEventListener("blur", () => {
  searchIcon.classList.remove("search-icon-invisible");
  userInputField.value = "";
});

function changeLang(languageId) {
  const language = document.getElementById(languageId);
  changingLang = button.innerText;
  button.innerHTML =
    language.innerText +
    `<i id="dropdown-icon" class="fa-solid fa-caret-down"></i>`;
  language.innerText = changingLang;
  event.preventDefault();
  closeLangButton();
}
