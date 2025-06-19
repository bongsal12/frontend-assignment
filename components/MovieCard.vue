<template>
  <div>
    <!-- <div
      class="absolute inset-0 rounded-full"
      style="background: conic-gradient(#f59e0b 66%, #e5e7eb 0)"
    ></div>

    <div
      class="absolute inset-1 rounded-full bg-white flex items-center justify-center"
    >
      <span class="text-black font-semibold text-sm">6.6</span>
    </div> -->

    <div class="relative">
      <img
        class="rounded-2xl w-full"
        :src="`https://image.tmdb.org/t/p/w1280/${image}`"
      />
      <div
        class="flex absolute bottom-1.5 right-1 text-nowrap text-sm gap-1 text-white"
      >
        <div
          class="bg-red-500 rounded-sm px-1 mr-0.5"
          v-for="(g, index) in genre.slice(0, 2)"
          :key="index"
        >
          {{ g.name }}
        </div>
      </div>
    </div>

    <div class="pt-2 ml-1">
      <div class="text-[17px]">{{ title }}</div>
      <div class="text-xs">{{ date }}</div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  genre: { type: Array, required: true },
});
</script>
