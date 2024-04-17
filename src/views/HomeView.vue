<template>
  <div class="bg-lust-400 p-8 rounded-[10px] border border-[#282828] mb-8 w-max mx-auto">
    <h1 class="font-bold text-2xl md:text-3xl pb-6">
      Say something nice to your <span class="text-purple-500">AI Girlfriend</span>.
    </h1>
    <p class="w-full">
      Press the record button to start talking. Then press stop to finish the recording.
    </p>

    <RecordingControl
      v-for="n in 2"
      :key="n"
      :recording-number="n"
      :is-recording="n === 1 ? isRecording1 : isRecording2"
      :is-other-recording="n === 1 ? isRecording2 : isRecording1"
      :audioUrl="n === 1 ? audioUrl1 : audioUrl2"
    />

    <div class="grid grid-cols-3 items-center mt-8 gap-4">
      <button
        :disabled="handleCanCombineAudios || combinedAudio !== null"
        class="py-3 col-span-2 border flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:border-transparent px-8 hover:bg-white hover:text-black font-bold transition-shadow hover:shadow-lg hover:shadow-purple-500/50 transition-colors ease-in-out duration-200 rounded-lg inline-block"
        @click="combineAudios"
      >
        <AppSpinner v-if="isLoading" />
        <span>Combine</span>
      </button>
      <PlayBtn @click="playCombinedAudio" :disabled="combinedAudio === null" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useRecorder from '@/composables/useRecorder.js'
import RecordingControl from '@/components/recorder/RecordingControl.vue' // Make sure the path is correct
import AppSpinner from '@/components/AppSpinner.vue'
import PlayBtn from '@/components/recorder/PlayBtn.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    RecordingControl,
    AppSpinner,
    PlayBtn
  },
  setup() {
    return {
      ...useRecorder()
    }
  }
})
</script>
