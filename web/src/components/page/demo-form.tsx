"use client";

import { useTranslations } from "next-intl";

const COMPONENTS = ["Photovoltaik", "Batteriespeicher", "Ladeinfrastruktur", "Wärme und Kälte"];

/**
 * Anfrageformular der Demo-Seite.
 *
 * Es zeigt die vorgesehenen Felder, nimmt aber noch keine Anfragen entgegen –
 * die Anbindung an Dynamics 365 folgt. Deshalb ist die Schaltflaeche
 * deaktiviert und der Hinweis darunter benennt das ausdruecklich: Ein
 * Formular, das aussieht, als wuerde es senden, aber nichts tut, waere
 * schlimmer als eine sichtbare Baustelle.
 */
export function DemoForm({
  note,
  submitLabel,
  pendingNote,
}: {
  note: string;
  submitLabel: string;
  pendingNote: string;
}) {
  const t = useTranslations("Demo");

  return (
    <form className="demo-form" onSubmit={(event) => event.preventDefault()} aria-describedby="demo-form-hinweis">
      <div className="demo-form__grid">
        <label htmlFor="demo-name">
          {t("fName")}
          <input id="demo-name" name="name" type="text" autoComplete="name" disabled />
        </label>
        <label htmlFor="demo-company">
          {t("fCompany")}
          <input id="demo-company" name="company" type="text" autoComplete="organization" disabled />
        </label>
        <label htmlFor="demo-role">
          {t("fRole")}
          <input id="demo-role" name="role" type="text" autoComplete="organization-title" disabled />
        </label>
        <label htmlFor="demo-mail">
          {t("fMail")}
          <input id="demo-mail" name="email" type="email" autoComplete="email" disabled />
        </label>
        <label htmlFor="demo-phone">
          {t("fPhone")}
          <input id="demo-phone" name="phone" type="tel" autoComplete="tel" disabled />
        </label>
        <label htmlFor="demo-usage">
          {t("fUsage")}
          <input id="demo-usage" name="usage" type="text" inputMode="decimal" disabled />
        </label>
      </div>

      <fieldset className="demo-form__set" disabled>
        <legend>{t("fComponents")}</legend>
        <div className="demo-form__chips">
          {COMPONENTS.map((component) => (
            <label key={component} htmlFor={`demo-${component}`}>
              <input id={`demo-${component}`} type="checkbox" name="components" value={component} />
              {component}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="demo-form__file" htmlFor="demo-upload">
        {t("fUpload")}
        <input id="demo-upload" name="profile" type="file" accept=".csv,.xlsx" disabled />
      </label>

      <button type="submit" className="demo-form__submit" disabled>
        {submitLabel}
      </button>

      <p className="demo-form__note">{note}</p>
      <p className="demo-form__note demo-form__note--pending" id="demo-form-hinweis">
        {pendingNote}
      </p>
    </form>
  );
}
