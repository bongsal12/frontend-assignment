<template>
  <div class="p-4 rounded-2xl mt-5 mx-5 bg-sky-950 h-[800px] min-h-screen">
    <div class="text-white flex justify-between p-2">
      <div>
        <div class="text-xl">Update Movie</div>
      </div>
      <button class="btn btn-primary" @click="submitForm">Update</button>
    </div>
    <div class="bg-sky-900 p-4 rounded-2xl">
      <div class="grid grid-cols-2 gap-5 p-2">
        <div>
          <div>
            <label class="label-text" for="title">Title</label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="input title"
              class="input"
              id="title"
              required
            />
          </div>

          <div>
            <label class="label-text" for="overview"> Description </label>
            <textarea
              v-model="formData.overview"
              class="textarea"
              placeholder="description"
              id="overview"
              required
            ></textarea>
          </div>
          <div>
            <label class="label-text" for="thumbnail_url">Thumbnail url</label>
            <input
              v-model="formData.thumbnail_url"
              type="text"
              placeholder="thumbnail"
              class="input"
              id="thumbnail_url"
              required
            />
          </div>
          <div>
            <label class="label-text" for="vdo_url">Video url</label>
            <input
              v-model="formData.vdo_url"
              type="text"
              placeholder="video"
              class="input"
              id="vdo_url"
              required
            />
          </div>
          <div>
            <label class="label-text" for="release_date">Release_date</label>
            <input
              v-model="formData.release_date"
              type="text"
              placeholder="yyyy-mm-dd"
              class="input"
              id="release_date"
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label class="label-text" for="slug">Slug</label>
            <input
              v-model="formData.slug"
              type="text"
              placeholder="the-dark-knight"
              class="input"
              id="slug"
              required
            />
          </div>
          <div>
            <label class="label-text" for="genres">categories</label>
            <input
              v-model="genresInput"
              type="text"
              placeholder="Action, Adventure, Animation, Comedy"
              class="input"
              id="genres"
              @change="updateGenres"
              required
            />
          </div>
          <div class="mt-[49px]">
            <label class="label-text" for="bg_url">Bg_url</label>
            <input
              v-model="formData.bg_url"
              type="text"
              placeholder="bg_url"
              class="input"
              id="bg_url"
              required
            />
          </div>

          <div>
            <label class="label-text" for="runtime">Runtime</label>
            <input
              v-model="formData.runtime"
              type="text"
              placeholder="1h 10mn"
              class="input"
              id="runtime"
              required
            />
          </div>
          <div>
            <label class="label-text" for="rating">Vote*</label>
            <input
              v-model="formData.rating"
              type="text"
              placeholder="rating"
              class="input"
              id="rating"
              required
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 p-2">
        <div>
          <label class="label-text" for="is_movie"> is_Movie </label>
          <select v-model="formData.is_movie" class="select" id="is_movie">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div>
          <label class="label-text" for="is_trending"> isTrending </label>
          <select
            v-model="formData.is_trending"
            class="select"
            id="is_trending"
          >
            <option :value="false">false</option>
            <option :value="true">true</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 p-2">
        <div>
          <label class="label-text" for="director">Director</label>
          <input
            v-model="formData.director"
            type="text"
            placeholder="director"
            class="input"
            id="director"
          />
        </div>
        <div>
          <label class="label-text" for="writer">Writer</label>
          <input
            v-model="formData.writer"
            type="text"
            placeholder="writer"
            class="input"
            id="writer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
const config = useRuntimeConfig();
const route = useRoute();
const movieId = route.params.id;
const formData = reactive({
  title: "",
  slug: "",
  overview: "",
  release_date: "",
  rating: "",
  runtime: "",
  is_movie: true,
  thumbnail_url: "",
  bg_url: "",
  vdo_url: "",
  is_trending: false,
  director: "",
  writer: "",
  genres: [],
});

const genresInput = ref("");

onMounted(async () => {
  try {
    const { data, error } = await useFetch(
      `${config.public.apiBase}/api/movies/${movieId}`
    );

    if (error.value) {
      console.error("Error fetching movie:", error.value);
      return;
    }

    Object.assign(formData, data.value?.data);
    formData.genres = Array.isArray(data.value?.data.genres)
      ? data.value?.data.genres.map((genre) => genre.name)
      : [];

    // Set the input field value
    genresInput.value = formData.genres.join(", ");

    formData.is_trending = !!data.value.data.is_trending;
    formData.is_movie = !!data.value.data.is_movie;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("An unexpected error occurred");
  }
});

const updateGenres = () => {
  formData.genres = genresInput.value
    .split(",")
    .map((genre) => genre.trim())
    .filter((genre) => genre.length > 0);
};

const submitForm = async () => {
  try {
    const payload = {
      ...formData,
    };

    const { data, error } = await useFetch(
      `${config.public.apiBase}/api/movies/${movieId}`,
      {
        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (error.value) {
      console.error("Error details:", error.value.data);
      alert(
        `Error updating movie: ${error.value.data?.message || "Unknown error"}`
      );
      return;
    }

    console.log("Success:", data.value);
    alert("Movie updated successfully!");
    navigateTo("/admin/movie");
  } catch (err) {
    console.error("Unexpected error:", err);
    alert(`An unexpected error occurred: ${err.message}`);
  }
};
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
