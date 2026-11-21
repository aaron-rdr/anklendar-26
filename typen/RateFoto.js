// Sowohl für Satellitenbilder, als auch für ausgeschnittenen Gegenstand raten geeignet

export class RateFoto {
  constructor({ titel = "Bild-Rätsel", frage, bildRaten, bildLoesung = null, loesung, antwortfelder = 1, bonusPunkte = 125, tipp = "", aufloesung = "", aufloesungBild = "" }) {
    this.titel = titel;
    this.frage = frage;
    this.bildRaten = bildRaten;
    this.bildLoesung = bildLoesung;
    this.loesungen = Array.isArray(loesung) ? loesung : [loesung];
    this.antwortfelder = antwortfelder;
    this.bonusPunkte = bonusPunkte;
    this.tipp = tipp;
    this.aufloesung = aufloesung;
    this.aufloesungBild = aufloesungBild;
  }

  render(container, onFertig) {
    let tippGenutzt = false;
    let fehlversuche = 0;

    container.innerHTML = `
      <h2>${this.titel}</h2>
      <p>${this.frage}</p>
      <div class="photo-frame">
        <img id="raetsel-img" src="${this.bildRaten}" alt="Rätselbild" />
      </div>
      ${this.tipp ? `<button class="secondary" id="tipp-btn">Tipp anzeigen (-20 Pkt)</button>` : ""}
      <p id="tipp-text" class="muted" style="display: none;"></p>
      ${Array.from({ length: this.antwortfelder }, (_, index) => `
        <input type="text" class="antwort-input" placeholder="${this.antwortfelder > 1 ? `Antwort ${index + 1}...` : "Deine Antwort..."}" />
      `).join("")}
      <button id="check-btn">Prüfen</button>
      <div id="feedback"></div>
    `;

    const abschliessen = (punkte, statusTitel) => {
      if (this.bildLoesung) {
        container.querySelector("#raetsel-img").src = this.bildLoesung;
      }
      container.querySelector("#check-btn").disabled = true;
      container.querySelectorAll(".antwort-input").forEach((input) => {
        input.disabled = true;
      });

      const loesungstext = this.antwortfelder > 1 ? this.loesungen.join(" und ") : this.loesungen[0];
      container.querySelector("#feedback").innerHTML = `
        <div class="feedback">
          <strong>${statusTitel} (${punkte} Pkt)</strong>
          <p style="margin-top: 6px; margin-bottom: 0;">Lösung: <strong>${loesungstext}</strong></p>
          ${this.aufloesung ? `<p style="margin-top: 6px; margin-bottom: 0;">${this.aufloesung}</p>` : ""}
          ${this.aufloesungBild ? `<img src="${this.aufloesungBild}" alt="Auflösung" class="feedback-img" />` : ""}
        </div>
      `;
      onFertig(punkte);
    };

    if (this.tipp) {
      container.querySelector("#tipp-btn").onclick = (e) => {
        tippGenutzt = true;
        e.target.style.display = "none";
        const t = container.querySelector("#tipp-text");
        t.textContent = `Tipp: ${this.tipp}`;
        t.style.display = "block";
      };
    }

    container.querySelector("#check-btn").onclick = () => {
      const eingaben = Array.from(container.querySelectorAll(".antwort-input"))
        .map((input) => input.value.trim().toLowerCase())
        .filter(Boolean);
      if (!eingaben.length) return;

      const bekannteLoesungen = this.loesungen.map((loesung) => loesung.trim().toLowerCase());
      const alleRichtig = eingaben.every((eingabe) => bekannteLoesungen.includes(eingabe));
      if (alleRichtig) {
        const richtigeLoesungen = new Set(eingaben);
        const bonus = this.antwortfelder > 1 && bekannteLoesungen.every((loesung) => richtigeLoesungen.has(loesung));
        const punkte = Math.max(0, (bonus ? this.bonusPunkte : 100) - (tippGenutzt ? 20 : 0) - fehlversuche * 10);
        abschliessen(punkte, "Richtig erkannt!");
      } else {
        fehlversuche++;
        container.querySelector("#feedback").innerHTML = `<p style="color: var(--error);">Noch nicht ganz – versuch es noch einmal! (-10 Pkt)</p>`;
      }
    };
  }
}