<template>
  <div class="custom-container">
    <div class="logo">
      <img src="/img/logo.svg" alt="logo" />
      <h1>Evangelický zpěvník</h1>
    </div>
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
  @apply font-custom-bold text-2xl ml-3;
}
</style>
