<template>
  <div class="w-full">
    <swiper
      :slidesPerView="1"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="[Autoplay, Navigation, Pagination]"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      :spaceBetween="30"
      :centeredSlides="true"
      :loop="true"
    >
      <swiper-slide v-for="m in trending" :key="m.id">
        <img
          class="h-[800px] w-full object-cover"
          :src="`https://image.tmdb.org/t/p/w1280/${m.bg_url}`"
        />
        <div class="text-center text-white grid justify-items-center">
          <div class="absolute top-[23%] right-[40%] text-5xl font-bold">
            {{ m.title }}
          </div>
          <div
            class="absolute top-[30%] right-[30%] font-bold text-xl text-center w-2xl"
          >
            {{ m.overview }}
          </div>
          <div class="absolute top-[45%] right-[42%] flex gap-5">
            <div class="flex items-center bg-cyan-700 px-4 gap-2.5 rounded-sm">
              <div>{{ m.rating }}</div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                class="h-4"
              />
            </div>
            <div>
              <button class="btn btn-info">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/27/27223.png"
                  class="h-4"
                /><NuxtLink :to="`/movie/${m.id}`">Watch now</NuxtLink>
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div
      class="absolutere bottom-8 w-full bg-gradient-to-tr from-[#04224e] to-transparent"
    ></div>
    <div class="w-full">
      <div class="max-w-7xl mx-auto">
        <div class="text-xl font-bold py-5">Trending</div>
        <swiper
          :slidesPerView="5"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="[Autoplay, Navigation, Pagination]"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :spaceBetween="30"
          :centeredSlides="true"
          :loop="true"
        >
          <swiper-slide v-for="m in trending" :key="m.id">
            <NuxtLink :to="`/movie/${m.id}`">
              <MovieCard
                :image="m.thumbnail_url"
                :date="m.release_date"
                :genre="m.genres"
                :title="m.title"
            /></NuxtLink>
          </swiper-slide>
        </swiper>
        <div class="text-xl font-bold py-5">Top Rated</div>
        <swiper
          :slidesPerView="5"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="[Autoplay, Navigation, Pagination]"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :spaceBetween="30"
          :centeredSlides="true"
          :loop="true"
        >
          <swiper-slide v-for="m in rate.slice(0, 10)" :key="m.id">
            <NuxtLink :to="`/movie/${m.id}`">
              <MovieCard
                :image="m.thumbnail_url"
                :date="m.release_date"
                :genre="m.genres"
                :title="m.title"
            /></NuxtLink>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  {{ id }}
</template>
<script setup>
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const config = useRuntimeConfig();

const { data } = await useFetch(
  `${config.public.apiBase}/api/movies?is_trending=1`
);

const { data: rating } = await useFetch(
  `${config.public.apiBase}/api/movies?rating`
);

const trending = computed(() => data?.value?.data);
const rate = computed(() => rating?.value?.data);
</script>
