<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold text-center mb-4">Añadir Nuevo Usuario</h1>

    <form @submit.prevent="addUser" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <div class="mb-4">
        <label class="block text-gray-700">Nombre</label>
        <input v-model="user.nombre" type="text" required class="w-full p-2 border rounded" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Correo Electrónico</label>
        <input v-model="user.correoElectronico" type="email" required class="w-full p-2 border rounded" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Teléfono</label>
        <input
          v-model="user.telefono"
          @input="validatePhone"
          type="text"
          required
          class="w-full p-2 border rounded"
          maxlength="15"
          placeholder="Ingrese solo números"
        />
      </div>

      <button type="submit" class="bg-green-500 text-white p-2 w-full rounded hover:bg-green-700">
        Guardar Usuario
      </button>

      <router-link to="/" class="block text-center text-blue-500 mt-4">Volver</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
  setup() {
    const router = useRouter();
    const user = ref({
      nombre: '',
      correoElectronico: '',
      telefono: '',
    });

    const validatePhone = () => {
      user.value.telefono = user.value.telefono.replace(/\D/g, '');
    };

    const addUser = async () => {
      try {
        await axios.post(`${apiUrl}`, user.value);
        alert('Usuario agregado correctamente');
        router.push('/');
      } catch (error) {
        console.error('Error al agregar usuario:', error);
      }
    };

    return { user, addUser, validatePhone };
  },
};
</script>
