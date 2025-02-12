<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold text-center mb-4">Lista de Usuarios</h1>

    <div class="mb-4 text-right">
      <router-link to="/add" class="bg-blue-500 text-white px-4 py-2 rounded">
        + Añadir Usuario
      </router-link>
    </div>

    <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">Nombre</th>
          <th class="p-2">Correo</th>
          <th class="p-2">Teléfono</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id" class="border-b text-center items-center justify-center">
          <td class="p-2">{{ usuario.id }}</td>
          <td class="p-2">{{ usuario.nombre }}</td>
          <td class="p-2">{{ usuario.correoElectronico }}</td>
          <td class="p-2">{{ usuario.telefono }}</td>
          <td class="p-2 flex space-x-2 items-center justify-center">
            <router-link :to="`/edit/${usuario.id}`" class="bg-green-500 text-white px-3 py-1 rounded">
              Editar
            </router-link>
            <button @click="deleteUser(usuario.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL;
// console.log("La URL de la API es:", apiUrl);

export default {
  setup() {
    const usuarios = ref([]);

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(apiUrl);
        usuarios.value = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    const deleteUser = async (id) => {
      if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

      try {
        await axios.delete(`${apiUrl}/${id}`);
        usuarios.value = usuarios.value.filter(user => user.id !== id);
        alert('Usuario eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    };

    onMounted(fetchUsuarios);

    return { usuarios, deleteUser };
  },
};
</script>
