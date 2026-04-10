const products = [
  {
    name: "Juego de tapetes 4 piezas Chevrolet Aveo 2011 - 2017",
    category: "Tapetes",
    price: "$500 MXN",
    description: "Juego de tapetes 4 piezas de alfombra. Base de hule con pico opresor antiderrapante. Diseñados para Chevrolet Aveo desde 2011 a 2017.",
    images: [
      "aveo-1.jpg",
      "aveo-2.jpg",
      "aveo-3.jpg"
    ],
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
    .map((product, productIndex) => {
      const thumbnails = product.images
        .map(
          (image, imageIndex) => `
            <button
              class="product-thumb${imageIndex === 0 ? " active" : ""}"
              type="button"
              data-product-index="${productIndex}"
              data-image-index="${imageIndex}"
              aria-label="Ver foto ${imageIndex + 1} de ${product.name}"
            >
              <img src="${image}" alt="${product.name} miniatura ${imageIndex + 1}">
            </button>
          `
        )
        .join("");

      return `
        <article class="product-card">
          <img class="product-main-image" src="${product.images[0]}" alt="${product.name}">
          <div class="product-thumbs">
            ${thumbnails}
          </div>
          <div class="product-card-content">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="product-price">${product.price}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
        </article>
      `;
    })
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

productGrid.addEventListener("click", (event) => {
  const thumbnailButton = event.target.closest(".product-thumb");

  if (!thumbnailButton) {
    return;
  }

  const productCard = thumbnailButton.closest(".product-card");
  const mainImage = productCard.querySelector(".product-main-image");
  const product = products[Number(thumbnailButton.dataset.productIndex)];
  const nextImage = product.images[Number(thumbnailButton.dataset.imageIndex)];

  mainImage.src = nextImage;
  mainImage.alt = product.name;

  productCard.querySelectorAll(".product-thumb").forEach((button) => {
    button.classList.remove("active");
  });

  thumbnailButton.classList.add("active");
});

renderFilters();
renderProducts();
