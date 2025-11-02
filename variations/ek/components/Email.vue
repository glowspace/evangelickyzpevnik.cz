<script>
export default {
  props: ['address'],

  computed: {
    parts() {
      return this.address.split('@');
    },
  },
};
</script>

<template>
  <span>
    {{ parts[0] }}<b class="hidden select-none">{{
      (Math.random() + 1).toString(36).substring(7)
    }}</b>@<b class="hidden select-none">{{
      (Math.random() + 1).toString(36).substring(7)
    }}</b>{{ parts[1] }}
  </span>
</template>
