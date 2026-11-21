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
        <img id="raetsel-img" class="zoomable-image" src="${this.bildRaten}" alt="Rätselbild" tabindex="0" role="button" aria-label="Bild vergrößern" />
      </div>
      ${this.tipp ? `<button class="secondary" id="tipp-btn">Tipp anzeigen (-20 Pkt)</button>` : ""}
      <p id="tipp-text" class="muted" style="display: none;"></p>
      ${Array.from({ length: this.antwortfelder }, (_, index) => `
        <input type="text" class="antwort-input" placeholder="${this.antwortfelder > 1 ? `Antwort ${index + 1}...` : "Deine Antwort..."}" />
      `).join("")}
      <button id="check-btn">Prüfen</button>
      <div id="feedback"></div>
      <dialog id="bild-modal" class="image-lightbox" aria-label="Bildansicht">
        <div class="image-lightbox-controls">
          <button type="button" class="secondary" id="bild-zoom-out" aria-label="Verkleinern">−</button>
          <button type="button" class="secondary" id="bild-zoom-reset">100%</button>
          <button type="button" class="secondary" id="bild-zoom-in" aria-label="Vergrößern">+</button>
          <button type="button" id="bild-modal-close">Schließen</button>
        </div>
        <div class="image-lightbox-viewport">
          <img id="bild-modal-img" class="image-lightbox-image" alt="" />
        </div>
      </dialog>
    `;

    const bildModal = container.querySelector("#bild-modal");
    const bildModalImg = container.querySelector("#bild-modal-img");
    const zoomOutButton = container.querySelector("#bild-zoom-out");
    const zoomInButton = container.querySelector("#bild-zoom-in");
    const zoomResetButton = container.querySelector("#bild-zoom-reset");
    let zoom = 1;
    let vorherigerFokus = null;
    let vorherigeBildSichtbarkeit = "";

    const aktualisiereZoom = () => {
      bildModalImg.style.width = `${zoom * 100}%`;
      bildModalImg.style.height = `${zoom * 100}%`;
      zoomResetButton.textContent = `${Math.round(zoom * 100)}%`;
      zoomOutButton.disabled = zoom <= 1;
      zoomInButton.disabled = zoom >= 4;
    };

    const bildOeffnen = (bild) => {
      vorherigerFokus = bild;
      vorherigeBildSichtbarkeit = bild.style.visibility;
      bild.style.visibility = "hidden";
      bildModalImg.src = bild.currentSrc || bild.src;
      bildModalImg.alt = bild.alt;
      zoom = 1;
      aktualisiereZoom();
      bildModal.showModal();
      container.querySelector("#bild-modal-close").focus();
    };

    const bildSchliessen = () => {
      if (bildModal.open) bildModal.close();
    };

    bildModal.addEventListener("close", () => {
      if (vorherigerFokus) vorherigerFokus.style.visibility = vorherigeBildSichtbarkeit;
      if (vorherigerFokus) vorherigerFokus.focus();
    });

    bildModal.addEventListener("click", (e) => {
      if (e.target.closest(".image-lightbox-controls")) return;

      const rect = bildModalImg.getBoundingClientRect();
      const bildseitenverhaeltnis = bildModalImg.naturalWidth / bildModalImg.naturalHeight;
      const rahmenseitenverhaeltnis = rect.width / rect.height;
      const bildbreite = bildseitenverhaeltnis > rahmenseitenverhaeltnis
        ? rect.width
        : rect.height * bildseitenverhaeltnis;
      const bildhoehe = bildseitenverhaeltnis > rahmenseitenverhaeltnis
        ? rect.width / bildseitenverhaeltnis
        : rect.height;
      const bildLinks = rect.left + (rect.width - bildbreite) / 2;
      const bildOben = rect.top + (rect.height - bildhoehe) / 2;
      const aufBild = e.clientX >= bildLinks
        && e.clientX <= bildLinks + bildbreite
        && e.clientY >= bildOben
        && e.clientY <= bildOben + bildhoehe;

      if (!aufBild) bildSchliessen();
    });

    container.addEventListener("click", (e) => {
      const bild = e.target.closest(".zoomable-image");
      if (bild && container.contains(bild)) bildOeffnen(bild);
    });

    container.addEventListener("keydown", (e) => {
      const bild = e.target.closest(".zoomable-image");
      if (bild && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        bildOeffnen(bild);
      }
    });

    container.querySelector("#bild-modal-close").onclick = bildSchliessen;
    container.querySelector("#bild-zoom-out").onclick = () => {
      zoom = Math.max(1, zoom - 0.5);
      aktualisiereZoom();
    };
    container.querySelector("#bild-zoom-in").onclick = () => {
      zoom = Math.min(4, zoom + 0.5);
      aktualisiereZoom();
    };
    container.querySelector("#bild-zoom-reset").onclick = () => {
      zoom = 1;
      aktualisiereZoom();
    };

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
          ${this.aufloesungBild ? `<img src="${this.aufloesungBild}" alt="Auflösung" class="feedback-img zoomable-image" tabindex="0" role="button" aria-label="Bild vergrößern" />` : ""}
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