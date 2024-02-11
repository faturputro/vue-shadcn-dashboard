<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex items-center mb-6 justify-between">
    <h1 v-if="props.title" class="text-3xl font-semibold">
      {{ title }}
    </h1>
    <slot></slot>
  </div>
</template>