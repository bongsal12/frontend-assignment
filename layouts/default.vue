<template>
  <div class="bg-[#062657] w-full relative">
    <div class="w-full bg-black/10 bg-fixed">
      <div
        class="max-w-7xl mx-auto flex justify-between p-2.5 items-center"
        v-show="$route.path !== '/login'"
      >
        <NuxtLink to="/">
          <img
            src="https://movie-seven-khaki.vercel.app/assets/movix-logo-d720c325.svg"
          />
        </NuxtLink>
        <div class="max-w-sm">
          <div class="relative">
            <input
              v-model="searchQuery"
              class="input ps-8 w-[400px]"
              type="text"
              placeholder="Search movie"
            />

            <div
              v-if="pending"
              class="absolute z-10 bg-[#063781] w-[400px] rounded-md mt-1 p-1"
            >
              Loading...
            </div>
            <div
              class="absolute z-10 bg-[#063781] w-[400px] rounded-md mt-1 p-1"
              v-show="searchQuery && searchQuery.trim() !== ''"
            >
              <div v-for="movie in movies.slice(0, 6)" :key="movie.id">
                <NuxtLink
                  :to="`/movie/${movie.id}`"
                  class="flex bg-cyan-800 p-2 rounded-md mb-2 gap-3 hover:bg-[#7396cad0]"
                  @click="searchQuery = ''"
                >
                  <img
                    :src="movie.thumbnail_url"
                    class="h-[84px] w-[66px] rounded-md"
                  />
                  <div class="flex flex-col gap-4">
                    <div>{{ movie.title }}</div>
                    <div class="flex gap-2">
                      <span class="items-center flex gap-1"
                        ><img
                          src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                          class="h-4"
                        />

                        <div>{{ movie.rating }}</div>
                      </span>
                      <div>{{ movie.release_date }}</div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
            <span
              class="icon-[tabler--search] text-base-content absolute start-3 top-1/2 size-4 shrink-0 -translate-y-1/2"
            ></span>
          </div>
          <!-- SearchBox Body -->
          <div
            class="bg-base-100 rounded-box shadow-base-300/20 absolute z-50 max-h-56 w-full space-y-0.5 overflow-y-auto p-2 shadow-lg"
            style="display: none"
            data-combo-box-output=""
          ></div>
        </div>

        <div class="flex gap-5">
          <NuxtLink
            to="/explore/movie"
            class="hover:text-red-400 text-2xl font-bold"
            >Movies</NuxtLink
          >
          <!-- <NuxtLink to="/explore/tv" class="hover:text-red-400"
            >TV Shows</NuxtLink
          > -->
        </div>
      </div>
    </div>
    <slot />
    <footer>
      <div
        class="p-10 text-center max-w-5xl mx-auto"
        v-show="$route.path !== '/login'"
      >
        hollywoodmovi is a completely ad-free free movie streaming platform.
        Users can enjoy a vast selection of over 10,000 movies and TV series
        without the need for registration or payment. hollywoodmovi © 2025. All
        Rights Reserved
      </div>
    </footer>
  </div>
</template>
<script setup>
const searchQuery = ref("");
const config = useRuntimeConfig();

const url = `${config.public.apiBase}/api/movies`;

// Fetch data reactively
const { data, pending, refresh } = await useFetch(url, {
  query: { search: searchQuery },
});
const movies = computed(() => data?.value?.data);
</script>
