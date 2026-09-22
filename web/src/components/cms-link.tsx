import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";

const isAppPath = (href: string): href is AppPathname => href in routing.pathnames;

/**
 * Link-Ziel aus Sanity: bekannte Seiten (z. B. "/demo") laufen über die
 * Sprachweiche und werden je Sprache richtig übersetzt, alles andere
 * (externe URLs, Anker) bleibt ein normaler Link.
 */
export function CmsLink({ href, ...props }: { href: string } & Omit<ComponentProps<"a">, "href">) {
  return isAppPath(href) ? <Link href={href} {...props} /> : <a href={href} {...props} />;
}
