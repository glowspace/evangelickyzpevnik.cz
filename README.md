# Portál hudba.e-cirkev.cz

> Projekt vzniká pod záštitou České církve evangelické (e-cirkev.cz) ve spolupráci s komunitou Glow Space.

Logo ČCE je jejím duševním vlastnictvím a nevztahuje se na něj open-source licence, pod kterou je zdrojový kód aplikace zveřejněný.

Rozsáhlejší dokumentace vývoje je dostupná v Confluence komunity Glow Space na adrese: (TODO)

## Prostředí pro vývoj

1. `cp .env.example .env` (nebo `copy .env.example .env`)
2. `yarn install`
3. `yarn dev`

Vývojový server se spustí na adrese `http://localhost:3000`.

Produkční build lze vytvořit pomocí `yarn build`. Náhled produkčního serveru se spouští příkazem `yarn preview`.
