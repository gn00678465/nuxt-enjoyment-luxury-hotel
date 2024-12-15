<script setup lang="ts">
import { createColumnHelper, useVueTable, getCoreRowModel, FlexRender } from '@tanstack/vue-table'
import type { RoomsResponse, RoomEntry } from '~/types';
import MaterialSymbolsEditOutline from '~icons/material-symbols/edit-outline';
import MdiTrashCanOutline from '~icons/mdi/trash-can-outline';

definePageMeta({
  layout: 'admin-layout',
  name: 'admin_rooms',
  meta: {
    title: '房型管理'
  }
})

const { $api } = useNuxtApp()
const router = useRouter()
const { data: rooms, refresh } = await useAPI<RoomsResponse>('/api/v1/admin/rooms/', { method: 'get' })
const roomInfo = useCookie<RoomEntry | null>('roomInfo', {
  default: () => null,
  watch: true,
})

const columnHelper = createColumnHelper<RoomEntry>()

const defaultColumns = [
  columnHelper.accessor('name' ,{
    id: 'name',
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.description, {
    id: 'description',
    header: 'Description',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.price, {
    id: 'price',
    header: 'Price',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.layoutInfo, {
    id: 'layoutInfo',
    header: 'LayoutInfo',
    cell: info => info.getValue().length,
  }),
  columnHelper.accessor(row => row.facilityInfo, {
    id: 'facilityInfo',
    header: 'FacilityInfo',
    cell: info => info.getValue().length,
  }),
  columnHelper.accessor(row => row.updatedAt, {
    id: 'updatedAt',
    header: 'Updated',
    cell: info => info.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (props) => h('div', { class: 'flex gap-x-2' }, [
      h(MaterialSymbolsEditOutline, {
        width:24,
        height: 24,
        class: 'cursor-pointer',
        onClick: () => {
          roomInfo.value = props.row.original
          router.push({
            name: 'admin_rooms-edit',
            query: { id: props.row.original._id }
          })
        }
      }),
      h(MdiTrashCanOutline, {
        width:24,
        height: 24,
        class: 'cursor-pointer',
        onClick() {
          const confirm = window.confirm(`是否要移除 - ${props.row.original.name}`)
          if (confirm) {
            $api(`/api/v1/admin/rooms/${props.row.original._id}`, {
              method: 'DELETE'
            }).then(() => {
              refresh()
            })
          }
        }
      })
    ])
  }),
]

function onCreate() {
  router.push({
    name: 'admin_rooms-edit'
  })
}

const table = useVueTable({
  get data() {
    return rooms.value?.result || []
  },
  columns: defaultColumns,
  getCoreRowModel: getCoreRowModel(),
})

</script>

<template>
  <div>
    <div class="flex justify-end">
      <button type="button" class="btn btn-primary" @click="onCreate">Create</button>
    </div>
    <table class="table table-hover table-bordered">
      <thead class="table-dark">
        <tr v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id">
            <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>

</style>