import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import PageTitle from 'components/PageTitle'
import ScanList from './components/ScanList'
import { CircularProgress } from '@material-ui/core'

const title = 'Scans'

const ViewUsers = () => {
  const [loadedScans, setLoadedScans] = useState()
  const { status, request } = useRequest()
  const [scanCountDaily, setScanCountDaily] = useState()
  const [scanCountMonthly, setScanCountMonthly] = useState()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      const fetchScans = async () => {
        try {
          const responseData = await request({ url: `/scans` })
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
          const { scanCount } = await request({
            url: `/scans/count?startDate=${startDateDaily}`,
          })
          setScanCountDaily(scanCount)
        } catch (err) {}
      }
      const fetchScanCountMonthly = async () => {
        try {
          const responseData = await request({
            url: `/scans/count?startDate=${startDateMonthly}`,
          })
          setScanCountMonthly(responseData.scanCount)
        } catch (err) {}
      }
      fetchScans()
      fetchScanCountDaily()
      fetchScanCountMonthly()
    }
  }, [request, user])

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return
      try {
        let skip = loadedScans.length
        let params = { skip }
        const responseData = await request({ url: `/scans`, params })
        let scans = loadedScans.concat(responseData.scans)
        setLoadedScans(scans)
      } catch (err) {}
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadedScans, request])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
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
        {loadedScans && (
          <Grid item>
            <ScanList items={loadedScans} />
          </Grid>
        )}
        {status === 'loading' && (
          <Grid item>
            <Box height="5rem">
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box height="4rem"></Box>
    </Container>
  )
}

export default ViewUsers
