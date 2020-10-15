import React, { useState, useEffect } from 'react'

import { useApiClient } from '../../shared/hooks/api-hook'
import { Container, Grid, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/ui/PageTitle'
import ScanList from '../components/ScanList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

const title = 'Scans'

const ViewUsers = () => {
  const [loadedScans, setLoadedScans] = useState()
  const { isLoading, sendRequest } = useApiClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`/scans`)
        setLoadedScans(responseData.scans)
      } catch (err) {}
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedScans && (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item>
            <ScanList items={loadedScans} />
          </Grid>
        </Grid>
      )}
      <Box height="4rem"></Box>
    </Container>
  )
}

export default ViewUsers
