<template>
  <div class="p-4 rounded-2xl mt-5 mx-5 bg-sky-900">
    <div class="text-white flex justify-between">
      <div>
        <div class="text-xl">Category</div>
        <div class="text-md">{{ genres.length }}</div>
      </div>
      <div class="rounded-lg px-2">Add Genre</div>
    </div>
    <div class="w-full overflow-x-auto pt-2">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Movies Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="genres">
          <tr
            v-for="genre in genres"
            :key="genre.id"
            class="row-hover hover:bg-sky-800 text-white"
          >
            <td>{{ genre.id }}</td>
            <td>{{ genre.name }}</td>
            <td>{{ genre.movie.length }}</td>
            <td class="flex gap-2">
              <button class="btn btn-circle btn-text btn-sm text-white">
                <span class="icon-[tabler--pencil] size-5"></span>
              </button>
              <button class="btn btn-circle btn-text btn-sm text-white">
                <span class="icon-[tabler--trash] size-5"></span>
              </button>
              <button class="btn btn-circle btn-text btn-sm text-white">
                <span class="icon-[tabler--dots-vertical] size-5"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const config = useRuntimeConfig();
const url = `${config.public.apiBase}/api/genres`;
const { data } = await useFetch(url);

const genres = computed(() => {
  return data.value?.data || [];
});
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
