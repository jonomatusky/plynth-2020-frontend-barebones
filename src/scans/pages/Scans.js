import React, { useEffect, useState } from 'react'
import { useApiClient } from '../../shared/hooks/api-hook'

import { Container, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/ui/PageTitle'
import ScanList from '../components/ScanList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

const title = 'Activity'

const Scans = () => {
  const [loadedScans, setLoadedScans] = useState()
  const { isLoading, sendRequest } = useApiClient()

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const responseData = await sendRequest(`/scans`)
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
