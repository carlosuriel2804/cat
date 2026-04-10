const products = [
  {
    name: "Juego de tapetes 4 piezas Chevrolet Aveo 2011 - 2017",
    category: "Tapetes",
    price: "$500 MXN",
    description: "Juego de tapetes 4 piezas de alfombra. Base de hule con pico opresor antiderrapante. Diseñados para Chevrolet Aveo desde 2011 a 2017.",
    images: [
      "imagenes/chevrolet/aveo/2011-2017/1.jpg",
      "imagenes/chevrolet/aveo/2011-2017/2.jpg",
    ],
  },
  {
    name: "Juego de tapetes 4 piezas universales Chevrolet antiderrapantes",
    category: "Tapetes",
    price: "$370 MXN",
    description: "Juego de tapetes 4 piezas universales de alfombra. Base de hule con pico opresor antiderrapante. Logotipo Chevrolet",
    images: [
      "imagenes/chevrolet/universales/antiderrapantes/1.jpg",
      "imagenes/chevrolet/universales/antiderrapantes/2.jpg",
      "imagenes/chevrolet/universales/antiderrapantes/3.jpg",
    ],
  },
  {
    name: "Juego de tapetes 4 piezas universales Volkswagen antiderrapantes",
    category: "Tapetes",
    price: "$370 MXN",
    description: "Juego de tapetes 4 piezas universales de alfombra. Base de hule con pico opresor antiderrapante. Logotipo Volkswagen",
    images: [
      "imagenes/volkswagen/universales/antiderrapantes/1.jpeg",
      "imagenes/volkswagen/universales/antiderrapantes/2.jpeg",
      "imagenes/volkswagen/universales/antiderrapantes/3.jpeg",
    ],
  },
];

const THUMBS_PER_CARD = 4;
const THUMBS_PER_MODAL_PAGE = 6;

const catalogProducts = products.map((product, index) => ({
  ...product,
  id: `${slugify(product.name)}-${index + 1}`,
}));

const filtersContainer = document.querySelector(".filters");
const productGrid = document.querySelector("#product-grid");
const galleryModal = document.querySelector("#gallery-modal");
const galleryTitle = document.querySelector("#gallery-title");
const galleryImage = document.querySelector("#gallery-image");
const galleryCounter = document.querySelector("#gallery-counter");
const galleryThumbs = document.querySelector("#gallery-thumbs");
const galleryPrev = document.querySelector("#gallery-prev");
const galleryNext = document.querySelector("#gallery-next");
const galleryClose = document.querySelector("#gallery-close");
const thumbPagePrev = document.querySelector("#thumb-page-prev");
const thumbPageNext = document.querySelector("#thumb-page-next");
const modalShareButton = document.querySelector("#modal-share-button");
const shareToast = document.querySelector("#share-toast");

let activeProductId = null;
let activeImageIndex = 0;
let activeThumbPage = 0;

const categories = ["Todos", ...new Set(catalogProducts.map((product) => product.category))];

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProductById(productId) {
  return catalogProducts.find((product) => product.id === productId);
}

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
      ? catalogProducts
      : catalogProducts.filter((product) => product.category === activeCategory);

  productGrid.innerHTML = visibleProducts
    .map((product) => {
      const visibleThumbs = product.images.slice(0, THUMBS_PER_CARD);
      const thumbnails = visibleThumbs
        .map(
          (image, imageIndex) => `
            <button
              class="product-thumb${imageIndex === 0 ? " active" : ""}"
              type="button"
              data-product-id="${product.id}"
              data-image-index="${imageIndex}"
              aria-label="Ver foto ${imageIndex + 1} de ${product.name}"
            >
              <img src="${image}" alt="${product.name} miniatura ${imageIndex + 1}">
            </button>
          `
        )
        .join("");
      const remainingImages = product.images.length - visibleThumbs.length;
      const moreThumb = remainingImages > 0
        ? `
          <button
            class="product-thumb more-thumbs"
            type="button"
            data-product-id="${product.id}"
            data-image-index="${visibleThumbs.length}"
            data-more-label="+${remainingImages}"
            aria-label="Ver ${remainingImages} imagenes mas de ${product.name}"
          >
            <img src="${visibleThumbs[visibleThumbs.length - 1]}" alt="${product.name} miniatura adicional">
          </button>
        `
        : "";

      return `
        <article class="product-card" id="${product.id}">
          <button
            class="product-image-button"
            type="button"
            data-open-gallery="true"
            data-product-id="${product.id}"
            data-image-index="0"
            aria-label="Abrir galeria de ${product.name}"
          >
            <img class="product-main-image" src="${product.images[0]}" alt="${product.name}">
          </button>
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
              <button
                class="product-action-button"
                type="button"
                data-open-gallery="true"
                data-product-id="${product.id}"
                data-image-index="0"
              >
                Ver fotos
              </button>
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
  const openGalleryButton = event.target.closest("[data-open-gallery='true']");

  if (openGalleryButton) {
    openGallery(openGalleryButton.dataset.productId, Number(openGalleryButton.dataset.imageIndex));
    return;
  }

  const thumbnailButton = event.target.closest(".product-thumb");

  if (thumbnailButton) {
    openGallery(thumbnailButton.dataset.productId, Number(thumbnailButton.dataset.imageIndex));
    return;
  }

  const shareButton = event.target.closest("[data-share-product]");

  if (shareButton) {
    shareProduct(shareButton.dataset.shareProduct);
  }
});

galleryPrev.addEventListener("click", () => changeImage(-1));
galleryNext.addEventListener("click", () => changeImage(1));
galleryClose.addEventListener("click", closeGallery);
thumbPagePrev.addEventListener("click", () => changeThumbPage(-1));
thumbPageNext.addEventListener("click", () => changeThumbPage(1));
modalShareButton.addEventListener("click", () => {
  if (activeProductId) {
    shareProduct(activeProductId);
  }
});

galleryThumbs.addEventListener("click", (event) => {
  const thumbButton = event.target.closest(".gallery-thumb");

  if (!thumbButton) {
    return;
  }

  activeImageIndex = Number(thumbButton.dataset.imageIndex);
  syncGallery();
});

galleryModal.addEventListener("click", (event) => {
  const shell = event.target.closest(".gallery-shell");

  if (!shell) {
    closeGallery();
  }
});

galleryModal.addEventListener("close", () => {
  document.body.style.overflow = "";
});

document.addEventListener("keydown", (event) => {
  if (!galleryModal.open) {
    return;
  }

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "ArrowLeft") {
    changeImage(-1);
  }

  if (event.key === "ArrowRight") {
    changeImage(1);
  }
});

function openGallery(productId, imageIndex = 0) {
  activeProductId = productId;
  activeImageIndex = imageIndex;
  activeThumbPage = Math.floor(imageIndex / THUMBS_PER_MODAL_PAGE);
  syncGallery();

  if (!galleryModal.open) {
    galleryModal.showModal();
    document.body.style.overflow = "hidden";
  }
}

function closeGallery() {
  if (galleryModal.open) {
    galleryModal.close();
  }
}

function changeImage(direction) {
  const product = getProductById(activeProductId);

  if (!product) {
    return;
  }

  activeImageIndex = (activeImageIndex + direction + product.images.length) % product.images.length;
  activeThumbPage = Math.floor(activeImageIndex / THUMBS_PER_MODAL_PAGE);
  syncGallery();
}

function changeThumbPage(direction) {
  const product = getProductById(activeProductId);

  if (!product) {
    return;
  }

  const maxPage = Math.max(Math.ceil(product.images.length / THUMBS_PER_MODAL_PAGE) - 1, 0);
  activeThumbPage = Math.min(Math.max(activeThumbPage + direction, 0), maxPage);

  if (activeImageIndex < activeThumbPage * THUMBS_PER_MODAL_PAGE) {
    activeImageIndex = activeThumbPage * THUMBS_PER_MODAL_PAGE;
  }

  if (activeImageIndex >= (activeThumbPage + 1) * THUMBS_PER_MODAL_PAGE) {
    activeImageIndex = activeThumbPage * THUMBS_PER_MODAL_PAGE;
  }

  syncGallery();
}

function syncGallery() {
  const product = getProductById(activeProductId);

  if (!product) {
    return;
  }

  const totalPages = Math.max(Math.ceil(product.images.length / THUMBS_PER_MODAL_PAGE), 1);
  const start = activeThumbPage * THUMBS_PER_MODAL_PAGE;
  const end = start + THUMBS_PER_MODAL_PAGE;
  const currentThumbs = product.images.slice(start, end);

  galleryTitle.textContent = product.name;
  galleryImage.src = product.images[activeImageIndex];
  galleryImage.alt = `${product.name} imagen ${activeImageIndex + 1}`;
  galleryCounter.textContent = `${activeImageIndex + 1} / ${product.images.length}`;

  galleryThumbs.innerHTML = currentThumbs
    .map(
      (image, index) => `
        <button
          class="gallery-thumb${start + index === activeImageIndex ? " active" : ""}"
          type="button"
          data-image-index="${start + index}"
          aria-label="Ver imagen ${start + index + 1} de ${product.name}"
        >
          <img src="${image}" alt="${product.name} miniatura ${start + index + 1}">
        </button>
      `
    )
    .join("");

  galleryPrev.disabled = product.images.length === 1;
  galleryNext.disabled = product.images.length === 1;
  thumbPagePrev.disabled = activeThumbPage === 0;
  thumbPageNext.disabled = activeThumbPage >= totalPages - 1;
}

async function shareProduct(productId) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  const shareUrl = new URL(window.location.href);
  shareUrl.hash = product.id;

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

if (window.location.hash) {
  const productId = window.location.hash.replace("#", "");
  const product = getProductById(productId);

  if (product) {
    requestAnimationFrame(() => {
      document.getElementById(product.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}
