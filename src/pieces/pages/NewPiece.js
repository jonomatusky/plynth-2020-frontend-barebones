import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import PieceForm from '../components/PieceForm'

const NewPiece = () => {
  const [imageFilepath, setImageFilepath] = useState(null)

  const history = useHistory()

  useEffect(() => {
    if (!sessionStorage.getItem('imageFilepath')) {
      console.log('no image in session storage')
      history.push('/')
    } else {
      let imageFilepath = sessionStorage.getItem('imageFilepath')
      setImageFilepath(imageFilepath)
      sessionStorage.removeItem('imageFilepath')
    }
  }, [history])

  const handleSubmit = async response => {
    history.push(`/admin/pieces/${response.piece.id}`)
  }

  return (
    <React.Fragment>
      <Background />
      <FormLayout>
        <PieceForm onSubmit={handleSubmit} imageFilepath={imageFilepath} />
      </FormLayout>
    </React.Fragment>
  )
}

export default NewPiece
