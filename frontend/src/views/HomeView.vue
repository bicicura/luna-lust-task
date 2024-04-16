<template>
  <div class="bg-lust-400 p-8 rounded-[10px] border border-[#282828] mb-8">
    <h1 class="font-bold text-2xl md:text-3xl pb-6">
      Say something nice to your <span class="text-purple-500">AI Girlfriend</span>
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

    <div>
      <button
        class="py-3 px-8 hover:bg-purple-500 font-bold transition-shadow hover:no-underline hover:shadow-lg hover:shadow-purple-500/50 transition-colors ease-in-out duration-200 underline rounded-lg mt-8 inline-block"
        @click="combineAndPlayAudios"
      >
        <span class="underline">Combine and Play</span>
      </button>
      <button
        class="py-3 px-8 hover:bg-purple-500 font-bold transition-shadow hover:no-underline hover:shadow-lg hover:shadow-purple-500/50 transition-colors ease-in-out duration-200 underline rounded-lg mt-8 inline-block"
        @click="sendAudioFiles"
      >
        <span class="underline">Send!</span>
      </button>
      <button
        class="py-3 px-8 hover:bg-purple-500 font-bold transition-shadow hover:no-underline hover:shadow-lg hover:shadow-purple-500/50 transition-colors ease-in-out duration-200 underline rounded-lg mt-8 inline-block"
        @click="playCombinedAudio"
      >
        <span class="underline">Play from back!</span>
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
