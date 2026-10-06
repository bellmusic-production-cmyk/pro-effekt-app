export const metadata = {
  title: "Impressum | TRYBUN",
  description: "Impressum des TRYBUN Software- und Pilotprojekts.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#07111d] px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center rounded-2xl border border-sky-500/25 bg-[#0b1726] px-4 py-2 text-sm font-black text-sky-400 transition hover:border-sky-400/50"
        >
          ← Zurück zu TRYBUN
        </a>

        <div className="mt-6 rounded-[32px] border border-sky-500/20 bg-[#0b1726] p-6 shadow-2xl shadow-black/30 md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
            TRYBUN
          </p>
          <h1 className="mt-2 text-3xl font-black md:text-4xl">Impressum</h1>

          <div className="mt-8 space-y-7 text-sm font-medium leading-7 text-slate-300 md:text-base">
            <section>
              <h2 className="text-lg font-black text-white">Angaben zum Betreiber</h2>
              <p className="mt-2">
                Frank Bell
                <br />
                Kalkturmstraße 22
                <br />
                53489 Sinzig
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-white">Kontakt</h2>
              <p className="mt-2">
                E-Mail:{" "}
                <a
                  href="mailto:info@trybun.de"
                  className="font-bold text-sky-400 underline underline-offset-4"
                >
                  info@trybun.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-white">Hinweis zum Projektstatus</h2>
              <p className="mt-2">
                TRYBUN befindet sich derzeit in der Entwicklungs- und Pilotphase.
                Unter TRYBUN besteht derzeit kein öffentliches kostenpflichtiges Angebot.
                Die Bezeichnung TRYBUN wird als Projekt- und Produktname verwendet.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-white">Verantwortung für Inhalte</h2>
              <p className="mt-2">
                Für die Inhalte dieses Onlineangebots ist der oben genannte Betreiber
                verantwortlich.
              </p>
            </section>
          </div>

          <div className="mt-9 border-t border-slate-800 pt-5 text-xs font-semibold text-slate-500">
            Stand: Oktober 2026
          </div>
        </div>
      </div>
    </main>
  );
}
