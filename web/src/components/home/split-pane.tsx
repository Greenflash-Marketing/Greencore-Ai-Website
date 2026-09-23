import Image from "next/image";
import { MockVisual, type MockKind } from "./mock-visual";

/**
 * Layout-Pattern "50/50" aus dem Brand-Bundle: links Farbfläche mit Text,
 * rechts das Bild. Wird von Lösungen und Anwendungsfällen genutzt.
 */
export function SplitPane({
  tone = "ultra",
  children,
  image,
  imageAlt = "",
  mock,
}: {
  tone?: "ultra" | "flash" | "lilac";
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
  mock?: MockKind;
}) {
  return (
    <div className="split">
      <div className="split__pane" data-tone={tone}>
        {children}
      </div>
      <div className="split__visual">
        {image ? (
          <Image src={image} alt={imageAlt} width={960} height={720} className="split__img" />
        ) : (
          // Beispiel-Oberfläche, bis der echte Screenshot in Sanity liegt
          <MockVisual kind={mock ?? "peak"} />
        )}
      </div>
    </div>
  );
}
