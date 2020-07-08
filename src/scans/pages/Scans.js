import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import ScanButton from '../../shared/components/UIElements/ScanButton'
import ScanList from '../components/ScanList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'Activity'

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
    <Container maxWidth="sm">
      <ScanButton />
      <PageTitle title={title} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedScans && <ScanList items={loadedScans} />}
    </Container>
  )
}

export default Scans
