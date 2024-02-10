<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DashboardSidebar from './DashboardSidebar.vue';
import DashboardNavbar from './DashboardNavbar.vue';

const left = ref<number>(0);
onMounted(() => {
  left.value = document.querySelector('.sidebar')!.getBoundingClientRect().right;
})
</script>

<template>
  <div>
    <DashboardSidebar/>
    <div class="relative app-container" :style="`left: ${left}px;width: calc(100% - ${left}px)`">
      <DashboardNavbar />
      <div class="p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>