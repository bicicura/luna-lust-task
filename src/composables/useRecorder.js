import { computed, ref } from 'vue'
import useRecorderStore from '@/stores/recorder/index.js'

const useRecorder = () => {
  const store = useRecorderStore()

  const audioContext = ref(null) // Initially, do not create the AudioContext
  const isLoading = ref(false)

  const isRecording1 = computed(() => store.getIsRecording1)
  const isRecording2 = computed(() => store.getIsRecording2)
  const audioUrl1 = computed(() => store.getAudioUrl1)
  const audioUrl2 = computed(() => store.getAudioUrl2)
  const combinedAudio = computed(() => store.getCombinedAudio)
  const handleCanCombineAudios = computed(() => !store.canCombineAudios)

  // Function to initialize AudioContext safely on user interaction
  const initAudioContext = () => {
    if (!audioContext.value) {
      audioContext.value = new AudioContext()
    }
    if (audioContext.value.state === 'suspended') {
      audioContext.value.resume() // Resume if it was suspended
    }
  }

  // Función para combinar los audios
  const combineAudios = async () => {
    isLoading.value = true
    initAudioContext()

    // Verificar si hay un contexto de audio
    if (audioContext.value) {
      // Combinar los audios y almacenar el resultado en el store
      store.combinedAudio = await store.combineAudios(audioContext.value, [
        store.audioUrl1,
        store.audioUrl2
      ])
    }
    // mock a payload just for demonstration
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  // Función para reproducir el audio combinado
  const playCombinedAudio = () => {
    if (combinedAudio.value) {
      // Iniciar el contexto de audio si no está inicializado
      initAudioContext()

      // Verificar si hay un contexto de audio
      if (audioContext.value) {
        // Crear un nodo de fuente de buffer y conectarlo al destino de audio
        const source = audioContext.value.createBufferSource()
        source.buffer = combinedAudio.value
        source.connect(audioContext.value.destination)
        source.start()
      }
    }
  }

  const handleStartRecording = (n) => {
    store.combinedAudio = null
    if (n === 1) {
      store.startRecording(1)
    } else {
      store.startRecording(2)
    }
  }

  const handleStopRecording = async (n) => {
    const audioUrl = await store.stopRecording(n)
    console.log('Recording stopped! URL:', audioUrl)
  }

  const playAudio = ({ recordingNumber }) => {
    const url = recordingNumber === 1 ? audioUrl1.value : audioUrl2.value
    if (url) {
      const audio = new Audio(url)
      audio.play()
    } else {
      console.error('There is no audioUrl available in store.')
    }
  }

  return {
    combinedAudio,
    handleCanCombineAudios,
    combineAudios,
    playCombinedAudio,
    handleStartRecording,
    handleStopRecording,
    isRecording1,
    isRecording2,
    isLoading,
    playAudio,
    audioUrl1,
    audioUrl2,
    store
  }
}

export default useRecorder
