import React from 'react'
import { useHistory } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { useForm } from '../../shared/hooks/form-hook'

const NewPiece = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  console.log('loading piece page')

  if (!sessionStorage.getItem('imageFileName')) {
    console.log('no url in session storage')
    history.push('/')
  }

  const imageFileName = sessionStorage.getItem('imageFileName')

  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
  })

  const pieceSubmitHandler = async event => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('imageFileName', imageFileName)

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/pieces/',
        'POST',
        formData
      )
    } catch (err) {}
  }

  return <form className="piece-form" onSubmit={pieceSubmitHandler}></form>
}

export default NewPiece
