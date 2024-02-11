<script setup lang="ts">
import { computed } from 'vue';
import DashboardSidebar from './DashboardSidebar.vue';
import DashboardNavbar from './DashboardNavbar.vue';
import { useAppStore } from '@/stores/app';

const left = computed(() => {
  return useAppStore().sidebarExpanded ? 280 : 64;
})
</script>

<template>
  <div>
    <DashboardSidebar/>
    <div class="relative app-container dashboard-main" :style="`left: ${left}px;width: calc(100% - ${left}px)`">
      <DashboardNavbar />
      <div class="p-6 max-w-[1280px] m-auto mt-[64px]">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>