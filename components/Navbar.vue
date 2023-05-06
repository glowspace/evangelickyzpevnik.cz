<template>
  <div class="menu-wrapper">
    <div class="menu">
      <nuxt-link to="/" class="link group" @click="store.init = true">
        <div class="icon-wrapper" :class="{ active: ($route.name == 'index' && store.init) }">
          <span class="material-symbols-outlined">home</span>
        </div>
        <p class="label">Nástěnka</p>
      </nuxt-link>
      <nuxt-link to="/" class="link group" @click="store.init = false">
        <div class="icon-wrapper" :class="{ active: ($route.name == 'index' && !store.init) }">
          <span class="material-symbols-outlined">search</span>
        </div>
        <p class="label">Hledání</p>
      </nuxt-link>
      <nuxt-link to="/o-zpevniku" class="link group">
        <div class="icon-wrapper" :class="{ active: $route.name == 'about' }">
          <span class="material-symbols-outlined">info</span>
        </div>
        <p class="label">O zpěvníku</p>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.menu-wrapper {
  @apply w-full md:max-w-[412px] text-sm flex flex-row space-x-2 items-center justify-center fixed bottom-0;
}

.menu {
  @apply flex flex-row justify-center gap-2 w-full md:w-[412px] bg-surface-200 dark:bg-surfacedark-200;
}

.link {
  @apply flex w-1/4 md:w-32 flex-col items-center justify-center px-0 pt-3 pb-4 gap-1;
}

.icon-wrapper {
  @apply relative w-16 h-8 group-hover:bg-primary-200 dark:group-hover:bg-primary-700 group-hover:bg-opacity-80 flex items-center justify-center rounded-2xl transition;

  &.active {
    @apply bg-primary-150;

    .dark & {
      @apply hover:bg-primary-700 bg-primary-700;
    }

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 1;
    }

    .label {
      @apply text-xs text-neutral-900 dark:text-neutral-100 leading-tight tracking-[.0416em];
    }
  }
}
</style>

<script setup>
import hpStore from '~/stores/homepage';
const store = hpStore();
</script>
