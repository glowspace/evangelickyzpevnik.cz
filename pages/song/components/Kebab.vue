<template>
  <ul
    role="dropdownmenu"
    class="kebab-menu opacity-0 invisible absolute top-[3.1rem] z-30 transition duration-400 ease-in-out right-0 min-w-[200px] inline-flex flex-col py-2 rounded bg-surface-50 dark:bg-surfacedark-200 shadow-md dark:shadow-gray-50/10"
    :class="{ opened }"
  >
    <li class="relative">
      <a
        class="kebab-item"
        :href="
          'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/1/create/19?customfield_10056=' +
          encodeURIComponent(siteUrl + $route.fullPath)
        "
      >
        <BasicIcon>report</BasicIcon>
        Nahlásit
      </a>
    </li>
    <li class="relative">
      <a
        class="kebab-item"
        title="Upravit píseň"
        :href="[
          song_lyric ? adminUrl + '/song/' + song_lyric.id + '/edit' : '',
        ]"
      >
        <BasicIcon>edit</BasicIcon>
        Upravit
      </a>
    </li>
  </ul>
</template>

<script setup>
const { siteUrl, adminUrl } = useRuntimeConfig()?.public;
const props = defineProps(['opened', 'song_lyric']);
</script>

<style lang="postcss" scoped>
.opened.kebab-menu {
  @apply !opacity-100 !visible;
}

.kebab-item {
  @apply min-h-[3rem] flex flex-row items-center gap-4 py-2 px-3 hover:bg-primary-100 dark:hover:bg-secondary-700 hover:bg-opacity-30 dark:hover:bg-opacity-30;
}
</style>
