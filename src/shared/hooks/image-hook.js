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

export const useImageResizer = () => {
  const [isRendering, setIsRendering] = useState(false)
  const [imageError, setImageError] = useState()

  const resizeImage = useCallback(async (file, maxDimension) => {
    setIsRendering(true)
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

      setIsRendering(false)
      return blob
    } catch (err) {
      setImageError(err.message)
      setIsRendering(false)
      throw err
    }
  }, [])

  const clearImageError = () => {
    setImageError(null)
  }

  return { isRendering, imageError, resizeImage, clearImageError }
}
