<template>
  <div class="recording-control grid grid-cols-3 max-w-2xl items-center gap-4 mt-8">
    <button
      class="py-3 px-8 bg-purple-500 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-lg inline-block"
      @click="() => handleStartRecording(recordingNumber)"
      :disabled="isRecording || isOtherRecording"
    >
      Start Recording
    </button>
    <button
      class="py-3 px-8 bg-purple-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-lg inline-block"
      @click="stopRecording"
      :disabled="!isRecording || isOtherRecording"
    >
      Stop Recording
    </button>

    <PlayBtn @click="handlePlayAudio" :disabled="audioUrl === null" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useRecorder from '@/composables/useRecorder.js'
import PlayBtn from '@/components/recorder/PlayBtn.vue'

export default defineComponent({
  name: 'RecordingControl',
  components: {
    PlayBtn
  },
  props: {
    isOtherRecording: Boolean,
    recordingNumber: Number,
    isRecording: Boolean,
    audioUrl: [String, null]
  },
  setup(props) {
    const { handleStartRecording, handleStopRecording, playAudio, store } = useRecorder()

    const handlePlayAudio = () => playAudio({ recordingNumber: props.recordingNumber })

    const stopRecording = async () => await handleStopRecording(props.recordingNumber)

    return {
      handleStartRecording,
      handlePlayAudio,
      stopRecording,
      playAudio,
      store
    }
  }
})
</script>
