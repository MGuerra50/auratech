import {
  DEFAULT_PRODUCT_IMAGE,
  DEFAULT_PRODUCT_IMAGES,
} from "@/lib/product-images";
import type { Product } from "@/types/product";

const productImages = [...DEFAULT_PRODUCT_IMAGES];

export const products: Product[] = [
  {
    id: "monitor-ultrawide",
    title: "Monitor Ultrawide 34\" Curvo",
    price: 4299,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Monitores",
    description:
      "Painel VA curvo 3440×1440 com 165Hz, HDR400 e design frameless para setups imersivos e produtividade multitarefa.",
    specs: [
      { label: "Resolução", value: "3440 × 1440" },
      { label: "Taxa de atualização", value: "165 Hz" },
      { label: "Curvatura", value: "1900R" },
    ],
    variants: [
      { id: "stand-basic", label: "Base padrão" },
      { id: "stand-premium", label: "Base premium ajustável", priceDelta: 399 },
    ],
    isNew: true,
    featured: true,
  },
  {
    id: "teclado-custom",
    title: "Teclado Mecânico Custom TKL",
    price: 1899,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Teclados",
    description:
      "Layout TKL hot-swap com case de alumínio usinado, plate flex e acabamento premium para digitação silenciosa e responsiva.",
    specs: [
      { label: "Layout", value: "TKL (87 teclas)" },
      { label: "Conexão", value: "USB-C / Bluetooth 5.1" },
      { label: "Hot-swap", value: "Sim (5 pinos)" },
    ],
    variants: [
      { id: "mx-red", label: "Cherry MX Red" },
      { id: "mx-brown", label: "Cherry MX Brown", priceDelta: 120 },
      { id: "mx-blue", label: "Cherry MX Blue", priceDelta: 120 },
      { id: "gateron-yellow", label: "Gateron Yellow", priceDelta: 80 },
    ],
    isNew: true,
    featured: true,
  },
  {
    id: "cadeira-ergonomica",
    title: "Cadeira Ergonômica Pro",
    price: 3499,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Cadeiras",
    description:
      "Suporte lombar ajustável, apoio de braço 4D e recline sincronizado para longas sessões de trabalho com conforto absoluto.",
    specs: [
      { label: "Capacidade", value: "Até 136 kg" },
      { label: "Recline", value: "90° – 135°" },
      { label: "Material", value: "Mesh respirável" },
    ],
    variants: [
      { id: "lumbar-standard", label: "Apoio lombar padrão" },
      { id: "lumbar-advanced", label: "Apoio lombar avançado", priceDelta: 450 },
    ],
    isNew: true,
    featured: true,
  },
  {
    id: "desk-mat",
    title: "Desk Mat Premium XL",
    price: 349,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Acessórios",
    description:
      "Superfície micro-texturizada antiderrapante com costura reforçada e dimensões XL para mouse e teclado full-size.",
    specs: [
      { label: "Dimensões", value: "900 × 400 mm" },
      { label: "Espessura", value: "4 mm" },
      { label: "Base", value: "Borracha natural" },
    ],
    variants: [
      { id: "black", label: "Preto fosco" },
      { id: "graphite", label: "Grafite", priceDelta: 30 },
    ],
    isNew: true,
    featured: true,
  },
  {
    id: "webcam-4k",
    title: "Webcam 4K Pro Stream",
    price: 899,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Acessórios",
    description:
      "Sensor 4K com autofoco rápido, HDR e microfone dual para streams e reuniões com qualidade profissional.",
    specs: [
      { label: "Resolução", value: "4K 30fps / 1080p 60fps" },
      { label: "Campo de visão", value: "90°" },
      { label: "Conexão", value: "USB-C" },
    ],
    featured: true,
  },
  {
    id: "headphone-stand",
    title: "Suporte de Headphone Alumínio",
    price: 279,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Acessórios",
    description:
      "Construção em alumínio anodizado com base antiderrapante e gancho ergonômico para manter fones organizados.",
    specs: [
      { label: "Material", value: "Alumínio anodizado" },
      { label: "Altura", value: "285 mm" },
      { label: "Peso", value: "420 g" },
    ],
    featured: true,
  },
  {
    id: "monitor-arm",
    title: "Braço Articulado Duplo",
    price: 649,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Acessórios",
    description:
      "Suporte VESA duplo com mola a gás, ajuste de altura e rotação para liberar espaço na mesa e melhorar ergonomia.",
    specs: [
      { label: "VESA", value: "75 × 75 / 100 × 100" },
      { label: "Carga máxima", value: "9 kg por braço" },
      { label: "Monitores", value: "Até 2 unidades" },
    ],
    variants: [
      { id: "clamp", label: "Fixação grampo" },
      { id: "grommet", label: "Fixação passante", priceDelta: 50 },
    ],
    featured: true,
  },
  {
    id: "led-strip",
    title: "Fitas LED RGB Ambient",
    price: 199,
    image: DEFAULT_PRODUCT_IMAGE,
    images: productImages,
    category: "Iluminação",
    description:
      "Iluminação ambiente RGB endereçável com controle por app, difusor integrado e instalação adesiva premium.",
    specs: [
      { label: "Comprimento", value: "2 m" },
      { label: "LEDs", value: "60 / metro" },
      { label: "Controle", value: "App + controle remoto" },
    ],
    featured: true,
  },
];

export const launchProducts = products.filter((p) => p.isNew);
export const featuredSetupProducts = products.filter((p) => p.featured);

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getAllProductIds(): string[] {
  return products.map((product) => product.id);
}

export function getProductUnitPrice(
  product: Product,
  variantId?: string,
): number {
  const variant =
    product.variants?.find((item) => item.id === variantId) ??
    product.variants?.[0];

  return product.price + (variant?.priceDelta ?? 0);
}
