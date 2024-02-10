<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';

onMounted(() => {
  const cachedTheme = localStorage.getItem('themeMode');
  if (cachedTheme) {
    if (cachedTheme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }
})
</script>

<template>
  <RouterView />
</template>