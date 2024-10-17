<template>
  <div class="relative min-h-screen w-full bg-[#FFFBE6] p-8">
    <div class="flex flex-col items-center justify-center space-y-8">
      <h1 class="text-6xl font-bold text-red">Start Game</h1>
      <button
        @click="findGame"
        :disabled="loading || !isConnected"
        class="rounded-full bg-red px-24 py-4 text-4xl font-bold text-white"
        :class="{ 'opacity-50 cursor-not-allowed': loading || !isConnected }"
      >
        Find Game
      </button>
      <p class="text-2xl font-bold text-red">{{ statusMessage }}</p>
      <p v-if="connectionError" class="text-xl font-bold text-red">{{ connectionError }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSignalR } from '@/composables/useSignalR'

  const router = useRouter()
  const { connection, connectionError, connectionState, startConnection, findGame: signalRFindGame, on } = useSignalR()

  const loading = ref(false)
  const statusMessage = ref('Press Find Game to start')

  const isConnected = computed(() => connectionState.value === 'Connected')

  watch(connectionState, (newState) => {
    if (newState === 'Reconnecting') {
      statusMessage.value = 'Reconnecting to server...'
    } else if (newState === 'Connected') {
      statusMessage.value = 'Connected to server. Ready to find a game.'
    }
  })

  const findGame = async () => {
    if (!isConnected.value) {
      statusMessage.value = 'Connecting to server...'
      try {
        await startConnection()
      } catch (err) {
        statusMessage.value = 'Failed to connect to server. Please try again.'
        return
      }
    }

    loading.value = true
    statusMessage.value = 'Looking for a game...'

    try {
      const playerId = localStorage.getItem('playerId')
      if (!playerId) {
        throw new Error('Player ID not found')
      }
      await signalRFindGame(playerId)
      statusMessage.value = 'Waiting for opponent...'
    } catch (err) {
      console.error('Error: ', err)
      statusMessage.value = 'Error finding a game. Please try again.'
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    try {
      await startConnection()
    } catch (err) {
      console.error('Failed to connect to SignalR:', err)
      statusMessage.value = 'Failed to connect to server. Please refresh the page.'
    }

    on('GameFound', (gameId, symbol) => {
      statusMessage.value = `Game Found! You are ${symbol}. Game ID: ${gameId}`
      router.push({ name: 'game', params: { gameId } })
    })

    on('WaitingForGame', () => {
      statusMessage.value = 'Waiting for an opponent...'
    })
  })
</script>

<style scoped>
  body {
    font-family: 'Permanent Marker', cursive;
  }
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
  @font-face {
    font-family: 'Permanent Marker';
    src: url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
    font-weight: normal;
    font-style: normal;
  }
</style>
