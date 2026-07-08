import fs from "fs";
import potrace from "potrace";
import sharp from "sharp";

const { trace } = potrace;

function scalePath(path, factor) {
  return path.replace(/-?\d+(\.\d+)?/g, (n) => String(Math.round(Number(n) / factor * 100) / 100));
}

function cleanSvg(svg, width, height, scale) {
  const match = svg.match(/d="([^"]+)"/);
  if (!match) return { width, height, d: "" };

  const parts = match[1]
    .split(/(?= M )/)
    .map((p) => p.trim())
    .filter(Boolean);

  const iconParts = parts.filter((part) => {
    const nums = part.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
    const xs = nums.filter((_, i) => i % 2 === 0);
    const ys = nums.filter((_, i) => i % 2 === 1);
    if (!xs.length) return false;

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const coversFrame =
      minX <= scale &&
      minY <= scale &&
      maxX >= width * scale - scale &&
      maxY >= height * scale - scale;

    return !coversFrame;
  });

  return {
    width,
    height,
    d: iconParts.map((part) => scalePath(part, scale)).join(" "),
  };
}

function toComponent(name, { width, height, d }, options = {}) {
  const exportName = `${name[0].toUpperCase()}${name.slice(1)}Icon`;
  const sizeClass = options.sizeClass ?? "h-[22px] w-auto";
  const ariaHidden = options.ariaHidden ?? true;
  const ariaLabel = options.ariaLabel;

  return `export function ${exportName}({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${width} ${height}"
      fill="none"
      className={cn("${sizeClass}", className)}
      ${ariaHidden ? "aria-hidden" : `role="img" aria-label="${ariaLabel}"`}
    >
      <path d="${d}" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}`;
}

async function bmpToSvg(name, scale = 4) {
  const src = `scripts/tmp-${name}.png`;
  const meta = await sharp(src).metadata();
  const width = meta.width ?? 24;
  const height = meta.height ?? 24;

  await sharp(src)
    .resize(width * scale, height * scale, { kernel: sharp.kernel.nearest })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .threshold(128)
    .png()
    .toFile(`scripts/bin-${name}.png`);

  const raw = await new Promise((resolve, reject) => {
    trace(
      `scripts/bin-${name}.png`,
      {
        color: "#000000",
        background: "transparent",
        turdSize: 2,
        optTolerance: 0.4,
        turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });

  const icon = cleanSvg(raw, width, height, scale);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">
  <path d="${icon.d}" fill="currentColor" fill-rule="evenodd"/>
</svg>`;

  fs.writeFileSync(`public/img/${name}.svg`, svg);
  console.log(`${name}: ${svg.length} bytes`);
  return icon;
}

const iconDefs = [
  { name: "logo", scale: 4, options: { sizeClass: "h-8 w-auto", ariaHidden: false, ariaLabel: "adidas" } },
  { name: "wish", scale: 4 },
  { name: "bag", scale: 4 },
  { name: "chatbot", scale: 4 },
];

const icons = [];
for (const def of iconDefs) {
  icons.push({ name: def.name, data: await bmpToSvg(def.name, def.scale), options: def.options ?? {} });
}

const componentFile = `import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
};

${icons.map(({ name, data, options }) => toComponent(name, data, options)).join("\n\n")}
`;

fs.writeFileSync("src/components/icons/HeaderIcons.tsx", componentFile);
console.log("Wrote src/components/icons/HeaderIcons.tsx");
