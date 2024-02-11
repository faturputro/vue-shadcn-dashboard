<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';
import { ref } from 'vue';
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableColumnHeaderProps {
  column: Column<any, any>
  title: string
}

const props = defineProps<DataTableColumnHeaderProps>();

const emits = defineEmits<{
  (e: 'update:sort', payload: { column: string, value: 'asc' | 'desc' | undefined }): void
  (e: 'update:visibility', payload: { column: string, value: boolean }): void
}>();

const currentSort = ref<boolean | undefined>();

const toggleSort = (val: boolean | undefined) => {
  currentSort.value = val;
  if (val == undefined) {
    emits('update:sort', { column: Object.keys(props.column)[0], value: undefined });
    props.column.toggleSorting(undefined);
  } else {
    emits('update:sort', { column: Object.keys(props.column)[0], value: val ? 'desc' : 'asc' });
    props.column.toggleSorting(val);
  }
};

const toggleVisibility = (val: boolean) => {
  emits('update:visibility', { column: Object.keys(props.column)[0], value: val });
  props.column.toggleVisibility(val);
};
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ title }}</span>
          <Icon name="ArrowDown" v-if="currentSort" class="ml-2 h-4 w-4" />
          <Icon name="ChevronsUpDown" v-else-if="currentSort == undefined" class="ml-2 h-4 w-4" />
          <Icon name="ArrowUp" v-else-if="currentSort == false" class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="toggleSort(false)">
          <Icon name="ArrowUp" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="toggleSort(true)">
          <Icon name="ArrowDown" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuItem @click="toggleSort(undefined)">
          <Icon name="ChevronsUpDown" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          None
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="toggleVisibility(false)">
          <Icon name="EyeOff" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>