import { ChatZitat } from './typen/ChatZitat.js';
import { RateFoto } from './typen/RateFoto.js';
import { Schaetzfrage } from './typen/Schaetzfrage.js';
import { Wordle } from './typen/Wordle.js';
import { Finale } from './typen/Finale.js';
import { bildPfad } from './bilder/BildNamen.js';

export const KALENDER = {
  1: new Schaetzfrage({
    frage: "Wie viele Fotos habe ich auf meinem Handy, auf denen du drauf bist?",
    richtig: 338,
    toleranz: 25,
    einheit: "Fotos",
    aufloesung: "Genau 338 Fotos sind in deinem Personenerkennungs-Ordner."
  }),

  2: new RateFoto({
    titel: "Satellitenbild-Rätsel",
    frage: "Wo waren wir hier unterwegs?",
    bildRaten: bildPfad('VeronaRaten'),
    bildLoesung: bildPfad('VeronaAufloesung'),
    loesung: ["Verona"],
    tipp: "Gelato",
    aufloesung: "Da hast du beim Hügel schlapp gemacht!"
  }),

  3: new ChatZitat({
    zitat: "Hast deinen Aperol vergessen",
    optionen: ["Du", "Ich"],
    richtig: 1,
    aufloesung: "Das hab ich dir am 03.10.25 geschrieben, am Tag nach dem Ingolstädter Volksfest."
  }),

  4: new Wordle({
    hinweis: "",
    wort: "MADAME",
    aufloesung: "Meine Madame hat's geschafft :)"
  }),

  5: new RateFoto({
    titel: "Errate den fehlenden Gegenstand",
    frage: "Was hältst du hier nach dem Tennis-Spiel in der Hand?",
    bildRaten: bildPfad('AnnkiMeloneBlur'),
    bildLoesung: bildPfad('AnnkiMelone'),
    tipp: "Du brauchst sommerliche Erfrischung.",
    loesung: ["Melone", "Wassermelone"],
    aufloesung: "Was ist röter, die Wassermelone oder dein Gesicht?"
  }),

  // Beispiel für Chat-Zitat mit Screenshot als Auflösungsbild:
  9: new ChatZitat({
    zitat: "Ich schwöre, ich verfahre mich nicht.",
    optionen: ["Du", "Ich"],
    richtig: 1,
    aufloesung: "10 Minuten später standen wir auf dem falschen Parkplatz.",
    aufloesungBild: "bilder/tag9_chat_beweis.jpg"
  }),

  // ... Hier einfach die Blöcke für Tag 8 bis 23 reinkopieren ...

  24: new Finale({
    titel: "Frohe Weihnachten ❤️",
    statistiken: [
      { label: "Gemeinsame WhatsApp-Nachrichten", wert: "18.420" },
      { label: "Meistgenutztes Emoji", wert: "❤️ (1.240x)" }
    ],
    brief: `24 kleine Rätsel sind vorbei.
    Danke für jedes einzelne Erlebnis, jeden Insider und jeden Tag mit dir.
    Ich freue mich auf alles, was im nächsten Jahr noch kommt!`
  })
};
