export class Schaetzfrage {
  constructor({ frage, richtig, toleranz, einheit = "", aufloesung = "", aufloesungBild = "" }) {
    this.frage = frage;
    this.richtig = richtig;
    this.toleranz = toleranz;
    this.einheit = einheit;
    this.aufloesung = aufloesung;
    this.aufloesungBild = aufloesungBild;
  }

  render(container, onFertig) {
    container.innerHTML = `
      <h2>Schätzfrage</h2>
      <p>${this.frage}</p>
      <input type="number" inputmode="decimal" id="tipp-input" placeholder="Deine Schätzung ${this.einheit ? `(${this.einheit})` : ""}..." />
      <button id="check-btn">Schätzung abgeben</button>
      <div id="feedback"></div>
    `;

    container.querySelector("#check-btn").onclick = () => {
      const roh = container.querySelector("#tipp-input").value;
      if (roh === "") return;

      const tipp = Number(roh);
      const diff = Math.abs(tipp - this.richtig);
      let punkte = 20;

      if (diff === 0) {
        punkte = 100;
      } else if (diff <= this.toleranz) {
        punkte = Math.round(75 + 25 * (1 - diff / this.toleranz));
      } else {
        const abweichung = diff / (Math.abs(this.richtig) || 1);
        punkte = Math.max(20, Math.round(70 * Math.max(0, 1 - abweichung)));
      }

      container.querySelector("#check-btn").disabled = true;
      container.querySelector("#tipp-input").disabled = true;

      container.querySelector("#feedback").innerHTML = `
        <div class="feedback">
          <strong>Exakte Zahl: ${this.richtig.toLocaleString("de-DE")} ${this.einheit}</strong>
          <p style="margin-top: 4px; margin-bottom: 0;">Deine Schätzung: ${tipp.toLocaleString("de-DE")} ${this.einheit} (+${punkte} Pkt)</p>
          ${this.aufloesung ? `<p style="margin-top: 6px; margin-bottom: 0;">${this.aufloesung}</p>` : ""}
          ${this.aufloesungBild ? `<img src="${this.aufloesungBild}" alt="Auflösung" class="feedback-img" />` : ""}
        </div>
      `;
      onFertig(punkte);
    };
  }
}
