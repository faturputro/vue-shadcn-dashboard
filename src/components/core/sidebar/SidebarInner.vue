<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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

const handleNavigate = (path: string) => {
  router.push(path);
  if (window.innerWidth < 1025) {
    store.toggleSidebar();
  }
};

const store = useAppStore();

const toggleSidebar = () => {
  store.toggleSidebar();
};
</script>

<template>
  <div class="sidebar transition-all duration-400 h-screen overflow-hidden bg-background border-r-[1px] fixed" :style="{ width:`${store.wrapperWidth}px`}">
    <div class="relative h-full flex flex-col justify-between">
      <div>
        <div class="h-[64px]">
          <div class="px-4 h-[64px] flex fixed z-10 items-center justify-between border-b-[1px]" :style="{ width: `${store.sidebarExpanded ? 280 : 64}px` }">
            <transition name="fade">
              <h2 v-show="store.sidebarExpanded" class="text-2xl font-semibold flex items-center">
                <span class="text-foreground"><span class="mr-2 flex items-center"><Icon name="Boxes" /></span></span>
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
        </div>
        <ScrollArea style="height: calc(100vh - 64px)">
          <div v-for="menu in menus" :key="menu.key" class="border-b-[1px] transition-all" :class="store.sidebarExpanded ? 'p-4' : 'p-2'">
            <p
              v-show="store.sidebarExpanded"
              class="uppercase text-xs font-light text-gray-400 mb-2 tracking-widest transition-all duration-300 delay-100"
              :class="store.sidebarExpanded ? 'visible opacity-100' : 'invisible opacity-0'"
            >
              {{ menu.name }}
            </p>
            <ul>
              <li v-for="child in menu.routes" :key="`${menu.key}-${child.path}`" class="flex items-center mb-1 rounded-md">
                <TooltipProvider :disable-hoverable-content="true">
                  <Tooltip :delay-duration="0">
                    <TooltipTrigger class="w-full">
                      <Toggle
                        class="w-full overflow-x-hidden justify-start duration-150"
                        :pressed="child.active"
                        @click="handleNavigate(child.path)"
                      >
                        <span class="flex items-center" :class="store.sidebarExpanded ? 'mr-4' : 'm-0'">
                          <Icon :name="child.icon" />
                        </span>
                        <transition name="fade" :duration="300">
                          <span v-show="store.sidebarExpand">{{ child.title }}</span>
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
          <div class="border-b-[1px] transition-all" :class="store.sidebarExpanded ? 'p-4' : 'p-2'">
            <p
              v-show="store.sidebarExpanded"
              class="uppercase text-xs font-light text-gray-400 mb-2 tracking-widest transition-all duration-300 delay-100"
              :class="store.sidebarExpanded ? 'visible opacity-100' : 'invisible opacity-0'"
            >
              Misc
            </p>
            <ul>
              <li class="flex items-center mb-1 rounded-md">
                <TooltipProvider :disable-hoverable-content="true">
                  <Tooltip :delay-duration="0">
                    <TooltipTrigger class="w-full">
                      <Toggle
                        class="w-full overflow-x-hidden justify-start duration-150"
                        @click="handleNavigate('/404-page')"
                      >
                        <span class="flex items-center" :class="store.sidebarExpanded ? 'mr-4' : 'm-0'">
                          <Icon name="AlertTriangle" />
                        </span>
                        <transition name="fade" :duration="300">
                          <span v-show="store.sidebarExpand">404 Page</span>
                        </transition>
                      </Toggle>
                    </TooltipTrigger>
                    <template v-if="!store.sidebarExpanded">
                      <TooltipContent side="right">
                        <p class="text-sm">404 Page</p>
                      </TooltipContent>
                    </template>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li class="flex items-center mb-1 rounded-md">
                <TooltipProvider :disable-hoverable-content="true">
                  <Tooltip :delay-duration="0">
                    <TooltipTrigger class="w-full">
                      <Toggle
                        class="w-full overflow-x-hidden justify-start duration-150"
                        @click="$router.push('/login')"
                      >
                        <span class="flex items-center" :class="store.sidebarExpanded ? 'mr-4' : 'm-0'">
                          <Icon name="LogIn" />
                        </span>
                        <transition name="fade" :duration="300">
                          <span v-show="store.sidebarExpand">Login</span>
                        </transition>
                      </Toggle>
                    </TooltipTrigger>
                    <template v-if="!store.sidebarExpanded">
                      <TooltipContent side="right" class="bg-white">
                        <p class="text-sm">Login</p>
                      </TooltipContent>
                    </template>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </div>
        </ScrollArea>
      </div>

      <div class="border-t-[1px] transition-all duration-400 py-4" :class="store.sidebarExpanded ? 'opacity-100' : 'opacity-0'">
        <p class="text-xs text-foreground/50 text-center">&copy; 2024 Dashcn</p>
      </div>
    </div>
  </div>
</template>
