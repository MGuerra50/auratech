import { gsap } from "@/lib/gsap";

const FLIP_INLINE_PROPS =
  "transform,opacity,top,left,right,bottom,width,height,position,gridArea,gridColumn,gridRow,gridColumnStart,gridColumnEnd,gridRowStart,gridRowEnd,zIndex,margin,padding";

const GRID_INLINE_PROPS = [
  "grid-template",
  "grid-template-columns",
  "grid-template-rows",
  "grid-template-areas",
];

export function resetHeroGridBlocks(container: HTMLElement) {
  container.querySelectorAll<HTMLElement>(".hero-block").forEach((el) => {
    gsap.set(el, { clearProps: FLIP_INLINE_PROPS });

    for (const prop of [
      "grid-area",
      "grid-column",
      "grid-row",
      "grid-column-start",
      "grid-column-end",
      "grid-row-start",
      "grid-row-end",
    ]) {
      el.style.removeProperty(prop);
    }
  });

  for (const prop of GRID_INLINE_PROPS) {
    container.style.removeProperty(prop);
  }

  container.querySelectorAll(".hero-flip-placeholder").forEach((el) => el.remove());
  container.querySelectorAll(".hero-split-overlay").forEach((el) => el.remove());
  container.style.removeProperty("height");
  container.style.removeProperty("overflow");
}
