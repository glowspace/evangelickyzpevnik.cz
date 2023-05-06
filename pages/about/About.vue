<template>
  <TopBar title="O Evangelickém zpěvníku" @back="navigateTo('/')" />
  <div class="container">
    <h2>Kdo za projektem stojí?</h2>

    <p>
      Jsme skupina lidí, kteří chtějí usnadnit práci všem, kteří pracují s
      českou nebo slovenskou křesťanskou tvorbou. V dnešní době, kdy jsou
      materiály i potřebné know-how roztroušeny po mnoha různých místech na
      internetu nebo v papírových sbornících a zpěvnících, chceme nabídnout
      rychlou a praktickou alternativu.
    </p>

    <h3>Náš tým</h3>

    <div class="our-team">
      <h4>Vývoj</h4>

      <div class="d-block d-sm-flex flex-wrap">
        <user-card name="Miroslav Šerý" info="vedoucí vývojář, vývoj webu" />
        <user-card
          name="Michael Dojčár"
          info="celková koordinace projektu, IT"
        />
        <user-card name="Vít Kološ" info="vývoj webu, návrh rozhraní" />
        <user-card name="Patrik Dobiáš" info="mobilní aplikace pro iOS" />
        <user-card name="Benjamín Tichý" info="logo, design, návrh rozhraní" />
      </div>
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
