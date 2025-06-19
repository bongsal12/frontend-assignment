<template>
  <div class="grid grid-cols-[1fr_7fr] bg-cyan-800">
    <div>
      <button
        type="button"
        class="btn btn-text max-sm:btn-square sm:hidden"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="default-sidebar"
        data-overlay="#default-sidebar"
      >
        <span class="icon-[tabler--menu-2] size-5"></span>
      </button>

      <aside
        id="default-sidebar"
        class="overlay [--auto-close:sm] sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64 sm:absolute sm:z-0 sm:flex sm:translate-x-0"
        role="dialog"
        tabindex="-1"
      >
        <div class="drawer-body px-2 pt-4 bg-cyan-800">
          <ul class="menu p-0 bg-cyan-900">
            <li class="text-xl">
              <NuxtLink to="/admin">
                <span class="icon-[tabler--home] size-5"></span>
                Dashboard
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/movie">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clip-rule="evenodd"
                  />
                </svg>

                Movie
              </NuxtLink>
            </li>
            <!-- <li>
              <NuxtLink to="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path d="M19.5 6h-15v9h15V6Z" />
                  <path
                    fill-rule="evenodd"
                    d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z"
                    clip-rule="evenodd"
                  />
                </svg>

                Tv Series
              </NuxtLink>
            </li> -->
            <li>
              <NuxtLink to="/admin/genre">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                    clip-rule="evenodd"
                  />
                </svg>

                Genre
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="">
                <span class="icon-[tabler--user] size-5"></span>
                User
              </NuxtLink>
            </li>

            <li>
              <button @click="handleLogout">
                <span class="icon-[tabler--logout-2] size-5"></span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
    <slot />
  </div>
</template>
<script setup>
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  navigateTo("/");
};
</script>
