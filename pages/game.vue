<template>
  <div class="relative min-h-screen w-full bg-[#FFFBE6] p-8">
    <div class="flex items-center justify-center space-x-12">
      <!-- Game grid -->
      <div
        class="game-grid mr-8 grid w-full max-w-[700px] grid-cols-5 overflow-hidden rounded-lg border-4 border-red"
      >
        <div
          v-for="n in 25"
          :key="n"
          class="grid-cell flex aspect-square items-center justify-center text-2xl font-bold text-red"
          @click="handleCellClick(n)"
        >
          <span v-if="!gameBoard[n - 1]" class="absolute text-5xl">{{ n }}</span>
          <span>{{ gameBoard[n - 1] }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div
        class="flex h-full flex-col items-center justify-between"
        :style="{ height: gridHeight + 'px' }"
      >
        <!-- Timer and Pause button -->
        <div class="mt-6 flex flex-row items-center space-x-4">
          <div
            class="mb-2 w-56 rounded-full bg-red px-4 py-4 text-center text-2xl font-bold text-white"
          >
            <p class="text-4xl text-white">
              {{ formattedTime }}
            </p>
          </div>
          <button
            @click="togglePause"
            class="flex h-16 w-16 items-center justify-center rounded-full bg-red text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                v-if="isPaused"
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
              <path
                v-else
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex w-full flex-row items-center justify-center space-x-4 rounded-full bg-red p-2 py-4 text-white"
        >
          <div class="flex items-center space-x-2 text-4xl">
            <span class="font-bold">X:</span>
            <span class="font-bold">{{ xPoints }}</span>
          </div>
          <p class="text-4xl font-bold">|</p>
          <div class="flex items-center space-x-2 text-4xl">
            <span class="font-bold">O:</span>
            <span class="font-bold">{{ oPoints }}</span>
          </div>
        </div>
        <!-- Current Player -->
        <div class="my-4 flex h-20 w-40 items-center justify-center rounded-3xl bg-red">
          <p class="text-6xl font-bold text-white">{{ numOfQuestions || 0 }}</p>
        </div>
        <div class="my-4 flex items-center justify-center rounded-3xl border-8 border-red">
          <span class="p-12 text-8xl font-bold text-red">{{ currentPlayer }}</span>
        </div>
        <div class="mb-4 flex flex-row space-x-4">
          <button
            @click="resetGame"
            class="flex h-16 w-16 items-center justify-center rounded-full bg-red text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            @click="showRules = true"
            class="flex h-16 w-16 items-center justify-center rounded-full bg-red text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Result button -->
        <button
          @click="endGame"
          class="rounded-full bg-red px-24 py-4 text-lg font-bold text-white"
        >
          <p class="text-4xl">Result</p>
        </button>
      </div>
    </div>

    <!-- Rules Modal -->
    <div
      v-if="showRules"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="rounded-lg bg-white p-8">
        <h2 class="mb-4 text-2xl font-bold">Game Rules</h2>
        <p>Here are the rules of the game...</p>
        <button @click="showRules = false" class="mt-4 rounded bg-red px-4 py-2 text-white">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const totalSeconds = ref(20 * 60)
  const isPaused = ref(false)
  const gameBoard = ref(Array(25).fill(''))
  const currentPlayer = ref('X')
  const xPoints = ref(0)
  const oPoints = ref(0)
  const showRules = ref(false)
  const gridHeight = ref(0)
  let interval

  const formattedTime = computed(() => {
    const minutes = Math.floor(totalSeconds.value / 60)
    const seconds = totalSeconds.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const startTimer = () => {
    interval = setInterval(() => {
      if (!isPaused.value && totalSeconds.value > 0) {
        totalSeconds.value--
      }
    }, 1000)
  }

  const togglePause = () => {
    isPaused.value = !isPaused.value
  }

  const handleCellClick = (index) => {
    if (gameBoard.value[index - 1] === '') {
      gameBoard.value[index - 1] = currentPlayer.value
      checkWinner()
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    }
  }

  const checkWinner = () => {
    // Implement win condition checks here
    // Update xPoints or oPoints accordingly
  }

  const resetGame = () => {
    gameBoard.value = Array(25).fill('')
    currentPlayer.value = 'X'
    totalSeconds.value = 20 * 60
    isPaused.value = false
  }

  const endGame = () => {
    // Implement end game logic here
    // You might want to show a modal with final results
  }

  onMounted(() => {
    startTimer()
    const gameGrid = document.querySelector('.game-grid')
    if (gameGrid) {
      gridHeight.value = gameGrid.offsetHeight
    }
  })

  onUnmounted(() => {
    clearInterval(interval)
  })
</script>

<style scoped>
  .game-grid {
    border: 5px solid;
    box-shadow: inset 0 0 0 1px;
    @apply border-red;
  }

  .grid-cell {
    border-right: 5px solid;
    border-bottom: 5px solid;
    @apply border-red;
    position: relative;
  }

  /* Apply the font to the entire page */
  body {
    font-family: 'Permanent Marker', cursive;
  }

  /* Remove the .handwritten class since it's no longer needed */
  .handwritten {
    /* This class can be removed as the font is now applied globally */
  }

  /* Google Font URL */
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

  /* Add the font to the page */
  @font-face {
    font-family: 'Permanent Marker';
    src: url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
    font-weight: normal;
    font-style: normal;
  }
</style>
