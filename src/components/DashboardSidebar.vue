<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle';
import router from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { APP_MENU } from '@/config/app';

const route = useRoute()

const menus = computed(() => Object.entries(APP_MENU).map(([key, value]) => ({
    key,
    name: value.name,
    routes: value.routes.map((r) => ({
      ...r,
      active: `/dashboard/${r.path}` === route.path,
    })),
  })
));

const handleNavigate = (path: string) => {
  router.push(`/dashboard/${path}`);
};
</script>

<template>
  <div class="sidebar w-[280px] h-screen bg-white border-r-[1px] fixed">
    <div class="px-4 flex items-center h-[64px] border-b-[1px]">
      <h2 class="text-2xl font-semibold flex items-center">
        <span class="text-blue-700"><span class="mr-2 flex items-center"><vue-feather type="package"></vue-feather></span></span>
        Shadcn
      </h2>
    </div>
    <div v-for="menu in menus" :key="menu.key" class="px-4 py-8 border-b-[1px]">
      <p class="uppercase text-xs font-medium text-gray-400 mb-2 tracking-widest">{{ menu.name }}</p>
      <ul>
        <li v-for="child in menu.routes" :key="`${menu.key}-${child.path}`" class="flex items-center mb-1 rounded-md">
          <Toggle class="w-full justify-start" :pressed="child.active" @click="handleNavigate(route.path)">
            <span class="mr-4 flex items-center"><vue-feather :type="child.icon"></vue-feather></span>
            {{ child.title }}
          </Toggle>
        </li>
      </ul>
    </div>
  </div>
</template>
@/config/app