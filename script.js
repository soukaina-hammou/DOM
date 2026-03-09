// ============ Product Data ============
const products = [
  { id: 1, name: "Classic Sneakers", description: "White / Size 42", price: 29.99, image: "https://static.ftshp.digital/img/p/9/3/1/4/7/4/931474-full_product.jpg", quantity: 1, liked: false },
  { id: 2, name: "Denim Jacket",    description: "Blue / Size M",   price: 49.99, image: "https://image.hm.com/assets/hm/75/06/7506e354c0dda3f0389c5a44b720b2268ae1a5a1.jpg?imwidth=2160", quantity: 1, liked: false },
  { id: 3, name: "Baseball Cap",    description: "Black / One Size", price: 19.99, image: "https://store.moma.org/cdn/shop/files/3a2b0b12-bde3-4a63-bba2-b561dbd7de29_5fa67989-c4a0-4bea-a74b-fb25ed894895.jpg?v=1710971142",    quantity: 1, liked: false },
];

// ============ Root ============
const app = document.getElementById("app");

// ============ Build Cart Container ============
const cartContainer = document.createElement("div");
cartContainer.className = "cart-container";
app.appendChild(cartContainer);

// ---- Title ----
const cartTitle = document.createElement("div");
cartTitle.className = "cart-title";
cartContainer.appendChild(cartTitle);

const titleText = document.createTextNode("Shopping Cart ");
cartTitle.appendChild(titleText);

const cartCount = document.createElement("span");
cartTitle.appendChild(cartCount);

// ---- Items Wrapper ----
const cartItemsWrapper = document.createElement("div");
cartItemsWrapper.id = "cart-items";
cartContainer.appendChild(cartItemsWrapper);

// ---- Empty Message ----
const emptyMessage = document.createElement("div");
emptyMessage.className = "empty-message";
emptyMessage.textContent = "Your cart is empty.";
cartContainer.appendChild(emptyMessage);

// ---- Summary ----
const cartSummary = document.createElement("div");
cartSummary.className = "cart-summary";
cartContainer.appendChild(cartSummary);

const totalLabel = document.createElement("div");
totalLabel.className = "total-label";
totalLabel.textContent = "Total";
cartSummary.appendChild(totalLabel);

const totalPriceEl = document.createElement("div");
totalPriceEl.className = "total-price";
cartSummary.appendChild(totalPriceEl);

// ============ Create a Single Cart-Item Element ============
function createCartItemElement(product) {
  // Row
  const row = document.createElement("div");
  row.className = "cart-item";
  row.setAttribute("data-id", product.id);

  // Image
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  row.appendChild(img);

  // Details
  const details = document.createElement("div");
  details.className = "item-details";

  const nameEl = document.createElement("div");
  nameEl.className = "item-name";
  nameEl.textContent = product.name;
  details.appendChild(nameEl);

  const descEl = document.createElement("div");
  descEl.className = "item-description";
  descEl.textContent = product.description;
  details.appendChild(descEl);

  const priceEl = document.createElement("div");
  priceEl.className = "item-price";
  priceEl.textContent = "$" + (product.price * product.quantity).toFixed(2);
  details.appendChild(priceEl);

  row.appendChild(details);

  // Actions
  const actions = document.createElement("div");
  actions.className = "item-actions";

  // Quantity controls
  const qtyControls = document.createElement("div");
  qtyControls.className = "quantity-controls";

  const btnMinus = document.createElement("button");
  btnMinus.className = "btn-minus";
  btnMinus.textContent = "\u2212"; // −
  qtyControls.appendChild(btnMinus);

  const qtyValue = document.createElement("span");
  qtyValue.className = "quantity-value";
  qtyValue.textContent = product.quantity;
  qtyControls.appendChild(qtyValue);

  const btnPlus = document.createElement("button");
  btnPlus.className = "btn-plus";
  btnPlus.textContent = "+";
  qtyControls.appendChild(btnPlus);

  actions.appendChild(qtyControls);

  // Like button
  const btnLike = document.createElement("button");
  btnLike.className = "btn-like" + (product.liked ? " liked" : "");
  btnLike.innerHTML = "\u2665"; // ♥
  actions.appendChild(btnLike);

  // Delete button
  const btnDelete = document.createElement("button");
  btnDelete.className = "btn-delete";
  btnDelete.innerHTML = "&#128465;"; // 🗑
  actions.appendChild(btnDelete);

  row.appendChild(actions);

  return row;
}

// ============ Render All Items ============
function renderCart() {
  cartItemsWrapper.innerHTML = "";
  products.forEach(function (product) {
    cartItemsWrapper.appendChild(createCartItemElement(product));
  });
  updateTotal();
}

// ============ Update Total & Count ============
function updateTotal() {
  let total = 0;
  products.forEach(function (p) {
    total += p.price * p.quantity;
  });
  totalPriceEl.textContent = "$" + total.toFixed(2);
  cartCount.textContent = products.length;
  emptyMessage.style.display = products.length === 0 ? "block" : "none";
}

// ============ Helper: find product from a clicked element ============
function getProductFromEvent(target) {
  const row = target.closest(".cart-item");
  if (!row) return null;
  const id = Number(row.getAttribute("data-id"));
  return products.find(function (p) { return p.id === id; });
}

// ============ Event Delegation ============
cartItemsWrapper.addEventListener("click", function (e) {
  const target = e.target;
  const product = getProductFromEvent(target);
  if (!product) return;
  const row = target.closest(".cart-item");

  // ---- Plus ----
  if (target.classList.contains("btn-plus")) {
    product.quantity++;
    row.querySelector(".quantity-value").textContent = product.quantity;
    row.querySelector(".item-price").textContent = "$" + (product.price * product.quantity).toFixed(2);
    updateTotal();
  }

  // ---- Minus ----
  if (target.classList.contains("btn-minus") && product.quantity > 1) {
    product.quantity--;
    row.querySelector(".quantity-value").textContent = product.quantity;
    row.querySelector(".item-price").textContent = "$" + (product.price * product.quantity).toFixed(2);
    updateTotal();
  }

  // ---- Delete ----
  if (target.classList.contains("btn-delete")) {
    products.splice(products.indexOf(product), 1);
    row.remove();
    updateTotal();
  }

  // ---- Like ----
  if (target.classList.contains("btn-like")) {
    product.liked = !product.liked;
    target.classList.toggle("liked");
  }
});

// ============ Initial Render ============
renderCart();