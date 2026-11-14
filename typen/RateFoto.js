export class RateFoto {
  constructor({ frage, bildZoom, bildVoll = null, loesung, tipp = "", aufloesung = "" }) {
    this.frage = frage;
    this.bildZoom = bildZoom;
    this.bildVoll = bildVoll;
    this.loesungen = Array.isArray(loesung) ? loesung : [loesung];
    this.tipp = tipp;
    this.aufloesung = aufloesung;
  }

  render(container, onFertig) {
    let tippGenutzt = false;

    container.innerHTML = `
      <h2>Bild-Rätsel</h2>
      <p>${this.frage}</p>
      <div class="photo-frame">
        <img id="raetsel-img" src="${this.bildZoom}" alt="Rätselbild" />
      </div>
      ${this.tipp ? `<button class="secondary" id="tipp-btn">Tipp anzeigen (-20 Pkt)</button>` : ""}
      <p id="tipp-text" class="muted" style="display: none;"></p>
      <input type="text" id="antwort-input" placeholder="Deine Antwort..." />
      <button id="check-btn">Prüfen</button>
      <button class="secondary" id="aufgeben-btn">Auflösen</button>
      <div id="feedback"></div>
    `;

    const abschliessen = (punkte, titel) => {
      if (this.bildVoll) {
        container.querySelector("#raetsel-img").src = this.bildVoll;
      }
      container.querySelector("#check-btn").disabled = true;
      container.querySelector("#aufgeben-btn").disabled = true;
      container.querySelector("#antwort-input").disabled = true;

      container.querySelector("#feedback").innerHTML = `
        <div class="feedback">
          <strong>${titel} (${punkte} Pkt)</strong>
          <p style="margin-top: 6px;">Lösung: <strong>${this.loesungen[0]}</strong></p>
          ${this.aufloesung ? `<p style="margin-bottom: 0;">${this.aufloesung}</p>` : ""}
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
