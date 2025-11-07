<template>
  <div class="layout" :class="{ 'layout-song': $route.name == 'song' }">
    <Navbar
      :class="[{ hidden: $route.name == 'song' }, 'md:flex print:hidden']"
    />
    <div class="flex">
      <SideList />
      <div class="grow">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.layout {
  /* padding-bottom: calc(5.25 * theme(spacing.4)); */
  @apply pb-[84px] /* this is equal to the line above (also used in SongDetail) */
  md:pb-0 md:pl-[97px] /* pl-24 + 1px to preserve border */
  print:pb-0 print:pl-0
  overflow-y-clip; /* to prevent bottom sheets from overflowing */
}

.layout.layout-song {
  @apply pb-0;
}
</style>
