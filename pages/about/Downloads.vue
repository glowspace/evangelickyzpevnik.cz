<template>
  <TopBar title="Materiály ke stažení" is-h1 @back="navigateTo('/')" />
  <div class="custom-container">
    <div class="cont basic-content">
      <h2>Společné písně ve starém a novém zpěvníku</h2>
      <p>
        Pro snazší seznámení s novým zpěvníkem jsme připravili
        <a
          href="https://docs.google.com/spreadsheets/d/15ojIx58a8Kw9ZI8OBafjEZBVJmQruTBaV7bvzjC7E-c/edit?usp=sharing"
          >srovnávací tabulku</a
        >, jejímž prostřednictvím můžete dohledat písně ze starých zpěvníků (EZ,
        Svítá) v novém.
      </p>
      <p>
        Tabulka je průběžně aktualizována jako živý materiál. Přibývají také
        odkazy na biblické texty. Za pomoc s přípravou děkujeme Ewě Jelinek a
        Jiřímu Pejlovi.
      </p>

      <h2>Nahrávky písní</h2>
      <p>Poslouchejte <a href="https://soundcloud.com/ecirkev/sets/nov-evangelick-zp-vn-k-2021">na platformě SoundCloud</a>.</p>

      <h2>Písně k promítání</h2>
      <p>
        Připravili jsme verzi zpěvníku vhodnou pro promítání přes projektor na
        plátno či zeď. Využíváme k tomu volně dostupný program program OpenLP.
        Za pomoc s přípravou dat děkujeme svitavskému faráři Filipu Kellerovi.
      </p>

      <h3>Jak na to?</h3>
      <ol>
        <li>
          Stáhněte si
          <a href="https://openlp.org/">program OpenLP</a> a&nbsp;nainstalujte
          jej na svůj počítač.
        </li>
        <li>
          Stáhněte si
          <a href="#">data nového zpěvníku v&nbsp;archivu zip</a>
          a&nbsp;rozbalte je do libovolné složky ve svém počítači.
        </li>
        <li>
          V programu OpenLP zvolte Soubor – Import, zadejte složku
          s&nbsp;písněmi a&nbsp;označte všechny soubory.
        </li>
        <li>
          Písně se nahrají do databáze a můžete začít. Program OpenLP má různé
          možnosti nastavení a zobrazení.
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  methods: {
    getTitle() {
      return 'Materiály ke stažení – Evangelický zpěvník';
    },

    getDescription() {
      return 'Materiály k evangelickému zpěvníku, které jsme pro vás připravili';
    },
  },
};
</script>

<style lang="postcss" scoped>
.cont {
  @apply mx-6 my-6;
}
</style>
