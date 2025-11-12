<template>
  <PageTopBar title="O evangelickém kancionálu" is-h1 />
  <div class="custom-container">
    <div class="cont basic-content">
      <h2>O projektu</h2>

      <p>
        Digitální evangelický kancionál je společným projektem Slezské církve
        evangelické a. v. a týmu vývojářů z komunity
        <a href="https://glowspace.cz">Glow Space</a>.
      </p>

      <p>
        Tištěný zpěvník vydala v roce 2005 SCEAV ve spolupráci s Luterskou
        církví evang. a. v. Na zpěvníku pracovala k&nbsp;tomu pověřena komise:
        Jan Cieślar, Jiří Chodura, Zdena Pastuszková, Józef Podola<sup>†</sup>,
        Roman Raszka, Marek Říčan, Wiesław Szpak, Zuzana Szpaková, Jan Wacławek,
        na dopisování kytarových akordů také Jindřich Kunz<sup>†</sup>. Tištěný
        zpěvník si můžete koupit
        <a href="https://eshop.ecmise.cz/produkt/evangelicky-kancional/"
          >na e-shopu EC MISE</a
        >.
      </p>

      <h2>Kontakt</h2>

      <p>
        <span>Marek Říčan</span> <br />
        <Email address="mrican@sceav.cz" class="text-gray" />
      </p>

      <h2>Tým, který stojí za touto aplikací</h2>

      <TeamSection
        :members="[
          { name: 'P. Ondřej Talaš', role: 'koordinace, uživatelská podpora' },
          { name: 'Patrik Dobiáš', role: 'vývoj mobilní aplikace' },
          { name: 'Miroslav Šerý', role: 'vývoj webu' },
          { name: 'Vít Kološ', role: 'návrh rozhraní' },
          { name: 'Lukáš Mocek', role: 'redakce' },
        ]"
      />
    </div>
  </div>
</template>

<script setup>
useHead(
  generateHead(
    'O evangelickém kancionálu',
    'Podrobnosti o tvorbě evangelického kancionálu a jeho digitální verze'
  )
);
</script>

<style lang="postcss" scoped>
.cont {
  @apply mx-6 my-6;
}
</style>
