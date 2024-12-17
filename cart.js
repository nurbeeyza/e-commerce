const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const productsContainer = document.getElementById("product-info-container");
const cartSubtotal = document.getElementById("total-subtotal");
const cartSubtotalDiscounted = document.getElementById(
  "total-subtotal-discounted"
);

const cartQuantityCircle = document.getElementById("cart-quantity-identicator");

const wishlistQuantity = document.getElementById(
  "wishlist-quantity-identicator"
);

const couponButton = document.getElementById("coupon-button");
const discountMes = document.getElementById("discount-message");

let itemQuantity = 1;
let totalPrice = "";

let coupons = ["NEWYEAR2024", "EIDMUBARAK", "BLACKFRIDAY"];

let cartItems = null;
let discountState = false;

getFromCart();

function getFromCart() {
  cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
  console.log(cartItems);
  cartItems.forEach((product) => {
    if ("quantity" in product) {
    } else {
      product.quantity = 1;
    }
  });
  let htmlProduct = "";
  if (cartItems.length == 0) {
    htmlProduct = `<h4 class="empty-cart">Your cart is empty</h4>`;
    productsContainer.innerHTML += htmlProduct;
    cartQuantityCircle.innerText = 0;
    return;
  }

  wishlistItems = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  localStorage.setItem("wishlistProducts", JSON.stringify(wishlistItems));
  wishlistQuantity.innerText = wishlistItems.length;

  for (let i = 0; i < cartItems.length; i++) {
    htmlProduct = "";
    htmlProduct += `<div class="product-info">
                          <div class="image-and-title">
                          <img class="item-image" src="${cartItems[i].image}">
                          <h4 class="item-title-h4">${cartItems[i].title}</h4>
                          </div>
                          <h4>${cartItems[i].price}$</h4>
                          <div class="quantity-button">
                            <div class="quantity-button-contents">
                            <h4 id="item-quantity-${i}">${
      cartItems[i].quantity
    }</h4>
                            <div class="button-div">
                              <button onClick="quantityPlus(${
                                cartItems[i].price
                              }, ${i}
                              )" class="button-up" id="button-up"></button>
                              <button onClick="quantityMinus(${
                                cartItems[i].price
                              }, ${i}
                              )" class="button-down" id="button-down"></button>
                            </div>
                            </div>
                          </div>
                          <h4 id="subtotal-price-${i}">${(
      cartItems[i].price * cartItems[i].quantity
    ).toFixed(2)}$</h4>
                      </div>`;
    productsContainer.innerHTML += htmlProduct;
  }
  cartQuantityCircle.innerText = cartItems.length;
  updateSubtotal();
}

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

function quantityPlus(price, index) {
  itemQuantity = document.getElementById(`item-quantity-${index}`);
  totalPrice = document.getElementById(`subtotal-price-${index}`);
  console.log(`subtotal-price-${index}`);
  let quantity = parseInt(cartItems[index].quantity, 10);
  quantity++;
  cartItems[index].quantity = quantity;
  itemQuantity.innerText = quantity;
  let finalPrice = (price * quantity).toFixed(2);
  totalPrice.innerText = finalPrice + "$";

  localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  console.log(finalPrice);
  updateSubtotal();
}

function quantityMinus(price, index) {
  itemQuantity = document.getElementById(`item-quantity-${index}`);
  totalPrice = document.getElementById(`subtotal-price-${index}`);
  let quantity = parseInt(itemQuantity.innerText, 10);

  if (quantity > 1) {
    quantity--;
    itemQuantity.innerText = quantity;

    let finalPrice = (price * quantity).toFixed(2);
    totalPrice.innerText = finalPrice + "$";

    cartItems[index].quantity = quantity;
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  } else {
    cartItems.splice(index, 1);

    let newCartArr = JSON.stringify(cartItems);
    localStorage.setItem("cartProducts", newCartArr);
    updateCart();
  }
  updateSubtotal();
}

function updateCart() {
  productsContainer.innerHTML = ` <div class="product-info">
  <h4 id="title">Product</h4>
  <h4>Price</h4>
  <h4>Quantity</h4>
  <h4>Subtotal</h4>
</div>`;
  getFromCart();
}

couponButton.addEventListener("click", () => {
  let couponCode = document.getElementById("coupon-input").value;
  checkOutCoupon(couponCode);
});

function checkOutCoupon(code) {
  for (coupon in coupons) {
    if (coupons[coupon].toLowerCase() === code.toLowerCase()) {
      discountState = true;
      discountMes.innerText = `40% discount has been applied. Used code: ${code}`;
      discountMes.style.color = "green";
    } else {
      discountMes.innerText = "The code you have entered is not a valid one!";
      discountMes.style.color = "red";
    }
  }
  discountMes.style.display = "block";
  updateSubtotal();
}

function updateSubtotal() {
  let cost = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cost += cartItems[i].quantity * cartItems[i].price;
  }
  cartSubtotal.innerText = cost.toFixed(2) + "$";

  if (discountState === true) {
    cartSubtotalDiscounted.innerText = (cost * 0.6).toFixed(2) + "$";
  } else {
    cartSubtotalDiscounted.innerText = cost.toFixed(2) + "$";
  }
}
