import {getCliClient} from 'sanity/cli'

// Pflegt die abgestimmten Website-Texte ein (Stand 27.09.2026, finale Wissensbasis).
// Aufruf im Ordner studio/:  npx sanity exec seed-texte.mjs --with-user-token
// Englisch bleibt vorerst leer – die Abfragen fallen per coalesce auf Deutsch zurück.

const client = getCliClient()
const de = (value) => ({de: value})

const blocks = (...paragraphs) =>
  paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `s${i}`, text, marks: []}],
  }))

const keyed = (items) => items.map((item, i) => ({_key: `k${i}`, ...item}))

const home = {
  'hero.headline': de('Greencore AI senkt Ihre Energiekosten. Automatisch, rund um die Uhr.'),
  'hero.subline': de(
    'Photovoltaik, Speicher, Ladepunkte und Produktion arbeiten an den meisten Standorten nebeneinander her. ' +
      'Greencore AI führt sie zusammen und entscheidet in jedem Moment, woher die nächste Kilowattstunde am ' +
      'günstigsten kommt: aus der eigenen Erzeugung, aus dem Speicher oder aus dem Netz. Die Vorhersage übernimmt ' +
      'künstliche Intelligenz, die Entscheidung trifft ein mathematisches Optimierungsmodell innerhalb der Grenzen, ' +
      'die Sie vorgeben. Dem Zufall bleibt nichts überlassen.',
  ),
  'hero.logosLabel': de('Im Einsatz in der energieintensiven Industrie'),

  statsBand: {
    kicker: de('Was dabei herauskommt'),
    headline: de('Ergebnisse, die auf der Stromrechnung ankommen'),
    lede: de(
      'Die Zahlen stammen aus Standorten, die Greencore AI heute steuert, und aus Wirtschaftlichkeits' +
        'rechnungen für Betriebe der energieintensiven Industrie.',
    ),
  },
  statTiles: keyed([
    {value: '−48,2', unit: '%', label: de('durchschnittlicher Strompreis im dokumentierten Kundenfall')},
    {value: '70', unit: '+', label: de('Energiesysteme, in denen Greencore AI im Einsatz ist')},
    {value: '300', unit: '+', label: de('Hersteller, die sich einbinden lassen')},
  ]),

  softwareInsights: {
    kicker: de('Einblick'),
    headline: de('Sehen Sie, was Ihr Energiesystem gerade tut'),
    lede: de(
      'Erzeugung, Verbrauch, Speicherstand, aktueller Strompreis und die nächste geplante Entscheidung – ' +
        'alles in einer Ansicht, sekündlich ausgelesen. Klicken Sie sich durch die Demo, so wie Ihr Team es ' +
        'später im Betrieb tun wird.',
    ),
  },

  solutionsBand: {
    kicker: de('Drei Funktionen, ein System'),
    headline: de('Eine Plattform – von der Planung bis zum Stromeinkauf'),
  },

  compatibility: {
    kicker: de('Kompatibilität'),
    headline: de('Greencore AI läuft mit den Geräten, die bei Ihnen schon stehen'),
    lede: de(
      'Wechselrichter, Batteriespeicher, Ladepunkte, Zähler, Wärme- und Kälteanlagen, flexible Verbraucher: ' +
        'Greencore AI bindet sie über standardisierte Schnittstellen ein – auch wenn sie von verschiedenen ' +
        'Herstellern stammen und seit Jahren laufen. Rund 300 Hersteller und etwa 600 Schnittstellenanbindungen ' +
        'sind dafür verfügbar, erprobt in über 10.000 Systemen im Feld. Welche Variante bei Ihnen funktioniert, ' +
        'prüfen wir anhand von Hersteller, Gerätetyp, Firmware und benötigten Datenpunkten.',
    ),
  },

  europeBand: {
    kicker: de('Europa'),
    claim: de('Für Europas industrielle Energieversorgung entwickelt'),
    lede: de(
      'Die Technologie, auf der Greencore AI aufsetzt, arbeitet heute in über 10.000 Systemen – von Irland bis ' +
        'zur Türkei, von Skandinavien bis Spanien. Greencore AI legt darauf die Ebene, die aus vernetzten Anlagen ' +
        'ein wirtschaftlich gesteuertes Energiesystem macht: Planung, Prognose, Optimierung, Steuerung und ' +
        'Strommarkt in einer Plattform.',
    ),
    facts: keyed([
      {
        title: de('International erprobt'),
        text: de('Über 10.000 Systeme in mehreren europäischen Märkten als Erfahrungsbasis.'),
      },
      {
        title: de('Mit den Regeln vor Ort'),
        text: de('Netzentgelte, Umlagen und Marktzugang sind überall anders geregelt – die Plattform rechnet damit.'),
      },
      {
        title: de('Europäischer Anspruch'),
        text: de('Eine führende Plattform für die intelligente Energieversorgung der europäischen Industrie.'),
      },
    ]),
  },

  testimonialsBand: {
    kicker: de('Stimmen aus der Industrie'),
    headline: de('Was unsere Kunden sagen'),
  },
  testimonials: keyed([
    {
      quote: de(
        'Früher haben wir Berichte gelesen, in denen stand, was letzte Woche schiefgelaufen ist. Heute greift das ' +
          'System ein, bevor die Spitze überhaupt entsteht – und wir sehen jeden Monat, was uns das bringt.',
      ),
      personName: 'Platzhalter',
      personRole: 'Leitung Technik, produzierendes Gewerbe',
    },
    {
      quote: de(
        'Die Anlagen standen alle schon da. Neu ist, dass sie zusammenarbeiten und dass wir auf Preisveränderungen ' +
          'reagieren können, statt sie hinzunehmen.',
      ),
      personName: 'Platzhalter',
      personRole: 'Geschäftsführung, Logistik',
    },
  ]),

  whySection: {
    kicker: de('Der Unterschied'),
    headline: de('Energieplattform statt Energiemanagementsystem'),
    body: {
      de: blocks(
        'Ein klassisches Energiemanagementsystem zeigt, was passiert ist. Es misst, stellt dar und meldet ' +
          'Abweichungen. Was daraus folgt, entscheidet Ihr Team.',
        'Greencore AI dreht das um: Die Plattform weiss heute, was morgen passiert – Verbrauch, Erzeugung und ' +
          'Preise für die kommenden Stunden – und handelt, bevor die Kosten entstehen. Wer die Zukunft kennt, ist ' +
          'besser vorbereitet. So wird Energie planbar, transparent und zu einem strategischen Wettbewerbsvorteil.',
      ),
    },
    compare: {
      classicTitle: de('Klassisches Energiemanagement'),
      classicItems: keyed([
        {title: de('Misst und stellt dar'), text: de('Messdaten, Monitoring, Visualisierung, Reporting.')},
        {title: de('Meldet im Nachhinein'), text: de('Abweichungen fallen auf, wenn sie schon Geld gekostet haben.')},
        {title: de('Feste Regeln'), text: de('Schwellwerte und Regelungen, die niemand laufend nachzieht.')},
        {title: de('Je System eine Oberfläche'), text: de('PV-Portal, Speicher-Portal, Ladeinfrastruktur getrennt.')},
        {title: de('Ihr Team entscheidet'), text: de('Jede Reaktion braucht jemanden, der sie auslöst.')},
      ]),
      ourTitle: de('Energieplattform Greencore AI'),
      ourItems: keyed([
        {title: de('Prognostiziert'), text: de('Verbrauch, Erzeugung und Preise für die kommenden Stunden.')},
        {title: de('Handelt vorher'), text: de('Die Steuerung greift, bevor die Kosten entstehen.')},
        {title: de('Rechnet laufend neu'), text: de('Ändert sich etwas, entsteht sofort ein neuer Fahrplan.')},
        {title: de('Eine Oberfläche'), text: de('Alle Komponenten und der Strommarkt an einer Stelle.')},
        {title: de('Läuft automatisch'), text: de('In den Grenzen, die Ihr Betrieb vorgibt.')},
      ]),
    },
  },

  faqBand: {
    kicker: de('Häufige Fragen'),
    headline: de('Was Energieverantwortliche wissen wollen'),
  },
  faq: keyed([
    {
      question: de('Ist Greencore AI ein Energiemanagementsystem?'),
      answer: de(
        'Greencore AI übernimmt alles, was ein Energiemanagementsystem leistet: Messdaten erfassen, Anlagen ' +
          'überwachen, Verbräuche auswerten, Lasten steuern. Der Unterschied liegt darin, was danach passiert. ' +
          'Ein Energiemanagementsystem zeigt den Zustand, Greencore AI prognostiziert den nächsten und steuert das ' +
          'Energiesystem einschliesslich Strombeschaffung darauf zu. Deshalb sprechen wir von einer Energieplattform.',
      ),
    },
    {
      question: de('Was ist Greencore AI?'),
      answer: de(
        'Greencore AI ist eine Energieplattform für Industrieunternehmen. Sie verbindet Erzeugung, Speicher, ' +
          'Ladeinfrastruktur und Verbrauch mit dem Strommarkt und steuert sie so, dass die Energiekosten sinken.',
      ),
    },
    {
      question: de('Funktioniert Greencore AI mit meinen vorhandenen Anlagen?'),
      answer: de(
        'In aller Regel ja. Greencore AI ist system- und herstelleroffen aufgebaut und bindet Wechselrichter, ' +
          'Speicher, Ladepunkte und Messtechnik über standardisierte Schnittstellen ein. Die konkrete Einbindung ' +
          'wird anhand von Hersteller, Gerätetyp, Firmware und benötigten Datenpunkten geprüft.',
      ),
    },
    {
      question: de('Welche Rolle spielt künstliche Intelligenz?'),
      answer: de(
        'Künstliche Intelligenz erstellt die Prognosen für Verbrauch, Erzeugung und Preise. Die Steuerung selbst ' +
          'übernimmt ein mathematisches Optimierungsmodell, das innerhalb fest definierter technischer, ' +
          'betrieblicher und regulatorischer Grenzen rechnet. Kritische Betriebsgrenzen werden keiner KI überlassen.',
      ),
    },
    {
      question: de('Für welche Unternehmen lohnt sich Greencore AI?'),
      answer: de(
        'Für energieintensive Industrie- und Logistikbetriebe mit eigener Erzeugung, Speicher, Ladeinfrastruktur ' +
          'oder steuerbaren Prozessen. Je höher der Verbrauch und je mehr Flexibilität im System steckt, desto ' +
          'größer der Hebel.',
      ),
    },
    {
      question: de('Was kostet ein Einstieg?'),
      answer: de(
        'Der Einstieg beginnt mit einer kostenlosen Demo-Version auf Basis Ihres Lastgangs. Daraus ergibt sich, ' +
          'welches Potenzial an Ihrem Standort steckt und welcher Umfang sinnvoll ist.',
      ),
    },
  ]),

  finalCta: {
    headline: de('Testen Sie es mit Ihrem eigenen Lastgang'),
    lede: de(
      'Laden Sie Ihren Lastgang hoch und erhalten Sie eine zeitlich begrenzte Demo-Version, die mit Ihren Zahlen ' +
        'rechnet statt mit einem Musterbetrieb. Sie sehen, was an Ihrem Standort möglich ist, bevor Sie sich ' +
        'entscheiden.',
    ),
    ctaLabel: de('Kostenlose Demo anfragen'),
    ctaHref: '/demo',
  },
}

const modules = {
  plan: {
    title: de('Simulation'),
    kicker: de('Planung'),
    lede: de(
      'Greencore AI simuliert ein volles Betriebsjahr Ihres Standorts: mit Ihren Lastgängen, Ihren Komponenten und ' +
        'den Preisen der Märkte. Für jede Variante sehen Sie, was sie kostet, was sie einspart und wann sie sich ' +
        'trägt – bevor der erste Auftrag herausgeht.',
    ),
    statsBand: {
      kicker: de('Was die Planung bringt'),
      headline: de('Entscheidungen auf Zahlen statt auf Annahmen'),
      lede: de('Faustformeln und Herstellerangaben beschreiben einen Musterbetrieb. Die Simulation rechnet Ihren.'),
    },
    stats: keyed([
      {value: '<5', unit: 'Jahre', label: de('Amortisation im dokumentierten Kundenfall')},
      {value: '40', unit: '%', label: de('Autarkiegrad nach Umsetzung')},
      {value: '−46', unit: '%', label: de('Netzbezug gegenüber der Ausgangslage')},
    ]),
    explainerKicker: de('So funktioniert es'),
    shortDescription: de('So plant Greencore AI Ihr Energieprojekt'),
    body: {
      de: blocks(
        'Am Anfang steht Ihr Lastgang. Die Viertelstundenwerte eines ganzen Jahres zeigen, wann Sie wie viel Strom ' +
          'brauchen – die Nachtschicht, den Montagmorgen, die Woche zwischen den Jahren. Dazu kommen Zählerdaten, ' +
          'Prozesszeiten und die Frage, welche Verbraucher sich zeitlich verschieben lassen und welche nicht.',
        'Daraus entsteht ein Modell Ihres Standorts: Erzeugung, Speicher, Ladeinfrastruktur, Wärme, dazu die Grenze ' +
          'Ihres Netzanschlusses, Ihre Tarifstruktur und die Netzentgelte, die für Sie gelten. Die Marktpreise ' +
          'kommen aus den Strommärkten, das Wetter aus externen Prognosen.',
        'Dann rechnet Greencore AI ein volles Betriebsjahr durch – Stunde für Stunde, nicht als Jahresmittel. Jede ' +
          'Variante läuft mit denselben Daten: eine größere Photovoltaikanlage, ein zweiter Speicher, ein anderer ' +
          'Ladepark. Weil die Grundlage identisch bleibt, sind die Ergebnisse vergleichbar.',
        'Am Ende steht keine Schätzung, sondern eine Rechnung: Stromkosten, Netzbezug, Eigenverbrauch, Autarkiegrad, ' +
          'Lastspitze, Einsparung pro Jahr, Amortisationsdauer und Liquiditätsverlauf – dazu die Dimensionierung, ' +
          'die am wirtschaftlichsten ist.',
      ),
    },
    useCases: keyed([
      {
        title: de('Energiekonzept: Wirtschaftlichkeit prüfen, bevor gebaut wird'),
        description: de(
          'Eine Photovoltaikanlage auf dem Hallendach, ein Speicher daneben, später Ladepunkte für die Flotte: ' +
            'Jede dieser Investitionen bindet Kapital über Jahre. Die Simulation zeigt vorab, welcher Teil sich ' +
            'trägt und an welcher Stelle das Geld die größte Wirkung hat.',
        ),
      },
      {
        title: de('Photovoltaik und Batteriespeicher richtig dimensionieren'),
        description: de(
          'Ein zu kleiner Speicher lässt Erträge liegen, ein zu grosser steht teuer herum. Greencore AI rechnet ' +
            'die Größen gegeneinander: Kilowattpeak, Speicherkapazität, Ladeleistung. Das Ergebnis ist die ' +
            'Kombination mit dem besten Verhältnis aus Aufwand und Ertrag – nicht die größte.',
        ),
      },
      {
        title: de('Szenarienvergleich statt Schätzung'),
        description: de(
          'Selbst bauen oder pachten, jetzt investieren oder in zwei Jahren, mit Eigenverbrauch oder mit ' +
            'Vermarktung: Die Simulation stellt die Varianten nebeneinander – mit denselben Lastdaten, denselben ' +
            'Preisen, demselben Jahr.',
        ),
      },
      {
        title: de('Netzanschlussleistung im Blick behalten'),
        description: de(
          'Viele Vorhaben scheitern nicht am Geld, sondern an der Anschlussleistung. Die Simulation hält die ' +
            'Grenze Ihres Netzanschlusses ein und zeigt, wie viel zusätzliche Last sich durch Speicher und ' +
            'zeitliche Verschiebung unterbringen lässt – oft genug, um teuren Netzausbau zu vermeiden.',
        ),
      },
      {
        title: de('Speichernachrüstung bei bestehender PV-Anlage'),
        description: de(
          'Die Photovoltaikanlage läuft seit Jahren, der Speicher kam nie dazu. Ob sich das heute rechnet, hängt ' +
            'an Ihrem Lastgang, den aktuellen Netzentgelten und den Preisen am Markt. Greencore AI rechnet die ' +
            'Nachrüstung an Ihrer bestehenden Anlage durch – mit Größe, Kosten und Amortisation.',
        ),
      },
      {
        title: de('Beschaffungsmodelle vergleichen'),
        description: de(
          'Fixpreis, Day-Ahead oder strukturierte Beschaffung: Welches Modell günstiger ist, hängt davon ab, wie ' +
            'Ihr Verbrauch über den Tag liegt und wie viel Flexibilität im System steckt. Die Simulation rechnet ' +
            'die Modelle mit Ihrem Lastgang gegeneinander.',
        ),
      },
      {
        title: de('Finanzierung durchrechnen'),
        description: de(
          'Kauf, Leasing oder Mietkauf ändern nichts an der Technik, aber viel an der Liquidität. Greencore AI ' +
            'stellt die Varianten mit Investition, Einsparung und Liquiditätsverlauf nebeneinander.',
        ),
      },
    ]),
  },

  operate: {
    title: de('Optimierung'),
    kicker: de('Optimierung'),
    lede: de(
      'Dieselbe Kilowattstunde kostet um drei Uhr nachts etwas anderes als um elf Uhr vormittags. Greencore AI ' +
        'verschiebt Verbrauch, lädt und entlädt Speicher und steuert Ladepunkte so, dass Sie möglichst wenig ' +
        'teuren Strom beziehen. Das läuft automatisch, in den Grenzen, die Sie vorgeben.',
    ),
    statsBand: {
      kicker: de('Was die Optimierung bringt'),
      headline: de('Weniger Kosten, ohne dass die Produktion es merkt'),
      lede: de(
        'Die Steuerung greift dort ein, wo Spielraum ist: bei Speichern, Ladepunkten, Wärme und Kälte. Ihre ' +
          'Prozesse bleiben, wie sie sind.',
      ),
    },
    stats: keyed([
      {value: '−50', unit: '%', label: de('Lastspitze im dokumentierten Kundenfall')},
      {value: '20', unit: '+', label: de('Variablen, die gleichzeitig optimiert werden')},
      {value: '<300', unit: 'ms', label: de('für einen kompletten Optimierungsdurchlauf')},
    ]),
    explainerKicker: de('So funktioniert es'),
    shortDescription: de('So optimiert Greencore AI Ihre Energieversorgung'),
    body: {
      de: blocks(
        'Messen: Über 200 Messpunkte im Energiesystem werden sekündlich ausgelesen – Zähler, Wechselrichter, ' +
          'Speicher, Ladepunkte, einzelne Maschinen. Damit ist bekannt, was gerade passiert, nicht was gestern war.',
        'Vorhersagen: Aus historischen Daten, Wetterdaten und über 50 externen Datenquellen entstehen drei ' +
          'Prognosen – Verbrauch, Erzeugung und Preis. Die Preisprognose reicht bis zu 72 Stunden voraus. Für den ' +
          'Verbrauch sind Genauigkeiten von über 90 Prozent dokumentiert, für die Erzeugung 89 bis 95 Prozent. Die ' +
          'Verbrauchsprognose wird 250 bis 300 Mal pro Tag neu berechnet.',
        'Rechnen: Ein mathematisches Modell berechnet daraus den günstigsten Fahrplan – über 20 Variablen, ein ' +
          'Horizont von mehr als 40 Stunden, ein Durchlauf in unter 300 Millisekunden. Das Modell hält sich an Ihre ' +
          'Vorgaben: Mindestladestand im Speicher, Temperaturgrenzen im Kühlhaus, Abfahrtszeiten der Flotte.',
        'Steuern: Der Fahrplan geht als Steuersignal an die Geräte. Ändert sich etwas – eine Maschine fällt aus, ' +
          'die Sonne kommt früher, der Preis dreht – wird neu gerechnet, ohne dass jemand eingreift.',
        'Künstliche Intelligenz macht dabei genau eine Sache: Sie sagt voraus. Gesteuert wird mit Mathematik und ' +
          'festen Leitplanken. Nichts an Ihrem Energiesystem hängt von einer Entscheidung ab, die niemand ' +
          'nachvollziehen kann.',
      ),
    },
    useCases: keyed([
      {
        title: de('Lastspitzenkappung'),
        description: de(
          'Ihr Netzentgelt richtet sich nach der höchsten Viertelstunde des Jahres. Ein einziger ungünstiger ' +
            'Moment – zwei Maschinen fahren gleichzeitig an, während die Flotte lädt – bestimmt, was Sie zwölf ' +
            'Monate lang zahlen. Greencore AI erkennt die Spitze, bevor sie entsteht, und fängt sie ab: Der ' +
            'Speicher entlädt, Ladepunkte drosseln kurz, verschiebbare Lasten warten ein paar Minuten.',
        ),
      },
      {
        title: de('Eigenverbrauchsoptimierung'),
        description: de(
          'Strom vom eigenen Dach ist günstiger als Strom aus dem Netz. Trotzdem wird viel davon eingespeist, weil ' +
            'er dann anfällt, wenn niemand ihn braucht. Greencore AI zieht den Verbrauch dorthin, wo die Erzeugung ' +
            'ist: Der Speicher nimmt auf, Kälte wird vorgehalten, die Flotte lädt mittags statt abends.',
        ),
      },
      {
        title: de('Atypische Netznutzung'),
        description: de(
          'Netzbetreiber veröffentlichen Hochlastzeitfenster. Wer seinen Bezug in diesen Fenstern nachweislich ' +
            'zurückfährt, zahlt dauerhaft weniger Netzentgelt. Der Nachweis ist die Hürde: Er verlangt, jeden Tag ' +
            'zur richtigen Zeit verlässlich unter einer Grenze zu bleiben. Genau das übernimmt Greencore AI.',
        ),
      },
      {
        title: de('Speicheroptimierung und Multi-Use'),
        description: de(
          'Die meisten Speicher laufen nach festen Regeln: voll machen, wenn die Sonne scheint, entladen, wenn der ' +
            'Verbrauch steigt. Damit bleibt Geld liegen. Greencore AI entscheidet für jede Viertelstunde neu und ' +
            'rechnet Eigenverbrauch, Lastspitze und Strompreis gegeneinander auf – aus einem Speicher für einen ' +
            'Zweck wird ein Multi-Use-Asset.',
        ),
      },
      {
        title: de('Ladeoptimierung'),
        description: de(
          'Eine wachsende Flotte lädt selten gleichmäßig. Wenn alle Fahrzeuge nach Feierabend gleichzeitig ' +
            'anstecken, entsteht genau die Spitze, die Sie vermeiden wollen. Greencore AI verteilt die ' +
            'Ladevorgänge über die verfügbare Zeit – nach Abfahrtszeit, verfügbarer Leistung und Strompreis. ' +
            'Jedes Fahrzeug ist voll, wenn es gebraucht wird.',
        ),
      },
      {
        title: de('Negative Strompreise und Einspeiseschutz'),
        description: de(
          'An sonnigen Wochenenden rutscht der Strompreis ins Minus. Wer dann einspeist, zahlt drauf. Greencore AI ' +
            'geht der Reihe nach vor: erst selbst verbrauchen, dann speichern, dann flexible Verbraucher und ' +
            'Ladepunkte zuschalten – und erst zuletzt die Erzeugung abregeln. An einem einzelnen dokumentierten Tag ' +
            'hat das rund 650 Euro ausgemacht.',
        ),
      },
      {
        title: de('Wärme und Kälte als Flexibilität nutzen'),
        description: de(
          'Kühlhäuser, Wärmepumpen und Prozesskälte speichern Energie in Form von Temperatur. Greencore AI ' +
            'kühlt oder heizt vor, wenn Strom günstig ist, und hält sich in den teuren Stunden zurück – immer ' +
            'innerhalb der Temperaturgrenzen, die der Betrieb vorgibt.',
        ),
      },
      {
        title: de('Vorbereitet auf neue Netzentgeltlogiken'),
        description: de(
          'Mit AgNes ändert sich, wie Netzentgelte berechnet werden. Wer seine Last steuern kann, profitiert ' +
            'davon. Greencore AI ist so gebaut, dass neue Netzentgeltmodelle und regulatorische Vorgaben als ' +
            'zusätzliche Leitplanken in die Optimierung eingehen – ohne Systemwechsel.',
        ),
      },
    ]),
  },

  flex: {
    title: de('Energiehandel'),
    kicker: de('Energiehandel'),
    lede: de(
      'Der Strompreis ändert sich alle 15 Minuten. Wer immer gleich viel abnimmt, zahlt den Durchschnitt – samt ' +
        'Aufschlag für das Risiko, das ein anderer für ihn trägt. Greencore AI kauft Ihren Strom über die Zeit ' +
        'verteilt ein, nutzt günstige Stunden und bietet freie Leistung aus Speichern am Markt an.',
    ),
    statsBand: {
      kicker: de('Was der Handel bringt'),
      headline: de('Schwankende Preise arbeiten für Sie statt gegen Sie'),
      lede: de(
        'Voraussetzung dafür ist eine gute Vorhersage. Wer weiss, was er morgen braucht, kauft besser ein – und ' +
          'muss seltener teuer nachkaufen.',
      ),
    },
    stats: keyed([
      {value: '72', unit: 'h', label: de('Preisprognose, auf der jede Entscheidung beruht')},
      {value: '250–300', unit: '', label: de('Neuberechnungen der Prognose pro Tag')},
      {value: '535.000', unit: 'kWh/a', label: de('optimierter Energieeinkauf im dokumentierten Kundenfall')},
    ]),
    explainerKicker: de('So funktioniert es'),
    shortDescription: de('So funktioniert der Energiehandel mit Greencore AI'),
    body: {
      de: blocks(
        'Wie der Strompreis entsteht: Für jede Viertelstunde des Folgetags melden Erzeuger und Abnehmer, was sie ' +
          'liefern oder brauchen. Um zwölf Uhr mittags steht der Day-Ahead-Preis für den nächsten Tag fest. Wer ' +
          'danach nachsteuern muss, handelt im Intraday weiter – bis fünf Minuten vor Lieferung. Wer am Ende zu ' +
          'viel oder zu wenig hat, zahlt Ausgleichsenergie, und die ist teuer.',
        'Warum die Prognose das Geschäft ist: Ein klassischer Liefervertrag schätzt Ihren Bedarf im Voraus und ' +
          'schlägt einen Risikoaufschlag auf. Je ungenauer die Schätzung, desto höher der Aufschlag. Greencore AI ' +
          'kennt Ihr Energiesystem von innen – Verbrauch, Erzeugung und Speicherstand sind bekannt, bevor sie ' +
          'eintreten. Das macht die Prognose besser und den Aufschlag kleiner.',
        'Wie eingekauft wird: Statt den gesamten Jahresbedarf an einem Stichtag festzuzurren, wird in Tranchen über ' +
          'das Jahr beschafft. Ein schlechter Tag am Markt trifft dann nur einen Teil Ihrer Menge.',
        'Wie der Speicher mitverdient: Steht Leistung frei, wird sie am Markt angeboten – laden, wenn Strom billig ' +
          'ist, entladen oder vermarkten, wenn er teuer ist. Die Entscheidung fällt viertelstündlich und ' +
          'automatisch, innerhalb der Grenzen, die Ihr Betrieb vorgibt.',
      ),
    },
    useCases: keyed([
      {
        title: de('Strukturierte Strombeschaffung'),
        description: de(
          'Ein einziger Stichtag entscheidet sonst über Ihre Stromkosten für ein ganzes Jahr. Fällt er ' +
            'ungünstig, zahlen Sie zwölf Monate dafür. Greencore AI verteilt den Einkauf über die Zeit und ' +
            'kauft dann, wenn der Markt es hergibt.',
        ),
      },
      {
        title: de('Day-Ahead- und Spotmarktoptimierung'),
        description: de(
          'An manchen Tagen ist Strom mittags fast umsonst und abends teuer. Wer Verbrauch und Speicher danach ' +
            'ausrichtet, zahlt für dieselbe Menge weniger. Greencore AI erkennt diese Stunden im Voraus und ' +
            'richtet den Fahrplan darauf aus.',
        ),
      },
      {
        title: de('Flexibilitätsvermarktung'),
        description: de(
          'Ein Speicher, der nur für den Eigenbedarf läuft, steht die meiste Zeit still. Die ungenutzte Leistung ' +
            'lässt sich am Markt anbieten. Aus einer Anlage, die Kosten senkt, wird eine, die zusätzlich Geld ' +
            'einbringt – ohne dass die Versorgung Ihres Betriebs darunter leidet.',
        ),
      },
      {
        title: de('Intraday-Ausgleich und Prognossegüte'),
        description: de(
          'Wer weniger verbraucht als gemeldet, verschenkt Geld; wer mehr verbraucht, kauft teuer nach. Beides ' +
            'entsteht aus ungenauen Prognosen. Weil Greencore AI Verbrauch und Erzeugung laufend neu berechnet und ' +
            'gleichzeitig steuert, bleibt die Abweichung klein.',
        ),
      },
    ]),
  },
}

const about = {
  kicker: de('Über uns'),
  headline: de('Das Betriebssystem für industrielle Energie'),
  lede: de(
    'Greencore AI ist eine Energieplattform für Industrie und Logistik. Sie verbindet Erzeugung, Speicher, ' +
      'Ladeinfrastruktur und Verbrauch mit dem Strommarkt und steuert das Zusammenspiel so, dass die Energiekosten ' +
      'sinken. Heute ist Greencore AI in über 70 Energiesystemen im Einsatz.',
  ),
  intro: {
    kicker: de('Was wir bauen'),
    headline: de('Eine Plattform statt vieler Einzellösungen'),
    body: {
      de: blocks(
        'In den meisten Industriebetrieben ist Energie über viele Systeme verteilt: Die Photovoltaikanlage hat ihr ' +
          'Portal, der Speicher seines, die Ladeinfrastruktur ein drittes, der Stromvertrag liegt beim Versorger. ' +
          'Jedes System für sich funktioniert. Zusammen ergeben sie kein Bild – und niemand entscheidet, was in der ' +
          'nächsten Stunde am günstigsten ist.',
        'Greencore AI legt sich als Schicht darüber. Die Plattform bildet das Energiesystem als Real-Time Twin ab, ' +
          'liest die Anlagen aus, prognostiziert Verbrauch, Erzeugung und Preise und berechnet daraus den ' +
          'wirtschaftlichsten Fahrplan, der dann automatisch gefahren wird. Erzeugung, Speicher, Verbrauch, Netz, ' +
          'Beschaffung und die Vermarktung freier Leistung laufen an einer Stelle zusammen.',
        'Die Plattform entscheidet nicht nach Gefühl. Künstliche Intelligenz erstellt die Prognosen, ein ' +
          'mathematisches Modell trifft die Entscheidung – innerhalb technischer, betrieblicher und regulatorischer ' +
          'Grenzen, die der Betrieb vorgibt.',
      ),
    },
  },
  visionMissionValueProp: {
    de: blocks(
      'Vision: Greencore AI ist Europas leistungsfähigstes Betriebssystem für die industrielle Energieversorgung.',
      'Mission: Wir verbinden und optimieren die gesamte Energieversorgung hinter dem Zähler auf einer Plattform – ' +
        'von Erzeugung und Speicher über Verbrauch, Netz und Beschaffung bis zur Vermarktung freier Leistung, ' +
        'automatisiert und in Echtzeit.',
      'Anspruch: Keine andere Plattform steuert die Kilowattstunde wirtschaftlicher.',
    ),
  },
  positioning: keyed([
    {
      from: de('Energie ist ein Kostenblock, der sich kaum beeinflussen lässt'),
      to: de('Der Block wird beweglich: Verbrauch, Speicher und Einkauf werden gesteuert'),
    },
    {
      from: de('Schwankende Marktpreise schlagen voll durch'),
      to: de('Aus dem Risiko wird eine Ertragsquelle – wer flexibel ist, verdient an Schwankungen'),
    },
    {
      from: de('Der Strombedarf steigt schneller als der Netzanschluss'),
      to: de('Zusätzliche Last wird zeitlich verteilt und über Speicher abgefedert'),
    },
    {
      from: de('Neue Netzanschlusskapazität kostet Zeit und Geld'),
      to: de('Mehr Eigenverbrauch und intelligente Steuerung schaffen Spielraum im vorhandenen Anschluss'),
    },
  ]),
  principles: keyed([
    {
      title: de('Offen für das, was schon da ist'),
      text: de(
        'Greencore AI ist system- und herstelleroffen. Wechselrichter, Speicher, Ladepunkte und Messtechnik werden ' +
          'über standardisierte Schnittstellen eingebunden – unabhängig davon, von wem sie stammen.',
      ),
    },
    {
      title: de('Nachvollziehbar statt Blackbox'),
      text: de(
        'Künstliche Intelligenz prognostiziert, Mathematik entscheidet. Jede Steuerentscheidung lässt sich ' +
          'begründen, und jede Grenze setzt der Betrieb selbst.',
      ),
    },
    {
      title: de('Wirtschaftlichkeit ist der Maßstab'),
      text: de(
        'Nicht die höchste Eigenverbrauchsquote gewinnt, sondern die niedrigsten Kosten. Danach wird optimiert, ' +
          'und daran wird gemessen.',
      ),
    },
    {
      title: de('Ein Produkt, kein Projekt'),
      text: de(
        'Greencore AI skaliert vom einzelnen Standort bis zu mehreren Werken und läuft auch in Energiesystemen, ' +
          'die wir nicht gebaut haben.',
      ),
    },
  ]),
  greenflash: {
    de: blocks(
      'Greencore AI ist bei Greenflash entstanden. Greenflash plant, baut und betreibt Energiesysteme für ' +
        'Industriekunden und hat auf diesem Weg über 400 Energiesysteme entwickelt; im Greenflash-Energieökosystem ' +
        'werden mehr als 300 GWh steuerbares Energievolumen bewegt. Aus dieser Praxis kommt die Software – und mit ' +
        'ihr das Wissen, worauf es im Betrieb ankommt.',
      'Die Aufgabenteilung ist einfach: Greenflash begleitet Kunden durch das Gesamtprojekt, von der ' +
        'Energiekonzeption über den Bau bis zum Betrieb. Greencore AI ist die digitale Ebene darin – und läuft ' +
        'ebenso in Anlagen, die andere gebaut haben.',
    ),
  },
}

const demo = {
  kicker: de('Kostenlose Demo'),
  headline: de('Ihre Zahlen, unsere Software'),
  intro: de(
    'Laden Sie Ihren Lastgang hoch. Wir richten Ihnen einen zeitlich begrenzten Zugang ein, in dem Greencore AI mit ' +
      'den Daten Ihres Standorts rechnet. Kein Musterbetrieb, keine Hochrechnung aus einer Broschüre. Sie müssen ' +
      'dafür nichts installieren und nichts an Ihren Anlagen ändern.',
  ),
  formNote: de('Den Lastgang können Sie auch nachreichen – für die Anfrage genügen zunächst Ihre Kontaktdaten.'),
  ctaLabel: de('Demo anfordern'),
  demoSection: {
    kicker: de('Was Sie bekommen'),
    headline: de('Was in der Demo drinsteckt'),
    body: de(
      'Sie sehen Ihren eigenen Standort in der Software: wie sich Verbrauch, Erzeugung und Preise über den Tag ' +
        'entwickeln, wo Ihre teuersten Viertelstunden liegen und was eine Steuerung daran ändern würde. Dazu eine ' +
        'geführte Tour durch Dashboard und Optimierungslogik sowie eine Rechnung, was das über ein Jahr bedeutet. ' +
        'Der Zugang ist zeitlich begrenzt und unverbindlich.',
    ),
  },
  steps: keyed([
    {
      title: de('Lastgang hochladen'),
      description: de('Die Viertelstundenwerte Ihres Zählers, wie Sie sie vom Netzbetreiber oder Versorger bekommen.'),
    },
    {
      title: de('Zugang erhalten'),
      description: de('Wir richten die Demo mit Ihren Daten ein und melden uns mit den Zugangsdaten.'),
    },
    {
      title: de('Potenzial besprechen'),
      description: de('Gemeinsam gehen wir durch, was an Ihrem Standort wirtschaftlich möglich ist.'),
    },
  ]),
  overview: {
    kicker: de('Kurz zusammengefasst'),
    headline: de('Was Greencore AI für Ihren Betrieb tut'),
    body: de(
      'Greencore AI plant, prognostiziert, optimiert, steuert und überwacht – und verbindet Ihr Energiesystem mit ' +
        'dem Strommarkt. Vor der Investition rechnet die Plattform durch, was sich lohnt. Im Betrieb kappt sie ' +
        'Lastspitzen, erhöht den Eigenverbrauch und senkt Netzentgelte. Am Markt beschafft sie Strom über die Zeit ' +
        'verteilt und vermarktet freie Leistung. Die Anlagen, die bei Ihnen stehen, bleiben stehen.',
    ),
  },
  urgency: {
    kicker: de('Zeitpunkt'),
    headline: de('Jeder Monat ohne Steuerung kostet Geld'),
    body: de(
      'Ihr Netzentgelt für die nächsten zwölf Monate entscheidet sich an einer einzigen Viertelstunde – und die ' +
        'kann nächste Woche sein. Strom für das kommende Jahr wird jetzt beschafft, zu Preisen, die heute am Markt ' +
        'stehen. Und jede Kilowattstunde vom eigenen Dach, die ungenutzt ins Netz geht, kommt später teurer zurück. ' +
        'Der Einstieg kostet Sie einen Lastgang und ein Gespräch.',
    ),
  },
}

async function run() {
  await client.patch('homePage').set(home).commit()
  console.log('homePage ok')

  const mods = await client.fetch('*[_type == "solutionModule"]{_id, moduleKey}')
  for (const mod of mods) {
    const data = modules[mod.moduleKey]
    if (!data) continue
    await client.patch(mod._id).set(data).commit()
    console.log(`solutionModule ${mod.moduleKey} ok`)
  }

  await client.patch('aboutPage').set(about).commit()
  console.log('aboutPage ok')

  await client.patch('demoPage').set(demo).commit()
  console.log('demoPage ok')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
