export class ChatZitat {
  constructor({ zitat, hinweis = "", optionen = ["Du", "Ich"], richtig, aufloesung = "" }) {
    this.zitat = zitat;
    this.hinweis = hinweis;
    this.optionen = optionen;
    this.richtig = richtig;
    this.aufloesung = aufloesung;
  }

  render(container, onFertig) {
    const buttonsHtml = this.optionen
      .map((opt, idx) => `<button class="option-btn" data-idx="${idx}">${opt}</button>`)
      .join("");

    container.innerHTML = `
      <h2>Wer hat's geschrieben?</h2>
      ${this.hinweis ? `<p class="muted">${this.hinweis}</p>` : ""}
      <div class="chat-bubble">„${this.zitat}“</div>
      <div id="optionen">${buttonsHtml}</div>
      <div id="feedback"></div>
    `;

    const buttons = container.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      btn.onclick = () => {
        const wahl = Number(btn.dataset.idx);
        const treffer = wahl === this.richtig;

        buttons.forEach((b, i) => {
          b.disabled = true;
          if (i === this.richtig) b.classList.add("correct");
          else if (i === wahl) b.classList.add("wrong");
        });

        container.querySelector("#feedback").innerHTML = `
          <div class="feedback">
            <strong>${treffer ? "Volltreffer! (+100 Pkt)" : "Knapp daneben! (+25 Pkt)"}</strong>
            ${this.aufloesung ? `<p style="margin-top: 6px; margin-bottom: 0;">${this.aufloesung}</p>` : ""}
          </div>
        `;
        onFertig(treffer ? 100 : 25);
      };
    });
  }
}
