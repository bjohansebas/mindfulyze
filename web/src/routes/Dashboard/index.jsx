// import 'chart.js/auto'
import { Box, Button, Divider, List, IconButton, Menu, MenuItem, Typography, ListItem, ListItemButton, ListItemText } from '@mui/material'
import {
  // useEffect,
  useState
} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CircleIcon from '@mui/icons-material/Circle'
import FilterListIcon from '@mui/icons-material/FilterList'

import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
// import { Doughnut } from 'react-chartjs-2'
import { FormattedMessage } from 'react-intl'

// import axios from '../../api/axios'

function DashboardPage () {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElStatistics, setAnchorElStatistics] = useState(null)
  // const [allPlaces, setAllPlaces] = useState([])
  const [idSelect, setIdSelect] = useState('')
  // const [filter, setFilter] = useState('all')
  // const [emotions, setEmotions] = useState([0, 0])
  // const [labels, setLabels] = useState(['Positivo', 'Negativo'])
  // const [dataEmotions, setDataEmotions] = useState([0, 0])
  // const [colors, setColors] = useState(['red', 'blue'])

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Emociones',
  //       data: dataEmotions,
  //       backgroundColor: colors,
  //       borderWidth: 1,
  //       borderColor: '#00575C'
  //     }
  //   ]
  // }

  // useEffect(() => {
  //   if (filter === 'positive') {
  //     filterPositive()
  //   } else if (filter === 'negative') {
  //     filterNegative()
  //   } else {
  //     filterAll()
  //   }
  // }, [filter])

  // useEffect(() => {
  //   getPlace()
  // }, [])

  // useEffect(() => {
  //   async function getDataEmotions () {
  //     try {
  //       const response = await axios.get(`/statistics/${userId}/`, {
  //         headers: {
  //           Authorization: `Bearer ${credentials}`
  //         }
  //       })

  //       setEmotions([...response?.data.data])
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }

  //   getDataEmotions()
  // }, [])

  // const getPlace = async () => {
  //   try {
  //     const response = await axios.get(`/users/${userId}/places`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })
  //     const responseColors = await axios.get(`/places/${userId}/colors`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })
  //     setAllPlaces(response?.data.data.map(data => {
  //       const findColor = responseColors?.data.data.find(element => element.color_id === data.color_id)
  //       return { text: data.name_place, id: data.place_id, color: findColor.code_color }
  //     }))
  //   } catch (e) {
  //     console.log(e?.response)
  //   }
  //   try {
  //     const response = await axios.get(`/users/${userId}/places`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })
  //     const responseColors = await axios.get(`/places/${userId}/colors`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })

  //     setAllPlaces(response?.data.data.map(data => {
  //       const findColor = responseColors?.data.data.find(element => element.color_id === data.color_id)
  //       return { text: data.name_place, id: data.place_id, color: findColor.code_color }
  //     }))
  //   } catch (e) {
  //     console.log(e?.response)
  //   }
  // }

  const handlePlaceMenu = (event, id) => {
    if (anchorEl) {
      setIdSelect('')
      setAnchorEl(null)
    } else {
      setIdSelect(id)
      setAnchorEl(event.currentTarget)
    }
  }

  const handleStatisticsMenu = (event) => {
    if (anchorElStatistics) {
      setAnchorElStatistics(null)
    } else {
      setAnchorElStatistics(event.currentTarget)
    }
  }

  // const onDelete = async () => {
  //   try {
  //     setAnchorEl(null)
  //     await axios.delete(`/places/${idSelect}`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })
  //     await getPlace()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const filterAll = async () => {
  //   const label = []
  //   const dataResult = []
  //   const color = []

  //   try {
  //     const response = await axios.get(`/statistics/${userId}/all`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })

  //     const dataResponse = response?.data.data
  //     const positive = dataResponse.positive
  //     const negative = dataResponse.negative
  //     for await (const value of positive) {
  //       label.push(value[0])
  //       dataResult.push(value[1])
  //       color.push(`#${value[2]}`)
  //     }
  //     for await (const value of negative) {
  //       label.push(value[0])
  //       dataResult.push(value[1])
  //       color.push(`#${value[2]}`)
  //     }

  //     setLabels(label)
  //     setDataEmotions(dataResult)
  //     setColors(color)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const filterPositive = async () => {
  //   const label = []
  //   const dataResult = []
  //   const color = []

  //   try {
  //     const response = await axios.get(`/statistics/${userId}/positive`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })

  //     const dataResponse = response?.data.data
  //     for await (const value of dataResponse) {
  //       label.push(value[0])
  //       dataResult.push(value[1])
  //       color.push(`#${value[2]}`)
  //     }

  //     setLabels(label)
  //     setDataEmotions(dataResult)
  //     setColors(color)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const filterNegative = async () => {
  //   const label = []
  //   const dataResult = []
  //   const color = []

  //   try {
  //     const response = await axios.get(`/statistics/${userId}/negative`, {
  //       headers: {
  //         Authorization: `Bearer ${credentials}`
  //       }
  //     })

  //     const dataResponse = response?.data.data
  //     for await (const value of dataResponse) {
  //       label.push(value[0])
  //       dataResult.push(value[1])
  //       color.push(`#${value[2]}`)
  //     }

  //     setLabels(label)
  //     setDataEmotions(dataResult)
  //     setColors(color)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  return (
    <Box
      component="main"
      sx={{ width: '100%', px: { xs: '10px', sm: '50px', md: '100px' }, py: '20px' }}>
      <Helmet>
        <title>Dashboard | Alignmind</title>
      </Helmet>
      <Box component="header" sx={{
        my: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3
      }}>
        <Typography variant="h1" fontWeight="700" sx={{
          fontSize: '1.7em',
          textAlign: 'center'
        }}>
          <FormattedMessage id="dashboard.welcome" defaultMessage="Welcome" />
          {/* {userInfo?.firstName} {userInfo?.lastName} */}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{
            display: 'flex',
            background: 'rgba(0, 87, 92, 0.04)',
            alignItems: 'center',
            borderRadius: { xs: '30px', sm: '60px' },
            flexDirection: { xs: 'column', sm: 'row' },
            height: { xs: 'auto', md: '48px' },
            py: '8px',
            px: '16px',
            gap: {
              xs: 1, sm: 3
            }
          }}>
            <Typography>
              <FormattedMessage id="dashboard.emotion" defaultMessage="Your emotions" />
            </Typography>
            <Divider orientation='vertical' sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Divider orientation='horizontal' sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Button startIcon={<CircleIcon sx={{ color: '#01FF45' }} />}>
                {/* {emotions[0]} */}
                <FormattedMessage id="dashboard.positive" defaultMessage="Positive emotions" />
              </Button>
              <Button startIcon={<CircleIcon sx={{ color: '#FE1808' }} />}>
                {/* {emotions[1]} */}
                <FormattedMessage id="dashboard.negative" defaultMessage="Negative emotions" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h2" fontWeight="600" sx={{ fontSize: '1.4em' }}>
          <FormattedMessage id="dashboard.places" defaultMessage="Your places" />
        </Typography>

        <List sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2
        }}>
          {
            // allPlaces
            [{ text: 'hola', id: 'ww', color: '000000' }].map((data, index) => (
              <ListItem
                sx={{ borderRadius: '10px', boxShadow: `0 0 10px #${data?.color}80`, background: '#ffffff' }}
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={(e) => handlePlaceMenu(e, data.id)}>
                    <MoreVertIcon />
                  </IconButton>
                }
                disablePadding>
                <ListItemButton
                  sx={{ py: '20px', borderRadius: '10px' }}
                  role={undefined}
                  dense
                  onClick={() => { navigate(`/place/${data?.id}`) }}>
                  <ListItemText primary={`${data?.text}`} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>

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
          onClose={handlePlaceMenu}
        >
          <MenuItem
            key="1"
          //  onClick={onDelete}
          >
            <FormattedMessage id="options.delete.place" defaultMessage="Delete place" />
          </MenuItem>
          <MenuItem key="2" onClick={() => navigate(`/place/${idSelect}/edit`)}>
            <FormattedMessage id="options.edit.place" defaultMessage="Edit place" />
          </MenuItem>
        </Menu>
      </Box>

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
          <Button variant="text" startIcon={<FilterListIcon />} onClick={handleStatisticsMenu}>
            <FormattedMessage id="options.filter.text" defaultMessage="Filter" />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ height: '100%' }}>
            {/* <Doughnut
              // data={data}
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
              }} width={300} height={300} /> */}
          </Box>
        </Box>
      </Box>

      <Menu
        sx={{ mt: '40px', zIndex: 1202 }}
        id="menu-appbar"
        anchorEl={anchorElStatistics}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElStatistics)}
        onClose={handleStatisticsMenu}
      >
        <MenuItem key="1" onClick={() => {
          // setFilter('all')
          setAnchorElStatistics(null)
        }}>
          <FormattedMessage id="options.filter.statistics.all" defaultMessage="All your emotions" />
        </MenuItem>
        <MenuItem key="2" onClick={() => {
          // setFilter('negative')
          setAnchorElStatistics(null)
        }}>
          <FormattedMessage id="options.filter.statistics.negative" defaultMessage="Only negative emotions" />
        </MenuItem>
        <MenuItem key="3" onClick={() => {
          // setFilter('positive')
          setAnchorElStatistics(null)
        }}>
          <FormattedMessage id="options.filter.statistics.positive" defaultMessage="Only positive emotions" />
        </MenuItem>
      </Menu>
    </Box >)
}

export { DashboardPage }
