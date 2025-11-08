<template>
  <BasicClickable
    :to="type == 'NUXTLINK' ? link : undefined"
    :href="type == 'NUXTLINK' ? undefined : link"
    @click="supportsBP && openBP($event)"
    :target="type == 'BLANK' ? '_blank' : '_self'"
  >
    <slot />
  </BasicClickable>
</template>

<script>
// SUPPORTED MEDIA TYPES
// see https://github.com/glowspace/proscholy-api/blob/develop/graphql/news.graphql#L35
// (specifically the LinkType enum in the graphql schema)

import BigPicture from 'bigpicture';
import Bowser from 'bowser';

export default {
  props: {
    type: {
      type: String,
      default: 'NORMAL',
    },
    link: String,
  },

  data() {
    return {
      browser: import.meta.client
        ? Bowser.getParser(window.navigator.userAgent)
        : null,
      supportPdfIframesCondition: {
        mobile: {
          chrome: '>1000',
        },
        desktop: {
          chrome: '>70',
          firefox: '>60',
        },
      },
    };
  },

  methods: {
    openBP(e) {
      e.preventDefault();

      switch (this.type) {
        case 'IMAGE':
          BigPicture({ el: e.target, imgSrc: this.link });
          break;

        case 'YOUTUBE':
          BigPicture({
            el: e.target,
            ytSrc: this.link.replace(/.*(([?&]v=)|(\/))([^?&]+).*/g, '$4'),
          });
          break;

        case 'VIDEO':
          BigPicture({ el: e.target, vidSrc: this.link });
          break;

        case 'PDF':
          BigPicture({ el: e.target, iframeSrc: this.link });
          break;

        default:
          BigPicture({ el: e.target, iframeSrc: this.link });
          break;
      }
    },
  },

  computed: {
    supportsBP() {
      return ['IMAGE', 'YOUTUBE', 'VIDEO', 'IFRAME', 'PDF'].includes(this.type);
    },
  },
};
</script>
