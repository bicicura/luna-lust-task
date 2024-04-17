<template>
  <button class="disabled:opacity-50 disabled:cursor-not-allowed">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#FFF"
        class="w-10 h-10 hover:bg-white border rounded-full p-2 hover:fill-lust-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
        />
      </svg>
    </div>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlayBtn',
  setup: () => {}
})
</script>
