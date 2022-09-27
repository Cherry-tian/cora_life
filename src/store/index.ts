import { createStore } from 'vuex'
import state from './state'
import mutations from './mutation'

const store = createStore({
  state,
  mutations
})

export default store
