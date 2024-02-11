<script setup lang="ts">
import { DataTable, type ColumnDef } from '@/components/ui/data-table';
import data from '@/assets/tasks.json';
import { ref, h } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';
import DataTableHeader from '@/components/ui/data-table/DataTableHeader.vue';
import type { Column } from '@tanstack/vue-table';
import { Badge } from '@/components/ui/badge';

interface IData {
  id: string
  title: string
  status: string
  label: string
  priority: string
}

const tagVariants: Record<string, string> = {
  bug: 'danger',
  documentation: 'success',
  feature: 'warning',
};

const tasks = ref(data);
const columns: ColumnDef<IData>[] = [
  {
    accessorKey: 'id',
    header: ({ table }) => h(Checkbox, {
      checked: table.getIsAllPageRowsSelected(),
      'onUpdate:checked': val => table.toggleAllPageRowsSelected(!!val),
      ariaLabel: 'Select All',
      class: 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, {
      checked: row.getIsSelected(),
      'onUpdate:checked': val => row.toggleSelected(!!val),
      'ariaLabel': 'Select row',
      class: 'translate-y-0.5',
      enableSorting: false,
      enableHiding: false,
    })
  },
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => h(DataTableHeader, {
      column: column as Column<IData>,
      title: 'Title',
      'onUpdate:sort': (val) => {
        console.log(val)
      },
    }),
    cell: ({ row }) => h('div', {
      class: 'max-w-[500px] truncate flex items-center',
    }, [
      h(Badge, {
        variant: (tagVariants[row.original.label] as any),
        class: 'mr-2',
      }, () => row.original.label),
      h('span', { class: 'max-w-[500px] truncate font-medium' }, row.original.title),
    ])
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    enableSorting: false,
  },
  {
    id: 'actions',
  },
];
</script>

<template>
  <div>
    <page-header title="Tasks"></page-header>
    <DataTable :columns="columns" :data="tasks"></DataTable>
  </div>
</template>
