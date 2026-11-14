export class Finale {
  constructor({ titel = "Frohe Weihnachten!", statistiken = [], brief }) {
    this.titel = titel;
    this.statistiken = statistiken;
    this.brief = brief;
  }

  render(container, onFertig, state) {
    const gesamt = Object.entries(state.punkte)
      .filter(([tag]) => Number(tag) < 24)
      .reduce((sum, [, val]) => sum + val, 0);

    const statsHtml = this.statistiken
      .map(
        (s) => `
        <div style="background:var(--bg); padding:10px 12px; border-radius:10px; border:1px solid var(--border); display:flex; justify-content:space-between; margin-bottom:8px;">
          <span class="muted">${s.label}</span>
          <strong>${s.wert}</strong>
        </div>`
      )
      .join("");

    const absaetze = this.brief
      .split("\n")
      .filter((z) => z.trim() !== "")
      .map((z) => `<p>${z}</p>`)
      .join("");

    container.innerHTML = `
      <h2>${this.titel}</h2>
      <div class="feedback" style="margin-bottom: 18px;">
        <div class="muted">Dein Gesamtergebnis aus 23 Türchen</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent); margin: 4px 0;">
          ${gesamt} Punkte
        </div>
      </div>
      ${statsHtml ? `<div style="margin-bottom: 18px;">${statsHtml}</div>` : ""}
      <div style="background: var(--card-soft); padding: 16px; border-radius: 12px;">
        ${absaetze}
      </div>
    `;

    onFertig(100);
  }
}
