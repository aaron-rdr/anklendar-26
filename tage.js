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
    toleranz: 20,
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

  3: new Wordle({
    hinweis: "",
    wort: "MADAME",
    aufloesung: "Meine Madame hat's geschafft :)"
  }),

  4: new ChatZitat({
    zitat: "Hast deinen Aperol vergessen",
    optionen: ["Annki", "Aaron"],
    richtig: 1,
    aufloesung: "Das hab ich dir am 03.10.25 geschrieben, am Tag nach dem Ingolstädter Volksfest."
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

  6: new Wordle({
    hinweis: "",
    wort: "BRUNO",
    aufloesung: "Bruno ist immer an deiner Seite :)"
  }),

  7: new Schaetzfrage({
    frage: "Wie viele Nachrichten sind insgesamt in unserem WhatsApp-Chat?",
    richtig: 6000,
    toleranz: 500,
    einheit: "Nachrichten",
    aufloesung: "Es sind ziemlich genau 6000 Nachrichten, Tendenz steigend natürlich."
  }),

  8: new ChatZitat({
    zitat: "Bin grad am Origami falten in den Obstplantagen",
    optionen: ["Annki", "Aaron"],
    richtig: 0,
    aufloesung: "Das hast du mir am 23.08.25 geschrieben, ich weiß immer noch nicht was du damit meintest."
  }),

  9: new RateFoto({
    titel: "Satellitenbild-Rätsel",
    frage: "Wo waren wir hier schon wieder unterwegs?",
    bildRaten: bildPfad('SachsenklemmeRaten'),
    bildLoesung: bildPfad('SachsenklemmeAufloesung'),
    loesung: ["Sachsenklemme"],
    tipp: "Danach warst du weg und ich war in der Klemme :(",
    aufloesung: "Krass dass du des noch wusstest! Oder musstest du nachfragen?"
  }),

  10: new RateFoto({
    titel: "Errate den fehlenden Gegenstand",
    frage: "Was gabs hier leckeres zum Essen?",
    bildRaten: bildPfad('FuertePastaBlur'),
    bildLoesung: bildPfad('FuertePasta'),
    tipp: "Schnell und einfach",
    loesung: ["Pestonudeln", "Pesto", "Nudeln mit Pesto", "Pesto Nudeln", "Pesto-Nudeln"],
    aufloesung: "Die guten alten Nudeln mit Pesto, auf süß <3"
  }),

  11: new ChatZitat({
    zitat: "Aber Toast ist schon männlich",
    optionen: ["Annki", "Aaron"],
    richtig: 0,
    aufloesung: "Das hast du mir am 15.06.25 geschrieben. Beweis für meine Männlichkeit als Toastliebhaber."
  }),

  12: new Schaetzfrage({
    frage: "Wie viele Prozent unserer WhatsApp-Nachrichten kamen von dir?",
    richtig: 53,
    toleranz: 10,
    einheit: "Prozent",
    aufloesung: "Ungefähr 53%, du Quasselstrippe. Das ist aber irgendwie knapper als ich dachte."
  }),

  13: new Wordle({
    hinweis: "Ich mag dich sehr",
    wort: "LIEBRON",
    aufloesung: "Hab dich liebrin <3"
  }),

  14: new ChatZitat({
    zitat: "A: Mach noch das Komma hin\nB: Du meinst den Beistrich",
    hinweis: "Von wem kam Nachricht A?",
    optionen: ["Annki", "Aaron"],
    richtig: 1,
    aufloesung: "Da hast du am 08.09.25 eingesehen, wie's wirklich heißt."
  }),

  15: new RateFoto({
    titel: "Satellitenbild-Rätsel",
    frage: "Wo waren wir hier schon wieder unterwegs?",
    bildRaten: bildPfad('BergsonRaten'),
    bildLoesung: bildPfad('BergsonAufloesung'),
    loesung: ["Bergson",  "Zeitlang", "Techno Rave", "Techno-Rave"],
    tipp: "Deine Eltern waren auch dabei.",
    aufloesung: "Der gute alte Techno-Rave im Bergson mit wenigem langsamen Essen im Zeitlang"
  }),

  16: new Schaetzfrage({
    frage: "Wie oft kommt das Wort \"quasi\" in unserem WhatsApp-Chat vor? Gerundet auf 10 reicht.",
    richtig: 200,
    toleranz: 20,
    einheit: "Mal",
    aufloesung: "Ich hab vor ein paar Wochen 196 gezählt, mittlerweile sicher etwas über 200."
  }),

  17: new RateFoto({
    titel: "Errate den fehlenden Gegenstand",
    frage: "Was chillt hier mal eben so auf deinem Kopf?",
    bildRaten: bildPfad('AnnkiSkyrBlur'),
    bildLoesung: bildPfad('AnnkiSkyr'),
    tipp: "HamHam",
    loesung: ["Skyr"],
    aufloesung: "Der geliebte Skyr hat Todesangst, zum Glück ist ihm nix passiert (bis er verspeißt wurde)"
  }),

  18: new ChatZitat({
    zitat: "Doch bist breiter",
    optionen: ["Annki", "Aaron"],
    richtig: 0,
    aufloesung: "Das hast du am 14.08.25 tatsächlich so zugegeben."
  }),

  19: new RateFoto({
    titel: "Satellitenbild-Rätsel",
    frage: "Was haben wir hier gemacht? Bonus Punkte, wenn du zwei Sachen weißt (mit Leerzeichen getrennt, erster Buchstabe immer groß)!",
    bildRaten: bildPfad('ReischachRaten'),
    bildLoesung: bildPfad('ReischachAufloesung'),
    loesung: ["Almabtrieb", "Kneippen"],
    antwortfelder: 2,
    tipp: "Bei einer Sache gabs Bonbons.",
    aufloesung: "Kühe, kaltes Wasser und Du, was will man mehr?"
  }),

  20: new Wordle({
    hinweis: "",
    wort: "QUASI",
    aufloesung: "Dachte mir quasi, dass du des weißt."
  }),

  21: new RateFoto({
    titel: "Errate den fehlenden Gegenstand",
    frage: "Was war hier so gehyped? Darfst schon bissl genau sein mit der Antwort!",
    bildRaten: bildPfad('AnnkiChipsBlur'),
    bildLoesung: bildPfad('AnnkiChips'),
    tipp: "Ein knuspriger Snack vom Rewe.",
    loesung: ["Kesselchips"],
    aufloesung: "Kesselchips und Chips sind nicht zu vergleichen hihi"
  }),

  22: new Schaetzfrage({
    frage: "Leer",
    richtig: 0,
    toleranz: 0,
    einheit: "",
    aufloesung: ""
  }),

  23: new RateFoto({
    titel: "Satellitenbild-Rätsel",
    frage: "Was ist an dieser Häuserecke?",
    bildRaten: bildPfad('IkonoRaten'),
    bildLoesung: bildPfad('IkonoAufloesung'),
    loesung: ["Ikono",  "IKONO", "Ikono Berlin", "Berlin Ikono"],
    tipp: "Die ganze Gruppe war dabei.",
    aufloesung: "Das (nicht ganz so) super mega krasse ästhetische Illusionsmuseum!"
  }),

  /* Beispiel für Chat-Zitat mit Screenshot als Auflösungsbild:
  null: new ChatZitat({
    zitat: "Ich schwöre, ich verfahre mich nicht.",
    optionen: ["Du", "Ich"],
    richtig: 1,
    aufloesung: "10 Minuten später standen wir auf dem falschen Parkplatz.",
    aufloesungBild: "bilder/tag9_chat_beweis.jpg"
  }),
  */

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
