import * as actions from './actions'
import * as types from './types'
import { createDefaultReducer } from '../../helpers'

const initialState = {
  actionResults: {
    errors: {},
    getCompanies: [],
    getCompanyDetails: {},
    getCompanyEditableFields: [],
    getCompanyEmployees: [],
    getPersonEditableFields: []
  },
  actionBeingExecuted: null
}

const handleErrors = (state, errors) => {
  const { actionResults } = state

  errors.forEach((error) => {
    actionResults.errors[error.name] = error

    if (error.due) {
      Object.assign(
        actionResults.errors,
        error.due.reduce((acc, error) => ({ ...acc, [error.name]: error }), {})
      )
    }
  })

  return {
    ...state,
    actionResults: {
      ...state.actionResults,
      errors: state.actionResults.errors
    }
  }
}

const reduceStandardActions = () => Object.keys(actions).reduce((acc, actionName) => ({
  ...acc,
  [actionName]: (state, payload) => ({
    ...state,
    actionResults: {
      ...state.actionResults,
      [actionName]: payload
    }
  })
}), {})

const reducers = {
  ...reduceStandardActions(),
  changeNewCompany: (state, payload) => ({
    ...handleErrors(state, payload.errors),
    actionResults: {
      ...state.actionResults,
      changeNewCompany: payload.updatedData
    }
  }),
  changeNewPerson: (state, payload) => ({
    ...handleErrors(state, payload.errors),
    actionResults: {
      ...state.actionResults,
      changeNewPerson: payload.updatedData
    }
  }),
  runProviders: (state, payload) => ({
    ...state,
    actionResults: {
      ...state.actionResults,
      ...payload
    }
  }),
  cancelError: (state, errorName) => {
    if (state.actionResults.errors[errorName]) {
      if (state.actionResults.errors[errorName].due) {
        state.actionResults.errors[errorName].due.forEach((error) => {
          error.isCancelled = true
        })
      }

      state.actionResults.errors[errorName].isCancelled = true

      return {
        ...state,
        actionResults: {
          ...state.actionResults,
          errors: state.actionResults.errors
        }
      }
    }

    return state
  },
  throwError: (state, error) => handleErrors(state, [error])
}

const actionMap = {
  [types.CANCEL_ERROR]: reducers.cancelError,
  [types.THROW_ERROR]: reducers.throwError,
  [types.CHANGE_NEW_COMPANY]: reducers.changeNewCompany,
  [types.CHANGE_NEW_PERSON]: reducers.changeNewPerson,
  [types.SUBMIT_NEW_COMPANY]: reducers.submitNewCompany,
  [types.SUBMIT_NEW_PERSON]: reducers.submitNewPerson,
  [types.RUN_PROVIDERS]: reducers.runProviders
}

export default createDefaultReducer(actionMap, initialState)
