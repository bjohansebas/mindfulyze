const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,30}$/
const NAMES_REGEX = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°][A-ZÑa-zñáéíóúÁÉÍÓÚ'°]{2,22}(?: [A-ZÑa-zñáéíóúÁÉÍÓÚ'°][A-ZÑa-zñáéíóúÁÉÍÓÚ'°]{2,22})?$/
const GENDER_REGEX = /^(male|female|other)$/i
const HEXADECIMAL_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
export const DATE_REGEX = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/

export { EMAIL_REGEX, PWD_REGEX, NAMES_REGEX, GENDER_REGEX, HEXADECIMAL_REGEX }
