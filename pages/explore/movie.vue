<template>
  <div class="max-w-7xl mx-auto min-h-screen">
    <div class="flex justify-between p-3">
      <div class="text-2xl">Explore Movies</div>
      <div>
        <select
          class="select max-w-sm appearance-none"
          aria-label="Genre selection"
          v-model="selectedGenre"
        >
          <option value="">Select Genre</option>
          <!-- Default option -->
          <option v-for="g in gen" :key="g.id" :value="g.id">
            {{ g.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-5 gap-4 pt-3">
      <template v-if="selectedGenre === ''">
        <NuxtLink v-for="m in movie" :key="m.id" :to="`/movie/${m.id}`">
          <MovieCard
            :image="m.thumbnail_url"
            :date="m.release_date"
            :genre="m.genres"
            :title="m.title"
          />
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink
          v-if="filtergenre"
          v-for="m in filtergenre"
          :key="m.id"
          :to="`/movie/${m.id}`"
        >
          <MovieCard
            :image="m.thumbnail_url"
            :date="m.release_date"
            :genre="m.genres"
            :title="m.title"
          />
        </NuxtLink>
        <div
          v-else
          class="absolute inset-0 flex items-center justify-center text-white text-3xl"
        >
          No Movie! Please select other genre.
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
const selectedGenre = ref("");
const url = `${config.public.apiBase}/api/movies`;
const url2 = `${config.public.apiBase}/api/genres`;
const url3 = `${config.public.apiBase}/api/movies?genre`;
const { data, pending } = await useFetch(url);
const movie = computed(() => data?.value?.data);

const { data: genre } = await useFetch(url2);
const gen = computed(() => genre?.value?.data);

const { data: getbyGenre } = await useFetch(url3, {
  query: { genre: selectedGenre },
});
const filtergenre = computed(() => getbyGenre?.value?.data);
</script>
