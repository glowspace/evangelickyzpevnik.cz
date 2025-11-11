<template>
  <div class="screen:hidden print:flex mt-4 gap-2 items-center">
    {{ $config.public.variation.name }}
    <img src="/img/logo.svg" class="w-[20px]" />
    {{ new Date().getFullYear() }}
  </div>
</template>
