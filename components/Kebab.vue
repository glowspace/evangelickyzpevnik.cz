<template>
  <div class="kebab-wrapper relative" @focusout="kebabWrapperBlurred">
    <BasicButton
      icon-name="more_vert"
      :class="['kebab-opener', buttonClass]"
      icon-only
      @click="kebabClicked"
    />
    <ul
      role="dropdownmenu"
      class="kebab-menu opacity-0 invisible absolute top-[3.1rem] z-30 transition duration-400 ease-in-out right-0 min-w-[200px] inline-flex flex-col py-2 rounded bg-surface-50 dark:bg-surfacedark-200 shadow-md dark:shadow-gray-50/10"
      :class="{ opened: kebabOpened }"
    >
      <li v-for="(item, key) in items" :key="key" class="relative">
        <BasicClickable class="kebab-item" :href="item.href" :to="item.to" :target="item.target">
          <BasicIcon :name="item.icon" />
          {{ item.label }}
        </BasicClickable>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['items', 'buttonClass']);
const kebabOpened = ref(false);

function kebabClicked() {
  kebabOpened.value = !kebabOpened.value;
}

function kebabWrapperBlurred(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    kebabOpened.value = false;
  }
}
</script>

<style lang="postcss" scoped>
.opened.kebab-menu {
  @apply !opacity-100 !visible;
}

.kebab-item {
  @apply min-h-[3rem] flex flex-row items-center gap-4 py-2 px-3 hover:bg-primary-100 dark:hover:bg-secondary-700 hover:bg-opacity-30 dark:hover:bg-opacity-30;
}
</style>
