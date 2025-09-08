"use strict";

console.log(">> Ready... go! :)");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

const form = document.querySelector(".search-form");
const inputSearch = document.querySelector(".search-input");
const cartList = document.querySelector(".cart-list");
const resultList = document.querySelector(".products-list");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clearCart-btn");
const buyCartBtn = document.querySelector(".buyCart-btn");

function renderResults(productsToShow) {
  console.log("Renderizando productos:", productsToShow);
  resultList.innerHTML = "";

  for (const product of productsToShow) {
    const image = product.image || "https://placehold.co/600x400";

    const isInCart = cart.find((item) => item.id === product.id);

    const li = document.createElement("li");
    li.innerHTML = `
            <article>
                <img src='${image}' alt='${
                product.title
                }' width='150' height='200'/>
                <div class= "product-info">
                <h3>${product.title}</h3>
                <p>${product.price} €</p>
                <button 
                class='productAdd-btn ${isInCart ? "productDelete-btn" : ""}'
                data-id='${product.id}'>
                ${isInCart ? "Eliminar" : "Añadir"}
                </button>
                </div>
            </article>
            `;
    resultList.appendChild(li);
  }

  const allButtons = document.querySelectorAll(".productAdd-btn");
  for (const btn of allButtons) {
    btn.addEventListener("click", handleCartToggle);
  }
}

function renderCart() {
  cartList.innerHTML = "";

  let totalPrice = 0;
  let totalItems = 0;

  for (const product of cart) {
    totalPrice += product.price * product.quantity;
    totalItems += product.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <article class="cart-item">
      <img src='${product.image || "https://placehold.co/50x50"}'
      alt='${product.title}'
      width='50' height='50' />
      <div class="cart-info">
      <h4>${product.title}</h4>
                <p>${product.price} €
                x${product.quantity}</p>
                </div>
            <div class="cart-actions">
            <button class='cartIncrease-btn' data-id='${
              product.id
            }'><img src="./images/mas.png" alt="Sumar unidad" width='10' height='10' /></button>
            <button class="cartDecrease-btn" data-id='${
              product.id
            }'><img src="./images/menos.png" alt="Restar unidad" width='10' height='10' /></button>
            <button class="cartRemove-btn" data-id='${
              product.id
            }'><img src="./images/cruz.png" alt="Cancelar artículo" width='10' height='10' /></button>
                </div>
                </article>
                `;
    cartList.appendChild(li);
  }

  cartTotal.textContent = `Total ${totalPrice.toFixed(
    2
  )} € | ${totalItems} artículo${totalItems !== 1 ? "s" : ""}`;

  clearCartBtn.classList.toggle("hidden", cart.length === 0);
  buyCartBtn.classList.toggle("hidden", cart.length === 0);

  const buttonConfigs = [
    { selector: ".cartIncrease-btn", handler: handleIncreaseQuantity },
    { selector: ".cartDecrease-btn", handler: handleDecreaseQuantity },
    { selector: ".cartRemove-btn", handler: handleRemoveFromCart },
  ];

  for (const config of buttonConfigs) {
    const buttons = document.querySelectorAll(config.selector);
    for (const btn of buttons) {
      btn.addEventListener("click", config.handler);
    }
  }
}

function handleCartToggle(event) {
  const clickedId = parseInt(event.currentTarget.dataset.id);
  const productInCart = cart.find((item) => item.id === clickedId);

  if (!productInCart) {
    const productToAdd = products.find((item) => item.id === clickedId);
    cart.push({ ...productToAdd, quantity: 1 });
  } else {
    cart = cart.filter((item) => item.id !== clickedId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderResults(products);
  renderCart();
}

function handleIncreaseQuantity(event) {
  const clickedId = parseInt(event.currentTarget.dataset.id);
  const productInCart = cart.find((item) => item.id === clickedId);
  if (productInCart) {
    productInCart.quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function handleDecreaseQuantity(event) {
  const clickedId = parseInt(event.currentTarget.dataset.id);
  const productInCart = cart.find((item) => item.id === clickedId);
  if (productInCart) {
    productInCart.quantity--;
    if (productInCart.quantity <= 0) {
      cart = cart.filter((item) => item.id !== clickedId);

      renderResults(products);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function handleRemoveFromCart(event) {
  const clickedId = parseInt(event.currentTarget.dataset.id);

  const indexInCart = cart.findIndex((item) => item.id === clickedId);

  cart = cart.filter((item) => item.id !== clickedId);
  localStorage.setItem("cart", JSON.stringify(cart));

  renderResults(products);
  renderCart();
}

function handleClearCart() {
  cart = [];
  localStorage.removeItem("cart");
  renderResults(products);
  renderCart();
}

function getData() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderResults(products);
      renderCart();
    })
    .catch((error) => {
      console.error("Error con la API principal, usando la de backup", error);

      fetch(
        "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json"
      )
        .then((response) => response.json())
        .then((data) => {
          products = data;
          renderResults(products);
          renderCart();
        });
    });
}

clearCartBtn.addEventListener("click", handleClearCart);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = inputSearch.value.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );

  renderResults(filteredProducts);
});

getData();
