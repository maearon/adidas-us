import Image from "next/image";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

type Props = {
  image: string;
  title: string;
  summary: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  dark?: boolean;
};

export function HeroBanner({ image, title, summary, primaryCta, secondaryCta, dark = true }: Props) {
  return (
    <section className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
      <Image src={image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className={dark ? "absolute inset-0 bg-black/45" : "absolute inset-0 bg-white/30"} />
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 py-16 md:py-24">
        <div className={dark ? "max-w-xl text-white" : "max-w-xl text-black"}>
          <h1 className="text-3xl font-black uppercase leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-inherit/90 md:text-base">{summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryCta.href} className={buttonClass(dark ? "primary" : "secondary")}>
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className={buttonClass("secondary", "md")}>
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type Teaser = { image: string; title: string; cta: string; href: string };

export function TeaserGrid({ items }: { items: Teaser[] }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="group relative block aspect-[16/10] overflow-hidden bg-neutral-100">
          <Image src={item.image} alt={item.title} fill className="object-cover transition group-hover:scale-105" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-lg font-bold uppercase">{item.title}</h2>
            <span className="mt-2 inline-block text-xs font-semibold uppercase underline">{item.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
