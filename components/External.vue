<template>
  <div v-if="line" class="flex flex-row line">
    <BasicClickable
      class="py-3 pl-6 flex flex-row items-center min-w-0"
      :href="mediaLink"
      target="_blank"
      @click="openPreview($event)"
    >
      <div class="w-6 mr-4 text-center flex-shrink-0 text-gray-600">
        <BasicIcon :name="typeClass" type="fa" />
      </div>
      <div class="min-w-0">
        <div class="pr-3 w-full">{{ displayName }}</div>
        <div class="text-secondary text-sm truncate">
          {{ external.authors.map((a) => a.name).join(', ') }}
        </div>
      </div>
    </BasicClickable>
    <div
      class="flex-shrink-0 flex-grow flex flex-row items-center justify-end pr-3"
    >
      <Kebab :items="kebabMenuItems" button-class="text-gray-600" />
    </div>
  </div>
  <div v-else class="shadow-md bg-primary-150 rounded-lg overflow-hidden">
    <div class="flex flex-row items-center gap-1 p-1">
      <BasicButton
        :icon-name="typeClass"
        icon-type="fa"
        icon-only
        :href="mediaLink"
      />
      <span v-for="(author, authorIndex) in external.authors" :key="author.id">
        <span v-if="authorIndex">, </span>
        <BasicLink :to="author.public_route">{{ author.name }}</BasicLink>
      </span>
      <span class="flex flex-grow justify-end">
        <BasicButton
          icon-name="open_in_new"
          icon-only
          :href="mediaLink"
          target="_blank"
        />
      </span>
    </div>
    <div v-if="supportsIframe">
      <iframe
        v-if="['spotify', 'soundcloud'].includes(external.media_type)"
        :src="source"
        width="100%"
        :height="external.media_type == 'spotify' ? 80 : 120"
        :style="
          external.media_type == 'spotify' ? 'background-color: #282828;' : ''
        "
        frameborder="0"
        scrolling="no"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <div
        v-else-if="external.media_type == 'youtube'"
        class="relative"
        style="padding-top: 56.25%"
      >
        <iframe
          class="absolute inset-0 w-full h-full"
          :src="source"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <audio
        v-else-if="
          ['file/mp3', 'file/wav', 'file/aac', 'file/flac'].includes(
            external.media_type
          )
        "
        :src="source"
        controls
        class="w-full"
      >
        Váš prohlížeč bohužel nepodporuje přehrávání zvukových souborů.
      </audio>
      <div
        v-else-if="
          ['file/jpeg', 'file/png', 'file/gif'].includes(external.media_type)
        "
        class="overflow-auto"
        :style="'height:' + height"
      >
        <img :src="source" class="w-full" />
      </div>
      <iframe
        v-else
        :src="source"
        frameborder="0"
        :style="'width:100%;height:' + height"
        allowfullscreen
      ></iframe>
    </div>
    <div
      v-if="external.is_uploaded"
      class="pl-4 p-1 flex flex-row items-center justify-between"
    >
      <BasicLink :href="mediaLink">{{ displayName }}</BasicLink>
      <BasicButton icon-name="download" icon-only :href="downloadUrl" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.line:hover,
.line:focus-within {
  @apply bg-surface-50;
}

.line:active {
  @apply bg-surface-200;
}
</style>

<script>
import Bowser from 'bowser';
import Kebab from '~/components/Kebab';

export default {
  components: { Kebab },

  props: {
    line: Boolean,
    index: Number,
    external: Object,
    songName: String,
    height: {
      type: String,
      default: '300px',
    },
  },

  data() {
    return {
      browser: process.client
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

  computed: {
    source() {
      if (this.external.media_type == 'spotify') {
        return (
          'https://open.spotify.com/embed/track/' +
          this.external.media_id +
          '?theme=0'
        );
      } else if (this.external.media_type == 'soundcloud') {
        return (
          'https://w.soundcloud.com/player/?url=' +
          this.external.media_id +
          '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
        );
      } else if (this.external.media_type == 'youtube') {
        return (
          'https://www.youtube-nocookie.com/embed/' +
          this.external.media_id +
          (this.external.media_id.includes('?') ? '&' : '?') +
          'rel=0'
        );
      } else if (this.external.media_type == 'file/pdf') {
        return (
          'https://zpevnik.proscholy.cz/js/ViewerJS/#/material/' +
          this.external.id +
          '.pdf'
        );
      }

      return this.external.url;
    },

    mediaLink() {
      if (this.external.media_type == 'spotify') {
        return 'https://open.spotify.com/track/' + this.external.media_id;
      }

      return this.external.url;
    },

    downloadUrl() {
      if (this.external.is_uploaded) {
        return this.external.url + '?s=1';
      }
    },

    displayName() {
      let name = '';

      if (this.external.caption) {
        name += this.external.caption;
      } else if (
        this.external.media_type &&
        this.external.media_type.substring(0, 4) == 'file' &&
        this.external.media_id
      ) {
        name += this.external.media_id;
      } else {
        name +=
          this.songName +
          ' – ' +
          this.external.content_type_string +
          ' č. ' +
          (this.index + 1);
      }

      if (this.external.tags_instrumentation.length) {
        name += ' (';

        for (let i = 0; i < this.external.tags_instrumentation.length; i++) {
          const tag = this.external.tags_instrumentation[i];
          name += i ? ', ' + tag.name : tag.name;
        }

        name += ')';
      }

      return name;
    },

    typeClass() {
      switch (this.external.media_type) {
        case 'spotify':
        case 'soundcloud':
        case 'youtube':
          return 'fab fa-' + this.external.media_type;

        case 'file/mp3':
        case 'file/wav':
        case 'file/aac':
        case 'file/flac':
          return 'fas fa-music';

        case 'file/pdf':
          return 'fas fa-file-pdf';

        case 'file/jpeg':
        case 'file/png':
        case 'file/gif':
          return 'fas fa-file-image';

        case 'file/docx':
        case 'file/doc':
          return 'fas fa-file-word';
      }

      if (
        this.external.media_type &&
        this.external.media_type.substring(0, 4) == 'file'
      ) {
        return 'fas fa-file-alt';
      }

      return 'fas fa-link';
    },

    previewClass() {
      if (this.external.content_type == 'RECORDING') {
        return 'far fa-play-circle';
      }

      return 'far fa-eye';
    },

    supportsIframe() {
      return [
        'spotify',
        'soundcloud',
        'youtube',
        'file/mp3',
        'file/wav',
        'file/aac',
        'file/flac',
        'file/pdf',
        'file/jpeg',
        'file/png',
        'file/gif',
      ].includes(this.external.media_type);
    },

    kebabMenuItems() {
      const menu = [
        { label: 'Otevřít', href: this.mediaLink, icon: 'visibility' },
      ];

      if (this.external.is_uploaded) {
        menu.push({
          label: 'Stáhnout',
          href: this.downloadUrl,
          icon: 'download',
        });
      }

      menu.concat(
        this.external.authors.map((a) => ({
          label: a.name,
          to: a.public_route,
          icon: 'person',
        }))
      );

      return menu;
    },
  },

  methods: {
    openPreview(e) {
      // can be used to override opening preview link
    },
  },
};
</script>
