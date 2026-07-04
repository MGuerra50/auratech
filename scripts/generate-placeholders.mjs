import fs from "fs";
import path from "path";

const heroDir = path.join("public", "hero");
const productsDir = path.join("public", "products");
fs.mkdirSync(heroDir, { recursive: true });
fs.mkdirSync(productsDir, { recursive: true });

const colors = [
  ["#0a1628", "#22d3ee"],
  ["#0f0f11", "#06b6d4"],
  ["#050506", "#164e63"],
  ["#111118", "#0891b2"],
  ["#0c0c10", "#155e75"],
];

function svg(label, c1, c2, w = 800, h = 600) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
    "<defs><linearGradient id=\"g\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">",
    `<stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>`,
    "</linearGradient></defs>",
    "<rect width=\"100%\" height=\"100%\" fill=\"url(#g)\"/>",
    `<text x="50%" y="50%" fill="#f4f4f5" font-family="system-ui" font-size="24" text-anchor="middle" dominant-baseline="middle" opacity="0.6">${label}</text>`,
    "</svg>",
  ].join("");
}

for (let s = 1; s <= 3; s++) {
  ["main", "top", "bottom", "bottom-a", "bottom-b"].forEach((name, i) => {
    const [a, b] = colors[(s + i) % colors.length];
    fs.writeFileSync(
      path.join(heroDir, `slide-${s}-${name}.svg`),
      svg(`Slide ${s} ${name}`, a, b),
    );
  });
}

const products = [
  ["monitor-ultrawide", "Monitor"],
  ["teclado-custom", "Teclado"],
  ["cadeira-ergonomica", "Cadeira"],
  ["desk-mat", "Desk Mat"],
  ["webcam-4k", "Webcam"],
  ["headphone-stand", "Suporte"],
  ["monitor-arm", "Braço"],
  ["led-strip", "LED"],
];

products.forEach(([file, label], i) => {
  const [a, b] = colors[i % colors.length];
  fs.writeFileSync(
    path.join(productsDir, `${file}.svg`),
    svg(label, a, b, 600, 450),
  );
});

console.log("Placeholders created");
