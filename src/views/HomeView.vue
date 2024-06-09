<script setup lang="ts">
import { useBackgroundStore } from '@/stores/BackgroundStore'
import ToDo from '@/components/ToDo.vue'
import { storeToRefs } from 'pinia'
// import ChangeBackgroundColor from '@/components/ChangeBackgroundColor.vue'

const backgroundStore = useBackgroundStore()
const { activeGradient } = storeToRefs(backgroundStore)
</script>

<template>
  <main :class="`min-h-screen flex justify-center ${activeGradient}`">
    <!-- <change-background-color /> -->
    <to-do />
  </main>
</template>

<style scoped></style>
