<template>
  <div class="h-screen w-full bg-main-bg bg-cover bg-center bg-no-repeat flex items-center justify-center">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-center space-y-12">
        <div>
          <img src="/assets/img/ministry-logo.png" alt="logo" class="w-48 md:w-72" />
        </div>
        <div class="w-full flex flex-col items-center justify-center space-y-4 max-w-md mt-36">
          <button
            class="w-full rounded-lg bg-red border-2 border-yellow px-6 py-3 text-center text-sm font-bold text-yellow hover:bg-red/90 focus:outline-none transition duration-300 transform hover:scale-105"
          >
            Start
          </button>
          <button
            class="w-full rounded-lg bg-yellow border-2 border-red px-6 py-3 text-center text-sm font-bold text-red hover:bg-yellow/90 focus:outline-none transition duration-300 transform hover:scale-105"
          >
            About
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
