<template>
  <div class="logo">
    <img
      src="/img/logo.svg"
      :class="[$config.public.variation.key == 'zps' ? 'w-[45px]' : 'w-[50px]']"
      alt="logo"
    />
    <h1>{{ $config.public.variation.name }}</h1>
  </div>
</template>

<style lang="postcss" scoped>
.logo {
  @apply flex items-center my-3 mx-5;
}

h1 {
  @apply font-custom-bold text-2xl ml-3 md:ml-5;
}
</style>
