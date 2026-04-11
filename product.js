const PRODUCTS = [
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

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

window.catalogProducts = PRODUCTS.map((product, index) => ({
  ...product,
  id: `${slugify(product.name)}-${index + 1}`,
}));
