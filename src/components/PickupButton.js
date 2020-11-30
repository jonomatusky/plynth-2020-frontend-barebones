import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Fab } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

import { useScanStore } from 'hooks/store/use-scan-store'

import ImagePicker from 'components/ImagePicker'

const NewScan = () => {
  const { setImageUrl, clearScan } = useScanStore()
  const history = useHistory()

  useEffect(() => {
    clearScan()
  }, [clearScan])

  const handleSelect = imageUrl => {
    setImageUrl(imageUrl)
    history.push({ pathname: '/pickup' })
  }

  return (
    <ImagePicker onSelect={handleSelect}>
      <Fab size="large" color="primary" aria-label="upload an image">
        <PhotoCameraIcon />
      </Fab>
    </ImagePicker>
  )
}

export default NewScan
