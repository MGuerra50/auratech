import type { HeroLayout, HeroSlide } from "@/types/hero";

const slideContent = [
  {
    id: "slide-1",
    title: "Monitores Ultrawide",
    subtitle: "Imersão cinematográfica para o seu setup minimalista.",
    ctaLabel: "Explorar Monitores",
  },
  {
    id: "slide-2",
    title: "Teclados Customizados",
    subtitle: "Precisão mecânica com design de alto padrão.",
    ctaLabel: "Ver Teclados",
  },
  {
    id: "slide-3",
    title: "Ergonomia Premium",
    subtitle: "Conforto absoluto para longas sessões de trabalho.",
    ctaLabel: "Conhecer Cadeiras",
  },
] as const;

function getBlocksForLayout(
  slideIndex: number,
  layout: HeroLayout,
): HeroSlide["blocks"] {
  const prefix = `slide-${slideIndex + 1}`;

  if (layout === "initial") {
    return [
      {
        id: "main",
        image: `/hero/${prefix}-main.svg`,
        gridArea: "main",
        imageEffect: "zoomIn",
      },
      {
        id: "topRight",
        image: `/hero/${prefix}-top.svg`,
        gridArea: "topRight",
        imageEffect: "panRight",
        label: "Destaque",
      },
      {
        id: "bottomRight",
        image: `/hero/${prefix}-bottom.svg`,
        gridArea: "bottomRight",
        imageEffect: "zoomOut",
        label: "Novo",
      },
    ];
  }

  if (layout === "topExpanded") {
    return [
      {
        id: "topRight",
        image: `/hero/${prefix}-top.svg`,
        gridArea: "topFull",
        imageEffect: "panRight",
        label: "Destaque",
      },
      {
        id: "main",
        image: `/hero/${prefix}-main.svg`,
        gridArea: "mainBottom",
        imageEffect: "zoomIn",
      },
      {
        id: "bottomRight",
        image: `/hero/${prefix}-bottom.svg`,
        gridArea: "bottomBottom",
        imageEffect: "zoomOut",
        label: "Novo",
      },
    ];
  }

  return [
    {
      id: "topRight",
      image: `/hero/${prefix}-top.svg`,
      gridArea: "top",
      imageEffect: "panRight",
      label: "Destaque",
    },
    {
      id: "main",
      image: `/hero/${prefix}-main.svg`,
      gridArea: "main",
      imageEffect: "zoomIn",
    },
    {
      id: "bottomRight",
      image: `/hero/${prefix}-bottom-a.svg`,
      gridArea: "bottomA",
      imageEffect: "zoomOut",
      label: "Novo",
    },
  ];
}

export const heroLayouts: HeroLayout[] = [
  "initial",
  "topExpanded",
  "bottomSplit",
];

export const HERO_LAYOUT_INDEX = {
  initial: 0,
  topExpanded: 1,
  bottomSplit: 2,
} as const;

export function getHeroSlide(
  slideIndex: number,
  layout: HeroLayout,
): HeroSlide {
  const content = slideContent[slideIndex % slideContent.length];

  return {
    ...content,
    layout,
    blocks: getBlocksForLayout(slideIndex, layout),
  };
}

export const heroSlideCount = slideContent.length;
