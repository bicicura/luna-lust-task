export function getIsRecording1(state) {
  return state.isRecording1
}

export function getIsRecording2(state) {
  return state.isRecording2
}

export function getAudioUrl1(state) {
  return state.audioUrl1
}

export function getAudioUrl2(state) {
  return state.audioUrl2
}

export function canCombineAudios(state) {
  return typeof state.audioUrl1 === 'string' && typeof state.audioUrl2 === 'string'
}

export function getCombinedAudio(state) {
  return state.combinedAudio
}
