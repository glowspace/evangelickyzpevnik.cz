# Webová aplikace [evangelickyzpevnik.cz](https://www.evangelickyzpevnik.cz/)

> Digitální evangelický zpěvník je společným projektem [Českobratrské církve evangelické](https://e-cirkev.cz/) a týmu vývojářů z komunity [Glow Space](https://glowspace.cz/).

Logo ČCE je jejím duševním vlastnictvím a nevztahuje se na něj open-source licence, pod kterou je zdrojový kód aplikace zveřejněný.

## Prostředí pro vývoj

1. `cp .env.example .env` (nebo `copy .env.example .env`)
2. `yarn install`
3. `yarn dev`

Vývojový server se spustí na adrese `http://localhost:3000`.

Produkční build lze vytvořit pomocí `yarn build`. Náhled produkčního serveru se spouští příkazem `yarn preview`.

Aktuální verzi Node.js lze specifikovat v souboru `package.json` pomocí `engines`. Uvedenou verzí se řídí i Vercel.
