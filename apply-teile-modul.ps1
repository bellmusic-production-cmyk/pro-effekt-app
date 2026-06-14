$ErrorActionPreference = "Stop"

$pagePath = Join-Path (Get-Location) "app\page.tsx"
if (!(Test-Path $pagePath)) {
  throw "app\page.tsx nicht gefunden. Bitte dieses Script im Projektordner ausfÃ¼hren."
}

$backupPath = "app\page.backup-vor-teile-modul.tsx"
Copy-Item $pagePath $backupPath -Force

$code = Get-Content $pagePath -Raw

# MenÃ¼: Ersatzteile eindeutig als Teile anzeigen
$code = $code.Replace('"Ersatzteile",', '"Teile",')

# Typen einfÃ¼gen
if ($code -notmatch 'type SparePart') {
  $typeBlock = @'

type SparePart = {
  id: number;
  name: string;
  sku: string | null;
  stock: number;
  min_stock: number;
  unit: string | null;
  note: string | null;
  created_at: string;
};

'@
  $code = $code.Replace('type UserProfile = {', $typeBlock + 'type UserProfile = {')
}

# State einfÃ¼gen
if ($code -notmatch 'spareParts') {
  $stateBlock = @'

  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [partName, setPartName] = useState("");
  const [partSku, setPartSku] = useState("");
  const [partStock, setPartStock] = useState("0");
  const [partMinStock, setPartMinStock] = useState("1");
  const [partUnit, setPartUnit] = useState("Stk");
  const [partNote, setPartNote] = useState("");
  const [partSaving, setPartSaving] = useState(false);
'@
  $code = $code.Replace('  const [previewName, setPreviewName] = useState("");', '  const [previewName, setPreviewName] = useState("");' + $stateBlock)
}

# Ladeaufrufe einfÃ¼gen
if ($code -notmatch 'loadSpareParts\(\)') {
  $code = $code.Replace('          loadMaintenancePlans();', "          loadMaintenancePlans();`r`n          loadSpareParts();")
  $code = $code.Replace('      await loadMaintenancePlans();', "      await loadMaintenancePlans();`r`n      await loadSpareParts();")
}

# Funktionen einfÃ¼gen
if ($code -notmatch 'async function loadSpareParts') {
  $functionsBlock = @'

  async function loadSpareParts() {
    const { data, error } = await supabase
      .from("spare_parts")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Ersatzteile konnten nicht geladen werden:", error.message);
      setSpareParts([]);
      return;
    }

    setSpareParts((data || []) as SparePart[]);
  }

  async function createSparePart() {
    if (!partName.trim()) {
      alert("Bitte Teile-Name eingeben.");
      return;
    }

    setPartSaving(true);

    const { error } = await supabase.from("spare_parts").insert([
      {
        name: partName.trim(),
        sku: partSku.trim() || null,
        stock: Number(partStock) || 0,
        min_stock: Number(partMinStock) || 0,
        unit: partUnit.trim() || "Stk",
        note: partNote.trim() || null,
      },
    ]);

    setPartSaving(false);

    if (error) {
      alert(`Ersatzteil konnte nicht gespeichert werden: ${error.message}`);
      return;
    }

    setPartName("");
    setPartSku("");
    setPartStock("0");
    setPartMinStock("1");
    setPartUnit("Stk");
    setPartNote("");
    await loadSpareParts();
  }

  async function bookPartUsage(part: SparePart) {
    const input = prompt(`Wie viele ${part.unit || "Stk"} von ${part.name} verbrauchen?`, "1");
    if (!input) return;

    const quantity = Number(input.replace(",", "."));
    if (!Number.isFinite(quantity) || quantity <= 0) {
      alert("Bitte eine gÃ¼ltige Menge eingeben.");
      return;
    }

    const nextStock = Number(part.stock || 0) - quantity;
    if (nextStock < 0 && !confirm("Der Bestand wÃ¼rde negativ werden. Trotzdem buchen?")) {
      return;
    }

    const { error } = await supabase
      .from("spare_parts")
      .update({ stock: nextStock })
      .eq("id", part.id);

    if (error) {
      alert(`Verbrauch konnte nicht gebucht werden: ${error.message}`);
      return;
    }

    await supabase.from("part_usages").insert([
      {
        part_id: part.id,
        quantity,
        note: "Verbrauch manuell gebucht",
        created_by: userProfile?.id || null,
      },
    ]);

    await loadSpareParts();
  }

  async function deleteSparePart(partId: number) {
    if (!confirm("Ersatzteil wirklich lÃ¶schen?")) return;

    const { error } = await supabase.from("spare_parts").delete().eq("id", partId);

    if (error) {
      alert(`Ersatzteil konnte nicht gelÃ¶scht werden: ${error.message}`);
      return;
    }

    await loadSpareParts();
  }
'@
  $needle = '  function generateInspectionPdf(item: Device) {'
  $code = $code.Replace($needle, $functionsBlock + "`r`n" + $needle)
}

# Demo-Block durch echtes Modul ersetzen
$start = $code.IndexOf('          {activePage === "Ersatzteile" && (')
if ($start -lt 0) { $start = $code.IndexOf('          {activePage === "Teile" && (') }
$end = $code.IndexOf('          {activePage === "Rechnungen" && (', $start)
if ($start -lt 0 -or $end -lt 0) {
  throw "Ersatzteile/Teile-Block oder Rechnungen-Block nicht gefunden. Bitte Screenshot senden."
}

$newBlock = @'
          {(activePage === "Ersatzteile" || activePage === "Teile") && (
            <div className="space-y-6">
              <div className="rounded-[32px] bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-green-600">
                  VERSION SCHRITT 14 AKTIV Â· ECHTES TEILE-MODUL
                </p>
                <h3 className="mt-2 text-3xl font-black">Teile & Ersatzteillager</h3>
                <p className="mt-2 text-slate-600">
                  Teile anlegen, Bestand fÃ¼hren, Mindestbestand Ã¼berwachen und Verbrauch buchen.
                </p>
              </div>

              <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[32px] bg-white p-6 shadow-sm">
                  <h4 className="text-2xl font-black">Neues Ersatzteil</h4>

                  <div className="mt-5 space-y-4">
                    <input
                      value={partName}
                      onChange={(e) => setPartName(e.target.value)}
                      placeholder="Teile-Name, z. B. Laufband-Gurt"
                      className="w-full rounded-2xl border border-slate-300 px-5 py-3"
                    />

                    <input
                      value={partSku}
                      onChange={(e) => setPartSku(e.target.value)}
                      placeholder="Artikelnummer / SKU"
                      className="w-full rounded-2xl border border-slate-300 px-5 py-3"
                    />

                    <div className="grid gap-3 md:grid-cols-3">
                      <input
                        value={partStock}
                        onChange={(e) => setPartStock(e.target.value)}
                        type="number"
                        placeholder="Bestand"
                        className="rounded-2xl border border-slate-300 px-5 py-3"
                      />
                      <input
                        value={partMinStock}
                        onChange={(e) => setPartMinStock(e.target.value)}
                        type="number"
                        placeholder="Mindestbestand"
                        className="rounded-2xl border border-slate-300 px-5 py-3"
                      />
                      <input
                        value={partUnit}
                        onChange={(e) => setPartUnit(e.target.value)}
                        placeholder="Einheit"
                        className="rounded-2xl border border-slate-300 px-5 py-3"
                      />
                    </div>

                    <textarea
                      value={partNote}
                      onChange={(e) => setPartNote(e.target.value)}
                      placeholder="Hinweis, Lagerort, kompatible GerÃ¤te ..."
                      rows={4}
                      className="w-full rounded-2xl border border-slate-300 px-5 py-3"
                    />

                    <button
                      onClick={createSparePart}
                      disabled={partSaving}
                      className="w-full rounded-2xl bg-green-600 py-4 font-bold text-white disabled:opacity-60"
                    >
                      {partSaving ? "Speichert..." : "Ersatzteil speichern"}
                    </button>
                  </div>
                </div>

                <div className="rounded-[32px] bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-2xl font-black">Lagerbestand</h4>
                      <p className="mt-2 text-slate-600">
                        {spareParts.length} Teile im Lager Â· Warnung bei Mindestbestand.
                      </p>
                    </div>
                    <button
                      onClick={loadSpareParts}
                      className="rounded-2xl border border-slate-300 px-5 py-3 font-bold"
                    >
                      Aktualisieren
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {spareParts.length === 0 ? (
                      <div className="rounded-2xl bg-slate-100 p-5 text-slate-600">
                        Noch keine Ersatzteile gespeichert. Lege links das erste Teil an.
                      </div>
                    ) : (
                      spareParts.map((part) => {
                        const isLow = Number(part.stock || 0) <= Number(part.min_stock || 0);

                        return (
                          <div
                            key={part.id}
                            className={`rounded-3xl border p-5 ${isLow ? "border-red-200 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                          >
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-600">
                                  {part.sku || "Keine Artikelnummer"}
                                </p>
                                <h5 className="mt-1 text-xl font-black">{part.name}</h5>
                                <p className="mt-2 text-sm text-slate-600">
                                  Bestand: <strong>{part.stock}</strong> {part.unit || "Stk"} Â· Mindestbestand: {part.min_stock} {part.unit || "Stk"}
                                </p>
                                {part.note && <p className="mt-2 text-sm text-slate-500">{part.note}</p>}
                                {isLow && (
                                  <span className="mt-3 inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700">
                                    Mindestbestand erreicht
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-col gap-2 sm:flex-row xl:flex-col">
                                <button
                                  onClick={() => bookPartUsage(part)}
                                  className="rounded-2xl bg-green-600 px-4 py-3 text-sm font-bold text-white"
                                >
                                  Verbrauch buchen
                                </button>
                                <button
                                  onClick={() => deleteSparePart(part.id)}
                                  className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-bold text-red-700"
                                >
                                  LÃ¶schen
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

'@
$code = $code.Substring(0, $start) + $newBlock + $code.Substring($end)

Set-Content -Path $pagePath -Value $code -Encoding UTF8
Write-Host "OK: Teile-Modul wurde in app/page.tsx eingebaut. Backup: $backupPath" -ForegroundColor Green

