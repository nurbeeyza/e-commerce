const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

let selectedButton = document.getElementById("btn3");

const changingImage = document.getElementById("image1");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const catContainer = document.getElementById("cat-container");

const cartQuantityCircle = document.getElementById("cart-quantity-identicator");

const wishlistQuantity = document.getElementById(
  "wishlist-quantity-identicator"
);

let containerItems = [
  { src: "cat-camera.svg", title: "Camera" },
  { src: "cat-celphone.svg", title: "Cellphone" },
  { src: "cat-computer.svg", title: "Computer" },
  { src: "cat-gamepad.svg", title: "Gamepad" },
  { src: "cat-headphone.svg", title: "Hadphone" },
  { src: "cat-smartwatch.svg", title: "Smartwatch" },
];

const hoursE = document.getElementById("special-hours");
const minutesE = document.getElementById("special-minutes");
const secondsE = document.getElementById("special-seconds");

const specialImage = document.getElementById("special-image");
const specialContent = document.getElementById("special-item-content");

const addToCartButton = document.getElementById("add-to-cart-button");

let allProducts = [];
let randomElement = {};

async function getAllProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
    renderExploreProducts();
  } catch (error) {
    console.error(error);
  }
  renderBestProducts();
  loadContainer();
  specialContentUpdater();
  timer24(86399);
  updateIdenticatorIcons();
}
getAllProducts();

hamburgerBar.addEventListener("click", () => {
  hamburgerBarContents.classList.add("hamburger-bar-toggled");
});

hamburgerBarCloser.addEventListener("click", () => {
  hamburgerBarContents.classList.remove("hamburger-bar-toggled");
});

function updateIdenticatorIcons() {
  wishlistItems = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
  wishlistQuantity.innerText = wishlistItems.length;
  cartQuantityCircle.innerText = cartItems.length;
}

let images = [
  "/images/carousell-images/iphonee.svg",
  "/images/carousell-images/gucci-perfume.png",
  "/images/carousell-images/playstation5.png",
  "/images/carousell-images/speakers.png",
  "/images/carousell-images/woman-with-hat.png",
];

function imageChanger(i, elementId) {
  changingImage.setAttribute("src", images[i - 1]);
  selectedButton.classList.remove("active-btn");
  selectedButton = document.getElementById(elementId);
  selectedButton.classList.add("active-btn");
}

button.addEventListener("click", () => {
  closeLangButton();
});

function closeLangButton() {
  dropdown.classList.toggle("toggle-div");
}

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

userInputField.addEventListener("focus", () => {
  searchBarRes.classList.add("search-bar-visible");
  searchIcon.classList.add("search-icon-invisible");
});

userInputField.addEventListener("blur", () => {
  searchBarRes.classList.remove("search-bar-visible");
  searchIcon.classList.remove("search-icon-invisible");
});

userInputField.addEventListener("keyup", () => {
  let a = document.getElementById("user-input").value;
  searchBarRes.innerHTML = userSearchResults(a);
});

function userSearchResults(input) {
  let results = new Array();
  if (input.length == 0) {
    return [];
  }
  allProducts.forEach((element) => {
    if (element.title.toLowerCase().includes(input.toLowerCase())) {
      results.push(element.title);
    }
  });
  let htmlResult = "";

  let length = 0;
  if (results.length > 10) {
    length = 10;
  } else {
    length = results.length;
  }
  for (let i = 0; i < length; i++) {
    htmlResult += `<h5 class="text-results" >${results[i]}</h5> \n`;
  }
  return htmlResult;
}

function loadContainer() {
  let categoriesHtml = "";
  for (let i = 0; i < containerItems.length; i++) {
    categoriesHtml += `
      <div class="container-2-items" onmouseout="changeSVGcolorBlack(${i})"  onmouseover="changeSVGcolorWhite(${i})"> 
        <img id="${i}" src="/images/${containerItems[i].src}">
        <h4>${containerItems[i].title}</h4>
      </div>
    `;
  }
  catContainer.innerHTML += categoriesHtml;
}

function changeSVGcolorWhite(i) {
  let element = document.getElementById(i);
  element.classList.add("filter-color-white");
  element.classList.remove("filter-color-black");
}

function changeSVGcolorBlack(i) {
  let element = document.getElementById(i);
  element.classList.add("filter-color-black");
  element.classList.remove("filter-color-white");
}

function specialContentUpdater() {
  randomElement = allProducts[Math.floor(Math.random() * allProducts.length)];
  specialImage.setAttribute("src", `${randomElement.image}`);
  //   specialContent.innerText = randomElement.title;
}

function timer24(timer) {
  setInterval(() => {
    let hours = parseInt((timer / 3600) % 24, 10);
    let minutes = parseInt((timer / 60) % 60, 10);
    let seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer = timer - 1;
    hoursE.innerHTML = hours + "<br>hours";
    minutesE.innerHTML = minutes + "<br>minutes";
    secondsE.innerHTML = seconds + "<br>seconds";
  }, 1000);
  //   Date ile nasil yapa bilirim ? yarindan bugun u cikarak ?
  //   Date ile bugunun tarihini alip freeze leye biliyormuyuz ?
}

addToCartButton.onclick = function () {
  addToCart(randomElement.id);
  location.href = "cart.html";
};

// // Method from Salih
// function addToCart(productId) {
//   const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

//   const isAdded = cartItems.some((product) => product.id === productId);

//   if (!isAdded) {
//     const productToAdd = allProducts.find(
//       (product) => product.id === productId
//     );

//     localStorage.setItem(
//       "cartProducts",
//       JSON.stringify([...cartItems, productToAdd])
//     );
//   } else {
//     // deleteCartProduct(productId);
//   }
// }

/* SALIH HOMEPAGE EXPLORE PRODUCTS */

/* RENDER FUNCTION */
let exploreStart = 0;
let exploreEnd = 8;

function renderExploreProducts() {
  const productHTML = allProducts
    .slice(exploreStart, exploreEnd)
    .map((product) => {
      return `
<div class="explore-card">
<div class="image-container card">
<img class="product-image" src="${product.image}" alt="${product.title}" />
  <div class="overlay">
            <div class="text" id="addToCart_${product.id}" onclick="addToCart(${
        product.id
      })">Add To Cart</div>
        </div>
</div>
<h3 class="product-title">  ${productText(product.title)}</h3>
<div class="rating-score">
<span class="product-price">$${product.price}</span>
<p> ${getStars(product.rating.rate)}</p>
<p> (${product.rating.count})</p>
</div>
</div>
`;
    })
    .join("");

  exploreProducts.innerHTML = productHTML;
}

/* UTIL FUNCTIONS */

function productText(value) {
  const words = value.split(" ");
  return words.slice(0, 4).join(" ") + "";
}

function getStars(rating) {
  let stars = ``;
  for (let i = 0; i < rating.toFixed(0); i++) {
    stars += `<img src= "images/star1.png" />`;
  }
  return stars;
}

function addToCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const isAdded = cartItems.some((product) => product.id === productId);
  const addButton = document.querySelector(`#addToCart_${productId}`);

  if (!isAdded) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );

    const productToAddNew = { ...productToAdd, quantity: 1 };

    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartItems, productToAddNew])
    );
    if (addButton === null) {
      addButton.textContent = "Remove From Cart";
    }
  } else {
    deleteCartProduct(productId, cartItems);
    if (addButton === null) {
      addButton.textContent = "Add To Cart";
    }
  }
  updateIdenticatorIcons();
}

function deleteCartProduct(productId, cartItems) {
  const filteredItems = cartItems.filter((product) => product.id !== productId);

  localStorage.setItem("cartProducts", JSON.stringify(filteredItems));
}

function viewAll() {
  exploreEnd = allProducts.length;
  exploreStart = 0;
  renderExploreProducts();
}

function nextBtn() {
  if (exploreEnd < allProducts.length) {
    exploreStart += 8;
    exploreEnd += 8;
    renderExploreProducts();
  }
}

function backBtn() {
  if (exploreStart > 0) {
    exploreStart -= 8;
    exploreEnd -= 8;
    renderExploreProducts();
  }
}
/* SALIH HOMEPAGE EXPLORE PRODUCTS END */

const productsContainer = document.querySelector("#bestProducts");

/* SALIH BEST SELLING PRODUCTS  */

let bestStart = 0;
let bestEnd = 4;

function renderBestProducts() {
  const productHTML = allProducts
    .slice(bestStart, bestEnd)
    .map((product, index) => {
      let discountedPrice = product.price;
      if (index < 2) {
        discountedPrice *= 0.8;
      }

      return `
        <div class="best-card">
          <div class="image-container card">
            <img class="product-image" src="${product.image}" alt="${
        product.title
      }" />
            <div class="overlay">
              <div class="text" id="addToCart_${
                product.id
              }" onclick="addToCart(${product.id})">Add To Cart</div>
            </div>
          </div>
          <h3 class="product-title">  ${productText(product.title)}</h3>
          <div class="rating-score">
            ${
              index < 2
                ? `<span class="discount-price">$${discountedPrice.toFixed(
                    2
                  )}</span>`
                : ""
            }
            <span class="product-price">${
              index < 2
                ? `<del>$${product.price.toFixed(2)}</del>`
                : `$${product.price.toFixed(2)}`
            }</span>
            <p> ${getStars(product.rating.rate)}</p>
            <p> (${product.rating.count})</p>
          </div>
        </div>
      `;
    })
    .join("");

  bestProducts.innerHTML = productHTML;
}
/* UTIL FUNCTIONS */

function productText(value) {
  const words = value.split(" ");
  return words.slice(0, 4).join(" ") + "";
}

function getStars(rating) {
  let stars = ``;
  for (let i = 0; i < rating.toFixed(0); i++) {
    stars += `<img src= "images/star1.png" />`;
  }
  return stars;
}

function addToCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const isAdded = cartItems.some((product) => product.id === productId);
  const addButton = document.querySelector(`#addToCart_${productId}`);

  if (!isAdded) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );

    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartItems, productToAdd])
    );
    addButton.textContent = "Remove From Cart";
  } else {
    deleteCartProduct(productId, cartItems);
    addButton.textContent = "Add To Cart";
  }
  updateIdenticatorIcons();
}

function deleteCartProduct(productId, cartItems) {
  const filteredItems = cartItems.filter((product) => product.id !== productId);

  localStorage.setItem("cartProducts", JSON.stringify(filteredItems));
}

function viewBestAll() {
  bestEnd = allProducts.length;
  bestStart = 0;
  renderBestProducts();
}

/* SALIH BEST SELLING PRODUCTS  */
