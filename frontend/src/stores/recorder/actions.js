export default {
  async startRecording(recorderNumber) {
    let keyPrefix = recorderNumber === 1 ? '1' : '2'
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Recording is not supported in this browser.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this['mediaRecorder' + keyPrefix] = new MediaRecorder(stream)
      this['mediaRecorder' + keyPrefix].start()
      this['isRecording' + keyPrefix] = true

      this['mediaRecorder' + keyPrefix].ondataavailable = (event) => {
        this['audioChunks' + keyPrefix].push(event.data)
      }

      this['mediaRecorder' + keyPrefix].onstop = () => {
        const audioBlob = new Blob(this['audioChunks' + keyPrefix], { type: 'audio/wav' })
        this['audioUrl' + keyPrefix] = URL.createObjectURL(audioBlob)
        this['audioChunks' + keyPrefix] = []
        stream.getTracks().forEach((track) => track.stop())
      }
    } catch (err) {
      console.error('Failed to start recording:', err)
    }
  },

  stopRecording(recorderNumber) {
    let keyPrefix = recorderNumber === 1 ? '1' : '2'
    if (this['mediaRecorder' + keyPrefix]) {
      // Ensure onstop handler is set before calling stop
      const promise = new Promise((resolve) => {
        this['mediaRecorder' + keyPrefix].onstop = () => {
          const audioBlob = new Blob(this['audioChunks' + keyPrefix], { type: 'audio/wav' })
          this['audioUrl' + keyPrefix] = URL.createObjectURL(audioBlob)
          this['audioChunks' + keyPrefix] = []
          resolve(this['audioUrl' + keyPrefix])
        }
      })

      this['mediaRecorder' + keyPrefix].stop()
      this['isRecording' + keyPrefix] = false

      return promise
    } else {
      console.log('No MediaRecorder instance found.')
      return Promise.resolve(null)
    }
  },

  async sendAudioFiles({ audioUrl1, audioUrl2 }) {
    try {
      const response1 = await fetch(audioUrl1)
      const blob1 = await response1.blob()

      const response2 = await fetch(audioUrl2)
      const blob2 = await response2.blob()

      const formData = new FormData()
      formData.append('audios', blob1, 'audio1.mp3')
      formData.append('audios', blob2, 'audio2.mp3')

      const response = await fetch('http://localhost:3000/combine-audios', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        window.alert('There was an error, please try again!')
        throw new Error('La respuesta de la red no fue ok.')
      }

      return await response.blob()
    } catch (error) {
      window.alert('There was an error, please try again!')
      throw error // Rethrow the error to capture it in the composable
    }
  }
}
