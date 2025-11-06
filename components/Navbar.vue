<template>
  <div class="menu-wrapper">
    <div class="menu">
      <BasicClickable to="/" class="link group">
        <div
          class="icon-wrapper"
          :class="{ active: $route.name == 'index' && store.showDashboard }"
        >
          <BasicIcon name="home" />
        </div>
        <p class="label">Nástěnka</p>
      </BasicClickable>
      <BasicClickable to="/?hledat=ano" class="link group">
        <div
          class="icon-wrapper"
          :class="{ active: $route.name == 'index' && !store.showDashboard }"
        >
          <BasicIcon name="search" />
        </div>
        <p class="label">Hledání</p>
      </BasicClickable>
      <BasicClickable
        v-for="item in $config.public.variation.navbar"
        :to="item.path"
        class="link group"
      >
        <div class="icon-wrapper" :class="{ active: $route.path == item.path }">
          <BasicIcon :name="item.icon" />
        </div>
        <p class="label">{{ item.label }}</p>
      </BasicClickable>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.menu-wrapper {
  @apply w-full text-sm fixed bottom-0 flex-col items-center
  shadow md:shadow-none md:border-r border-primary-150
  bg-surface-200 dark:bg-surfacedark-200
  md:left-0 md:top-0 md:w-auto md:pt-20;
}

.menu {
  @apply flex flex-row justify-center gap-2 w-full
  md:flex-col md:w-auto md:gap-5 md:mb-[30vh];
}

.link {
  @apply flex w-1/4 sm:w-1/5 flex-col items-center justify-center px-0 pt-3 pb-4 gap-1
  md:w-24 md:p-0 whitespace-nowrap;
}

.icon-wrapper {
  @apply relative w-16 h-8 group-hover:bg-primary-150 dark:group-hover:bg-primary-700 flex items-center justify-center rounded-2xl transition;

  &.active {
    @apply bg-primary-150;

    .dark & {
      @apply hover:bg-primary-700 bg-primary-700;
    }

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 30;
    }
  }
}
</style>

<script setup>
import useHomepageStore from '~/stores/homepage';
const store = useHomepageStore();
</script>
