<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useListsStore} from "@/stores/ListsStore";
import {onMounted} from "vue";

const listsStore = useListsStore();
const { lists, toggle, selectedList } = storeToRefs(listsStore)

onMounted(async () => await listsStore.getAll());
</script>

<template>
  <div v-if="lists.loading">loading...</div>
  <section v-else>
    <ul class="mb-6">
      <li
        v-for="(list, i) in lists.value"
        :key="list.id"
        class="ps-3 py-2 border-y cursor-pointer flex items-center justify-between"
        :class="selectedList?.id === list.id ? 'bg-purple-100' : 'bg-white'"
        @click.prevent="listsStore.selectList(list)"
      >
        {{ `${i + 1} - ${list.title}` }}
        <svg v-if="toggle.get(list.id)" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
        </svg>
        <svg v-else @click.stop.prevent="listsStore.deleteList(list)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="14" class="inline w-4 h-4 me-3" viewBox="0 0 448 512">
          <path fill="#ff0000" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
        </svg>
      </li>
    </ul>
  </section>
</template>

<style scoped>

</style>
