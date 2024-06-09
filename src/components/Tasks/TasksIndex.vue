<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import TasksList from '@/components/Tasks/TasksList.vue'
import NewTask from '@/components/Tasks/NewTask.vue'
import { useListsStore } from '@/stores/ListsStore'
import { useMenuStore } from '@/stores/MenuStore'

// use Stores
const menuStore = useMenuStore()
const listStore = useListsStore()

// turn Stores States to Refs
const { isOpen, burgerMenu } = storeToRefs(menuStore)
const { selectedList } = storeToRefs(listStore)
</script>

<template>
  <div
    class="h-[650px] overflow-auto backface-hidden absolute mx-3 p-5 border-2 rounded-tl-[25px] rounded-br-[25px] min-w-80 bg-gray-50 duration-500"
    :class="isOpen ? 'rotate-y-180' : 'rotate-y-0'"
  >
    <h1
      class="flex items-center border-l-[4px] border-purple-500 pl-1 py-2 text-xl font-bold mb-2 tracking-widest bg-purple-100 rounded-s-lg rounded-e-md"
    >
      <button @click="isOpen = !isOpen" class="flex flex-col justify-around h-6 w-6 p-1 rounded">
        <span
          v-for="burger in burgerMenu"
          :key="burger"
          :class="[
            'h-0.5 rounded bg-gray-600 w-full transition ease transform duration-300',
            isOpen ? burger : 'opacity-50 group-hover:opacity-100'
          ]"
        ></span>
      </button>
      List: {{ selectedList?.title }}
    </h1>
    <new-task />
    <tasks-list />
  </div>
</template>

<style scoped></style>
