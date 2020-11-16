import { useCallback } from 'react'
import * as client from 'util/client'

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

export const useUploadClient = () => {
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

  const getSignedUrl = useCallback(async file => {
    try {
      let { signedUrl, imageFilepath, imageUrl } = await client.request({
        url: '/auth/sign-s3',
        method: 'POST',
        data: {
          fileName: file.name,
          fileType: file.type,
        },
      })

      return { signedUrl, imageFilepath, imageUrl }
    } catch (err) {
      const error = new Error('Unable to connect to server. Please try again.')
      throw error
    }
  }, [])

  const uploadFile = useCallback(async ({ signedUrl, file }) => {
    try {
      let response = await client.request({
        url: signedUrl,
        method: 'PUT',
        data: file,
      })
      return response
    } catch (err) {
      const error = new Error('Unable to upload file. Please try again.')
      throw error
    }
  }, [])

  const resizeAndSign = useCallback(
    async inputs => {
      try {
        const file = await resizeImage(inputs)
        const response = await getSignedUrl(file)
        return response
      } catch (err) {
        throw err
      }
    },
    [getSignedUrl, resizeImage]
  )

  const resizeAndUpload = useCallback(
    async inputs => {
      try {
        const file = await resizeImage(inputs)
        const { signedUrl, imageFilepath, imageUrl } = await getSignedUrl(file)
        const response = await uploadFile(signedUrl, file)
        return { file, signedUrl, imageFilepath, imageUrl, response }
      } catch (err) {
        throw err
      }
    },
    [getSignedUrl, uploadFile, resizeImage]
  )

  return {
    resizeImage,
    getSignedUrl,
    uploadFile,
    resizeAndSign,
    resizeAndUpload,
  }
}
