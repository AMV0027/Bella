import React, { useRef, useState } from 'react'
import { BiMicrophone } from 'react-icons/bi'
import voiceGif from '../../../../assets/voice.gif'

function VoiceInput() {
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices) {
      alert('Audio recording not supported in this browser.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new window.MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }
      mediaRecorder.start()
      setRecording(true)
    } catch (err) {
      alert('Could not start audio recording: ' + err.message)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  return (
    <div className='z-20 w-full min-h-20 flex flex-row gap-2 items-center justify-center absolute bottom-5 left-0 px-2'>
      <button
        className={`w-22 h-22 rounded-full text-4xl bg-cover bg-center flex items-center justify-center hover:scale-110 transition-all duration-300 ${recording ? 'ring-3 ring-blue-500' : 'text-white'}`}
        style={{ backgroundImage: `url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDlnMHA4YWExZjNka2dvZnMxa2x3c2ZpaWo3MHM1MGczd2NpcThxayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kfLxX6jUuFTZMMQEvK/giphy.gif")` }}
        onMouseDown={handleStartRecording}
        onMouseUp={handleStopRecording}
        onMouseLeave={handleStopRecording}
        onTouchStart={handleStartRecording}
        onTouchEnd={handleStopRecording}
        aria-label={recording ? 'Recording...' : 'Hold to record'}
      >
        <BiMicrophone />
      </button>
    </div>
  )
}

export default VoiceInput
