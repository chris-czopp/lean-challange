import { THROW_ERROR } from '../../types'

export default error => ({
  type: THROW_ERROR,
  payload: error
})
