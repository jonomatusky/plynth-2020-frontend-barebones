import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Box } from '@material-ui/core'

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
    <React.Fragment>
      <Container maxWidth="sm">
        {isLoading && <LoadingSpinner asOverlay />}
        <PageTitle title={title} />
        {!isLoading && loadedScans && <ScanList items={loadedScans} />}
        <Box height="4rem"></Box>
      </Container>
    </React.Fragment>
  )
}

export default Scans
