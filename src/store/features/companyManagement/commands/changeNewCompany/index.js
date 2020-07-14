import { CHANGE_NEW_COMPANY } from '../../types'

class InvalidCompanyError extends Error {
  constructor ({
    message,
    nestedErrors
  }) {
    super(message)
    this.name = 'InvalidCompanyError'
    this.due = nestedErrors
  }
}

class InvalidCompanyNameError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidCompanyNameError'
  }
}

class InvalidCompanyAddressError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidCompanyAddressError'
  }
}

class InvalidCompanyRevenueError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidCompanyRevenueError'
  }
}

class InvalidCompanyPhoneError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidCompanyPhoneError'
  }
}

const validateModel = ({
  changedData
}) => Object.keys(changedData).reduce((errors, fieldName) => {
  switch (fieldName) {
    case 'name':
      if (!changedData[fieldName]) {
        errors.push(new InvalidCompanyNameError('Please provide a valid company name'))
      }

      break

    case 'address':
      if (!changedData[fieldName]) {
        errors.push(new InvalidCompanyAddressError('Please provide a valid company address'))
      }

      break

    case 'revenue':
      if (!changedData[fieldName]) {
        errors.push(new InvalidCompanyRevenueError('Please provide a valid company revenue'))
      }

      break

    case 'phone':
      if (!changedData[fieldName]) {
        errors.push(new InvalidCompanyPhoneError('Please provide a valid company phone number'))
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
      type: CHANGE_NEW_COMPANY,
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
      type: CHANGE_NEW_COMPANY,
      payload: {
        errors: [
          ...errors,
          new InvalidCompanyError({
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
    type: CHANGE_NEW_COMPANY,
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
