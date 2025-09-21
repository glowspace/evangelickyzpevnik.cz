<template>
  <TopBar :title="author ? author.type_string : 'načítám…'">
    <Kebab
      v-if="author"
      :items="[
        {
          label: 'Nahlásit',
          icon: 'warning',
          href:
            'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/1/create/21?customfield_10056=' +
            encodeURIComponent($config.public.siteUrl + $route.fullPath),
        },
        {
          label: 'Upravit',
          icon: 'edit',
          href: $config.public.adminUrl + '/author/' + author.id + '/edit',
        },
      ]"
    />
  </TopBar>
  <div class="custom-container">
    <div class="m-5">
      <template v-if="$apollo.loading">
        <LoaderSkeleton type="heading" class="mt-6" />
        <LoaderSkeleton type="paragraph" class="mt-6" />
      </template>
      <template v-else-if="author">
        <h1 class="mb-3 text-2xl font-semibold">{{ author.name }}</h1>

        <div class="basic-content">
          <div v-if="author.description">
            <h2>O {{ aboutStrings[author.type] }}</h2>
            <p>{{ author.description }}</p>
          </div>

          <p v-if="author.members.length">
            <strong>Související autoři: </strong>
            <span v-for="(members, key) in author.members" :key="key">
              <span v-if="key">, </span>
              <BasicClickable :to="members.public_route">{{
                members.name
              }}</BasicClickable>
            </span>
          </p>

          <p v-if="author.memberships.length">
            <strong>Skupiny: </strong>
            <span v-for="(membership, key2) in author.memberships" :key="key2">
              <span v-if="key2">, </span>
              <BasicClickable :to="membership.public_route">{{
                membership.name
              }}</BasicClickable>
            </span>
          </p>
        </div>

        <div
          class="-mx-3"
          v-if="
            author.songs_originals.length +
              author.songs_translations.length +
              author.songs_interpreted.length >
            0
          "
        >
          <AuthorSongsList
            heading-text="Autorské písně"
            heading-class="text-primary"
            v-if="author.songs_originals.length"
            :songs="author.songs_originals"
          />
          <AuthorSongsList
            heading-text="Překlady"
            heading-class="text-greendark"
            v-if="author.songs_translations.length"
            :songs="author.songs_translations"
          />
          <AuthorSongsList
            heading-text="Interpretace písní"
            heading-class="text-red"
            v-if="author.songs_interpreted.length"
            :songs="author.songs_interpreted"
          />
        </div>
        <div v-else class="py-5">
          V databázi zatím nemáme žádné související písně.
        </div>
      </template>
    </div>

    <!-- <div class="p-1 mb-3 mt-n2">
      <div class="px-4 py-2 inline-block">
        Evangelický zpěvník <img src="/img/logo.svg" width="20px" />
        {{ new Date().getFullYear() }}
      </div>
      <div class="float-right">
        <a
          class="btn btn-secondary"
          :href="
            'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/1/create/21?customfield_10056=' +
            encodeURIComponent($config.public.siteUrl + $route.fullPath)
          "
          >Nahlásit</a
        >
        <a
          v-if="author"
          class="btn btn-secondary"
          :href="$config.public.adminUrl + '/author/' + author.id + '/edit'"
          >Upravit</a
        >
      </div>
    </div> -->
  </div>
</template>

<script>
import AuthorSongsList from './AuthorSongsList';
import gql from 'graphql-tag';

const FETCH_AUTHOR = gql`
  query ($id: ID!) {
    author(id: $id) {
      id
      name
      type
      type_string
      description
      public_route
      members {
        name
        public_route
      }
      memberships {
        name
        public_route
      }
      songs_originals {
        ...slFields
      }
      songs_translations {
        ...slFields
      }
      songs_interpreted {
        ...slFields
      }
    }
  }

  fragment slFields on SongLyric {
    type
    name
    secondary_name_1
    secondary_name_2
    songbook_records {
      pivot {
        songbook {
          id
        }
        song_name
      }
    }
    lang
    has_lyrics
    public_route
    authors_pivot {
      pivot {
        author {
          name
          public_route
        }
        authorship_type
      }
    }
    song {
      song_lyrics {
        type
        name
        public_route
        authors_pivot {
          pivot {
            author {
              name
              public_route
            }
            authorship_type
          }
        }
      }
    }
  }
`;

export default {
  name: 'Author',

  components: {
    AuthorSongsList,
  },

  head() {
    return generateHead(this.getTitle(), this.getDescription());
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component public instance via `vm`
      vm.previous = from.fullPath;
    });
  },

  data() {
    return {
      aboutStrings: [
        'autorovi',
        'hudebním uskupení',
        'schole',
        'kapele',
        'sboru',
      ],
      thisStrings: [
        'tohoto autora',
        'tohoto hudebního uskupení',
        'této scholy',
        'této kapely',
        'tohoto sboru',
      ],
      previous: '',
    };
  },

  methods: {
    getTitle() {
      return (
        (this.author ? this.author.name : 'Autor') +
        this.$config.public.titleSeparator +
        this.$config.public.variation.title
      );
    },

    getDescription() {
      if (this.author && this.author.description) {
        return this.author.description;
      }

      let type = this.author && this.author.type ? this.author.type : 0;
      return `Písně i ${this.thisStrings[type]} obsahuje ${this.$config.public.variation.name}.`;
    },
  },

  apollo: {
    author: {
      query: FETCH_AUTHOR,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },

  mounted() {
    if (!this.$apollo.loading && this.author === null) {
      // this.$nuxt.error({ statusCode: 404 });
      // https://nuxt.com/docs/getting-started/error-handling#createerror
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true,
      });
    }
  },
};
</script>
