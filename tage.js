import { ChatZitat } from './typen/ChatZitat.js';
import { ZoomFoto } from './typen/RateFoto.js';
import { Schaetzfrage } from './typen/Schaetzfrage.js';
import { Wordle } from './typen/Wordle.js';
import { Finale } from './typen/Finale.js';

export const KALENDER = {
  1: new ChatZitat({
    zitat: "Ich bin in 5 Minuten da, versprochen!",
    hinweis: "Aus unserem Chat (Oktober 2025)",
    optionen: ["Du", "Ich"],
    richtig: 0,
    aufloesung: "Spoiler: Es wurden dann doch 25 Minuten."
  }),

  2: new ZoomFoto({
    frage: "Wo waren wir hier unterwegs?",
    bildZoom: "bilder/tag2_zoom.jpg",
    bildVoll: "bilder/tag2_voll.jpg",
    loesung: ["bozen", "waltherplatz"],
    tipp: "Es hat an dem Tag geregnet.",
    aufloesung: "Unser erster Cappuccino dort!"
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
