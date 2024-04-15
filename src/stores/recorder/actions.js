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
      // Ensure onstop handler is set before calling stop.
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

  async combineAudios(audioContext, urls) {
    let buffers = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((resp) => resp.arrayBuffer())
          .then((buffer) => audioContext.decodeAudioData(buffer))
      )
    )

    let combinedBufferLength = buffers.reduce((acc, buffer) => acc + buffer.length, 0)
    let combinedBuffer = audioContext.createBuffer(
      buffers[0].numberOfChannels,
      combinedBufferLength,
      buffers[0].sampleRate
    )

    let offset = 0
    buffers.forEach((buffer) => {
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        combinedBuffer.getChannelData(i).set(buffer.getChannelData(i), offset)
      }
      offset += buffer.length
    })

    return combinedBuffer
  }
}
