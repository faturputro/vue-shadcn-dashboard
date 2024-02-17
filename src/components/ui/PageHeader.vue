<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex items-start md:items-center flex-col md:flex-row mb-6 mt-2 justify-between">
    <h1 v-if="props.title" class="text-3xl font-semibold mb-4">
      {{ title }}
    </h1>
    <slot></slot>
  </div>
</template>