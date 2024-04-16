<template>
  <div class="recording-control grid grid-cols-3 max-w-2xl items-center gap-4 mt-8">
    <button
      class="py-3 px-8 bg-purple-500 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-lg inline-block"
      @click="() => handleStartRecording(recordingNumber)"
      :disabled="isRecording"
    >
      Start Recording
    </button>
    <button
      class="py-3 px-8 bg-purple-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-lg inline-block"
      @click="stopRecording"
      :disabled="!isRecording"
    >
      Stop Recording
    </button>
    <button class="" @click="handlePlayAudio">
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
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useRecorder from '@/composables/useRecorder.js'

export default defineComponent({
  name: 'RecordingControl',
  props: {
    recordingNumber: Number,
    isRecording: Boolean
  },
  setup(props) {
    const { handleStartRecording, handleStopRecording, playAudio } = useRecorder()

    const handlePlayAudio = () => playAudio({ recordingNumber: props.recordingNumber })

    const stopRecording = async () => await handleStopRecording(props.recordingNumber)

    return {
      handleStartRecording,
      handlePlayAudio,
      stopRecording,
      playAudio
    }
  }
})
</script>
