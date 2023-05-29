import 'chart.js/auto'
import { Box, Button, Menu, MenuItem, Skeleton, Typography } from '@mui/material'
import { FilterList } from '@mui/icons-material'

import { type MouseEvent, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Doughnut } from 'react-chartjs-2'

import { useAuth } from 'hooks/useAuth'

import { getStatisticsAll, getStatisticsNegative, getStatisticsPositive } from 'services/statistics'
import { type ResponseRelationEmotion } from 'services/think'

import { EmptyStatistics } from './EmptyStatistics'

type StatisticsCount = Record<string, {
  name: string
  count: number
  color: string
}>

export function ShowStatistics (): JSX.Element {
  const { credential } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState('all')

  const [dataEmotions, setDataEmotions] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])

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

  const handleStatisticsMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    if (anchorEl != null) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const filterAll = async (): Promise<void> => {
    const label = []
    const dataResult = []
    const color = []

    try {
      setLoading(true)
      if (credential == null) return

      const dataResponse: ResponseRelationEmotion[] = await getStatisticsAll(credential)

      const positive = dataResponse.filter(({ emotion }) => emotion.type === 'Positive')
      const negative = dataResponse.filter(({ emotion }) => emotion.type === 'Negative')
      const repeatNegative: StatisticsCount = {}
      const repeatPositive: StatisticsCount = {}

      for await (const value of positive) {
        const nameEmotion: string = value.emotion.name

        repeatPositive[nameEmotion] = {
          name: nameEmotion,
          count: (repeatPositive[nameEmotion]?.count ?? 0) + 1,
          color: value.emotion.color.code
        }
      }

      for await (const value of negative) {
        const nameEmotion = value.emotion.name
        repeatNegative[nameEmotion] = {
          name: nameEmotion,
          count: (repeatNegative[nameEmotion]?.count ?? 0) + 1,
          color: value.emotion.color.code
        }
      }

      for await (const value of Object.entries(repeatNegative)) {
        label.push(value[1].name)
        color.push(`#${value[1].color}`)
        dataResult.push(value[1].count)
      }

      for await (const value of Object.entries(repeatPositive)) {
        label.push(value[1].name)
        color.push(`#${value[1].color}`)
        dataResult.push(value[1].count)
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

  const filterNegative = async (): Promise<void> => {
    const label = []
    const dataResult = []
    const color = []

    try {
      setLoading(true)
      if (credential == null) return

      const dataResponse = await getStatisticsNegative(credential)
      const negative: StatisticsCount = {}

      for await (const value of dataResponse) {
        const nameEmotion = value.emotion.name
        negative[nameEmotion] = {
          name: nameEmotion,
          count: (negative[nameEmotion]?.count ?? 0) + 1,
          color: value.emotion.color.code
        }
      }
      for await (const value of Object.entries(negative)) {
        label.push(value[1].name)
        color.push(`#${value[1].color}`)
        dataResult.push(value[1].count)
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

  const filterPositive = async (): Promise<void> => {
    const label = []
    const dataResult = []
    const color = []

    try {
      setLoading(true)
      if (credential == null) return

      const dataResponse = await getStatisticsPositive(credential)
      const positive: StatisticsCount = {}

      for await (const value of dataResponse) {
        const nameEmotion = value.emotion.name
        positive[nameEmotion] = {
          name: nameEmotion,
          count: (positive[nameEmotion]?.count ?? 0) + 1,
          color: value.emotion.color.code
        }
      }

      for await (const value of Object.entries(positive)) {
        label.push(value[1].name)
        color.push(`#${value[1].color}`)
        dataResult.push(value[1].count)
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
      void filterPositive()
    } else if (filter === 'negative') {
      void filterNegative()
    } else {
      void filterAll()
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
            {(!loading && dataEmotions.length === 0) && <EmptyStatistics />}
            {(!loading && dataEmotions.length > 0) &&
              <Doughnut
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
