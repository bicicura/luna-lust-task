import { computed, ref, nextTick } from 'vue'
import useRecorderStore from '@/stores/recorder/index.js'

const useRecorder = () => {
  const store = useRecorderStore()

  // Correct handling of isRecording to create a reactive computed property
  const isRecording1 = computed(() => store.getIsRecording1)
  const isRecording2 = computed(() => store.getIsRecording2)

  const audioPlayers = ref([])

  const setAudioRef = (el) => {
    if (el) {
      audioPlayers.value.push(el)
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

  const sendAudioFiles = async () => {
    try {
      // Primero obtén los blobs de las URLs almacenadas
      const response1 = await fetch(store.audioUrl1)
      const blob1 = await response1.blob() // Blob del primer audio

      const response2 = await fetch(store.audioUrl2)
      const blob2 = await response2.blob() // Blob del segundo audio

      // Crea un objeto FormData
      const formData = new FormData()
      formData.append('audios', blob1, 'audio1.mp3') // Añade el primer archivo
      formData.append('audios', blob2, 'audio2.mp3') // Añade el segundo archivo

      // Hacer la solicitud POST con FormData
      const response = await fetch('http://localhost:3000/combine-audios', {
        method: 'POST',
        body: formData // FormData se enviará con el tipo de contenido adecuado automáticamente
      })

      if (response.ok) {
        const combinedAudioBlob = await response.blob() // Obtén el blob resultante
        console.log('Archivo combinado recibido')
        // Almacena el blob combinado en el store
        store.combinedAudioBlob = combinedAudioBlob
      } else {
        throw new Error('La respuesta de la red no fue ok.')
      }
    } catch (error) {
      console.error('Hubo un problema con la operación fetch:', error)
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
    const url = recordingNumber === 1 ? store.audioUrl1 : store.audioUrl2
    if (url) {
      const audio = new Audio(url)
      audio.play()
    } else {
      console.error('There is no audioUrl available in store.')
    }
  }

  return {
    handleStartRecording,
    handleStopRecording,
    playCombinedAudio,
    sendAudioFiles,
    isRecording1,
    isRecording2,
    setAudioRef,
    playAudio,
    store
  }
}

export default useRecorder
