import { useState, useCallback } from 'react'
import { useRequest } from './use-request'

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

const imgToBlobAsync = (img, canvas, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const ctxMain = canvas.getContext('2d')
    if (croppedAreaPixels) {
      let { x, y, width, height } = croppedAreaPixels
      ctxMain.drawImage(
        img,
        x,
        y,
        width,
        height,
        0,
        0,
        canvas.width,
        canvas.height
      )
    } else {
      ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    ctxMain.canvas.toBlob(async blob => {
      resolve(blob)
    }, 'image/jpeg')
  })
}

export const useImageResize = () => {
  const resizeImage = useCallback(
    async (imgUrl, maxDimension = 600, croppedAreaPixels) => {
      try {
        const image = await loadImgAsync(imgUrl)

        const canvas = document.createElement('canvas')

        let width
        let height

        if (croppedAreaPixels) {
          width = croppedAreaPixels.width
          height = croppedAreaPixels.height
        } else {
          width = image.width
          height = image.height
        }

        let shortEdgeLength = Math.min(width, height)

        if (shortEdgeLength > maxDimension) {
          let scale = maxDimension / shortEdgeLength
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }

        canvas.width = width
        canvas.height = height

        const blob = await imgToBlobAsync(image, canvas, croppedAreaPixels)

        return blob
      } catch (err) {
        const error = new Error('Please upload an image file.')
        throw error
      }
    },
    []
  )
  return resizeImage
}

// get a signed request
export const useSignRequest = () => {
  const {
    isLoading: isSigning,
    error: signError,
    request,
    clearError: clearSignError,
  } = useRequest()

  const getSignRequest = useCallback(
    async file => {
      try {
        const response = await request({
          url: '/auth/sign-s3',
          method: 'POST',
          data: {
            fileName: file.name,
            fileType: file.type,
          },
        })
        return response
      } catch (err) {
        const error = new Error(
          'Unable to connect to server. Please try again.'
        )
        throw error
      }
    },
    [request]
  )

  return {
    isSigning,
    signError,
    getSignRequest,
    clearSignError,
  }
}

export const useImageUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const { getSignRequest, clearSignError } = useSignRequest()
  const resizeImage = useImageResize()

  const uploadImage = useCallback(
    async (imageUrl, croppedAreaPixels) => {
      setIsProcessing(true)
      try {
        let image = await resizeImage(imageUrl, 600, croppedAreaPixels)
        let response = await getSignRequest(image)

        setIsProcessing(false)

        return { ...response, image }
      } catch (error) {
        setIsProcessing(false)
        setUploadError(error.message)
        throw error
      }
    },
    [getSignRequest, resizeImage]
  )

  const clearUploadError = () => {
    setUploadError()
    clearSignError()
  }

  return { isProcessing, uploadError, uploadImage, clearUploadError }
}
