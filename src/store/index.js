import Vue from 'vue'
import Vuex from 'vuex'
import student from './modules/student'
import teacher from './modules/teacher'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    student,
    teacher
  },
  getters
})

export default store
