import { RUN_PROVIDERS } from '../types'
import * as providers from './index'

export default (actionResults, providerList) => async (dispatch) => {
  for (const providerName of providerList) { // here we're piping through providers from the list to get data for first meaningful initial rendering
    const providerBeingExecuted = providers[providerName](actionResults)

    if (providerBeingExecuted instanceof Promise) {
      actionResults[providerName] = await providerBeingExecuted
    } else {
      actionResults[providerName] = providerBeingExecuted
    }
  }

  dispatch({
    type: RUN_PROVIDERS,
    payload: actionResults
  })
}
