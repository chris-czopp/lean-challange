import { SUBMIT_NEW_COMPANY } from '../../types'
import generateId from '../../../../../helpers/generateId'

export default data => (dispatch) => {
  setTimeout(() => { // mocking async behaviour
    const existingCompanies = JSON.parse(window.localStorage.getItem('lean_companies')) || []

    existingCompanies.push({ ...data, id: generateId(data.name) })
    window.localStorage.setItem('lean_companies', JSON.stringify(existingCompanies))

    dispatch({
      type: SUBMIT_NEW_COMPANY
    })
  }, 250)
}
