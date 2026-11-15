import { KALENDER } from './tage.js';

const KONFIG = {
  titel: "Annkis digitaler Adventskalender",
  jahr: 2026,
  passwort: "winter26", // Leer lassen "" um die Passwort-Sperre zu deaktivieren
  testModus: true       // WICHTIG: Vor dem 1. Dezember auf false setzen!
};

const STORAGE_KEY = "advent_2026_state_v1";
const app = document.getElementById("app");
const scoreBadge = document.getElementById("score-badge");

function ladeState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { unlocked: false, punkte: {} };
  } catch {
    return { unlocked: false, punkte: {} };
  }
}

function speichereState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  aktualisierePunkteAnzeige(state);
}

function aktualisierePunkteAnzeige(state) {
  const gesamt = Object.values(state.punkte).reduce((sum, val) => sum + val, 0);
  scoreBadge.textContent = `Punkte: ${gesamt}`;
}

function istTagFreigeschaltet(tag) {
  if (KONFIG.testModus) return true;
  const jetzt = new Date();
  if (jetzt.getFullYear() > KONFIG.jahr) return true;
  return jetzt.getFullYear() === KONFIG.jahr && jetzt.getMonth() === 11 && jetzt.getDate() >= tag;
}

function renderPasswortScreen(state) {
  app.innerHTML = `
    <h1>${KONFIG.titel}</h1>
    <p class="muted">Gib einmalig das Passwort aus dem Umschlag ein, um den Kalender auf diesem Gerät freizuschalten.</p>
    <input type="password" id="pw-input" placeholder="Passwort..." />
    <button id="pw-btn">Freischalten</button>
    <p id="pw-err" class="muted" style="color: var(--error); display: none;">Falsches Wort – versuch es nochmal.</p>
  `;

  const pruefen = () => {
    const eingabe = document.getElementById("pw-input").value.trim().toLowerCase();
    if (eingabe === KONFIG.passwort.trim().toLowerCase()) {
      state.unlocked = true;
      speichereState(state);
      starteApp();
    } else {
      document.getElementById("pw-err").style.display = "block";
    }
  };

  document.getElementById("pw-btn").onclick = pruefen;
  document.getElementById("pw-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") pruefen();
  });
}

function renderUebersicht(state) {
  document.getElementById("home-link").style.visibility = "hidden";
  let kacheln = "";

  for (let tag = 1; tag <= 24; tag++) {
    const offen = istTagFreigeschaltet(tag);
    const erledigt = state.punkte[tag] !== undefined;
    const status = erledigt ? `${state.punkte[tag]} Pkt` : offen ? "Offen" : "🔒";
    const klasse = erledigt ? "door done" : offen ? "door" : "door locked";

    kacheln += `
      <a href="?tag=${tag}" class="${klasse}">
        ${tag}
        <span>${status}</span>
      </a>
    `;
  }

  app.innerHTML = `
    <h1>${KONFIG.titel}</h1>
    <p class="muted">Wähle ein Türchen aus. Nicht schummeln.</p>
    <div class="grid-24">${kacheln}</div>
  `;
}

function renderTag(tag, state) {
  const raetsel = KALENDER[tag];
  if (!raetsel) {
    app.innerHTML = `<h2>Türchen ${tag}</h2><p>Für diesen Tag ist noch kein Inhalt hinterlegt.</p>`;
    return;
  }

  if (!istTagFreigeschaltet(tag)) {
    const heute = new Date();
    const ziel = new Date(KONFIG.jahr, 11, tag);
    const diffTage = Math.max(1, Math.ceil((ziel - heute) / (1000 * 60 * 60 * 24)));
    app.innerHTML = `
      <h2>Türchen ${tag} ist noch zu</h2>
      <p>Ich hab doch gesagt nicht schummeln! Dieses Türchen öffnet sich erst am <strong>${tag}. Dezember</strong>.</p>
      <p class="muted">Versuch's in ${diffTage} Tagen nochmal.</p>
    `;
    return;
  }

  app.innerHTML = `
    <div class="muted" style="margin-bottom: 4px;">Türchen ${tag}/div>
    <div id="spiel-container"></div>
    <div class="footer-nav" id="footer-nav" style="display: none;"></div>
  `;

  const container = document.getElementById("spiel-container");
  const footer = document.getElementById("footer-nav");

  const onFertig = (punkte) => {
    if (state.punkte[tag] === undefined) {
      state.punkte[tag] = Math.round(punkte);
      speichereState(state);
    }
    footer.style.display = "block";
    footer.innerHTML = `
      <p class="muted" style="margin-bottom: 8px;">Gespeichert: +${state.punkte[tag]} Punkte</p>
      <a href="./">Zurück zur Türchen-Übersicht →</a>
    `;
  };

  raetsel.render(container, onFertig, state);
}

function starteApp() {
  const state = ladeState();
  aktualisierePunkteAnzeige(state);

  if (KONFIG.passwort && !state.unlocked) {
    renderPasswortScreen(state);
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const tag = parseInt(params.get("tag"), 10);

  if (tag >= 1 && tag <= 24) {
    renderTag(tag, state);
  } else {
    renderUebersicht(state);
  }
}

starteApp();
