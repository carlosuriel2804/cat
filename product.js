const THUMBS_PER_PAGE = 8;

const detailContainer = document.querySelector("#product-detail");
const shareToast = document.querySelector("#share-toast");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const requestedImage = Number(params.get("image") || 0);

const product = window.catalogProducts.find((item) => item.id === productId);

let activeImageIndex = 0;
let activeThumbPage = 0;

if (!product) {
  renderNotFound();
} else {
  document.title = `${product.name} | Tu Tienda`;
  activeImageIndex = clampImageIndex(requestedImage, product.images.length);
  activeThumbPage = Math.floor(activeImageIndex / THUMBS_PER_PAGE);
  renderProductPage();
  syncProductView();
}

function renderNotFound() {
  detailContainer.innerHTML = `
    <article class="product-not-found">
      <p class="eyebrow">Producto no encontrado</p>
      <h1>Este articulo no existe o el enlace ya no es valido.</h1>
      <a class="button primary" href="index.html#catalogo">Volver al catalogo</a>
    </article>
  `;
}

function renderProductPage() {
  detailContainer.innerHTML = `
    <section class="detail-gallery">
      <img class="detail-main-image" id="detail-main-image" src="" alt="">
      <div class="detail-gallery-controls">
        <button class="gallery-nav" id="detail-prev" type="button" aria-label="Imagen anterior">&lsaquo;</button>
        <p class="gallery-counter" id="detail-counter">1 / 1</p>
        <button class="gallery-nav" id="detail-next" type="button" aria-label="Imagen siguiente">&rsaquo;</button>
      </div>
      <div class="detail-thumb-strip">
        <button class="thumb-page-button" id="detail-thumb-prev" type="button" aria-label="Pagina anterior de miniaturas">&lsaquo;</button>
        <div class="gallery-thumbs" id="detail-thumbs"></div>
        <button class="thumb-page-button" id="detail-thumb-next" type="button" aria-label="Pagina siguiente de miniaturas">&rsaquo;</button>
      </div>
    </section>

    <aside class="detail-copy">
      <p class="eyebrow">${product.category}</p>
      <h1>${product.name}</h1>
      <p class="detail-price">${product.price}</p>
      <p class="detail-description">${product.description}</p>
      <div class="product-actions">
        <button class="share-button" id="detail-share" type="button">Compartir articulo</button>
        <a class="product-action-button" href="index.html#contacto">Contactar</a>
      </div>
    </aside>
  `;

  document.querySelector("#detail-prev").addEventListener("click", () => changeImage(-1));
  document.querySelector("#detail-next").addEventListener("click", () => changeImage(1));
  document.querySelector("#detail-thumb-prev").addEventListener("click", () => changeThumbPage(-1));
  document.querySelector("#detail-thumb-next").addEventListener("click", () => changeThumbPage(1));
  document.querySelector("#detail-share").addEventListener("click", shareProduct);
  document.querySelector("#detail-thumbs").addEventListener("click", (event) => {
    const thumb = event.target.closest(".gallery-thumb");

    if (!thumb) {
      return;
    }

    activeImageIndex = Number(thumb.dataset.imageIndex);
    activeThumbPage = Math.floor(activeImageIndex / THUMBS_PER_PAGE);
    syncProductView();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      changeImage(-1);
    }

    if (event.key === "ArrowRight") {
      changeImage(1);
    }
  });
}

function changeImage(direction) {
  activeImageIndex = (activeImageIndex + direction + product.images.length) % product.images.length;
  activeThumbPage = Math.floor(activeImageIndex / THUMBS_PER_PAGE);
  syncProductView();
}

function changeThumbPage(direction) {
  const maxPage = Math.max(Math.ceil(product.images.length / THUMBS_PER_PAGE) - 1, 0);
  activeThumbPage = Math.min(Math.max(activeThumbPage + direction, 0), maxPage);

  if (activeImageIndex < activeThumbPage * THUMBS_PER_PAGE) {
    activeImageIndex = activeThumbPage * THUMBS_PER_PAGE;
  }

  if (activeImageIndex >= (activeThumbPage + 1) * THUMBS_PER_PAGE) {
    activeImageIndex = activeThumbPage * THUMBS_PER_PAGE;
  }

  syncProductView();
}

function syncProductView() {
  const mainImage = document.querySelector("#detail-main-image");
  const counter = document.querySelector("#detail-counter");
  const thumbs = document.querySelector("#detail-thumbs");
  const prevPage = document.querySelector("#detail-thumb-prev");
  const nextPage = document.querySelector("#detail-thumb-next");
  const start = activeThumbPage * THUMBS_PER_PAGE;
  const end = start + THUMBS_PER_PAGE;
  const visibleThumbs = product.images.slice(start, end);
  const totalPages = Math.max(Math.ceil(product.images.length / THUMBS_PER_PAGE), 1);

  mainImage.src = product.images[activeImageIndex];
  mainImage.alt = `${product.name} imagen ${activeImageIndex + 1}`;
  counter.textContent = `${activeImageIndex + 1} / ${product.images.length}`;
  thumbs.innerHTML = visibleThumbs
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

  prevPage.disabled = activeThumbPage === 0;
  nextPage.disabled = activeThumbPage >= totalPages - 1;
  updateQuery();
}

function clampImageIndex(index, total) {
  if (Number.isNaN(index) || index < 0) {
    return 0;
  }

  if (index >= total) {
    return total - 1;
  }

  return index;
}

function updateQuery() {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("id", product.id);
  nextUrl.searchParams.set("image", String(activeImageIndex));
  window.history.replaceState({}, "", nextUrl);
}

async function shareProduct() {
  const shareData = {
    title: product.name,
    text: `${product.name} - ${product.price}`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast("Articulo compartido");
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
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
