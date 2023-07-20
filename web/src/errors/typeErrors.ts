export class UnauthorizedAccessError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'UnauthorizedAccessError'
		this.stack = ''
	}
}

export class UnauthorizedRefreshError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'UnauthorizedRefreshError'
		this.stack = ''
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'NotFoundError'
		this.stack = ''
	}
}

export class BadRequestError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'BadRequestError'
		this.stack = ''
	}
}

export class ConflictError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'ConflictError'
		this.stack = ''
	}
}

export class ServerError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'ServerError'
		this.stack = ''
	}
}
