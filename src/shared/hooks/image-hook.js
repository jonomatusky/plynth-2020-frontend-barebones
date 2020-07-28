import { useState, useCallback } from 'react'

const loadImgAsync = imgSrc => {
  console.log('loading image')
  return new Promise((resolve, reject) => {
    console.log('loading image')
    let img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      console.log('error loading image')
      reject('error loading image')
    }
    img.src = imgSrc
    console.log('done loading')
  })
}

const readFileAsync = file => {
  console.log('reading file')
  return new Promise((resolve, reject) => {
    console.log('reading file')
    let reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
    console.log('done reading file')
  })
}

const imgToBlobAsync = (img, canvas) => {
  return new Promise((resolve, reject) => {
    console.log('creating blob image')
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
      console.log('resizing image')
      const imgSrc = await readFileAsync(file)
      console.log('data url: ' + imgSrc)
      const image = await loadImgAsync(imgSrc)
      console.log('height', image.height)

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
