<script setup lang="ts">

import {useBackgroundStore} from "@/stores/BackgroundStore";
import {storeToRefs} from "pinia";

const backgroundStore = useBackgroundStore()

const {
  supportedGradients,
  activeGradient
} = storeToRefs(backgroundStore)
</script>

<template>
  <section class="absolute top-5 left-5">
    <div
      v-for="[key, value] in Object.entries(supportedGradients)"
      :key="key"
      :class="[
        value,
        'h-[50px] w-[50px] my-2 rounded-full cursor-pointer hover:scale-110',
        activeGradient === value ? 'border-white border-2' : '',
      ]"
      @click="backgroundStore.changeBackground(key)"
    ></div>
  </section>
</template>

<style scoped>

</style>