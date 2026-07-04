import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "monitor-ultrawide",
    title: "Monitor Ultrawide 34\" Curvo",
    price: 4299,
    image: "/products/monitor-ultrawide.svg",
    category: "Monitores",
    isNew: true,
    featured: true,
  },
  {
    id: "teclado-custom",
    title: "Teclado Mecânico Custom TKL",
    price: 1899,
    image: "/products/teclado-custom.svg",
    category: "Teclados",
    isNew: true,
    featured: true,
  },
  {
    id: "cadeira-ergonomica",
    title: "Cadeira Ergonômica Pro",
    price: 3499,
    image: "/products/cadeira-ergonomica.svg",
    category: "Cadeiras",
    isNew: true,
    featured: true,
  },
  {
    id: "desk-mat",
    title: "Desk Mat Premium XL",
    price: 349,
    image: "/products/desk-mat.svg",
    category: "Acessórios",
    isNew: true,
    featured: true,
  },
  {
    id: "webcam-4k",
    title: "Webcam 4K Pro Stream",
    price: 899,
    image: "/products/webcam-4k.svg",
    category: "Acessórios",
    featured: true,
  },
  {
    id: "headphone-stand",
    title: "Suporte de Headphone Alumínio",
    price: 279,
    image: "/products/headphone-stand.svg",
    category: "Acessórios",
    featured: true,
  },
  {
    id: "monitor-arm",
    title: "Braço Articulado Duplo",
    price: 649,
    image: "/products/monitor-arm.svg",
    category: "Acessórios",
    featured: true,
  },
  {
    id: "led-strip",
    title: "Fitas LED RGB Ambient",
    price: 199,
    image: "/products/led-strip.svg",
    category: "Iluminação",
    featured: true,
  },
];

export const launchProducts = products.filter((p) => p.isNew);
export const featuredSetupProducts = products.filter((p) => p.featured);
