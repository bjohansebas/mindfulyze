export const NAMES_REGEX: RegExp =
  /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°][A-ZÑa-zñáéíóúÁÉÍÓÚ'°]{2,22}(?: [A-ZÑa-zñáéíóúÁÉÍÓÚ'°][A-ZÑa-zñáéíóúÁÉÍÓÚ'°]{2,22})?$/
export const EMAIL_REGEX: RegExp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
export const PWD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[0-9]).{8,50}$/
