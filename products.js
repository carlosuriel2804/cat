const PRODUCTS = [
  {
    name: "Juego de tapetes 4 piezas Chevrolet Aveo 2011 - 2017",
    category: "Tapetes tipo original",
    price: "$500 MXN",
    description: "Juego de tapetes 4 piezas de alfombra. Base de hule con pico opresor antiderrapante. Diseñados para Chevrolet Aveo desde 2011 a 2017.",
    images: [
      "imagenes/chevrolet/aveo/2011-2017/1.jpg",
      "imagenes/chevrolet/aveo/2011-2017/2.jpg",
    ],
  },
  {
    name: "Juego de tapetes 4 piezas universales Volkswagen antiderrapantes",
    category: "Tapetes universales antiderrapantes",
    price: "$370 MXN",
    description: "Juego de tapetes 4 piezas universales de alfombra. Base de hule con pico opresor antiderrapante. Logotipo Volkswagen",
    images: [
      "imagenes/volkswagen/universales/antiderrapantes/1.jpeg",
      "imagenes/volkswagen/universales/antiderrapantes/2.jpeg",
      "imagenes/volkswagen/universales/antiderrapantes/3.jpeg",
    ],
  },
  {
    name: "Juego de tapetes 4 piezas universales Nissan con hule en medio",
    category: "Tapetes universales hule en medio",
    price: "$350 MXN",
    description: "Juego de tapetes 4 piezas universales de alfombra. Hule en medio. Logotipo Nissan",
    images: [
      "imagenes/nissan/universales/huleenmedio/1.jpeg",
      "imagenes/nissan/universales/huleenmedio/2.jpeg",
      "imagenes/nissan/universales/huleenmedio/3.jpeg",
      "imagenes/nissan/universales/huleenmedio/4.jpeg",
      "imagenes/nissan/universales/huleenmedio/5.jpeg",
      "imagenes/nissan/universales/huleenmedio/6.jpeg",
      "imagenes/nissan/universales/huleenmedio/7.jpeg",
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
