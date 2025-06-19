<script setup>
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const { login } = useAuth();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Please fill in all fields";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";

    const response = await login(email.value, password.value);
    console.log("Login response:", response);

    navigateTo("/admin");
  } catch (error) {
    errorMessage.value =
      error.data?.message || "Login failed password incorrect ";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex justify-center bg-sky-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full h-[450px] space-y-8 bg-black/50 p-8 rounded-lg shadow-md"
    >
      <div class="flex justify-center">
        <img
          src="https://movie-seven-khaki.vercel.app/assets/movix-logo-d720c325.svg"
        />
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-white/70 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>

          <!-- Password Input -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <label
                for="password"
                class="block text-sm font-medium text-white/70"
              >
                Password
              </label>
              <NuxtLink
                to="/forgot-password"
                class="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </NuxtLink>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                placeholder="password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <span class="text-gray-400 hover:text-gray-500">
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    :stroke="showPassword ? 'currentColor' : 'none'"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
            <span v-else> Login </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
