<script>
import lodash from 'lodash';
const { isEqual, isEmpty } = lodash; // lodash is CommonJS, therefore we can't do `import { xyz } from 'lodash';`
import { mapStores } from 'pinia';
import useListStore from '~/stores/list.js';

export default {
  data() {
    return {
      internalParams: {},
    };
  },

  computed: {
    ...mapStores(useListStore),
  },

  methods: {
    updateHistoryState(push = true, force) {
      if (this.$route.query.hledat) {
        push = false;
      }

      // save params to list store
      this.listStore.active = true;
      this.listStore.searchString = this.historyStateObject.search_string;
      this.listStore.selectedTags = this.historyStateObject.tags;
      this.listStore.selectedSongbooks = this.historyStateObject.songbooks;
      this.listStore.selectedLanguages = this.historyStateObject.languages;
      this.listStore.sort = this.historyStateObject.sort;
      this.listStore.descending = this.historyStateObject.is_descending;
      this.listStore.seed = this.historyStateObject.seed;

      let oldParams = this.$route.query;
      let newParams = toGETParameters(this.historyStateObject);
      this.internalParams = newParams;

      if (isEqual(oldParams, newParams) && !force) {
        return;
      }

      if (push) {
        this.$router
          .push({
            path: '/',
            query: toGETParameters(this.historyStateObject),
          })
          .catch((err) => {
            // empty catch prevents errors when navigating to the current route
          });
      } else {
        this.$router
          .replace({
            path: '/',
            query: toGETParameters(this.historyStateObject),
          })
          .catch((err) => {
            // empty catch prevents errors when navigating to the current route
          });
      }
    },

    applyStateChange() {
      let GETparameters = this.$route.query;
      const forceSearch = !!GETparameters.hledat;

      if (isEmpty(GETparameters) && !forceSearch) {
        this.init = true;
        return;
      }

      this.init = false;

      if (!isEqual(this.internalParams, GETparameters)) {
        // path was really changed by the user (not from updateHistoryState)
        this.historyStateObject = fromGETParameters(GETparameters);
      }

      if (hasInvalidGETParameters(GETparameters)) {
        // we want to normalize the GET parameters
        this.updateHistoryState(false);
      }
    },
  },
};

const GET_PARAMETERS = {
  force_search: 'hledat',
  search_string: 'vyhledavani',
  tags: 'stitky',
  languages: 'jazyky',
  songbooks: 'zpevniky',
  show_authors: 'autori',
  sort: 'razeni',
  is_descending: 'sestupne',
  seed: 'nahoda',
};

function validParameters() {
  return Object.values(GET_PARAMETERS);
}

function toGETParameters(
  params = {
    search_string: '',
    tags: [],
    languages: [],
    songbooks: [],
    sort: 0,
    seed: null,
    is_descending: false,
    show_authors: false,
  }
) {
  const joinKeys = (obj) =>
    Object.keys(obj).length ? Object.keys(obj).join(',') : undefined;

  let get = {
    vyhledavani: params.search_string
      ? params.search_string.replace(/\s/g, '_')
      : undefined,
    stitky: joinKeys(params.tags),
    jazyky: joinKeys(params.languages),
    zpevniky: joinKeys(params.songbooks),
    autori: params.show_authors == true ? 'ano' : undefined,
    razeni: params.sort > 0 ? String(params.sort) : undefined,
    sestupne: params.is_descending == true ? 'ano' : undefined,
    nahoda: params.seed ? String(params.seed) : undefined,
  };
  // delete undefined items
  Object.keys(get).forEach((key) => {
    if (get[key] === undefined) {
      delete get[key];
    }
  });
  return get;
}

function hasInvalidGETParameters(params) {
  Object.keys(params).forEach(function (p) {
    if (!validParameters().includes(p)) {
      return true;
    }
  });
  return false;
}

function fromGETParameters(params) {
  const keysToObj = function (str) {
    if (isEmpty(str)) return {};

    return str
      .split(',')
      .filter((str) => str.length)
      .reduce((obj, key, _) => {
        obj[key] = true;
        return obj;
      }, {});
  };

  return {
    search_string: params.vyhledavani
      ? params.vyhledavani.replace(/_/g, ' ')
      : '',
    tags: keysToObj(params.stitky),
    languages: keysToObj(params.jazyky),
    songbooks: keysToObj(params.zpevniky),
    show_authors: !!params.autori,
    is_descending: !!params.sestupne,
    seed: parseInt(params.nahoda),
    sort: params.razeni ? parseInt(params.razeni) : 0,
  };
}
</script>
