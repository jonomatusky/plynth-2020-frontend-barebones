import React, { useRef } from 'react'

const ImagePicker = ({ onSelect, children }) => {
  const filePickerRef = useRef()

  const filePickerHandler = event => {
    event.preventDefault()
    filePickerRef.current.click()
  }

  const pickHandler = async event => {
    const { files } = event.target
    if (files.length === 1) {
      const imageUrl = window.URL.createObjectURL(files[0])
      onSelect(imageUrl)
    }
    filePickerRef.current.value = ''
  }

  return (
    <>
      <input
        id="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      {React.Children.map(children, child => {
        return React.cloneElement(child, { onClick: filePickerHandler })
      })}
    </>
  )
}

export default ImagePicker
