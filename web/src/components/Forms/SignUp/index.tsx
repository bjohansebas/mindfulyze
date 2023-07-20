import { Box, Button } from '@mui/material'

import { useState, type FormEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from 'hooks/useAuth'
import { postSignUpAccount } from 'services/signUp'
import { EMAIL_REGEX, PWD_REGEX } from 'utils/regex'

import { EmailField } from '@/components/Fields/Email'
import { PasswordTextField } from 'components/Fields/Password'
import { HeaderFormSignUp } from './HeaderSignUp'

import PaletteFormProvider from '../Theme'

export function SignUpForm(): JSX.Element {
	const { loginAction } = useAuth()
	const navigate = useNavigate()

	const [email, setEmail] = useState<string>('')
	const [validEmail, setValidEmail] = useState<boolean>(false)

	const [pwd, setPwd] = useState<string>('')
	const [validPwd, setValidPwd] = useState<boolean>(false)

	const [confirmPwd, setConfirmPwd] = useState<string>('')
	const [validConfirmPwd, setValidConfirmPwd] = useState<boolean>(false)

	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setLoading(true)

		const testEmail = EMAIL_REGEX.test(email)
		const testPwd = PWD_REGEX.test(pwd)

		if (!testEmail || !testPwd) {
			setLoading(false)
		} else {
			try {
				await postSignUpAccount(pwd, email)
				try {
					await loginAction(email, pwd)
					navigate('/account/new')
					setLoading(false)
				} catch (e) {
					navigate('/login')
				}
			} catch (err) {
				setLoading(false)
			}
		}
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				background: 'linear-gradient(45deg, #00575C 0%, #002d32 100%)',
				backgroundPosition: '0 0',
				backgroundSize: '100% 100%',
				py: { sm: '40px', xs: '0' },
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: ' center',
					flexDirection: 'column',
					width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' },
					gap: 4,
					p: { sm: '40px 32px', xs: '40px 16px' },
					borderRadius: '12px',
				}}
			>
				<HeaderFormSignUp />
				<Box
					component='form'
					autoComplete='off'
					onSubmit={async (e) => {
						await handleSubmit(e)
					}}
					sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
				>
					<PaletteFormProvider>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
							<EmailField
								text={email}
								setText={setEmail}
								setValid={setValidEmail}
								errorRequest=''
								requiredValid={true}
								errorText='Enter a valid email address'
								label={<FormattedMessage id='login.email' defaultMessage='Email' />}
							/>
							<PasswordTextField
								text={pwd}
								setText={setPwd}
								errorRequest=''
								requiredValid={true}
								setValid={setValidPwd}
								errorText='The password must have at least one lowercase letter, one number, and a length between 8 and 30 characters'
								label={<FormattedMessage id='signup.password' defaultMessage='Password' />}
							/>
							<PasswordTextField
								text={confirmPwd}
								setText={setConfirmPwd}
								errorRequest=''
								errorText='The passwords do not match. Please make sure both passwords are the same.'
								comparePassword={pwd}
								isDisable={true}
								setValid={setValidConfirmPwd}
								label={<FormattedMessage id='signup.confirm' defaultMessage='Confirm password' />}
							/>
						</Box>
						<Box display='flex' sx={{ gap: { sm: '32px', xs: '16px' }, flexDirection: { xs: 'column', sm: 'row' } }}>
							<Button
								disabled={!validPwd || !validConfirmPwd || !validEmail || loading}
								type='submit'
								variant='contained'
								size='large'
								sx={{ width: '100%', borderRadius: '12px' }}
							>
								<FormattedMessage id='signup.submit' defaultMessage='Sign up' />
							</Button>
							<Button
								component={Link}
								variant='outlined'
								size='large'
								to='/login'
								sx={{ width: { sm: '160px', sx: '100%' }, borderRadius: '12px' }}
							>
								<FormattedMessage id='signup.login.link' defaultMessage='Log in' />
							</Button>
						</Box>
					</PaletteFormProvider>
				</Box>
			</Box>
		</Box>
	)
}
