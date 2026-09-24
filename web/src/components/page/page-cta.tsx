import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/** Abschluss jeder Unterseite – dasselbe Keyvisual wie auf der Startseite. */
export function PageCta({ headline, lede, label }: { headline: string; lede?: string; label: string }) {
  return (
    <section className="band cta-band dark" data-surface="dark">
      <Image
        src="/keyvisual-cta.svg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="cta-band__visual"
      />
      <div className="band__inner cta-band__inner">
        <Reveal>
          <h2 className="band__title">{headline}</h2>
          {lede && <p className="band__lede">{lede}</p>}
          <div className="cta-band__actions">
            <Link href="/demo" className={buttonVariants({ size: "lg" })}>
              {label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
