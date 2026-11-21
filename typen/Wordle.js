export class Wordle {
  constructor({ hinweis, wort, maxVersuche = 6, aufloesung = "", aufloesungBild = "" }) {
    this.hinweis = hinweis;
    this.wort = wort.trim().toUpperCase();
    this.maxVersuche = maxVersuche;
    this.aufloesung = aufloesung;
    this.aufloesungBild = aufloesungBild;
  }

  render(container, onFertig) {
    const laenge = this.wort.length;
    let versuche = [];
    let aktuell = "";
    let beendet = false;
    const tastenStatus = {}; // "correct" | "present" | "absent"

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

    const aktualisiereTastenStatus = (tipp, farben) => {
      for (let i = 0; i < laenge; i++) {
        const ch = tipp[i];
        if (farben[i] === "var(--success)") {
          tastenStatus[ch] = "correct";
        } else if (farben[i] === "var(--warn)" && tastenStatus[ch] !== "correct") {
          tastenStatus[ch] = "present";
        } else if (!tastenStatus[ch]) {
          tastenStatus[ch] = "absent";
        }
      }
    };

    const tastenStyle = (taste) => {
      const status = tastenStatus[taste];
      if (status === "correct") {
        return "background:var(--success); color:#052e16;";
      }
      if (status === "present") {
        return "background:var(--warn); color:#0f172a;";
      }
      if (status === "absent") {
        return "background:#111827; color:#475569; border:1px solid #1e293b; opacity:0.55;";
      }
      return "background:var(--card-soft); color:var(--text);";
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
            ${r
              .map(
                (t) => {
                  const deaktiviert = /^[A-ZÄÖÜ]$/.test(t) && tastenStatus[t] === "absent";
                  return `<button type="button" data-key="${t}" ${deaktiviert ? "disabled" : ""} style="flex:1; padding:10px 2px; margin:0; font-size:0.82rem; ${tastenStyle(t)}">${t}</button>`;
                }
              )
              .join("")}
          </div>`
        )
        .join("");

      container.innerHTML = `
        <h2>Heute ein Wordle für dich (${laenge} Buchstaben)</h2>
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
      if (/^[A-ZÄÖÜ]$/.test(taste) && tastenStatus[taste] === "absent") return;

      if (taste === "⌫" || taste === "BACKSPACE") {
        aktuell = aktuell.slice(0, -1);
        zeichne();
      } else if (taste === "OK" || taste === "ENTER") {
        if (aktuell.length !== laenge) return;
        const farben = bewerteWort(aktuell);
        aktualisiereTastenStatus(aktuell, farben);
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
              ${this.aufloesungBild ? `<img src="${this.aufloesungBild}" alt="Auflösung" class="feedback-img" />` : ""}
            </div>
          `;
          onFertig(punkte);
        }
      } else if (/^[A-ZÄÖÜ]$/.test(taste) && aktuell.length < laenge) {
        aktuell += taste;
        zeichne();
      }
    };

    const onKeyDown = (e) => {
      if (!container.isConnected || beendet) {
        document.removeEventListener("keydown", onKeyDown);
        return;
      }
      const key = e.key.toUpperCase();
      if (key === "BACKSPACE" || key === "ENTER" || /^[A-ZÄÖÜ]$/.test(key)) {
        verarbeiteTaste(key);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    zeichne();
  }
}
