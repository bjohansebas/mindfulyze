const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,30}$/

export { EMAIL_REGEX, PWD_REGEX, USER_REGEX }
