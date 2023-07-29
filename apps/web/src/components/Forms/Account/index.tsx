import { Box, Button, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import dayjs, { type Dayjs } from 'dayjs'

import { DateField } from 'components/Fields/Date'
import { EmailField } from 'components/Fields/Email'
import { NameField } from 'components/Fields/Name'
import { RadioField, type RadioOption } from 'components/Fields/Radio'
import { Loading } from 'components/Loading'

import { useAuth } from 'hooks/useAuth'
import {
  deleteAccountUser,
  getAccount,
  putAccount,
  putProfile,
  type ResponseAccount,
  type UpdateAccount,
  type UpdateProfile,
} from 'services/user'

import { EMAIL_REGEX, GENDER_REGEX, NAMES_REGEX } from 'utils/regex'

const genderOptions: RadioOption[] = [
  {
    label: <FormattedMessage id='profile.new.gender.female' defaultMessage='Female' />,
    value: 'female',
  },
  {
    label: <FormattedMessage id='profile.new.gender.male' defaultMessage='Male' />,
    value: 'male',
  },
  {
    label: <FormattedMessage id='profile.new.gender.other' defaultMessage='Other' />,
    value: 'other',
  },
]

export function AccountForm(): JSX.Element {
  const { logoutAction } = useAuth()

  const [dataUser, setDataUser] = useState<ResponseAccount | null>()

  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [years, setYears] = useState<Dayjs | null>(null)
  const [gender, setGender] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(true)
  const [loadingSave, setLoadingSave] = useState<boolean>(false)

  const getData = async (): Promise<void> => {
    try {
      const dataResponse: ResponseAccount = await getAccount()

      const data = {
        email: dataResponse.email,
        firstName: dataResponse.profile?.firstName != null ? dataResponse.profile?.firstName : '',
        lastName: dataResponse.profile?.lastName != null ? dataResponse.profile.lastName : '',
        yearsOld: dataResponse.profile?.birth != null ? dayjs(dataResponse.profile?.birth) : null,
        gender: dataResponse.profile?.gender ?? '',
      }

      setEmail(data.email)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setGender(data.gender)
      setYears(data.yearsOld)
      setDataUser(dataResponse)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const deleteAccount = async (): Promise<void> => {
    try {
      await deleteAccountUser()
      logoutAction()
    } catch (e) {
      console.log(e)
    }
  }

  const onSave = async (): Promise<void> => {
    setLoadingSave(true)
    if (dataUser == null) return
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let requestAccount: UpdateAccount = {} as UpdateAccount
    if (dataUser?.email !== email && EMAIL_REGEX.test(email)) {
      requestAccount = { email }
    }

    if (Object.entries(requestAccount).length >= 1) {
      try {
        await putAccount(requestAccount)
      } catch (e) {
        console.log(e)
      }
    }

    let requestProfile: UpdateProfile = {}

    if (dataUser.profile?.firstName !== firstName && NAMES_REGEX.test(firstName)) {
      requestProfile = { firstName }
    }

    if (dataUser.profile?.lastName !== lastName && NAMES_REGEX.test(lastName)) {
      requestProfile = { lastName, ...requestProfile }
    }

    if (years?.isValid() === true) {
      requestProfile = { birth: years.format('YYYY-MM-DD'), ...requestProfile }
    } else if (years === null && dataUser.profile?.birth !== null) {
      requestProfile = { birth: null, ...requestProfile }
    }

    if (dataUser.profile?.gender !== gender && GENDER_REGEX.test(gender)) {
      requestProfile = { gender, ...requestProfile }
    }

    if (Object.entries(requestProfile).length >= 1) {
      try {
        await putProfile(requestProfile)
      } catch (e) {
        console.log(e)
      }
    }
    setLoadingSave(false)
  }

  useEffect(() => {
    void getData()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: '20px',
        width: '100%',
        height: '100vh',
        mx: { sm: '10px', md: 0 },
      }}
    >
      {loading && <Loading />}
      {!loading && (
        <Box
          sx={{
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '70%' },
            gap: 3,
            py: '30px',
            px: { xs: '5px', sm: '30px' },
            borderRadius: '10px',
          }}
        >
          <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>
            <FormattedMessage id='account.edit.title' defaultMessage='Your data' />
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px,1fr))',
              gap: 2,
            }}
          >
            <NameField
              text={firstName}
              setText={setFirstName}
              errorRequest=''
              errorText='Please enter a real name.'
              label={<FormattedMessage id='profile.edit.name.first' defaultMessage='First name' />}
            />
            <NameField
              text={lastName}
              setText={setLastName}
              errorRequest=''
              errorText='Please enter a real name.'
              label={<FormattedMessage id='profile.edit.name.last' defaultMessage='Last name' />}
            />
            <EmailField
              text={email}
              setText={setEmail}
              errorRequest=''
              errorText='Enter a valid email address'
              label={<FormattedMessage id='profile.edit.email' defaultMessage='Email' />}
            />
            <RadioField
              label={<FormattedMessage id='profile.new.gender' defaultMessage='Gender' />}
              option={gender}
              setOption={setGender}
              options={genderOptions}
            />
            <DateField
              date={years}
              setDate={setYears}
              errorRequest=''
              errorDate='Please enter a valid date of birth.'
              requiredValid={true}
              label={<FormattedMessage id='profile.new.birth' defaultMessage='Birth date (Optional)' />}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button variant='contained'>
              <FormattedMessage id='button.password' defaultMessage='Change password' />
            </Button>
            <Button variant='contained' onClick={onSave} disabled={loadingSave}>
              <FormattedMessage id='button.save' defaultMessage='Save' />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
            <Typography>
              <FormattedMessage id='profile.delete' defaultMessage='Do you want to delete your account?' />
            </Typography>
            <Button variant='text' onClick={deleteAccount}>
              <FormattedMessage id='button.delete.account' defaultMessage='Delete account' />
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}
