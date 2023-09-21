<template>
  <div class="logo">
    <img src="/img/logo.svg" alt="logo" />
    <h1>Evangelický zpěvník</h1>
  </div>
</template>

<style lang="postcss" scoped>
.logo {
  @apply flex items-center my-3 mx-5;
}

img {
  width: 50px;
}

h1 {
  @apply font-custom-bold text-2xl ml-3 md:ml-5;
}
</style>
