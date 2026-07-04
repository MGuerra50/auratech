export type HeroBlockId = "main" | "topRight" | "bottomRight";

export type HeroLayout = "initial" | "topExpanded" | "bottomSplit";

export type HeroImageEffect = "zoomIn" | "panRight" | "zoomOut";

export interface HeroBlockConfig {
  id: HeroBlockId;
  image: string;
  gridArea: string;
  imageEffect: HeroImageEffect;
  label?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref?: string;
  layout: HeroLayout;
  blocks: HeroBlockConfig[];
}

export interface HeroBlockImages {
  main: string;
  topRight: string;
  bottomRight: string;
}
