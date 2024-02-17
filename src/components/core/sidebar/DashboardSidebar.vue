<script setup lang="ts">
import { computed } from 'vue';
import SidebarInner from './SidebarInner.vue';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAppStore } from '@/stores/app';

const store = useAppStore();
const isVisible = computed(() => window.innerWidth < 1025);
</script>

<template>
  <div>
    <SidebarInner class="hidden lg:block" />
    <Sheet v-if="isVisible" :open="store.sidebarExpanded" class="block lg:hidden">
      <SheetContent class="p-0" side="left" style="width: 280px" :show-close="false" @interact-outside="store.toggleSidebar()">
        <SidebarInner style="width: 280px;" />
      </SheetContent>
    </Sheet>
  </div>
</template>