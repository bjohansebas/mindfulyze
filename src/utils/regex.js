const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,30}$/
const NAMES_REGEX = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]{3,20}$/
const GENDER_REGEX = /^[a-zA-Z]{1,8}$/
const HEXADECIMAL_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export { EMAIL_REGEX, PWD_REGEX, USER_REGEX, NAMES_REGEX, GENDER_REGEX, HEXADECIMAL_REGEX }
