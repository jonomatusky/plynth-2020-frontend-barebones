import React, { useEffect } from 'react'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import { useSAScansStore } from 'hooks/store/use-sa-scans-store'
import PageTitle from 'components/PageTitle'
import ScanList from './components/ScanList'
import { CircularProgress } from '@material-ui/core'

const title = 'Scans'

const SAViewUsers = () => {
  const {
    scans,
    status,
    fetchScans,
    countDailyScans,
    countMonthlyScans,
    dailyScanCount,
    monthlyScanCount,
  } = useSAScansStore()

  useEffect(() => {
    const fetch = () => {
      fetchScans()
      countDailyScans()
      countMonthlyScans()
    }

    if (status === 'idle') {
      fetch()
    }
  }, [fetchScans, countDailyScans, countMonthlyScans, status])

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return
      try {
        let skip = scans.length
        if (status !== 'loading') {
          fetchScans({ skip })
        }
      } catch (err) {}
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchScans, scans.length, status])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      <Grid container direction="column" alignItems="stretch" spacing={2}>
        <Grid item xs={11}>
          <Grid container justify="space-evenly">
            <Grid item>
              <Typography variant="subtitle1">
                Daily Pickups: {dailyScanCount}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                Monthly Pickups: {monthlyScanCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {scans && (
          <Grid item>
            <ScanList items={scans} />
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

export default SAViewUsers
