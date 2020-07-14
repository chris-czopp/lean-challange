import { CHANGE_NEW_PERSON } from '../../types'

class InvalidPersonError extends Error {
  constructor ({
    message,
    nestedErrors
  }) {
    super(message)
    this.name = 'InvalidPersonError'
    this.due = nestedErrors
  }
}

class InvalidPersonNameError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidPersonNameError'
  }
}

class InvalidPersonAddressError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidPersonAddressError'
  }
}

class InvalidPersonEmployerError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidPersonEmployerError'
  }
}

const validateModel = ({
  changedData
}) => Object.keys(changedData).reduce((errors, fieldName) => {
  switch (fieldName) {
    case 'name':
      if (!changedData[fieldName]) {
        errors.push(new InvalidPersonNameError('Please provide a valid company name'))
      }

      break

    case 'address':
      if (!changedData[fieldName]) {
        errors.push(new InvalidPersonAddressError('Please provide a valid company address'))
      }

      break

    case 'employer':
      if (!changedData[fieldName]) {
        errors.push(new InvalidPersonEmployerError('Please provide a valid employer ID'))
      }

      break

    default:
  }

  return errors
}, [])

export default ({
  changedData = {},
  existingData,
  isReadyToSubmit,
  shouldIgnoreValidation = false
}) => {
  if (shouldIgnoreValidation) {
    return {
      type: CHANGE_NEW_PERSON,
      payload: {
        errors: [],
        haveErrors: false,
        updatedData: {
          ...existingData,
          ...changedData
        }
      }
    }
  }

  const errors = validateModel({
    changedData,
    existingData
  })

  if (isReadyToSubmit && errors.length > 0) {
    return {
      type: CHANGE_NEW_PERSON,
      payload: {
        errors: [
          ...errors,
          new InvalidPersonError({
            message: 'Please correct highlighted fields below',
            nestedErrors: errors
          })
        ],
        haveErrors: true,
        updatedData: {
          ...existingData,
          ...changedData
        }
      }
    }
  }

  return {
    type: CHANGE_NEW_PERSON,
    payload: {
      errors,
      haveErrors: errors.length > 0,
      updatedData: {
        ...existingData,
        ...changedData
      }
    }
  }
}
