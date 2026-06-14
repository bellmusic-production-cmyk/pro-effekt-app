PRO-EFFEKT Schritt 11: Ersatzteile-Modul

Enthalten:
- app/page.tsx aktualisiert
- app/globals.css bleibt mit PRO-EFFEKT-GrÃ¼n
- supabase-ersatzteile.sql fÃ¼r die neuen Tabellen und Rechte

Wichtig:
1. ZIP ins Projekt entpacken und vorhandene Dateien Ã¼berschreiben.
2. Supabase SQL Editor Ã¶ffnen.
3. Inhalt von supabase-ersatzteile.sql ausfÃ¼hren.
4. Danach lokal starten.

Terminal:
npm install
npm run dev

FÃ¼r Vercel/Handy danach:
npm run build
git add .
git commit -m "Add spare parts inventory module"
git push

