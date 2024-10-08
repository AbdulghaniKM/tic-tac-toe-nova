<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-main-bg bg-cover bg-center bg-no-repeat sm:bg-contain"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-center space-y-8 sm:space-y-6">
        <div>
          <img
            src="/assets/img/ministry-logo.png"
            alt="logo"
            class="w-36 transition-all duration-300 sm:w-32 md:w-48 lg:w-72"
          />
        </div>
        <div class="w-full max-w-md sm:max-w-sm">
          <form class="bg-red rounded-xl p-6 shadow-2xl sm:p-4">
            <div class="mb-4 sm:mb-3">
              <label for="username" class="text-yellow mb-2 block text-sm font-semibold sm:mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                v-model="username"
                class="border-yellow bg-yellow/10 text-yellow placeholder-yellow/50 focus:border-yellow focus:ring-yellow/50 w-full rounded-lg border-2 p-2 text-sm transition duration-300 focus:ring-2"
                placeholder="Enter your username"
                required
              />
            </div>
            <div class="mb-6 sm:mb-4">
              <label for="password" class="text-yellow mb-2 block text-sm font-semibold sm:mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                v-model="password"
                class="border-yellow bg-yellow/10 text-yellow placeholder-yellow/50 focus:border-yellow focus:ring-yellow/50 w-full rounded-lg border-2 p-2 text-sm transition duration-300 focus:ring-2"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              @click="handleLogin"
              type="submit"
              class="bg-yellow text-red hover:bg-yellow/90 focus:ring-yellow/50 w-full transform rounded-lg px-4 py-2 text-center text-sm font-bold transition duration-300 hover:scale-105 focus:outline-none focus:ring-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const username = ref('')
  const password = ref('')
  const router = useRouter()

  const handleLogin = () => {
    router.push('/home')
  }
</script>
