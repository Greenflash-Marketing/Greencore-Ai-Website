import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// ACHTUNG: In Next.js 16 heißt diese Datei "proxy.ts" – nicht mehr "middleware.ts".
// Die Funktionsweise ist unverändert, nur Datei- und Exportname haben sich geaendert.
export default createMiddleware(routing);

export const config = {
  // Statische Dateien, Bilder und API-Routen von der Sprachweiche ausnehmen
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
