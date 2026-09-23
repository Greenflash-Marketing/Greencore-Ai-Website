/**
 * Platzhalter für Bilder und Screenshots, die noch nicht geliefert sind.
 * Bewusst als Attrappe erkennbar, damit im Abstimmungsprozess niemand ein
 * fertiges Bild vermutet.
 */
export function MediaDummy({ label, ratio = "16 / 9" }: { label?: string; ratio?: string }) {
  return (
    <div className="media-dummy" style={{ aspectRatio: ratio }} aria-hidden="true">
      <span>{label ?? "Attrappe · Bild folgt"}</span>
    </div>
  );
}
