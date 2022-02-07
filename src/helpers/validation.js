
/**
 * @param {string} fieldName - Name of the field being validated
 * @param {string} type - Type of applied validation eg: email ... etc
 * @param {int} options - Options of the validation being applied, works only on some field like minLengh
 * @returns String
 */
export function validationMessage (fieldName, type, options = {}) {
  switch (type) {
    case 'required':
      return `${fieldName} Field is required`

    case 'email':
      return 'Please enter a valid E-mail'

    case 'minLength':
      return `${fieldName} Field should be at least ${options.size} characters`

    case 'maxLength':
      return `${fieldName} Field should be at max ${options.size} characters`

    case 'url':
      return `${fieldName} Field should be a valid URL`

    case 'sameAs':
      return `${fieldName} Should be the same as ${options.fieldName}`

    default:
      return 'Please enter a valid value'
  }
}
