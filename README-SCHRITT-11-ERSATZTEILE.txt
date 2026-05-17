FE-SERVICE Schritt 11: Ersatzteile-Modul

Enthalten:
- app/page.tsx aktualisiert
- app/globals.css bleibt mit FE-Service-Grün
- supabase-ersatzteile.sql für die neuen Tabellen und Rechte

Wichtig:
1. ZIP ins Projekt entpacken und vorhandene Dateien überschreiben.
2. Supabase SQL Editor öffnen.
3. Inhalt von supabase-ersatzteile.sql ausführen.
4. Danach lokal starten.

Terminal:
npm install
npm run dev

Für Vercel/Handy danach:
npm run build
git add .
git commit -m "Add spare parts inventory module"
git push
