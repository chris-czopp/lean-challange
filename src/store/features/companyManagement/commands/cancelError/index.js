import { CANCEL_ERROR } from '../../types'

export default ({ errorName }) => ({
  type: CANCEL_ERROR,
  payload: errorName
})
