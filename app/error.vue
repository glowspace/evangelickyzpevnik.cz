<template>
  <NuxtLayout>
    <PageTopBar :title="'Chyba ' + error.statusCode" is-h1 />
    <div class="custom-container">
      <div class="shadow bg-surface-100 mx-4 my-12 px-6 py-4 inline-block">
        <p class="mb-3">
          <span v-if="error.statusCode === 404">
            Stránka nebyla nalezena. <br />Zkuste použít vyhledávání.
          </span>
          <span v-else>
            Ajajaj, někde se stala chyba.<br />
            Zkuste použít vyhledávání.
          </span>
        </p>
        <div class="-m-1">
          <BasicButton icon-name="search" type="primary" class="m-1" to="/?hledat=ano">
            Hledat
          </BasicButton>
          <BasicButton
            icon-name="warning"
            type="outlined"
            class="m-1"
            :href="getReportLink(null, error.statusCode)"
          >
            Nahlásit
          </BasicButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps(['error']);
const { variation, titleSeparator } = useRuntimeConfig()?.public;

useHead({
  ...generateHead('Chyba ' + props.error.statusCode + titleSeparator + variation.title, ''),
  htmlAttrs: { lang: 'cs', dir: 'ltr' },
  link: getLinks(),
});

onMounted(() => {
  if ('stack' in props.error) {
    console.error(props.error.stack);
  }
});
</script>
