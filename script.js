const products = [
  {
    name: "Mochila Urbana",
    category: "Accesorios",
    price: "$899 MXN",
    description: "Ligera, resistente y con compartimento para laptop.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    name: "Tenis Minimal",
    category: "Calzado",
    price: "$1,299 MXN",
    description: "Diseno comodo para uso diario con estilo limpio.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    name: "Lampara Mesa",
    category: "Hogar",
    price: "$649 MXN",
    description: "Luz calida y acabado moderno para cualquier espacio.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    name: "Reloj Clasico",
    category: "Accesorios",
    price: "$1,150 MXN",
    description: "Acabado elegante con correa ajustable y estilo atemporal.",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    name: "Silla Nordica",
    category: "Hogar",
    price: "$2,499 MXN",
    description: "Ideal para comedor o estudio con estructura de madera.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    name: "Audifonos Wave",
    category: "Tecnologia",
    price: "$1,799 MXN",
    description: "Audio nitido, bateria de larga duracion y diseno premium.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=900&q=80",
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
