<template>
  <TopBar title="O Evangelickém zpěvníku" @back="navigateTo('/')" />
  <div class="cont">
    <h2>Kdo za projektem stojí?</h2>

    <p>
      Jsme skupina lidí, kteří chtějí usnadnit práci všem, kteří pracují s
      českou nebo slovenskou křesťanskou tvorbou. V dnešní době, kdy jsou
      materiály i potřebné know-how roztroušeny po mnoha různých místech na
      internetu nebo v papírových sbornících a zpěvnících, chceme nabídnout
      rychlou a praktickou alternativu.
    </p>

    <h2>Náš tým</h2>

    <div class="our-team">
      <h3>Vývoj</h3>

      <ul>
        <user-card name="Miroslav Šerý" info="vedoucí vývojář, vývoj webu" />
        <user-card
          name="Michael Dojčár"
          info="celková koordinace projektu, IT"
        />
        <user-card name="Vít Kološ" info="vývoj webu, návrh rozhraní" />
        <user-card name="Patrik Dobiáš" info="mobilní aplikace pro iOS" />
        <user-card name="Benjamín Tichý" info="logo, design, návrh rozhraní" />
      </ul>
    </div>
  </div>
</template>

<script>
import UserCard from './UserCard';

export default {
  components: { UserCard },

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

  h2, h3, h4  {
    @apply mt-6;
  }

  p {
    @apply my-3
  }

  h2 {
    @apply text-xl;
  }

  h3 {
    @apply uppercase;
  }
</style>
