<template>
  <ul
    role="dropdownmenu"
    class="kebab-menu opacity-0 invisible absolute top-[3.1rem] z-30 transition duration-400 ease-in-out left-0 md:left-auto md:right-0 min-w-[200px] inline-flex flex-col py-2 rounded bg-surface-50 dark:bg-surfacedark-200 shadow-md dark:shadow-gray-50/10"
  >
    <li class="relative">
      <a
        href="/"
        class="min-h-[3rem] flex flex-row items-center gap-4 py-2 px-3 hover-icon hover:bg-primary-100 dark:hover:bg-secondary-700 hover:bg-opacity-30 dark:hover:bg-opacity-30"
      >
        <span class="material-symbols-outlined">settings</span>
        Edit
      </a>
    </li>
    <li class="relative">
      <a
        href="#"
        class="min-h-[3rem] flex flex-row items-center gap-4 py-2 px-3 hover-icon hover:bg-primary-100 dark:hover:bg-secondary-700 hover:bg-opacity-30 dark:hover:bg-opacity-30"
      >
        <span class="material-symbols-outlined">delete</span>
        Delete
      </a>
    </li>
  </ul>
</template>

<style lang="postcss">
.kebab-wrapper:focus-within .kebab-menu {
  @apply !opacity-100 !visible;
}
</style>
