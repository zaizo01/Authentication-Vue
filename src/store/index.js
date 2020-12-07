import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categoria: [],
      estado: '',
      numero: 0,
      activo: true
    },
    user: null
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    },
    cargar(state, payload){
      state.tareas = payload;
    },
    set(state, payload){
      state.tareas.push(payload);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },
    delete(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },
    tarea(state, payload){
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/');
        return;
      }
      state.tarea = state.tareas.find(item => item.id === payload);
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      router.push('/');
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    }
  },
  actions: {
   cerrarSesion({commit}){
     commit('setUser', null);
     router.push('/ingreso');
     localStorage.removeItem('user')
   },
    async ingresarUser({commit}, user){
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDr9Htr_3_c3Rp0uH4J52qaAI62U0CLMy4',{
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        })
        const userDB = await response.json();
        console.log('userDB', userDB);
        if (userDB.error) {
          console.log(userDB.error);
        }
        commit('setUser', userDB);
        router.push('/');
        localStorage.setItem('user', JSON.stringify(userDB));
      } catch (error) {
        console.log(error);
      }
    },
    async registrarUser({commit}, user){
     try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDr9Htr_3_c3Rp0uH4J52qaAI62U0CLMy4',{
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true
        })
      })
      const userDB = await response.json();
      if (userDB.error) {
        return console.log(userDB.error);
      }
      commit('setUser', userDB);
      router.push('/ingreso');
      localStorage.setItem('user', JSON.stringify(userDB))
     } catch (error) {
       console.log(error);
     }
    },

    // GET tareas
    async cargarLocalStorage({commit, state}){
      if (localStorage.getItem('user')) {
        commit('setUser', JSON.parse(localStorage.getItem('user')));
      } else{
        return commit('setUser', null)
      }
      try {
        const response = await fetch(`https://udemy-api-70594.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`);
        const dataDB = await response.json();
        const arrayTareas = [];
        for(let id in dataDB){
            arrayTareas.push(dataDB[id]);
        }
        commit('cargar', arrayTareas);
      } catch (error) {
        console.log(error);
      }
    },

    // POST tareas
    async setTareas({commit, state}, tarea){
      try {
        const response = await fetch(`https://udemy-api-70594.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })

        const dataDB = await response.json();
        commit('set', dataDB);

      } catch (error) {
        console.log(error);
      }
    },

    // DELETE tareas
    async deleteTareas({commit, state}, id){
      try {
        await fetch(`https://udemy-api-70594.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,{
          method: 'DELETE'
        })
        commit('delete', id);
      } catch (error) {
        console.log(error);
      }
    },
    setTarea({commit}, id){
      commit('tarea', id);
    },
    async updateTarea({commit, state}, tarea){
      const response = await fetch(`https://udemy-api-70594.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
      })
      const dataDB = await response.json();
      commit('update', dataDB);
    },

  },
  getters: {
    userAuth(state){
      return !!state.user
    }
  },
  modules: {
  }
})
