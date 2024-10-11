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
          <label for="userEmail" class="mb-1 block text-sm font-medium text-red">Email:</label>
          <input
            v-model="newUser.email"
            id="userEmail"
            type="email"
            required
            class="w-full rounded-md border border-red px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red"
          />
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
            <option value="x">X</option>
            <option value="o">O</option>
            <option value="spectator">Spectator</option>
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
  import { ref } from 'vue'
  import Modal from '../components/Modal.vue'

  const users = ref([
    { id: '1', username: 'johndoe', email: 'johndoe@example.com', role: 'x' },
    { id: '2', username: 'janedoe', email: 'janedoe@example.com', role: 'o' },
  ])

  const games = ref([
    {
      id: '1',
      name: 'Tic Tac Toe Championship',
      description: 'An exciting tournament of Tic Tac Toe games!',
    },
    { id: '2', name: 'Casual Match', description: 'A friendly game of Tic Tac Toe' },
  ])

  const newUser = ref({
    username: '',
    email: '',
  })

  const userRoleChange = ref({
    userId: '',
    newRole: 'x',
  })

  const newGame = ref({
    name: '',
    description: '',
  })

  const showCreateUserModal = ref(false)
  const showChangeRoleModal = ref(false)
  const showCreateGameModal = ref(false)

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

  const createUser = () => {
    // Simulating API call to create a new user
    console.log('Creating user:', newUser.value)
    const newId = (users.value.length + 1).toString()
    users.value.push({
      id: newId,
      username: newUser.value.username,
      email: newUser.value.email,
      role: 'spectator',
    })
    alert(`User created: ${newUser.value.username} (${newUser.value.email})`)
    newUser.value = { username: '', email: '' }
    showCreateUserModal.value = false
  }

  const changeUserRole = () => {
    // Simulating API call to change user role
    console.log('Changing user role:', userRoleChange.value)
    const user = users.value.find((u) => u.id === userRoleChange.value.userId)
    if (user) {
      user.role = userRoleChange.value.newRole
      alert(
        `User role changed: User ID ${userRoleChange.value.userId} is now ${userRoleChange.value.newRole}`
      )
    }
    userRoleChange.value = { userId: '', newRole: 'x' }
    showChangeRoleModal.value = false
  }

  const createGame = () => {
    // Simulating API call to create a new game
    console.log('Creating game:', newGame.value)
    const newId = (games.value.length + 1).toString()
    games.value.push({
      id: newId,
      name: newGame.value.name,
      description: newGame.value.description,
    })
    alert(`Game created: ${newGame.value.name}\nDescription: ${newGame.value.description}`)
    newGame.value = { name: '', description: '' }
    showCreateGameModal.value = false
  }

  const deleteGame = (gameId) => {
    // Simulating API call to delete a game
    console.log('Deleting game:', gameId)
    games.value = games.value.filter((game) => game.id !== gameId)
    alert(`Game deleted: ID ${gameId}`)
  }

  const deleteUser = (userId) => {
    // Simulating API call to delete a user
    console.log('Deleting user:', userId)
    users.value = users.value.filter((user) => user.id !== userId)
    alert(`User deleted: ID ${userId}`)
  }
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
