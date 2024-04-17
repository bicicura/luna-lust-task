import { defineStore } from 'pinia'
import state from './state.js'
import actions from './actions'
import * as getters from './getters.js'

const useRecorderStore = defineStore('recorder', {
  state,
  getters,
  actions
})

export default useRecorderStore
