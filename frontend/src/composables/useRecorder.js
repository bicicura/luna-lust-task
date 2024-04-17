import { computed, ref } from 'vue'
import useRecorderStore from '@/stores/recorder/index.js'

const useRecorder = () => {
  const store = useRecorderStore()

  const isRecording1 = computed(() => store.getIsRecording1)
  const isRecording2 = computed(() => store.getIsRecording2)
  const audioUrl1 = computed(() => store.getAudioUrl1)
  const audioUrl2 = computed(() => store.getAudioUrl2)
  const combinedAudioBlob = computed(() => store.getCombinedAudioBlob)
  const handleCanCombineAudios = computed(() => !store.canCombineAudios)
  const isAnyRecordingActive = computed(() => store.getIsRecording1 || store.getIsRecording2)

  const isLoading = ref(false)

  const handleStartRecording = (n) => {
    store.combinedAudioBlob = null
    if (n === 1) {
      store.startRecording(1)
    } else {
      store.startRecording(2)
    }
  }

  const handleStopRecording = async (n) => await store.stopRecording(n)

  const sendAudioFiles = async () => {
    isLoading.value = true
    try {
      const combinedAudioBlob = await store.sendAudioFiles({
        audioUrl1: store.audioUrl1,
        audioUrl2: store.audioUrl2
      })
      // Almacena el blob combinado en el store
      store.combinedAudioBlob = combinedAudioBlob
      console.log('Archivo combinado recibido')
    } catch (error) {
      // Manejar el error como consideres necesario
      console.error('Error al enviar archivos de audio:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Función para reproducir el audio combinado desde el store
  const playCombinedAudio = () => {
    if (store.combinedAudioBlob) {
      const audioURL = URL.createObjectURL(store.combinedAudioBlob)
      const audio = new Audio(audioURL)
      audio.play()
    } else {
      console.error('No hay audio combinado en el store.')
    }
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
    handleCanCombineAudios,
    handleStartRecording,
    isAnyRecordingActive,
    handleStopRecording,
    playCombinedAudio,
    combinedAudioBlob,
    sendAudioFiles,
    isRecording1,
    isRecording2,
    isLoading,
    audioUrl1,
    audioUrl2,
    playAudio,
    store
  }
}

export default useRecorder
