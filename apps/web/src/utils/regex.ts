export const NAMES_REGEX: RegExp =
  /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°][A-ZÑa-zñáéíóúÁÉÍÓÚ'°]{2,22}(?: [A-ZÑa-zñáéíóúÁÉÍÓÚ'°][A-ZÑa-zñáéíóúÁÉÍÓÚ'°]{2,22})?$/
export const GENDER_REGEX: RegExp = /^(male|female|other)$/i
export const DATE_REGEX: RegExp = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
export const EMAIL_REGEX: RegExp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
export const PWD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[0-9]).{8,50}$/
export const HEXADECIMAL_REGEX: RegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
