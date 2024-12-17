const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const productsContainer = document.getElementById("wishlist-items-container");
const wishlistCounterTitle = document.getElementById("wishlist-counter");

const wishlistQuantity = document.getElementById(
  "wishlist-quantity-identicator"
);
const cartQuantity = document.getElementById("cart-quantity-identicator");

let wishlistItems = [];
let cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

async function getAllProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
  } catch (error) {
    console.error(error);
  }
  console.log(allProducts);
  getFromWishlist();
}

getAllProducts();

function getFromWishlist() {
  wishlistItems =
    JSON.parse(localStorage.getItem("wishlistProducts")) ||
    [
      allProducts[5],
      allProducts[6],
      allProducts[7],
      allProducts[8],
      allProducts[9],
      allProducts[10],
      allProducts[11],
    ];
  localStorage.setItem("wishlistProducts", JSON.stringify(wishlistItems));
  console.log(wishlistItems);
  wishlistQuantity.innerText = wishlistItems.length;
  cartQuantity.innerText = cartItems.length;
  wishlistCounterTitle.innerText = `Wihslist (${wishlistItems.length})`;

  // wishlistItems.forEach((product) => {
  //   if ("quantity" in product) {
  //   } else {
  //     product.quantity = 1;
  //   }
  // });

  let htmlProduct = "";
  if (wishlistItems.length == 0) {
    htmlProduct = `<h4 class="empty-cart">No items in wishlist.</h4>`;
    productsContainer.innerHTML += htmlProduct;
    // cartQuantityCircle.innerText = 0;
    // update heart icon
    return;
  }

  for (let i = 0; i < wishlistItems.length; i++) {
    htmlProduct = "";
    htmlProduct += `    <div class="wishlist-item">
                          <span id="" style="color: black;">
                          <i onclick="deleteWishlistProduct(${wishlistItems[i].id})" id="delete-icon" class="fa-regular fa-lg fa-trash-can"></i>
                          </span>
                          <div class="wishlist-image-container">
                                <img class="wishlist-image" src="${wishlistItems[i].image}">
                          </div>
                          <button class="cart-add-button" onclick="addToCart(${wishlistItems[i].id})">
                          <i class="fa-solid fa-cart-shopping"></i>
                           Add to Cart</button>
                          <h4 class="wishlist-h4-title">${wishlistItems[i].title}</h4>
                          <h4 class="red-text">$ ${wishlistItems[i].price}</h4>
                        </div>
                      </div>`;
    productsContainer.innerHTML += htmlProduct;
  }

  // cartQuantityCircle.innerText = cartItems.length;
  // heart icon updater
}

hamburgerBar.addEventListener("click", () => {
  hamburgerBarContents.classList.add("hamburger-bar-toggled");
});

hamburgerBarCloser.addEventListener("click", () => {
  hamburgerBarContents.classList.remove("hamburger-bar-toggled");
});

button.addEventListener("click", () => {
  closeLangButton();
  //
  //  1. HOW TO CLOSE THIS WHEN ANYWHERE ELSE IS CLICKED ??
  //
});

function closeLangButton() {
  dropdown.classList.toggle("toggle-div");
}

userInputField.addEventListener("focus", () => {
  searchIcon.classList.add("search-icon-invisible");
});

userInputField.addEventListener("blur", () => {
  searchIcon.classList.remove("search-icon-invisible");
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

function addToCart(productId) {
  const isAdded = cartItems.some((product) => product.id === productId);

  if (!isAdded) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );

    const productToAddNew = { ...productToAdd, quantity: 1 };

    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartItems, productToAddNew])
    );
  }
  cartItems = JSON.parse(localStorage.getItem("cartProducts"));
  cartQuantity.innerText = cartItems.length;
}

function deleteWishlistProduct(productId) {
  const filteredItems = JSON.parse(
    localStorage.getItem("wishlistProducts")
  ).filter((product) => product.id !== productId);

  localStorage.setItem("wishlistProducts", JSON.stringify(filteredItems));
  productsContainer.innerHTML = "";
  wishlistQuantity.innerText = wishlistItems.length;
  getFromWishlist();
}
