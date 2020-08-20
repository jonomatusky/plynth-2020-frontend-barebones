import { useState, useCallback, useEffect } from 'react'
import { useHttpClient } from './http-hook'

const loadImgAsync = imgSrc => {
  return new Promise((resolve, reject) => {
    let img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject('error loading image')
    }
    img.src = imgSrc
  })
}

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const imgToBlobAsync = (img, canvas) => {
  return new Promise((resolve, reject) => {
    const ctxMain = canvas.getContext('2d')
    ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height)
    ctxMain.canvas.toBlob(async blob => {
      resolve(blob)
    }, 'image/jpeg')
  })
}

export const useImageResize = () => {
  const [isResizing, setIsResizing] = useState(false)
  const [resizeError, setResizeError] = useState()

  const resizeImage = useCallback(async (file, maxDimension) => {
    setIsResizing(true)
    try {
      const imgSrc = await readFileAsync(file)
      const image = await loadImgAsync(imgSrc)

      const canvas = document.createElement('canvas')

      let width = image.width
      let height = image.height
      let shortEdgeLength = Math.min(width, height)

      if (shortEdgeLength > maxDimension) {
        let scale = maxDimension / shortEdgeLength
        width = Math.round(width * scale)
        height = Math.round(height * scale)
      }

      canvas.width = width
      canvas.height = height

      const blob = await imgToBlobAsync(image, canvas)

      setIsResizing(false)
      return blob
    } catch (err) {
      const error = new Error('Please upload an image file.')
      setResizeError(error.message)
      setIsResizing(false)
      throw error
    }
  }, [])

  const clearImageError = () => {
    setResizeError(null)
  }

  return { isResizing, resizeError, resizeImage, clearImageError }
}

export const useSignedRequest = () => {
  const {
    isLoading: isSigning,
    error: signError,
    sendRequest,
    clearError: clearSignError,
  } = useHttpClient()

  const getSignedRequest = useCallback(
    async file => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/sign-s3',
          'POST',
          JSON.stringify({
            fileName: file.name,
            fileType: file.type,
          }),
          {
            'Content-Type': 'application/json',
          }
        )
        return response
      } catch (err) {
        const error = new Error(
          'Unable to connect to server. Please try again.'
        )
        throw error
      }
    },
    [sendRequest]
  )

  return {
    isSigning,
    signError,
    getSignedRequest,
    clearSignError,
  }
}

export const useImageUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const {
    isSigning,
    signError,
    getSignedRequest,
    clearSignError,
  } = useSignedRequest()
  const {
    isResizing,
    resizeError,
    resizeImage,
    clearImageError,
  } = useImageResize()

  const uploadImage = useCallback(
    async file => {
      setIsProcessing(true)
      try {
        let image = await resizeImage(file, 600)
        console.log(image)
        let { signedUrl, imageData } = await getSignedRequest(image)

        console.log(imageData)
        console.log(signedUrl)

        setIsProcessing(false)

        return { signedUrl, imageData, image }
      } catch (error) {
        setIsProcessing(false)
        setUploadError(error.message)
        throw error
      }
    },
    [getSignedRequest, resizeImage]
  )

  const clearUploadError = () => {
    setUploadError()
    clearSignError()
    clearImageError()
  }

  return { isProcessing, uploadError, uploadImage, clearUploadError }
}
