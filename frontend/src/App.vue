<template>
  <main class="text-white bg-lust-500 min-h-screen p-12">
    <HomeView />
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import HomeView from './views/HomeView.vue'

export default defineComponent({
  components: {
    HomeView
  },
  setup() {
    return {}
  }
})
</script>
