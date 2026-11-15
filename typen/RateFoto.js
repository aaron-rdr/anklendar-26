// Sowohl für Satellitenbilder, als auch für ausgeschnittenen Gegenstand raten geeignet

export class RateFoto {
  constructor({ titel = "Bild-Rätsel", frage, bildBlurred, bildVoll = null, loesung, tipp = "", aufloesung = "", aufloesungBild = "" }) {
    this.titel = titel;
    this.frage = frage;
    this.bildBlurred = bildBlurred;
    this.bildVoll = bildVoll;
    this.loesungen = Array.isArray(loesung) ? loesung : [loesung];
    this.tipp = tipp;
    this.aufloesung = aufloesung;
    this.aufloesungBild = aufloesungBild;
  }

  render(container, onFertig) {
    let tippGenutzt = false;

    container.innerHTML = `
      <h2>${this.titel}</h2>
      <p>${this.frage}</p>
      <div class="photo-frame">
        <img id="raetsel-img" src="${this.bildBlurred}" alt="Rätselbild" />
      </div>
      ${this.tipp ? `<button class="secondary" id="tipp-btn">Tipp anzeigen (-20 Pkt)</button>` : ""}
      <p id="tipp-text" class="muted" style="display: none;"></p>
      <input type="text" id="antwort-input" placeholder="Deine Antwort..." />
      <button id="check-btn">Prüfen</button>
      <button class="secondary" id="aufgeben-btn">Auflösen</button>
      <div id="feedback"></div>
    `;

    const abschliessen = (punkte, statusTitel) => {
      if (this.bildVoll) {
        container.querySelector("#raetsel-img").src = this.bildVoll;
      }
      container.querySelector("#check-btn").disabled = true;
      container.querySelector("#aufgeben-btn").disabled = true;
      container.querySelector("#antwort-input").disabled = true;

      container.querySelector("#feedback").innerHTML = `
        <div class="feedback">
          <strong>${statusTitel} (${punkte} Pkt)</strong>
          <p style="margin-top: 6px; margin-bottom: 0;">Lösung: <strong>${this.loesungen[0]}</strong></p>
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
      const eingabe = container.querySelector("#antwort-input").value.trim().toLowerCase();
      if (!eingabe) return;

      const richtig = this.loesungen.some((l) => {
        const ziel = l.trim().toLowerCase();
        return eingabe === ziel || (eingabe.length >= 4 && ziel.includes(eingabe));
      });

      if (richtig) {
        abschliessen(tippGenutzt ? 80 : 100, "Richtig erkannt!");
      } else {
        container.querySelector("#feedback").innerHTML = `<p style="color: var(--error);">Noch nicht ganz – versuch es noch einmal!</p>`;
      }
    };

    container.querySelector("#aufgeben-btn").onclick = () => {
      abschliessen(20, "Aufgelöst");
    };
  }
}