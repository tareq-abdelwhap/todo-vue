<script lang="ts" setup>
import TasksIndex from '@/components/Tasks/TasksIndex.vue'
import ListsIndex from '@/components/Lists/ListsIndex.vue'
</script>

<template>
  <div
    class="flex items-center justify-center transform-style-3d transition-transform duration-700 transform rotate-y-180"
  >
    <tasks-index />
    <lists-index />
  </div>
</template>

<style scoped></style>
