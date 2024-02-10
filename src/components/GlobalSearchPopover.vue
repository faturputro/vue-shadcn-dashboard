<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { computed, ref } from 'vue';
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
    description: `${value.name} - ${r.description || r.title}`,
    isActive: route.path === `/dashboard/${r.path}`
  }));
})

const searchList = computed(() => {
  return mappedMenu.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()))
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
    if (e.key === 'Enter' && activeIndex.value > 0) {
      const current = searchList.value[activeIndex.value];
      isFocused.value = false;
      if (!current.isActive) {
        router.push(`/dashboard/${current.path}`);
      }
    }
  }
};

const handleClick = (path: string) => {
  const toRoute = `/dashboard/${path}`;
  router.push(toRoute);
}
</script>

<template>
  <Popover :open="isFocused">
    <PopoverTrigger class="w-full">
      <Input
        v-model="search"
        placeholder="Search..."
        prepend-icon="search"
        class="w-full"
        @focus="handleFocus"
        @blur="handleFocus"
        @keydown="onKeyDown"
      ></Input>
    </PopoverTrigger>
    <PopoverContent align="start" class="mt-1 w-[500px] h-96 overflow-y-auto">
      <div class="pb-4">
        <h4 class="font-semibold mb-2 text-lg">Pages</h4>
        <ul>
          <li
            v-for="(menu, i) in searchList"
            :key="menu.key" class="flex items-center mb-2 rounded-lg border p-2"
            :class="[
              menu.isActive ? 'bg-gray-100': 'cursor-pointer',
              i === activeIndex ? 'border-2 border-slate-950' : '',
            ]"
            @click="handleClick(menu.path)"
          >
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
