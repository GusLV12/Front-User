<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold text-center mb-4">Editar Usuario</h1>

    <form @submit.prevent="updateUser" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <div class="mb-4">
        <label class="block text-gray-700">Nombre</label>
        <input v-model="user.nombre" type="text" class="w-full p-2 border rounded" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Correo Electrónico</label>
        <input v-model="user.correoElectronico" type="email" class="w-full p-2 border rounded" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Teléfono</label>
        <input v-model="user.telefono" type="text" class="w-full p-2 border rounded" />
      </div>

      <button type="submit" class="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700">
        Guardar Cambios
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = ref({
      nombre: '',
      correoElectronico: '',
      telefono: '',
    });

    // Convertir ID a número
    const userId = parseInt(route.params.id, 10);
    
    console.log('ID recibido:', userId);
    console.log('Tipo de ID:', typeof userId);

    // Cargar datos del usuario con el ID convertido a número
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://localhost:7117/api/User/${userId}`);
        user.value = response.data;
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    // Actualizar usuario en el backend
    const updateUser = async () => {
      try {
        await axios.put(`https://localhost:7117/api/User/${userId}`, user.value); // ✅ Enviar user.value
        alert('Usuario actualizado correctamente');
        router.push('/'); // Redirigir a la lista de usuarios
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    };

    onMounted(fetchUser);

    return { user, updateUser };
  },
};
</script>
