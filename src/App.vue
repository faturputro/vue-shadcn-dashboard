<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';

onMounted(() => {
  useAppStore().initTheme();
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
