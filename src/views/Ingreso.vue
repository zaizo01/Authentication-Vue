<template>
  <div class="w-full h-full flex items-center justify-center">
    <form @submit.prevent="ingresarUser({email: email, password: passOne})" class="pt-24">
      <div class="border-2 bg-gray-100 w-96 p-8 rounded-md flex flex-col justify-center">
          <h1 class="text-xl border-b-4 border-gray-700 mx-auto">LOGIN</h1>
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
          <button
                 type="submit"
                 :disabled="block"
                 :class="[block ? 'bg-blue-900' : '']"
                 class="w-32 bg-blue-600 text-white font-semibold py-3 px-6 rounded-md">
          Login</button>
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
          passOne: 'zaiz1234',
      }
  },
  computed: {
      block(){
          if (!this.email.includes('@')) {
              return true
          }
          if (this.passOne.length > 5) {
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
          return
      }
    
  },
  methods: {
      ...mapActions(['ingresarUser']),
      procesarFormulario(){
          this.ingresarUser({email: this.email, password: this.passOne});
          this.email = '';
          this.passOne = '';
      },
  },
}
</script>

<style>

</style>