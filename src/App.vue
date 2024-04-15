<template>
  <header class="bg-lust-100 text-white">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <main class="text-white bg-lust-500 min-h-screen p-12">
    <RouterView />
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
  components: {
    RouterLink,
    RouterView
  },
  setup() {
    return {}
  }
})
</script>
