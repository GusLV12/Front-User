<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold text-center mb-4">Lista de Usuarios</h1>

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
        <tr v-for="usuario in usuarios" :key="usuario.id" class="border-b">
          <td class="p-2">{{ usuario.id }}</td>
          <td class="p-2">{{ usuario.nombre }}</td>
          <td class="p-2">{{ usuario.correoElectronico }}</td>
          <td class="p-2">{{ usuario.telefono }}</td>
          <td class="p-2">
            <router-link :to="`/edit/${usuario.id}`" class="bg-green-500 text-white px-3 py-1 rounded">
              Editar
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const usuarios = ref([]);

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://localhost:7117/api/user');
        usuarios.value = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    onMounted(fetchUsuarios);

    return { usuarios };
  },
};
</script>
