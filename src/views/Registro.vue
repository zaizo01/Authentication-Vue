<template>
  <div class="w-full h-full border-2 flex items-center justify-center">
    <form @submit.prevent="registrarUser({email: email, password: passOne})" class="pt-20">
      <div class="border-2 bg-gray-100 w-96 p-8 rounded-md flex flex-col justify-center">
          <label>Email</label>
          <input type="email" 
                 placeholder="Email"
                 :class="validationEmail" 
                 class="w-full my-3 border border-gray-400 p-2 rounded bg-gray-200 focus:outline-none"
                 v-model.trim="email">

          <label>Password</label>
          <input type="password"
                 placeholder="Password" 
                 :class="validationPass"
                 class="w-full my-3 border border-gray-400 p-2 rounded bg-gray-200 focus:outline-none"
                 v-model.trim="passOne">

          <label>Confirm Password</label>
          <input type="password" 
                 placeholder="Password" 
                 :class="validationPass"
                 class="w-full my-3 border border-gray-400 p-2 rounded bg-gray-200 focus:outline-none"
                 v-model.trim="passTwo">
                 
          <button
                 type="submit"
                 :disabled="block"
                 :class="[block ? 'bg-blue-900' : '']"
                 class="w-32 bg-blue-600 text-white font-semibold py-3 px-6 rounded-md">
          Registrar</button>
      </div>
  </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
      return {
          email: 'zaiz@gmail.com',
          passOne: '',
          passTwo: ''
      }
  },
  computed: {
      block(){
          if (!this.email.includes('@')) {
              return true
          }
          if (this.passOne.length > 5 && this.passOne === this.passTwo) {
              return false
          }
          return true
      },
      validationEmail(){
          return !this.email.includes('@') ? 'border-2 border-red-500' : '';
      },
      validationPass(){
          if (this.passOne.length < 5 ) {
              return 'border-2 border-red-500';
          }
          if (this.passTwo.length < 5) {
              return 'border-2 border-red-500';
          }
          return
          //return this.passOne.length < 5 ? 'border-2 border-red-500' : '';
      }
    
  },
  methods: {
      ...mapActions(['registrarUser']),
      procesarFormulario(){
          this.registrarUser({email: this.email, password: this.passOne});
          this.email = '';
          this.passOne = '';
          this.passTwo = '';
      },
  },
}
</script>

<style>

</style>