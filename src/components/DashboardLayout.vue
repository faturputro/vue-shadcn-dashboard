<script setup lang="ts">
import { computed } from 'vue';
import DashboardSidebar from './DashboardSidebar.vue';
import DashboardNavbar from './DashboardNavbar.vue';
import { useAppStore } from '@/stores/app';

const left = computed(() => {
  return useAppStore().sidebarExpanded ? 280 : 72;
})
</script>

<template>
  <div>
    <DashboardSidebar/>
    <div class="relative app-container dashboard-main" :style="`left: ${left}px;width: calc(100% - ${left}px)`">
      <DashboardNavbar />
      <div class="p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>