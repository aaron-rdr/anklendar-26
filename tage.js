import { ChatZitat } from './typen/ChatZitat.js';
import { RateFoto } from './typen/RateFoto.js';
import { Schaetzfrage } from './typen/Schaetzfrage.js';
import { Wordle } from './typen/Wordle.js';
import { Finale } from './typen/Finale.js';
import { bildPfad } from './bilder/BildNamen.js';

export const KALENDER = {
  1: new ChatZitat({
    zitat: "Ich bin in 5 Minuten da, versprochen!",
    hinweis: "Aus unserem Chat (Oktober 2025)",
    optionen: ["Du", "Ich"],
    richtig: 0,
    aufloesung: "Spoiler: Es wurden dann doch 25 Minuten."
  }),

  2: new RateFoto({
    titel: "Satellitenbild-Rätsel",
    frage: "Wo waren wir hier unterwegs?",
    bildZoom: bildPfad('VeronaRaten'),
    bildVoll: bildPfad('VeronaAufloesung'),
    loesung: ["Verona"],
    tipp: "Gelato",
    aufloesung: "Da hast du beim Hügel schlapp gemacht!"
  }),

  3: new Schaetzfrage({
    frage: "Wie viele WhatsApp-Nachrichten haben wir uns insgesamt geschrieben?",
    richtig: 18420,
    toleranz: 1500,
    einheit: "Nachrichten",
    aufloesung: "Exakt 18.420 Nachrichten seit unserem allerersten Tag."
  }),

  4: new Wordle({
    hinweis: "Ein Wort, das nur wir beide benutzen (6 Buchstaben):",
    wort: "KAFFEE",
    aufloesung: "Ohne geht morgens gar nichts."
  }),

  // Beispiel für ausgeschnittenen Gegenstand -> Originalfoto:
  8: new RateFoto({
    titel: "Gegenstand erraten",
    frage: "Welcher Gegenstand ist hier aus einem unserer Fotos ausgeschnitten?",
    bildZoom: "bilder/tag8_ausschnitt.png",
    bildVoll: "bilder/tag8_original.jpg",
    loesung: ["kaffeetasse", "tasse"],
    aufloesung: "Stand damals beim Frühstück direkt neben dir!"
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
