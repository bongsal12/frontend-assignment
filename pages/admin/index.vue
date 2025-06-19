<template>
  <div class="p-4 mt-5 mx-5 min-h-screen w-[1550px]">
    <!-- Welcome Banner -->
    <div
      class="text-white p-3 bg-sky-950 h-[400px] rounded-2xl text-center flex flex-col justify-center"
    >
      <div class="text-5xl font-bold mb-6">Welcome to Admin Dashboard</div>
      <div class="text-xl mb-8">
        Manage your entire movie database with powerful tools
      </div>
      <div class="flex justify-center gap-4">
        <NuxtLink
          to="/admin/movie/new"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Upload New Movie
        </NuxtLink>
        <NuxtLink
          to="/"
          target="_blank"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          View Website
        </NuxtLink>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mt-8">
      <div class="bg-sky-950 p-6 rounded-xl shadow-md">
        <div class="text-gray-500 text-lg">Total Movies</div>
        <div class="text-3xl font-bold mt-2">{{ movies.length }}</div>
      </div>
      <div class="bg-sky-950 p-6 rounded-xl shadow-md">
        <div class="text-gray-500 text-lg">Total Genre</div>
        <div class="text-3xl font-bold mt-2">{{ genres.length }}</div>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="mt-8 bg-sky-950 rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-bold mb-4">Recent Activity</h2>
      <div class="space-y-4">
        <!-- <div class="flex items-center p-3 hover:bg-sky-900 rounded-lg">
          <div class="bg-blue-100 p-2 rounded-full mr-4">
            <svg
              class="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <div>
            <p class="font-medium">Last uploaded "The Last Adventure"</p>
            <p class="text-gray-500 text-sm">2 hours ago</p>
          </div>
        </div> -->
        <div class="flex items-center p-3 hover:bg-sky-900 rounded-lg">
          <div class="bg-green-100 p-2 rounded-full mr-4">
            <svg
              class="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="font-medium">Top rate : {{ rate.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const config = useRuntimeConfig();
const url = `${config.public.apiBase}/api/movies`;
const { data } = await useFetch(url);

const movies = computed(() => {
  return data.value?.data || [];
});

const url1 = `${config.public.apiBase}/api/genres`;
const { data: genre } = await useFetch(url1);

const genres = computed(() => {
  return genre.value?.data || [];
});

const { data: rating } = await useFetch(
  `${config.public.apiBase}/api/movies?rating`
);
const rate = computed(() => rating?.value?.data[0]);
</script>
