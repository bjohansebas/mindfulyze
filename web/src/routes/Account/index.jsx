import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'
import dayjs from 'dayjs'

import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import { EMAIL_REGEX, USER_REGEX, NAMES_REGEX, GENDER_REGEX } from '../../utils/regex'

function AccountPage () {
  const { userId, credentials, logoutEvent } = useAuth()
  const [dataUser, setDataUser] = useState({})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [yearsOld, setYearsOld] = useState(null)
  const [gender, setGender] = useState('')

  const getData = async () => {
    try {
      const response = await axios.get(`users/${userId}`, {
        headers: { Authorization: `Bearer ${credentials}` }
      })

      const responseProfile = await axios.get(`users/${userId}/profile`, {
        headers: { Authorization: `Bearer ${credentials}` }
      })

      const dataResponse = response?.data.data
      const dataResponseProfile = responseProfile?.data.data
      const data = {
        username: dataResponse.username,
        email: dataResponse.email,
        firstName: dataResponseProfile.first_name,
        lastName: dataResponseProfile?.last_name || '',
        yearsOld: dayjs(dataResponseProfile?.years_old) || '',
        gender: dataResponseProfile.gender
      }

      setUsername(data.username)
      setEmail(data.email)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setGender(data.gender)
      setYearsOld(data.yearsOld)
      setDataUser(data)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteAccount = async () => {
    try {
      await axios.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${credentials}` }
      })
      logoutEvent()
    } catch (e) {
      console.log(e)
    }
  }

  const onSave = async () => {
    let requestAccount = {}
    if (dataUser.email !== email && EMAIL_REGEX.test(email)) {
      requestAccount = { email }
    }

    if (dataUser.username !== username && USER_REGEX.test(username)) {
      requestAccount = { username, ...requestAccount }
    }

    if (Object.entries(requestAccount).length >= 1) {
      try {
        await axios.put(`/users/${userId}/`,
          JSON.stringify(requestAccount), {
            headers: {
              Authorization: `Bearer ${credentials}`
            }
          })
      } catch (e) {
        console.log(e)
      }
    }

    let requestProfile = {}

    if (dataUser.firstName !== firstName && NAMES_REGEX.test(firstName)) {
      requestProfile = { first_name: firstName }
    }

    if (dataUser.lastName !== lastName && NAMES_REGEX.test(lastName)) {
      requestProfile = { last_name: lastName, ...requestProfile }
    }

    if (dataUser.yearsOld.format('YYYY-MM-DD') !== yearsOld.format('YYYY-MM-DD') && yearsOld?.isValid()) {
      requestProfile = { years_old: yearsOld.format('YYYY-MM-DD'), ...requestProfile }
    }

    if (dataUser.gender !== gender && GENDER_REGEX.test(gender)) {
      requestProfile = { gender, ...requestProfile }
    }

    if (Object.entries(requestProfile).length >= 1) {
      try {
        await axios.put(`/users/${userId}/profile`,
          JSON.stringify(requestProfile), {
            headers: {
              Authorization: `Bearer ${credentials}`
            }
          })
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: '20px',
      width: '100%',
      mx: { sm: '10px', md: 0 }
    }}>
      <Helmet>
        <title>Account | AlignMind</title>
      </Helmet>
      <Box sx={{
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '100%', sm: '70%' },
        gap: 3,
        py: '30px',
        px: { xs: '5px', sm: '30px' },
        borderRadius: '10px'
      }}>
        <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>
          <FormattedMessage id="account.edit.title" defaultMessage="Your data" />
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px,1fr))',
          gap: 2
        }}>
          <TextField
            type="text"
            id="outlined"
            error={false}
            label={<FormattedMessage id="profile.edit.name.first" defaultMessage="First name" />}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            type="text"
            id="outlined"
            error={false}
            label={<FormattedMessage id="profile.edit.name.last" defaultMessage="Last name" />}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
          <TextField
            type="text"
            id="outlined"
            error={false}
            label={<FormattedMessage id="profile.edit.username" defaultMessage="Username" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="text"
            id="outlined"
            error={false}
            label={<FormattedMessage id="profile.edit.email" defaultMessage="Email" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              <FormattedMessage id="profile.edit.gender" defaultMessage="Gender" />
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={<FormattedMessage id="profile.edit.gender.female" defaultMessage="Female" />} />

              <FormControlLabel
                value="male"
                control={<Radio />}
                label={<FormattedMessage id="profile.edit.gender.male" defaultMessage="Male" />} />

              <FormControlLabel
                value="other"
                control={<Radio />}
                label={<FormattedMessage id="profile.edit.gender.other" defaultMessage="Other" />} />
            </RadioGroup>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label={<FormattedMessage id="profile.edit.birth" defaultMessage="Birth date" />}
              openTo="year"
              inputFormat="YYYY/MM/DD"
              views={['year', 'month', 'day']}
              value={yearsOld}
              onChange={(newValue) => { setYearsOld(newValue) }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button variant="contained">
            <FormattedMessage id="button.password" defaultMessage="Change password" />
          </Button>
          <Button variant="contained" onClick={onSave}>
            <FormattedMessage id="button.save" defaultMessage="Save" />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
          <Typography>
            <FormattedMessage id="profile.delete" defaultMessage="Do you want to delete your account?" />
          </Typography>
          <Button variant="text" onClick={deleteAccount}>
            <FormattedMessage id="button.delete.account" defaultMessage="Delete account" />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}

export { AccountPage }
