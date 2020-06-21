import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'

import ScanList from '../components/ScanList'

import { Container } from '@material-ui/core'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'Pickups'

const Scans = () => {
  const [loadedScans, setLoadedScans] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const responseData = await sendRequest(`${REACT_APP_BACKEND_URL}/scans`)
        setLoadedScans(responseData.scans)
      } catch (err) {}
    }
    fetchScans()
  }, [sendRequest])

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedScans && <ScanList items={loadedScans} />}
    </React.Fragment>
  )
}

export default Scans
