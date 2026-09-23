import Image from "next/image";

/**
 * Layout-Pattern "50/50" aus dem Brand-Bundle: links Farbfläche mit Text,
 * rechts das Bild. Wird von Lösungen und Anwendungsfällen genutzt.
 */
export function SplitPane({
  tone = "ultra",
  children,
  image,
  imageAlt = "",
}: {
  tone?: "ultra" | "flash" | "lilac";
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
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
          // ponytail: neutrale Platzhalterfläche, bis die Screenshots vom Designer da sind
          <div className="split__placeholder" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
