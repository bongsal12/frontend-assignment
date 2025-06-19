<template>
  <div class="relative w-full h-full bg-cyan-950 pb-10">
    <img
      :src="movie.bg_url"
      class="w-full h-full object-cover absolute top-0 left-0"
    />
    <div
      class="absolute inset-0 bg-gradient-to-tr from-[#04224e] to-transparent"
    ></div>
    <div class="max-w-7xl mx-auto pt-2">
      <iframe
        :src="movie.vdo_url"
        frameborder="0"
        allowfullscreen
        class="absolute w-[60%] h-[600px] rounded-2xl"
      />
    </div>

    <div class="relative h-full flex mt-[630px]">
      <div class="max-w-7xl mx-auto w-full px-4">
        <div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
          <img
            :src="movie.thumbnail_url"
            class="w-full max-w-md rounded-lg shadow-xl"
          />
          <div class="text-white">
            <div class="text-xl py-2">{{ movie.title }}</div>

            <div class="flex gap-3">
              <div>
                <span class="items-center flex gap-1"
                  ><img
                    src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                    class="h-4"
                  />

                  <div>{{ movie.rating }}</div>
                </span>
              </div>
              <span
                v-for="(m, index) in movie.genres"
                :key="m.id"
                class="bg-red-500 px-1 rounded-md"
              >
                {{ m.name }}
              </span>
            </div>

            <div class="py-3">
              <div class="text-xl">Overviews</div>
              <h1 class="text-gray-400">{{ movie.overview }}</h1>
            </div>
            <div class="flex items-center gap-3 text-xl py-3">
              <div class="flex gap-1">
                <div class="text-xl">Release Date:</div>
                <div class="text-gray-400">{{ movie.release_date }}</div>
              </div>
              <div class="flex gap-1">
                <div class="text-xl">Runtime:</div>
                <h1 class="text-gray-400">{{ movie.runtime }}</h1>
              </div>
            </div>
            <div class="flex gap-2 py-3 text-xl">
              <div class="">Director:</div>
              <div class="text-gray-400">{{ movie.director }}</div>
            </div>
            <div class="flex gap-2 text-xl">
              <div>Writer:</div>
              <div class="text-gray-400">{{ movie.writer }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id;

const config = useRuntimeConfig();
const { data } = await useFetch(`${config.public.apiBase}/api/movies/${id}`);

const movie = computed(() => data.value?.data);
</script>
