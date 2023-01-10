import { Button, FormControl, Toolbar, Typography, Box, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'
import { GENDER_REGEX, NAMES_REGEX } from '../../utils/regex'
import { Helmet } from 'react-helmet-async'

function NewProfilePage () {
  const navigate = useNavigate()
  const { userId, credentials } = useAuth()

  const [names, setNames] = useState('')
  const [validNames, setValidNames] = useState(false)

  const [lastNames, setLastNames] = useState('')
  const [validLastNames, setValidLastNames] = useState(false)

  const [years, setYears] = useState(null)

  const [gender, setGender] = useState('')
  const [validGender, setValidGender] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setValidNames(NAMES_REGEX.test(names))
  }, [names])

  useEffect(() => {
    setValidLastNames(NAMES_REGEX.test(lastNames))
  }, [lastNames])

  useEffect(() => {
    setValidGender(GENDER_REGEX.test(gender))
  }, [gender])

  useEffect(() => {
    setErrMsg('')
  }, [names, lastNames, years, gender])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let request = { gender }

    const testNames = NAMES_REGEX.test(names)
    const testGender = GENDER_REGEX.test(gender)

    if (lastNames !== '') {
      if (NAMES_REGEX.test(lastNames)) {
        request = { last_name: lastNames, ...request }
      }
    }

    if (years) {
      if (years.isValid()) {
        request = { years_old: years.format('YYYY-MM-DD'), ...request }
      }
    }

    if (!testNames || !testGender) {
      setErrMsg('Invalid Entry')
      setLoading(false)
      return
    }

    request = {
      first_name: names,
      gender,
      preference_lang: 'es',
      ...request
    }

    try {
      await axios.post(`/users/${userId}/profile`,
        JSON.stringify({
          ...request
        }),
        {
          headers: { Authorization: `Bearer ${credentials}` }
        })
      navigate('/dashboard')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
        setLoading(false)
      } else {
        setErrMsg('Create had been failed')
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Create profile | AlignMind</title>
      </Helmet>
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          py: '20px',
          width: '100%',
          mx: { sm: '10px', md: 0 }
        }}
      >
        <Box sx={{
          background: '#ffffff',
          display: 'flex',
          justifyContent: ' center',
          flexDirection: 'column',
          width: { sm: '340px', md: '450px' },
          gap: 3,
          p: '30px',
          borderRadius: '10px'
        }}>
          <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>Información basica personal</Typography>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="text"
                id="outlined-required"
                error={!validNames && names !== ''}
                label="Nombre"
                placeholder="Nombre"
                onChange={(e) => setNames(e.target.value)}
                required
              />
              <TextField
                type="text"
                id="outlined"
                error={!validLastNames && lastNames !== ''}
                label="Apellido (opcional)"
                placeholder="Apellido (opcional)"
                onChange={(e) => setLastNames(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  label="Fecha de nacimiento (opcional)"
                  openTo="year"
                  inputFormat="YYYY/MM/DD"
                  views={['year', 'month', 'day']}
                  value={years}
                  onChange={(newValue) => { setYears(newValue) }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="otro" control={<Radio />} label="Otro" />
                </RadioGroup>
              </FormControl>
              <Button disabled={!!(!validNames || (!validLastNames && lastNames !== '') || !validGender) || loading} type='submit' variant='contained' size='large'>Crear cuenta</Button>
              <Typography paragraph>{errMsg}</Typography>
            </Box>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export { NewProfilePage }
