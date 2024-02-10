<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GlobalSearchPopover from './GlobalSearchPopover.vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  LogOut,
  User,
  Bell,
  Sun,
  MoonStar,
} from 'lucide-vue-next'
import { Button } from './ui/button';

const isDark = ref<boolean>(false);

const toggleMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    localStorage.setItem('themeMode', 'dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  } else {
    localStorage.setItem('themeMode', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
};

onMounted(() => {
  const cachedTheme = localStorage.getItem('themeMode');
  if (cachedTheme) {
    isDark.value = cachedTheme === 'dark';
  }
});
</script>

<template>
  <nav class="flex items-center justify-between bg-background h-[64px] w-full border-b-[1px] px-4">
    <div class="w-96">
      <GlobalSearchPopover />
    </div>
    <div class="flex items-center">
      <Button variant="outline" class="border-0 p-[6px] w-8 h-8">
        <Bell />
      </Button>
      <Button variant="outline" class="border-0 p-[6px] w-8 h-8" @click="toggleMode">
        <Sun v-if="isDark" />
        <MoonStar v-else />
      </Button>
      <div class="border-x-[1px] border-gray-300 h-[24px] w-[1px] mx-2"></div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="border-0 flex items-center max-w-[200px] w-full justify-start">
            <Avatar class="h-8 w-8">
              <AvatarImage src="https://github.com/radix-vue.png"></AvatarImage>
            </Avatar>
            <span class="ml-2 flex justify-start flex-col items-start">
              <p class="mb-0">John Doe</p>
              <small class="text-xs text-slate-400 font-light">john_doe@email.com</small>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56 relative mr-4">
          <DropdownMenuLabel>John Doe</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User class="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
