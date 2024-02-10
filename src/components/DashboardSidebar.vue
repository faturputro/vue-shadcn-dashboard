<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import router from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { APP_MENU } from '@/config/app';
import { ArrowLeftToLine } from 'lucide-vue-next';
import { useAppStore } from '@/stores/app';

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

const sidebarWidth = computed(() => {
  return store.sidebarExpanded ? 280 : 72;
});

const handleNavigate = (path: string) => {
  router.push(path);
};

const store = useAppStore();

const toggleSidebar = () => {
  store.toggleSidebar();
};
</script>

<template>
  <div class="sidebar transition-all duration-400 h-screen bg-background border-r-[1px] fixed" :style="{ width:`${sidebarWidth}px` }">
    <div class="relative h-full flex flex-col justify-between">
      <div>
        <div class="px-4 flex items-center justify-between h-[64px] border-b-[1px]">
          <transition name="fade">
            <h2 v-if="store.sidebarExpanded" class="text-2xl font-semibold flex items-center">
              <span class="text-foreground"><span class="mr-2 flex items-center"><vue-feather type="package"></vue-feather></span></span>
              Dashcn
            </h2>
          </transition>
          <Button
            variant="outline"
            class="p-[6px] w-8 h-8 transition-all duration-200"
            :class="store.sidebarExpanded ? 'bg-transparent' : 'dark:bg-white'"
            @click="toggleSidebar"
          >
            <ArrowLeftToLine class="transition-all duration-500" :class="!store.sidebarExpanded && 'rotate-180 text-black'" />
          </Button>
        </div>
        <div v-for="menu in menus" :key="menu.key" class="border-b-[1px] transition-all" :class="store.sidebarExpanded ? 'px-4 py-8' : 'px-2 py-2'">
          <p
            v-show="store.sidebarExpanded"
            class="uppercase text-xs font-light text-gray-400 mb-2 tracking-widest transition-all duration-300 delay-100"
              :class="store.sidebarExpanded ? 'visible opacity-100' : 'invisible opacity-0'"
            >{{ menu.name }}</p>
          <ul>
            <li v-for="child in menu.routes" :key="`${menu.key}-${child.path}`" class="flex items-center mb-1 rounded-md">
              <TooltipProvider :disable-hoverable-content="true">
                <Tooltip :delay-duration="0">
                  <TooltipTrigger class="w-full">
                    <Toggle
                      class="w-full transition-all duration-500 overflow-x-hidden justify-start"
                      :pressed="child.active"
                      @click="handleNavigate(child.path)"
                    >
                      <span class="flex items-center" :class="store.sidebarExpanded ? 'mr-4' : 'm-0'">
                        <vue-feather :type="child.icon"></vue-feather>
                      </span>
                      <transition name="fade">
                        <span v-if="store.sidebarExpand">{{ child.title }}</span>
                      </transition>
                    </Toggle>
                  </TooltipTrigger>
                  <template v-if="!store.sidebarExpanded">
                    <TooltipContent side="right">
                      <p class="text-sm">{{ child.title }}</p>
                    </TooltipContent>
                  </template>
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t-[1px] transition-all duration-400 py-4" :class="store.sidebarExpanded ? 'opacity-100' : 'opacity-0'">
        <p class="text-xs text-foreground/50 text-center">&copy; 2024 Dashcn</p>
      </div>
    </div>
  </div>
</template>