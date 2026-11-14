export class Wordle {
  constructor({ hinweis, wort, maxVersuche = 6, aufloesung = "" }) {
    this.hinweis = hinweis;
    this.wort = wort.trim().toUpperCase();
    this.maxVersuche = maxVersuche;
    this.aufloesung = aufloesung;
  }

  render(container, onFertig) {
    const laenge = this.wort.length;
    let versuche = [];
    let aktuell = "";
    let beendet = false;

    const reihen = [
      ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
      ["OK", "Y", "X", "C", "V", "B", "N", "M", "⌫"]
    ];

    const bewerteWort = (tipp) => {
      const res = Array(laenge).fill("#334155");
      const rest = this.wort.split("");

      for (let i = 0; i < laenge; i++) {
        if (tipp[i] === rest[i]) {
          res[i] = "var(--success)";
          rest[i] = null;
        }
      }
      for (let i = 0; i < laenge; i++) {
        if (res[i] === "#334155" && rest.includes(tipp[i])) {
          res[i] = "var(--warn)";
          rest[rest.indexOf(tipp[i])] = null;
        }
      }
      return res;
    };

    const zeichne = () => {
      let boardHtml = "";
      for (let r = 0; r < this.maxVersuche; r++) {
        const zeile = versuche[r] || (r === versuche.length ? aktuell.padEnd(laenge, " ") : " ".repeat(laenge));
        const farben = versuche[r] ? bewerteWort(versuche[r]) : Array(laenge).fill("var(--bg)");

        let zellen = "";
        for (let c = 0; c < laenge; c++) {
          zellen += `
            <div style="aspect-ratio:1; display:flex; align-items:center; justify-content:center;
                        background:${farben[c]}; border:1px solid var(--border); border-radius:8px;
                        font-weight:700; font-size:1.15rem;">
              ${zeile[c] === " " ? "" : zeile[c]}
            </div>`;
        }
        boardHtml += `<div style="display:grid; grid-template-columns:repeat(${laenge}, 1fr); gap:6px; margin-bottom:6px;">${zellen}</div>`;
      }

      const tastenHtml = reihen
        .map(
          (r) => `<div style="display:flex; gap:4px; justify-content:center; margin-bottom:5px;">
            ${r.map((t) => `<button type="button" data-key="${t}" style="flex:1; padding:10px 2px; margin:0; font-size:0.82rem; background:var(--card-soft); color:var(--text);">${t}</button>`).join("")}
          </div>`
        )
        .join("");

      container.innerHTML = `
        <h2>Beziehungs-Wordle (${laenge} Buchstaben)</h2>
        <p class="muted">${this.hinweis}</p>
        <div style="max-width:340px; margin:14px auto;">${boardHtml}</div>
        <div id="kb">${tastenHtml}</div>
        <div id="feedback"></div>
      `;

      container.querySelectorAll("#kb button").forEach((btn) => {
        btn.onclick = () => verarbeiteTaste(btn.dataset.key);
      });
    };

    const verarbeiteTaste = (taste) => {
      if (beendet) return;

      if (taste === "⌫" || taste === "BACKSPACE") {
        aktuell = aktuell.slice(0, -1);
        zeichne();
      } else if (taste === "OK" || taste === "ENTER") {
        if (aktuell.length !== laenge) return;
        versuche.push(aktuell);
        const gewonnen = aktuell === this.wort;
        aktuell = "";
        zeichne();

        if (gewonnen || versuche.length >= this.maxVersuche) {
          beendet = true;
          const punkte = gewonnen ? Math.max(40, 100 - (versuche.length - 1) * 12) : 25;
          container.querySelector("#feedback").innerHTML = `
            <div class="feedback">
              <strong>${gewonnen ? `Geschafft in ${versuche.length} Versuch(en)! (+${punkte} Pkt)` : `Lösungswort: ${this.wort} (+${punkte} Pkt)`}</strong>
              ${this.aufloesung ? `<p style="margin-top:6px; margin-bottom:0;">${this.aufloesung}</p>` : ""}
            </div>
          `;
          onFertig(punkte);
        }
      } else if (/^[A-ZÄÖÜ]$/.test(taste) && aktuell.length < laenge) {
        aktuell += taste;
        zeichne();
      }
    };

    zeichne();
  }
}
