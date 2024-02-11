import type { AccessorColumnDef, DisplayColumnDef, GroupColumnDef, RowData } from '@tanstack/vue-table';

export { default as DataTable } from './DataTable.vue'
export type ColumnDef<TData extends RowData, TValue = unknown> = DisplayColumnDef<TData, TValue> | GroupColumnDef<TData, TValue> | AccessorColumnDef<TData, TValue>;