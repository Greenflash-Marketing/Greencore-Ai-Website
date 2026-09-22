import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

/**
 * Vorläufige Unterseite, damit Navigation und Footer nicht ins Leere führen.
 * Wird Seite für Seite durch den echten Inhalt ersetzt.
 */
export async function PagePlaceholder({ page }: { page: string }) {
  const t = await getTranslations("Pages");
  return (
    <section className="band band--silver" data-surface="silver">
      <div className="band__inner">
        <span className="kicker">Greencore AI</span>
        <h1 className="max-w-[16ch] text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
          {t(page)}
        </h1>
        <p className="mt-6 text-lg text-silver-dark">{t("inProgress")}</p>
        <Link href="/" className={buttonVariants({ variant: "secondary" }) + " mt-8"}>
          {t("backHome")}
        </Link>
      </div>
    </section>
  );
}
