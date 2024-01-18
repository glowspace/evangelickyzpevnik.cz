<template>
  <TopBar title="O Evangelickém zpěvníku" is-h1 @back="navigateTo('/')" />
  <div class="custom-container">
    <div class="cont basic-content">
      <h2>O projektu</h2>

      <p>
        Evangelický zpěvník je projektem
        <BasicLink href="https://e-cirkev.cz" underline
          >Českobratrské církve evangelické</BasicLink
        >. Tuto aplikaci vytvořil tým vývojářů z komunity
        <BasicLink href="https://glowspace.cz" underline>Glow Space</BasicLink>.
      </p>

      <h2>Náš tým</h2>

      <TeamSection
        :members="[
          {
            name: 'Vít Kološ',
            role: 'koordinace, návrh rozhraní',
          },
          {
            name: 'Pavel Hanych',
            role: 'koordinace nového evangelického zpěvníku',
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
      return 'O Evangelickém zpěvníku';
    },

    getDescription() {
      return 'Jak vzniká web Evangelického zpěvníku a kdo ho tvoří? Tady to zjistíte.';
    },
  },
};
</script>

<style lang="postcss" scoped>
.cont {
  @apply mx-6 my-4;
}
</style>
