<template>
  <div class="bg-black py-8 text-white font-semibold flex justify-between items-center p-4">
      <router-link to="/" class="">Formularios</router-link>
      <router-link to="/ingreso" v-if="!userAuth" class="">Ingresar</router-link>
      <router-link to="/registro" v-if="!userAuth" class="">Registrar</router-link>
     <div class="flex items-center">
        <router-link to="/" class="bg-blue-500 hover:bg-blue-600 p-2 px-6 mx-4 rounded-sm" v-if="userAuth">Tareas</router-link>
        <button @click="cerrarSesion" class="bg-blue-500 hover:bg-blue-600 p-2 px-6 rounded-sm mr-4" v-if="userAuth">Cerrar sesion</button>
     </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userAuth'])
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  },
}
</script>

<style>

</style>