import { ref, onUnmounted } from 'vue'
import * as signalR from '@microsoft/signalr'

const connection = ref(null)
const connectionError = ref(null)
const connectionState = ref('Disconnected')

const startConnection = async () => {
  if (connection.value && connection.value.state === signalR.HubConnectionState.Connected) {
    console.log('SignalR already connected.')
    return
  }

  connection.value = new signalR.HubConnectionBuilder()
    .withUrl('http://daddynexux-002-site5.dtempurl.com/gamehub', {
      withCredentials: false
    })
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: retryContext => {
        if (retryContext.elapsedMilliseconds < 60000) {
          return Math.random() * 10000;
        } else {
          return null;
        }
      }
    })
    .configureLogging(signalR.LogLevel.Information)
    .build()

  connection.value.onclose(error => {
    connectionState.value = 'Disconnected'
    if (error) {
      connectionError.value = `Connection closed due to error: ${error}`
    } else {
      connectionError.value = 'Connection closed'
    }
    console.error('SignalR connection closed', error)
  })

  connection.value.onreconnecting(error => {
    connectionState.value = 'Reconnecting'
    connectionError.value = `Connection lost, attempting to reconnect: ${error}`
    console.warn('SignalR reconnecting', error)
  })

  connection.value.onreconnected(connectionId => {
    connectionState.value = 'Connected'
    connectionError.value = null
    console.log('SignalR reconnected', connectionId)
  })

  try {
    await connection.value.start()
    connectionState.value = 'Connected'
    connectionError.value = null
    console.log('SignalR Connected.')
  } catch (err) {
    connectionState.value = 'Error'
    connectionError.value = `Failed to connect: ${err.message}`
    console.error('SignalR Connection Error:', err)
    throw err
  }
}

const invoke = async (method, ...args) => {
  if (!connection.value || connection.value.state !== signalR.HubConnectionState.Connected) {
    await startConnection()
  }
  try {
    return await connection.value.invoke(method, ...args)
  } catch (error) {
    console.error(`Error invoking ${method}:`, error)
    connectionError.value = `Error invoking ${method}: ${error.message}`
    throw error
  }
}

const on = (event, callback) => {
  if (connection.value) {
    connection.value.on(event, callback)
  }
}

const findGame = async (playerId) => {
  return await invoke('FindGame', playerId)
}

const makeMove = async (gameId, playerId, questionId, ans, buttonIndex, time) => {
  return await invoke('MakeMove', gameId, playerId, questionId, ans, buttonIndex, time)
}

export function useSignalR() {
  onUnmounted(() => {
    if (connection.value) {
      connection.value.stop()
    }
  })

  return { connection, connectionError, connectionState, startConnection, invoke, on, findGame, makeMove }
}
