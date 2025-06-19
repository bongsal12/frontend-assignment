<template>
  <div class="p-4 rounded-2xl mt-5 mx-5 bg-sky-900 pb-10 min-h-screen">
    <div class="text-white flex justify-between">
      <div>
        <div class="text-xl">Category</div>
        <div class="text-md">{{ movies.length }}</div>
      </div>
      <NuxtLink class="btn btn-primary" to="/admin/movie/new"
        >Create Movie</NuxtLink
      >
    </div>
    <div class="w-full overflow-x-auto pt-2">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>slug</th>
            <th>description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="movies">
          <tr
            v-for="movie in movies"
            :key="movie.id"
            class="row-hover hover:bg-sky-800 text-white"
          >
            <td>{{ movie.id }}</td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.slug ? movie.slug : "N/A" }}</td>
            <td>{{ movie.overview.substring(0, 100) }} ...</td>

            <td class="flex gap-2">
              <button class="btn btn-circle btn-text btn-sm text-green-400">
                <NuxtLink
                  :to="`/admin/movie/${movie.id}`"
                  class="icon-[tabler--pencil] size-5"
                ></NuxtLink>
              </button>
              <button
                @click="deleteMovie(event, movie.id)"
                class="btn btn-circle btn-text btn-sm text-red-500"
              >
                <span class="icon-[tabler--trash] size-5"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { NuxtLink } from "#components";
import { computed } from "vue";
definePageMeta({
  layout: "admin",
});
const config = useRuntimeConfig();
const url = `${config.public.apiBase}/api/movies`;
const { data } = await useFetch(url);

const movies = computed(() => {
  return data.value?.data || [];
});

const deleteMovie = async (event, id) => {
  if (!confirm("Are you sure you want to delete this movie?")) {
    return;
  }

  try {
    const { error } = await useFetch(
      `${config.public.apiBase}/api/movies/${id}`,
      {
        method: "DELETE",
      }
    );

    if (error.value) {
      throw error.value;
    }

    // Success - refresh data or emit event
    alert("Movie deleted successfully!");
    window.location.reload(); // Simple page refresh
    // Or better: emit an event to parent component
    // emit('deleted');
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete movie");
  }
};
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
