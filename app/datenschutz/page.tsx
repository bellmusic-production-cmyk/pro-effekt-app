export const metadata = {
  title: "Datenschutz | TRYBUN",
  description: "Datenschutzhinweise für das TRYBUN Software- und Pilotprojekt.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#07111d] px-5 py-10 text-white">
      <div className="mx-auto max-w-4xl">
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
          <h1 className="mt-2 text-3xl font-black md:text-4xl">Datenschutzerklärung</h1>

          <div className="mt-8 space-y-8 text-sm font-medium leading-7 text-slate-300 md:text-base">
            <section>
              <h2 className="text-xl font-black text-white">1. Verantwortlicher</h2>
              <p className="mt-2">
                Frank Bell
                <br />
                Kalkturmstraße 22
                <br />
                53489 Sinzig
                <br />
                Deutschland
                <br />
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
              <h2 className="text-xl font-black text-white">2. Zweck dieser Website</h2>
              <p className="mt-2">
                TRYBUN befindet sich derzeit in der Entwicklungs- und Pilotphase.
                Die Website stellt den Zugang zur TRYBUN Service-Management-Plattform
                bereit. Ein öffentlicher kostenpflichtiger Dienst wird derzeit nicht angeboten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">3. Aufruf der Website und technische Protokolldaten</h2>
              <p className="mt-2">
                Beim Aufruf dieser Website können technisch erforderliche Verbindungs-
                und Protokolldaten verarbeitet werden. Dazu können insbesondere
                IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte Ressource,
                Browser- und Geräteinformationen sowie technische Statusinformationen gehören.
              </p>
              <p className="mt-2">
                Die Verarbeitung erfolgt, soweit erforderlich, zur sicheren und stabilen
                Bereitstellung des Onlineangebots sowie zur Erkennung und Abwehr von
                Störungen oder Angriffen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                Das berechtigte Interesse liegt im sicheren technischen Betrieb von TRYBUN.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">4. Hosting über Vercel</h2>
              <p className="mt-2">
                Die Webanwendung wird über Dienste von Vercel bereitgestellt. Dabei können
                die für die Auslieferung und Absicherung der Website erforderlichen
                technischen Daten durch Vercel verarbeitet werden.
              </p>
              <p className="mt-2">
                Vercel kann im Rahmen seiner Leistungserbringung Unterauftragnehmer einsetzen
                und Daten nach Maßgabe seiner Datenschutz- und Vertragsregelungen verarbeiten.
                Vor einer produktiven geschäftlichen Nutzung wird die hierfür erforderliche
                Auftragsverarbeitungs- und Drittlandkonfiguration abschließend geprüft.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">5. Backend, Datenbank und Anmeldung über Supabase</h2>
              <p className="mt-2">
                TRYBUN verwendet Supabase für Authentifizierung, Datenbankfunktionen und
                Dateispeicherung. Bei einer Anmeldung werden insbesondere Kontodaten wie
                E-Mail-Adresse, technische Authentifizierungsinformationen und für die
                Benutzerverwaltung erforderliche Profildaten verarbeitet.
              </p>
              <p className="mt-2">
                Innerhalb der Anwendung können – abhängig von der jeweiligen Nutzung –
                Kunden- und Kontaktdaten, Geräte- und Servicedaten, Tickets, Wartungsdaten,
                Dokumente, Prüfprotokolle sowie digitale Signaturen verarbeitet werden.
                Der Zugriff ist nach Benutzerrollen und Mandantenzugehörigkeit beschränkt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">6. Rechtsgrundlagen bei Nutzung der Plattform</h2>
              <p className="mt-2">
                Soweit Daten für die Durchführung einer vereinbarten Pilot- oder
                Nutzungsbeziehung erforderlich sind, kann die Verarbeitung auf Art. 6
                Abs. 1 lit. b DSGVO beruhen. Sicherheits- und Betriebsdaten können auf
                Art. 6 Abs. 1 lit. f DSGVO verarbeitet werden. Soweit für einen konkreten
                Vorgang eine Einwilligung eingeholt wird, erfolgt die Verarbeitung auf
                Art. 6 Abs. 1 lit. a DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">7. Daten von Kunden eines TRYBUN-Nutzers</h2>
              <p className="mt-2">
                Werden später durch ein Unternehmen personenbezogene Daten seiner eigenen
                Kunden, Ansprechpartner oder Beschäftigten in TRYBUN verarbeitet, legt
                dieses Unternehmen grundsätzlich Zweck und Umfang dieser Verarbeitung fest.
                Für einen solchen produktiven Einsatz werden die datenschutzrechtlichen
                Rollen und – soweit erforderlich – eine Vereinbarung zur Auftragsverarbeitung
                vorab gesondert geregelt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">8. Lokale Speicherung im Browser</h2>
              <p className="mt-2">
                TRYBUN verwendet technisch erforderliche lokale Browser-Speichermechanismen,
                beispielsweise um Sitzungs- oder Zustandsinformationen für die Anwendung
                bereitzuhalten. Diese Funktionen dienen dem Betrieb der Plattform.
                Analyse- oder Werbetracking wird über diese Datenschutzerklärung nicht
                beschrieben und ist derzeit nicht Bestandteil des vorgesehenen TRYBUN-Betriebs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">9. Speicherdauer</h2>
              <p className="mt-2">
                Personenbezogene Daten werden nur so lange gespeichert, wie dies für den
                jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten
                bestehen. Technische Sicherheits- und Protokolldaten werden nach den
                jeweiligen Vorgaben der eingesetzten Hosting- und Backend-Dienste sowie
                nach dem erforderlichen Sicherheitszweck behandelt. Für den späteren
                Produktivbetrieb wird ein verbindliches Lösch- und Aufbewahrungskonzept
                festgelegt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">10. Empfänger und Dienstleister</h2>
              <p className="mt-2">
                Daten können im erforderlichen Umfang an technische Dienstleister
                übermittelt werden, insbesondere an Vercel für das Hosting und an Supabase
                für Authentifizierung, Datenbank- und Speicherfunktionen. Eine Weitergabe
                zu Werbezwecken ist nicht vorgesehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">11. Ihre Rechte</h2>
              <p className="mt-2">
                Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere Rechte
                auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch. Soweit eine Verarbeitung auf Ihrer
                Einwilligung beruht, können Sie diese mit Wirkung für die Zukunft widerrufen.
              </p>
              <p className="mt-2">
                Zur Ausübung Ihrer Rechte genügt eine Nachricht an{" "}
                <a
                  href="mailto:info@trybun.de"
                  className="font-bold text-sky-400 underline underline-offset-4"
                >
                  info@trybun.de
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">12. Beschwerderecht</h2>
              <p className="mt-2">
                Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.
                Für den Sitz des Verantwortlichen kommt insbesondere der Landesbeauftragte
                für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz (LfDI)
                als zuständige Aufsichtsbehörde in Betracht.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">13. Sicherheit</h2>
              <p className="mt-2">
                TRYBUN verwendet technische und organisatorische Schutzmaßnahmen, darunter
                Authentifizierung, rollen- und mandantenbezogene Zugriffssteuerung sowie
                verschlüsselte Übertragungswege der eingesetzten Plattformdienste.
                Die Sicherheitsmaßnahmen werden im Zuge der Weiterentwicklung fortlaufend
                überprüft und erweitert.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-white">14. Änderungen dieser Datenschutzerklärung</h2>
              <p className="mt-2">
                Diese Datenschutzerklärung wird angepasst, wenn sich Funktionen,
                Dienstleister oder rechtliche Anforderungen ändern. Maßgeblich ist die
                jeweils auf dieser Seite veröffentlichte Fassung.
              </p>
            </section>
          </div>

          <div className="mt-9 border-t border-slate-800 pt-5 text-xs font-semibold text-slate-500">
            Stand: Oktober 2026 · Entwicklungs- und Pilotphase
          </div>
        </div>
      </div>
    </main>
  );
}
