import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { footerColumns } from "@/config/site";

/** Footer mit Impressum, Datenschutz und dezentem Greenflash-Bezug ("footer whisper"). */
export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="footer" data-surface="silver">
      <div className="footer__grid">
        <div>
          <Image
            src="/brand/lockup-logo-plus-type-on-silver-ultra.svg"
            alt="Greencore AI"
            width={190}
            height={26}
          />
          <p className="footer__claim">{t("claim")}</p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.key}>
            <h2 className="footer__heading">{t(`columns.${col.key}`)}</h2>
            <ul>
              {col.items.map((item) => (
                <li key={item.key}>
                  <Link href={item.href}>{t(`links.${item.key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer__bottom">
        <Link href="/impressum">{t("imprint")}</Link>
        <Link href="/datenschutz">{t("privacy")}</Link>
        <span className="footer__whisper">{t("whisper")}</span>
      </div>
    </footer>
  );
}
