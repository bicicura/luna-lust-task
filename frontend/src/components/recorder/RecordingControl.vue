<template>
  <div class="recording-control flex items-center gap-4 mt-8">
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
    <audio ref="audioPlayer" controls></audio>
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue'
import useRecorder from '@/composables/useRecorder.js'

export default defineComponent({
  name: 'RecordingControl',
  props: {
    recordingNumber: Number,
    isRecording: Boolean
  },
  setup(props) {
    const { handleStartRecording, handleStopRecording } = useRecorder()

    const audioPlayer = ref(null)

    const stopRecording = async () => {
      const audioUrl = await handleStopRecording(props.recordingNumber)
      nextTick(() => {
        if (audioPlayer.value && audioUrl) {
          audioPlayer.value.src = audioUrl
          audioPlayer.value.load() // Ensures the audio element loads the new source
        }
      })
    }

    return {
      handleStartRecording,
      stopRecording,
      audioPlayer // Ensure this is exposed to the template
    }
  }
})
</script>
