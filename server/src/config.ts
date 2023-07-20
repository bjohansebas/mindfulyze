import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
	return {
		postgres: {
			dbUser: process.env.POSTGRES_USER,
			dbPassword: process.env.POSTGRES_PASSWORD,
			dbPort: parseInt(process.env.POSTGRES_PORT, 10),
			dbHost: process.env.POSTGRES_HOST,
		},
		jwt: {
			accessSecret: process.env.JWT_ACCESS_SECRET,
			refreshSecret: process.env.JWT_REFRESH_SECRET,
		},
	}
})
