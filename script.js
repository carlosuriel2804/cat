const products = [
  {
    name: "Mochila Urbana",
    category: "Accesorios",
    price: "$899 MXN",
    description: "Ligera, resistente y con compartimento para laptop.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tenis Minimal",
    category: "Calzado",
    price: "$1,299 MXN",
    description: "Diseno comodo para uso diario con estilo limpio.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Lampara Mesa",
    category: "Hogar",
    price: "$649 MXN",
    description: "Luz calida y acabado moderno para cualquier espacio.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Reloj Clasico",
    category: "Accesorios",
    price: "$1,150 MXN",
    description: "Acabado elegante con correa ajustable y estilo atemporal.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Silla Nordica",
    category: "Hogar",
    price: "$2,499 MXN",
    description: "Ideal para comedor o estudio con estructura de madera.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Audifonos Wave",
    category: "Tecnologia",
    price: "$1,799 MXN",
    description: "Audio nitido, bateria de larga duracion y diseno premium.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
];

const filtersContainer = document.querySelector(".filters");
const productGrid = document.querySelector("#product-grid");

const categories = ["Todos", ...new Set(products.map((product) => product.category))];

function renderFilters() {
  filtersContainer.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `filter-button${category === "Todos" ? " active" : ""}`;
    button.dataset.filter = category;
    button.textContent = category;
    filtersContainer.appendChild(button);
  });
}

function renderProducts(activeCategory = "Todos") {
  const visibleProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((product) => product.category === activeCategory);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-card-content">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="product-price">${product.price}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

filtersContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-button");

  if (!button) {
    return;
  }

  document.querySelectorAll(".filter-button").forEach((item) => {
    item.classList.remove("active");
  });

  button.classList.add("active");
  renderProducts(button.dataset.filter);
});

renderFilters();
renderProducts();
