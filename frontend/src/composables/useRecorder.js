import { computed, ref, nextTick } from 'vue'
import useRecorderStore from '@/stores/recorder/index.js'

const useRecorder = () => {
  const store = useRecorderStore()

  const audioContext = ref(null) // Initially, do not create the AudioContext

  // Function to initialize AudioContext safely on user interaction
  const initAudioContext = () => {
    if (!audioContext.value) {
      audioContext.value = new AudioContext()
    }
    if (audioContext.value.state === 'suspended') {
      audioContext.value.resume() // Resume if it was suspended
    }
  }

  // Correct handling of isRecording to create a reactive computed property
  const isRecording1 = computed(() => store.getIsRecording1)
  const isRecording2 = computed(() => store.getIsRecording2)

  const audioPlayers = ref([])

  const setAudioRef = (el) => {
    if (el) {
      audioPlayers.value.push(el)
    }
  }

  const combineAndPlayAudios = async () => {
    initAudioContext()

    // Proceed with combining audios
    if (audioContext.value) {
      store.combinedAudio = await store.combineAudios(audioContext.value, [
        store.audioUrl1,
        store.audioUrl2
      ])
      const source = audioContext.value.createBufferSource()
      source.buffer = store.combinedAudio
      source.connect(audioContext.value.destination)
      source.start()
    }
  }

  const handleStartRecording = (n) => {
    if (n === 1) {
      store.startRecording(1)
    } else {
      store.startRecording(2)
    }
  }

  const handleStopRecording = async (n) => {
    const audioUrl = await store.stopRecording(n)
    console.log('Recording stopped! URL:', audioUrl)

    // Assuming n is 1 or 2, adjust for zero-based index
    const audioIndex = n - 1
    nextTick(() => {
      if (audioPlayers.value[audioIndex]) {
        audioPlayers.value[audioIndex].src = audioUrl
        audioPlayers.value[audioIndex].load()
      }
    })
  }

  return {
    combineAndPlayAudios,
    handleStartRecording,
    handleStopRecording,
    isRecording1,
    isRecording2,
    setAudioRef,
    store
  }
}

export default useRecorder