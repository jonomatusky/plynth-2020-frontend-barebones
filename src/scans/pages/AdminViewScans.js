import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import { useApiClient } from '../../shared/hooks/api-hook'
import PageTitle from '../../shared/components/ui/PageTitle'
import ScanList from '../components/ScanList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

const title = 'Scans'

const ViewUsers = () => {
  const [loadedScans, setLoadedScans] = useState()
  const { isLoading, sendRequest } = useApiClient()
  const [scanCountDaily, setScanCountDaily] = useState()
  const [scanCountMonthly, setScanCountMonthly] = useState()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      const fetchScans = async () => {
        try {
          const responseData = await sendRequest({ url: `/scans` })
          setLoadedScans(responseData.scans)
        } catch (err) {}
      }

      let endDate = new Date()
      let startDateDaily = new Date()
      let startDateMonthly = new Date()
      startDateDaily.setDate(endDate.getDate() - 1)
      startDateMonthly.setDate(endDate.getDate() - 30)

      const fetchScanCountDaily = async () => {
        try {
          const { scanCount } = await sendRequest(
            `/scans/count?startDate=${startDateDaily}`
          )
          setScanCountDaily(scanCount)
        } catch (err) {}
      }
      const fetchScanCountMonthly = async () => {
        try {
          const responseData = await sendRequest(
            `/scans/count?startDate=${startDateMonthly}`
          )
          setScanCountMonthly(responseData.scanCount)
        } catch (err) {}
      }
      fetchScans()
      fetchScanCountDaily()
      fetchScanCountMonthly()
    }
  }, [sendRequest, user])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedScans && (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={11}>
            <Grid container justify="space-evenly">
              <Grid item>
                <Typography variant="subtitle1">
                  Daily Pickups: {scanCountDaily}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Monthly Pickups: {scanCountMonthly}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
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
