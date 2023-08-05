import { useState, type FormEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Banner } from '@/components/Banner'
import { NameField } from '@/components/Fields/Name'
import { NewProfile } from '@/types/user'
import { Button } from '@nextui-org/react'
import { postNewProfile } from 'services/signUp'
import { NAMES_REGEX } from 'utils/regex'

export const NewProfilePage = (): JSX.Element => {
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    if (!NAMES_REGEX.test(name)) {
      setLoading(false)
      return
    }
    const request: NewProfile = { name: name }

    try {
      await postNewProfile(request)

      navigate('/')
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen h-full w-screen flex items-center flex-col py-10 max-sm:px-0 '>
      <div className='flex justify-center flex-col gap-4 rounded-xl lg:max-w-[40%] md:max-w-[50%] sm:max-w-[60%] w-[90%] sm:px-8 px-4 py-10        '>
        <header className='flex items-center gap-6 flex-col'>
          <Banner widthFavicon={40} heightText={24.26} widthText={230} />
          <div className='w-full px-2 gap-2 flex flex-col'>
            <h1 className='text-3xl font-extrabold'>Thank you for joining Mindfulyze.</h1>
            <h2 className='text-xl font-semibold'>
              Start your new path of emotional control! Begin managing your emotions and transform your life.
            </h2>
          </div>
        </header>
        <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <NameField
              text={name}
              setText={setName}
              requiredValid={true}
              errorText='Please enter a real name.'
              label={<FormattedMessage id='profile.new.name.first' defaultMessage='First name *' />}
            />
            <Button disabled={loading} type='submit'>
              <FormattedMessage id='profile.new.submit' defaultMessage='Continue' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewProfilePage
