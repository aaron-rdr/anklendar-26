const dateien = {
    IkonoRaten: "Screenshot 2026-11-14 170942.png",
    IkonoAufloesung: "WhatsApp Image 2026-11-15 at 08.59.01 (1).jpeg",
    BergsonRaten: "Screenshot 2026-11-14 171059.png",
    BergsonAufloesung: "WhatsApp Image 2026-11-15 at 08.59.01.jpeg",
    SachsenklemmeRaten: "Screenshot 2026-11-14 171318.png",
    SachsenklemmeAufloesung: "WhatsApp Image 2026-11-15 at 09.00.01.jpeg",
    GardaseeRaten: "Screenshot 2026-11-14 171422.png",
    GardaseeAufloesung: "WhatsApp Image 2026-11-15 at 08.59.02.jpeg",
    ReischachRaten: "Screenshot 2026-11-14 172515.png",
    ReischachAufloesung: "WhatsApp Image 2026-11-15 at 08.59.02 (1).jpeg",
    VeronaRaten: "Screenshot 2026-11-15 090451.png",
    VeronaAufloesung: "WhatsApp Image 2026-11-15 at 09.05.17.jpeg",
    AnnkiMeloneBlur: "BlurredWhatsApp Image 2026-11-14 at 16.45.18.jpeg",
    AnnkiMelone: "WhatsApp Image 2026-11-14 at 16.45.18.jpeg",
    FuertePastaBlur: "BlurredWhatsApp Image 2026-11-14 at 16.45.19 (1).jpeg",
    FuertePasta: "WhatsApp Image 2026-11-14 at 16.45.19 (1).jpeg",
    AnnkiSkyrBlur: "BlurredWhatsApp Image 2026-11-14 at 16.45.19 (3).jpeg",
    AnnkiSkyr: "WhatsApp Image 2026-11-14 at 16.45.19 (3).jpeg",
    AnnkiMeißnerBlur: "BlurredWhatsApp Image 2026-11-14 at 16.45.19 (4).jpeg",
    AnnkiMeißner: "WhatsApp Image 2026-11-14 at 16.45.19 (4).jpeg",
    AnnkiChipsBlur: "BlurredWhatsApp Image 2026-11-14 at 16.45.19.jpeg",
    AnnkiChips: "WhatsApp Image 2026-11-14 at 16.45.19.jpeg"
};

/**
 * @param {keyof typeof dateien} id // VSCode schlägt hiermit verfügbare Schlüssel beim eingeben vor
 */
export function bildPfad(id) {
    const dateiname = dateien[id];

    if (!dateiname) {
        throw new Error(`Unbekannte Bild-ID: ${id}`);
    }

    return `bilder/${encodeURIComponent(dateiname)}`;
}
