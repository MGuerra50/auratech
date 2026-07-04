export type HeroBlockId =
  | "main"
  | "topRight"
  | "bottomRight"
  | "bottomSplitA"
  | "bottomSplitB";

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
  layout: HeroLayout;
  blocks: HeroBlockConfig[];
}
