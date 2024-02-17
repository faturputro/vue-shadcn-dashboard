<script setup lang="ts">
import DashboardSidebar from '@/components/core/sidebar/DashboardSidebar.vue';
import DashboardNavbar from '@/components/core/DashboardNavbar.vue';
import { useAppStore } from '@/stores/app';

const store = useAppStore();
</script>

<template>
  <div>
    <DashboardSidebar/>
    <div class="relative app-container dashboard-main" :style="`left: ${store.wrapperLeftOffset}px; width: calc(100% - ${store.wrapperLeftOffset}px)`">
      <DashboardNavbar />
      <div class="p-2 lg:p-6 max-w-[1440px] m-auto mt-[64px]">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>