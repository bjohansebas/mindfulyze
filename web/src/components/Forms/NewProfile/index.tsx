import { Button, Typography, Box } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { type Dayjs } from 'dayjs'

import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { useAuth } from 'hooks/useAuth'
import { GENDER_REGEX, NAMES_REGEX } from 'utils/regex'
import { postNewProfile } from 'services/signUp'
import { HeaderFormNewProfile } from './HeaderForm'
import { dataProfile } from 'services/signUp'
import PaletteFormProvider from '../Theme'
import { NameField } from '@/components/Fields/Name'
import { DateField } from '@/components/Fields/Date'
import { RadioField, RadioOption } from '@/components/Fields/Radio'

const genderOptions: RadioOption[] = [
  {
    label: <FormattedMessage id="profile.new.gender.female" defaultMessage="Female" />,
    value: "female"
  }, {
    label: <FormattedMessage id="profile.new.gender.male" defaultMessage="Male" />,
    value: "male"
  }, {
    label: <FormattedMessage id="profile.new.gender.other" defaultMessage="Other" />,
    value: "other"
  }
]

export function NewProfileForm() {
  const navigate = useNavigate()
  const { credential, setHasProfile } = useAuth()

  const [firstName, setFirstName] = useState<string>('')
  const [validFirstName, setValidFirstName] = useState<boolean>(false)

  const [lastName, setLastName] = useState<string>('')
  const [validLastName, setValidLastName] = useState<boolean>(false)

  const [years, setYears] = useState<Dayjs | null>(null)

  const [gender, setGender] = useState<string>('')
  const [validGender, setValidGender] = useState<boolean>(false)

  const [errMsg, setErrMsg] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setErrMsg('')
  }, [firstName, lastName, years, gender])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    const testNames = NAMES_REGEX.test(firstName)
    const testGender = GENDER_REGEX.test(gender)

    if (!testNames || !testGender) {
      setErrMsg('Invalid Entry')
      setLoading(false)
      return
    }

    let request: dataProfile = {
      gender,
      firstName,
      preferenceLang: navigator.language.split(/[-_]/)[0],
    }

    if (lastName !== '') {
      if (NAMES_REGEX.test(lastName)) {
        request = { lastName: lastName, ...request }
      }
    }

    if (years && years.isValid()) {
      request = { birth: years.format('YYYY-MM-DD'), ...request }
    }

    try {
      if (credential) {
        await postNewProfile(request, credential)
      }

      setHasProfile(true)
      navigate('/')
    } catch (err) {
      setErrMsg('No Server Response')
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '140vh',
        height: '100%',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        background: `linear-gradient(45deg, #00575C 0%, #002d32 100%)`,
        backgroundPosition: '0 0',
        backgroundSize: '100% 100%',
        py: { sm: '40px', xs: '0' }
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: ' center',
        flexDirection: 'column',
        width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' },
        gap: 4,
        p: { sm: '40px 32px', xs: '40px 16px' },
        borderRadius: '12px',
      }}>
        <HeaderFormNewProfile />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <PaletteFormProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Box sx={{ display: 'flex', gap: '16px', alignItems: 'end' }}>
                <NameField
                  text={firstName}
                  setText={setFirstName}
                  setValid={setValidFirstName}
                  errorRequest=''
                  requiredValid={true}
                  errorText='Please enter a real name.'
                  label={<FormattedMessage id="profile.new.name.first" defaultMessage="First name *" />}
                />
                <NameField
                  text={lastName}
                  setText={setLastName}
                  setValid={setValidLastName}
                  errorRequest=''
                  requiredValid={true}
                  errorText='Please enter a real name.'
                  label={<FormattedMessage id="profile.new.name.last" defaultMessage="Last name (Optional)" />}
                />
              </Box>
              <DateField
                date={years}
                setDate={setYears}
                errorRequest=''
                errorDate='Please enter a valid date of birth.'
                requiredValid={true}
                label={<FormattedMessage id="profile.new.birth" defaultMessage="Birth date (Optional)" />} />
              <RadioField
                label={<FormattedMessage id="profile.new.gender" defaultMessage="Gender" />}
                option={gender}
                setOption={setGender}
                options={genderOptions}
                setValid={setValidGender}
              />
              <Button
                disabled={!!(!validFirstName || (!validLastName && lastName !== '') || !validGender || (years !== null && !years.isValid())) || loading}
                type='submit'
                variant='contained'
                size='large'
                endIcon={<ArrowForwardRoundedIcon />}
              >
                <FormattedMessage id="profile.new.submit" defaultMessage="Continue" />
              </Button>
              <Typography paragraph>{errMsg}</Typography>
            </Box>
          </PaletteFormProvider>
        </Box>
      </Box>
    </Box >
  )
}