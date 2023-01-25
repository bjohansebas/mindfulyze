import 'chart.js/auto'
import { Box, Button, Menu, MenuItem, Skeleton, Typography } from '@mui/material'
import { FilterList } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Doughnut } from 'react-chartjs-2'

import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

function Statistics () {
  const { userId, credential } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)

  const [filter, setFilter] = useState('all')
  const [dataEmotions, setDataEmotions] = useState([])
  const [loading, setLoading] = useState(true)
  const [labels, setLabels] = useState([])
  const [colors, setColors] = useState([])

  const data = {
    labels,
    datasets: [
      {
        label: 'Emociones',
        data: dataEmotions,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: '#00575C'
      }
    ]
  }

  const handleStatisticsMenu = (event) => {
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const filterAll = async () => {
    const label = []
    const dataResult = []
    const color = []

    try {
      setLoading(true)
      const response = await axios.get(`/statistics/${userId}/all`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      const dataResponse = response?.data.data
      const positive = dataResponse.positive
      const negative = dataResponse.negative

      for await (const value of positive) {
        label.push(value[0])
        dataResult.push(value[1])
        color.push(`#${value[2]}`)
      }

      for await (const value of negative) {
        label.push(value[0])
        dataResult.push(value[1])
        color.push(`#${value[2]}`)
      }

      setLabels(label)
      setDataEmotions(dataResult)
      setColors(color)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const filterNegative = async () => {
    const label = []
    const dataResult = []
    const color = []

    try {
      setLoading(true)
      const response = await axios.get(`/statistics/${userId}/negative`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      const dataResponse = response?.data.data
      for await (const value of dataResponse) {
        label.push(value[0])
        dataResult.push(value[1])
        color.push(`#${value[2]}`)
      }

      setLabels(label)
      setDataEmotions(dataResult)
      setColors(color)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const filterPositive = async () => {
    const label = []
    const dataResult = []
    const color = []

    try {
      setLoading(true)
      const response = await axios.get(`/statistics/${userId}/positive`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      const dataResponse = response?.data.data
      for await (const value of dataResponse) {
        label.push(value[0])
        dataResult.push(value[1])
        color.push(`#${value[2]}`)
      }

      setLabels(label)
      setDataEmotions(dataResult)
      setColors(color)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (filter === 'positive') {
      filterPositive()
    } else if (filter === 'negative') {
      filterNegative()
    } else {
      filterAll()
    }
  }, [filter])

  return (
    <>
      <Box sx={{
        my: '30px',
        background: '#ffffff',
        py: '20px',
        px: { xs: '0', sm: '20px' },
        borderRadius: '10px'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: '10px' }}>
          <Typography variant="h6">
            <FormattedMessage id="dashboard.statistics" defaultMessage="Statistics" />
          </Typography>
          <Button variant="text" startIcon={<FilterList />} onClick={handleStatisticsMenu} disabled={loading}>
            <FormattedMessage id="options.filter.text" defaultMessage="Filter" />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ height: '100%' }}>
            {loading && <Skeleton variant='circular' height={300} width={300} />}
            {!loading && <Doughnut
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: 0,
                layout: {
                  padding: {
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0
                  }
                }
              }} width={300} height={300} />}
          </Box>
        </Box>
      </Box>

      <Menu
        sx={{ mt: '40px', zIndex: 1202 }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleStatisticsMenu}
      >
        <MenuItem key="1" onClick={() => {
          setFilter('all')
          setAnchorEl(null)
        }}>
          <FormattedMessage id="options.filter.statistics.all" defaultMessage="All your emotions" />
        </MenuItem>
        <MenuItem key="2" onClick={() => {
          setFilter('negative')
          setAnchorEl(null)
        }}>
          <FormattedMessage id="options.filter.statistics.negative" defaultMessage="Only negative emotions" />
        </MenuItem>
        <MenuItem key="3" onClick={() => {
          setFilter('positive')
          setAnchorEl(null)
        }}>
          <FormattedMessage id="options.filter.statistics.positive" defaultMessage="Only positive emotions" />
        </MenuItem>
      </Menu>
    </>
  )
}

export { Statistics }
