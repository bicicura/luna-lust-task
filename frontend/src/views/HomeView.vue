<template>
  <div class="bg-lust-400 p-8 rounded-[10px] border border-[#282828] mb-8">
    <h1 class="font-bold text-2xl md:text-3xl pb-6">
      Say something nice to your <span class="text-purple-500">AI Girlfriend</span>!
    </h1>
    <p class="w-full md:max-w-[60%]">
      Press the record button to start talking. Then press stop to finish the recording.
    </p>

    <recording-control
      v-for="n in 2"
      :key="n"
      :recording-number="n"
      :is-recording="n === 1 ? isRecording1 : isRecording2"
    />

    <div class="grid grid-cols-3 max-w-2xl items-center mt-8 gap-4">
      <button
        class="py-3 col-span-2 border hover:border-transparent px-8 hover:bg-white hover:text-black font-bold transition-shadow hover:shadow-lg hover:shadow-purple-500/50 transition-colors ease-in-out duration-200 rounded-lg inline-block"
        @click="sendAudioFiles"
      >
        <span>Combine</span>
      </button>
      <button @click="playCombinedAudio">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FFF"
            class="w-10 h-10 cursor-pointer hover:bg-white border rounded-full p-2 hover:fill-lust-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useRecorder from '@/composables/useRecorder.js'
import RecordingControl from '@/components/recorder/RecordingControl.vue' // Make sure the path is correct

export default defineComponent({
  name: 'HomePage',
  components: {
    RecordingControl
  },
  setup() {
    return {
      ...useRecorder()
    }
  }
})
</script>
