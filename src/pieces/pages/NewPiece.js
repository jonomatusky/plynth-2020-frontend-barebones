import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useHttpClient } from '../../shared/hooks/http-hook'

import Button from '../../shared/components/FormElements/Button'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './NewPiece.css'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const NewPiece = () => {
  const [imageData, setImageData] = useState({
    id: null,
    ext: null,
  })
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  if (
    !sessionStorage.getItem('imageId') ||
    !sessionStorage.getItem('imageExt')
  ) {
    console.log('no image in session storage')
    history.push('/')
  }

  const { register, handleSubmit, watch, errors } = useForm()

  useEffect(() => {
    setImageData({
      id: sessionStorage.getItem('imageId'),
      ext: sessionStorage.getItem('imageExt'),
    })
  }, [])

  const onSubmit = async formData => {
    try {
      const pieceData = { ...imageData, ...formData }
      const res = await sendRequest(
        BACKEND_URL + '/pieces/',
        'POST',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
      history.push(`/pieces/${res.pieceId}`)
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <div className="piece-edit">
        <div className="piece-edit__image">
          <img
            src={`${ASSET_URL}/${imageData.id}.${imageData.ext}`}
            alt="Preview"
          />
        </div>
        <form className="piece-edit__form" onSubmit={handleSubmit(onSubmit)}>
          {isLoading && <LoadingSpinner asOverlay />}
          <label>Title</label>
          <input
            name="title"
            label="Title"
            ref={register({ required: true })}
          />
          <label>Description</label>
          <input name="description" label="Title" ref={register} />
          <Button type="submit">SAVE</Button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default NewPiece
