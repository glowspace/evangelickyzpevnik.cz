<template>
  <TopBar title="O evangelickém zpěvníku" is-h1 @back="navigateTo('/')" />
  <div class="custom-container">
    <div class="cont basic-content">
      <h2>Novinky</h2>

      <h3>Digitalizace zpěvníku: nový portál i&nbsp;mobilní aplikace</h3>
      <p>
        Slíbený digitální Evangelický zpěvník je tady. Spustili jsme první verzi
        nového webového portálu, kde jsou již nyní všechny písně, kytarové verze
        s&nbsp;akordy i&nbsp;všechny doprovody z&nbsp;chorálníku. Součástí je
        také zcela nová mobilní aplikace pro Android a&nbsp;konečně také pro iOS
        (Apple). Projekt počítá s&nbsp;rozšiřováním a&nbsp;nahráváním dalších
        materiálů k&nbsp;písním, aby tak tak postupně vzniklo velké úložiště
        veškerých dostupných písňových materiálů.
      </p>
      <h3>Co je nového</h3>
      <p>
        Web umožňuje vyhledávat a&nbsp;zobrazit všechny písně a&nbsp;dostupné
        materiály k&nbsp;nim. Většina písní obsahuje ve výchozím zobrazení
        i&nbsp;notový zápis, ale i&nbsp;tam, kde ještě není dostupný, je možné
        zobrazit PDF s&nbsp;notami a&nbsp;akordy (tzv. kytarovou verzi)
        a&nbsp;také PDF s&nbsp;varhanním doprovodem příslušné písně
        z&nbsp;chorálníku. Stejné funkce nabízí i&nbsp;obě bezplatné mobilní
        aplikace. Pokud už ve svých telefonech máte stávající aplikaci pro
        Android, sama se vám aktualizuje na nejnovější verzi. Mobilní aplikace
        mají navíc také několik praktických uživatelských funkcí, jako je
        například možnost nastavit velikost písma či automaticky posouvat text
        při zpěvu. Můžete si také ukládat oblíbené písně do vlastních seznamů.
      </p>
      <h3>Na čem dále pracujeme</h3>
      <p>
        K&nbsp;jednotlivým písním budeme postupně přikládat různé další
        materiály, jako jsou nahrávky, alternativní doprovody či odkazy na
        internetové zdroje (například YouTube). K&nbsp;většině písní ze zpěvníku
        také postupně vznikají textové komentáře, z&nbsp;nichž je možno dozvědět
        se o&nbsp;písni řadu zajímavostí. Takový text se může hodit například
        při přípravě bohoslužeb či pro objasnění souvislostí, jak píseň vznikla
        a&nbsp;proč je ve zpěvníku třeba právě v&nbsp;této verzi.
        V&nbsp;poslední fázi pak počítáme také s&nbsp;biblickou konkordancí ke
        zpěvníku, po níž je v&nbsp;církvi poptávka. Výsledek práce zvláštní
        skupiny k&nbsp;tomu určené by se měl stát součástí zpěvníkových
        materiálů v&nbsp;průběhu roku 2025.
      </p>
      <h3>Kdo za projektem stojí</h3>
      <p>
        Projekt je vzácným příkladem ekumenické spolupráce. Oslovili jsme
        komunitu Glow Space, která v&nbsp;římskokatolickém prostředí vydala
        podobné zpěvníky zpevnik.proscholy.cz a&nbsp;regenschori.cz. Naši
        ekumeničtí přátelé souhlasili s&nbsp;využitím jejich řešení i&nbsp;pro
        naši církev a&nbsp;náš zpěvník. Za velmi výhodných podmínek jsme se tedy
        mohli stát součástí funkčního, prověřeného a&nbsp;neustále se
        vyvíjejícího systému, na němž již bylo odvedeno několik tisíc
        (z&nbsp;většiny dobrovolnických) hodin práce IT specialistů. Díky za to!
      </p>

      <h2>O projektu</h2>

      <p>
        Digitální evangelický zpěvník je společným projektem
        <a href="https://e-cirkev.cz">Českobratrské církve evangelické</a>.
        a&nbsp;týmu vývojářů z&nbsp;komunity
        <a href="https://glowspace.cz">Glow Space</a>.
      </p>

      <p>
        Tištěný zpěvník vydala ČCE v&nbsp;roce 2021. Na zpěvníku léta pracovala
        osmičlenná tvůrčí skupina (Miloslav Esterle, Romana Čunderlíková, Pavel
        Hanych, Daniel Heller, Pavel Křivohlavý, Ladislav Moravetz, Daniela
        Švandová a&nbsp;Ondřej Titěra), ale také mnozí další odborníci
        a&nbsp;dobrovolníci. Celkem jich byly skoro tři desítky. Tištěný zpěvník
        si můžete
        <a href="https://eshop.e-cirkev.cz/produkty/zpevnik/"
          >koupit v&nbsp;e-shopu</a
        >.
      </p>

      <h2>Kontakt</h2>

      <p>
        <span>Pavel Hanych</span> <br>
        <span class="text-secondary">koordinátor nového zpěvníku</span> <br>
        <a href="tel:+420-608-880-579">+420 608 880 579</a> <br>
        <a href="mailto:zpevnik@e-cirkev.cz">zpevnik@e-cirkev.cz</a>
      </p>

      <h2>Tým, který stojí za touto aplikací</h2>

      <TeamSection
        :members="[
          {
            name: 'Vít Kološ',
            role: 'koordinace, návrh rozhraní',
          },
          {
            name: 'Pavel Hanych',
            role: 'koordinace za ČCE',
          },
          { name: 'P. Ondřej Talaš', role: 'koordinace, uživatelská podpora' },
          { name: 'Patrik Dobiáš', role: 'vývoj mobilní aplikace' },
          { name: 'Miroslav Šerý', role: 'vývoj webu' },
          { name: 'Jana Stuchlíková', role: 'redakce' },
        ]"
      />
    </div>
  </div>
</template>

<script>
import TeamSection from './TeamSection';

export default {
  components: { TeamSection },

  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  methods: {
    getTitle() {
      return 'O evangelickém zpěvníku';
    },

    getDescription() {
      return 'Podrobnosti o tvorbě nového evangelického zpěvníku a jeho digitální verze';
    },
  },
};
</script>

<style lang="postcss" scoped>
.cont {
  @apply mx-6 my-6;
}
</style>
