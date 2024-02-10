<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { APP_MENU } from '@/config/app';

const search = ref<string>('');
const isFocused = ref<boolean>(false);
const activeIndex = ref<number>(-1);
const route = useRoute();
const handleFocus = (e: FocusEvent & { isFocused: boolean }) => {
  activeIndex.value = -1;
  isFocused.value = e.isFocused
}

const mappedMenu = Object.entries(APP_MENU).flatMap(([key, value]) => {
  return value.routes.map((r) => ({
    ...r,
    key: `${key}-${r.path}`,
    description: `${value.name}: ${r.description || r.title}`,
  }));
});

const searchList = computed(() => {
  return mappedMenu.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase()) ||
    item.description.toLowerCase().includes(search.value.toLowerCase())
  ).map((menu) => ({ ...menu, isActive: route.path === `/dashboard/${menu.path}` }));
});

const onKeyDown = (e: KeyboardEvent) => {
  if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
    e.preventDefault();
    if (e.key === 'ArrowDown' && activeIndex.value < searchList.value.length - 1) {
      activeIndex.value++;
    }
    if (e.key === 'ArrowUp' && activeIndex.value > 0) {
      activeIndex.value--;
    }
    if (e.key === 'Enter') {
      const current = searchList.value[activeIndex.value];
      isFocused.value = false;
      if (!current.isActive) {
        router.push(`/dashboard/${current.path}`);
        (document.getElementById('globalSearchInput')?.children[1] as HTMLInputElement).blur();
      }
    }
  }
};

const handleClick = (path: string) => {
  const toRoute = `/dashboard/${path}`;
  router.push(toRoute);
};

const handleGlobalSearchTrigger = (e: KeyboardEvent) => {
  const input = document.getElementById('globalSearchInput')?.children[1] as HTMLInputElement;
  if ((e.shiftKey && e.metaKey && e.key === 'g') || (e.shiftKey && e.ctrlKey && e.key === 'g')) {
    e.preventDefault();
    input.focus();
  }
  if (e.key === 'Escape') {
    input.blur();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleGlobalSearchTrigger);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalSearchTrigger);
})
</script>

<template>
  <Popover :open="isFocused">
    <PopoverTrigger class="w-full">
      <Input
        id="globalSearchInput"
        v-model="search"
        placeholder="Search..."
        prepend-icon="search"
        class="w-full global-search__input"
        @focus="handleFocus"
        @blur="handleFocus"
        @keydown="onKeyDown"
      ></Input>
    </PopoverTrigger>
    <PopoverContent align="start" class="mt-1 w-[500px] h-96 custom_scroll">
      <div class="pb-4">
        <h4 class="font-semibold mb-2 text-lg">Pages</h4>
        <ul>
          <li
            v-for="(menu, i) in searchList"
            :key="menu.key" class="flex items-center mb-2 rounded-lg border p-2"
            :class="[
              menu.isActive ? 'bg-gray-100 dark:bg-violet-950/20': 'cursor-pointer',
              i === activeIndex ? 'border-2 border-violet-950 dark:border-violet-700' : '',
            ]"
            @click="handleClick(menu.path)"
          >
            <div class="rounded-md bg-violet-100 dark:bg-violet-600/75 w-12 h-12 flex items-center justify-center mr-4">
              <span class="text-violet-500 dark:text-foreground flex items-center"><vue-feather :type="menu.icon"></vue-feather></span>
            </div>
            <div>
              <p class="font-medium">{{ menu.title }}</p>
              <p class="text-sm text-slate-500">{{ menu.description }}</p>
            </div>
          </li>
        </ul>
      </div>
      <Separator />
      <div class="py-4">
        <h4 class="font-semibold mb-2 text-lg">In This Page</h4>
        <ul>
          <li v-for="menu in mappedMenu" :key="menu.path" class="flex items-center mb-2 rounded-md border p-2">
            <div class="rounded-md bg-slate-100 w-12 h-12 flex items-center justify-center mr-4">
              <span class="text-slate-500 flex items-center"><vue-feather :type="menu.icon"></vue-feather></span>
            </div>
            <div>
              <p class="font-medium">{{ menu.title }}</p>
              <p class="text-sm text-slate-500">{{ menu.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </PopoverContent>
  </Popover>
</template>
