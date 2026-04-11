const THUMBS_PER_CARD = 4;

const filtersContainer = document.querySelector(".filters");
const productGrid = document.querySelector("#product-grid");
const shareToast = document.querySelector("#share-toast");
const categories = ["Todos", ...new Set(window.catalogProducts.map((product) => product.category))];

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
      ? window.catalogProducts
      : window.catalogProducts.filter((product) => product.category === activeCategory);

  productGrid.innerHTML = visibleProducts
    .map((product) => {
      const visibleThumbs = product.images.slice(0, THUMBS_PER_CARD);
      const thumbnails = visibleThumbs
        .map(
          (image, imageIndex) => `
            <a
              class="product-thumb${imageIndex === 0 ? " active" : ""}"
              href="product.html?id=${product.id}&image=${imageIndex}"
              aria-label="Ver foto ${imageIndex + 1} de ${product.name}"
            >
              <img src="${image}" alt="${product.name} miniatura ${imageIndex + 1}">
            </a>
          `
        )
        .join("");
      const remainingImages = product.images.length - visibleThumbs.length;
      const moreThumb = remainingImages > 0
        ? `
          <a
            class="product-thumb more-thumbs"
            href="product.html?id=${product.id}&image=${visibleThumbs.length}"
            data-more-label="+${remainingImages}"
            aria-label="Ver ${remainingImages} imagenes mas de ${product.name}"
          >
            <img src="${visibleThumbs[visibleThumbs.length - 1]}" alt="${product.name} miniatura adicional">
          </a>
        `
        : "";

      return `
        <article class="product-card" id="${product.id}">
          <a
            class="product-image-button"
            href="product.html?id=${product.id}"
            aria-label="Abrir pagina de ${product.name}"
          >
            <img class="product-main-image" src="${product.images[0]}" alt="${product.name}">
          </a>
          <div class="product-thumbs">
            ${thumbnails}
            ${moreThumb}
          </div>
          <div class="product-card-content">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="product-price">${product.price}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-actions">
              <a class="product-action-button" href="product.html?id=${product.id}">Ver articulo</a>
              <button
                class="share-button"
                type="button"
                data-share-product="${product.id}"
              >
                Compartir articulo
              </button>
            </div>
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
  const shareButton = event.target.closest("[data-share-product]");

  if (shareButton) {
    event.preventDefault();
    shareProduct(shareButton.dataset.shareProduct);
  }
});

async function shareProduct(productId) {
  const product = window.catalogProducts.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  const shareUrl = new URL(`product.html?id=${product.id}`, window.location.href);
  const shareData = {
    title: product.name,
    text: `${product.name} - ${product.price}`,
    url: shareUrl.toString(),
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast("Articulo compartido");
      return;
    }

    await navigator.clipboard.writeText(shareUrl.toString());
    showToast("Enlace copiado al portapapeles");
  } catch (error) {
    showToast("No se pudo compartir el articulo");
  }
}

let toastTimer;

function showToast(message) {
  shareToast.textContent = message;
  shareToast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    shareToast.classList.remove("visible");
  }, 2200);
}

renderFilters();
renderProducts();
