<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import NewList from '@/components/Lists/NewList.vue'
import TodoList from '@/components/Lists/TodoList.vue'
import { useMenuStore } from '@/stores/MenuStore'

// use Stores
const menuStore = useMenuStore()

// turn Stores States to Refs
const { isOpen } = storeToRefs(menuStore)
</script>

<template>
  <div
    class="h-[650px] overflow-auto backface-hidden absolute mx-3 p-5 border-2 rounded-tl-[25px] rounded-br-[25px] min-w-80 bg-gray-50 duration-500"
    :class="!isOpen ? 'rotate-y-180' : 'rotate-y-0'"
  >
    <h1
      class="flex items-center border-l-[4px] border-purple-500 pl-1 py-2 text-xl font-bold mb-2 tracking-widest bg-purple-100 rounded-s-lg rounded-e-md"
    >
      To-Do Lists
    </h1>
    <new-list />
    <todo-list />
  </div>
</template>

<style scoped></style>
