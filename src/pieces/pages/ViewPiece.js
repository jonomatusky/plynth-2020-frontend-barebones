import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './ViewPiece.css'

const { REACT_APP_BACKEND_URL, REACT_APP_ASSET_URL } = process.env

const ViewPiece = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPiece, setLoadedPiece] = useState()

  const pieceId = useParams().pieceId
  const history = useHistory()

  useEffect(() => {
    const fetchPiece = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`
        )
        setLoadedPiece(responseData.piece)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPiece()
  }, [sendRequest, pieceId])

  return (
    <React.Fragment>
      {(isLoading || !loadedPiece) && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPiece && (
        <div className="piece-view">
          <div className="piece-view__image">
            <img
              src={`${REACT_APP_ASSET_URL}/${loadedPiece.images[0].awsId}.${loadedPiece.images[0].ext}`}
              alt="Preview"
            />
          </div>
          <div className="piece-view__content">
            <h1>{loadedPiece.title}</h1>
            <p>{loadedPiece.description}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default ViewPiece
