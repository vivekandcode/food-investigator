import { useState, useRef, useEffect } from 'react'

export function useCamera() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(null)

  const startCamera = async () => {
    setCameraError(null)
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 960 } }
      })
      setStream(s)
      setCameraActive(true)
      if (videoRef.current) {
        videoRef.current.srcObject = s
      }
    } catch {
      setCameraError('Camera access denied. Please allow camera permissions or use the Upload option.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop())
      setStream(null)
    }
    setCameraActive(false)
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return null
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    stopCamera()
    return canvas.toDataURL('image/jpeg', 0.85).split(',')[1]
  }

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return { videoRef, canvasRef, cameraActive, cameraError, startCamera, stopCamera, capturePhoto }
}
