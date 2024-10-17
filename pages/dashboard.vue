<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold text-red">Dashboard</h1>

    <div class="mb-8 rounded-lg bg-yellow p-6 shadow-lg">
      <h2 class="mb-4 text-2xl font-semibold text-red">Users</h2>
      <table class="w-full border-collapse rounded-lg">
        <thead>
          <tr class="bg-red text-yellow">
            <th class="p-2 text-center">ID</th>
            <th class="p-2 text-center">Username</th>
            <th class="p-2 text-center">Email</th>
            <th class="p-2 text-center">Role</th>
            <th class="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b border-red transition-colors duration-300 hover:bg-red/10"
          >
            <td class="p-2 text-center">{{ user.id }}</td>
            <td class="p-2 text-center">{{ user.username }}</td>
            <td class="p-2 text-center">{{ user.email }}</td>
            <td class="p-2 text-center">{{ user.role }}</td>
            <td class="flex items-center justify-end space-x-6 p-2">
              <button
                @click="openChangeRoleModal(user)"
                class="transform rounded-md bg-red px-2 py-1 text-sm font-bold text-yellow transition duration-300 hover:scale-105 hover:bg-red/90"
              >
                Change Role
              </button>
              <button
                @click="deleteUser(user.id)"
                class="transform rounded-md bg-red px-2 py-1 text-sm font-bold text-yellow transition duration-300 hover:scale-105 hover:bg-red/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="openCreateUserModal"
        class="mt-4 rounded-md bg-red px-4 py-2 font-bold text-yellow hover:bg-red/90"
      >
        Create New User
      </button>
    </div>

    <div class="mb-8 rounded-lg bg-yellow p-6 shadow-lg">
      <h2 class="mb-4 text-2xl font-semibold text-red">Games</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-red text-yellow">
            <th class="p-2 text-left">ID</th>
            <th class="p-2 text-left">Name</th>
            <th class="p-2 text-center">Description</th>
            <th class="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="game in games"
            :key="game.id"
            class="border-b border-red transition-colors duration-300 hover:bg-red/10"
          >
            <td class="p-2">{{ game.id }}</td>
            <td class="p-2">{{ game.name }}</td>
            <td class="p-2">{{ game.description }}</td>
            <td class="flex p-2">
              <button
                @click="deleteGame(game.id)"
                class="m-auto transform rounded-md bg-red px-2 py-1 text-sm font-bold text-yellow transition duration-300 hover:scale-105 hover:bg-red/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="openCreateGameModal"
        class="mt-4 rounded-md bg-red px-4 py-2 font-bold text-yellow hover:bg-red/90"
      >
        Create New Game
      </button>
    </div>

    <!-- Create User Modal -->
    <Modal :isOpen="showCreateUserModal" @close="showCreateUserModal = false">
      <h2 class="mb-4 text-2xl font-semibold text-red">Create New User</h2>
      <form @submit.prevent="createUser" class="space-y-4">
        <div>
          <label for="userName" class="mb-1 block text-sm font-medium text-red">Username:</label>
          <input
            v-model="newUser.username"
            id="userName"
            required
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
          />
        </div>
        <div>
          <label for="userPassword" class="mb-1 block text-sm font-medium text-red">Password:</label>
          <input
            v-model="newUser.password"
            id="userPassword"
            type="password"
            required
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
          />
        </div>
        <div>
          <label for="userRole" class="mb-1 block text-sm font-medium text-red">Role:</label>
          <select
            v-model="newUser.role"
            id="userRole"
            required
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full transform rounded-md bg-red px-4 py-2 font-bold text-yellow transition duration-300 hover:scale-105 hover:bg-red/90"
        >
          Create User
        </button>
      </form>
      <button
        @click="showCreateUserModal = false"
        class="mt-4 rounded-md border-2 border-red p-2 text-red transition-colors duration-300 hover:text-red/90"
      >
        Cancel
      </button>
    </Modal>

    <!-- Change User Role Modal -->
    <Modal :isOpen="showChangeRoleModal" @close="showChangeRoleModal = false">
      <h2 class="mb-4 text-2xl font-semibold text-red">Change User Role</h2>
      <form @submit.prevent="changeUserRole" class="space-y-4">
        <div>
          <label for="userId" class="mb-1 block text-sm font-medium text-red">User ID:</label>
          <input
            v-model="userRoleChange.userId"
            id="userId"
            required
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
            readonly
          />
        </div>
        <div>
          <label for="newRole" class="mb-1 block text-sm font-medium text-red">New Role:</label>
          <select
            v-model="userRoleChange.newRole"
            id="newRole"
            required
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
          >
            <option v-for="type in playerTypes" :key="type.id" :value="type.type">
              {{ type.type }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full transform rounded-md bg-red px-4 py-2 font-bold text-yellow transition duration-300 hover:scale-105 hover:bg-red/90"
        >
          Change Role
        </button>
      </form>
      <button
        @click="showChangeRoleModal = false"
        class="mt-4 rounded-md border-2 border-red p-2 text-red transition-colors duration-300 hover:text-red/90"
      >
        Cancel
      </button>
    </Modal>

    <!-- Create Game Modal -->
    <Modal :isOpen="showCreateGameModal" @close="showCreateGameModal = false">
      <h2 class="mb-4 text-2xl font-semibold text-red">Create New Game</h2>
      <form @submit.prevent="createGame" class="space-y-4">
        <div>
          <label for="gameName" class="mb-1 block text-sm font-medium text-red">Game Name:</label>
          <input
            v-model="newGame.name"
            id="gameName"
            required
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
          />
        </div>
        <div>
          <label for="gameDescription" class="mb-1 block text-sm font-medium text-red">
            Description:
          </label>
          <textarea
            v-model="newGame.description"
            id="gameDescription"
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full transform rounded-md bg-red px-4 py-2 font-bold text-yellow transition duration-300 hover:scale-105 hover:bg-red/90"
        >
          Create Game
        </button>
      </form>
      <button
        @click="showCreateGameModal = false"
        class="mt-4 rounded-md border-2 border-red p-2 text-red transition-colors duration-300 hover:text-red/90"
      >
        Cancel
      </button>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Modal from '../components/Modal.vue'

const users = ref([])
const games = ref([])
const playerTypes = ref([])

// Add these lines to define the modal visibility states
const showCreateUserModal = ref(false)
const showChangeRoleModal = ref(false)
const showCreateGameModal = ref(false)

const newUser = ref({ username: '', password: '', role: 'user' })
const userRoleChange = ref({ userId: '', newRole: '' })
const newGame = ref({ name: '', description: '' })

// Fetch users (players)
const fetchUsers = async () => {
  try {
    const response = await fetch('http://daddynexux-002-site5.dtempurl.com/api/dash/getplayer')
    const data = await response.json()
    users.value = data.map(player => ({
      id: player.id,
      username: player.userId,
      role: playerTypes.value.find(pt => pt.id === player.playerTypeId)?.type || 'Unknown'
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Fetch player types
const fetchPlayerTypes = async () => {
  try {
    const response = await fetch('http://daddynexux-002-site5.dtempurl.com/api/dash/get-type')
    playerTypes.value = await response.json()
  } catch (error) {
    console.error('Error fetching player types:', error)
  }
}

// Create user
const createUser = async () => {
  try {
    const response = await fetch('http://daddynexux-002-site5.dtempurl.com/api/dash/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUser.value.username,
        password: newUser.value.password,
        Role: newUser.value.role
      }),
    })

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.title || 'Failed to create user');
    }

    const userData = await response.json();

    alert(`User created: ${newUser.value.username}`);
    newUser.value = { username: '', password: '', role: 'user' };
    showCreateUserModal.value = false;
    await fetchUsers();
  } catch (error) {
    console.error('Error creating user:', error);
    alert(error.message || 'Error creating user');
  }
}

// Change user role
const changeUserRole = async () => {
  try {
    const response = await fetch('http://daddynexux-002-site5.dtempurl.com/api/dash/makeplayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserId: userRoleChange.value.userId,
        PlayerTypeId: playerTypes.value.find(pt => pt.type === userRoleChange.value.newRole)?.id
      }),
    })
    if (response.ok) {
      alert(`User role changed: User ID ${userRoleChange.value.userId} is now ${userRoleChange.value.newRole}`)
      userRoleChange.value = { userId: '', newRole: '' }
      showChangeRoleModal.value = false
      await fetchUsers()
    } else {
      alert('Failed to change user role')
    }
  } catch (error) {
    console.error('Error changing user role:', error)
    alert('Error changing user role')
  }
}

// Create game
const createGame = async () => {
  try {
    const response = await fetch('http://daddynexux-002-site5.dtempurl.com/api/dash/game', {
      method: 'POST',
    })
    if (response.ok) {
      alert('New game created')
      showCreateGameModal.value = false
      // Since we don't have an API to fetch games, we'll just add a placeholder
      games.value.push({
        id: Date.now().toString(),
        name: 'New Game',
        description: 'A new game has been created'
      })
    } else {
      alert('Failed to create game')
    }
  } catch (error) {
    console.error('Error creating game:', error)
    alert('Error creating game')
  }
}

// Add these functions to open the modals
const openCreateUserModal = () => {
  showCreateUserModal.value = true
}

const openChangeRoleModal = (user) => {
  userRoleChange.value.userId = user.id
  userRoleChange.value.newRole = user.role
  showChangeRoleModal.value = true
}

const openCreateGameModal = () => {
  showCreateGameModal.value = true
}

// Delete user and delete game functions (placeholder implementations)
const deleteUser = (userId) => {
  console.log('Deleting user:', userId)
  users.value = users.value.filter(user => user.id !== userId)
}

const deleteGame = (gameId) => {
  console.log('Deleting game:', gameId)
  games.value = games.value.filter(game => game.id !== gameId)
}

onMounted(async () => {
  await fetchPlayerTypes()
  await fetchUsers()
})
</script>

<style>
  .shadow-lg {
    box-shadow:
      10px 10px 10px 10px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }

  .animate-wiggle {
    animation: wiggle 1s ease-in-out infinite;
  }

  .hover\:animate-wiggle:hover {
    animation: wiggle 1s ease-in-out infinite;
  }
</style>
