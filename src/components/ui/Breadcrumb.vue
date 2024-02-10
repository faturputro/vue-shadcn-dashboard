<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const breadcrumbs = computed(() => {
  return route.matched
});
</script>

<template>
  <div class="flex">
    <router-link v-for="(item, i) in breadcrumbs" :key="item.path" :to="item.path">
      <span class="text-sm flex">
        <p :class="route.path === item.path && 'text-primary font-semibold'">{{ item.meta.title }}</p>
        <p v-if="i !== breadcrumbs.length - 1" class="mx-3 dark:text-gray-100/20 text-gray-300">/</p>
      </span>
    </router-link>
  </div>
</template>
