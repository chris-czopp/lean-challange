import { SUBMIT_NEW_PERSON } from '../../types'
import generateId from '../../../../../helpers/generateId'

export default (data) => (dispatch) => {
  setTimeout(() => { // mocking async behaviour
    const existingPersons = JSON.parse(window.localStorage.getItem('lean_persons')) || []

    existingPersons.push({ ...data, id: generateId(data.name) })
    window.localStorage.setItem('lean_persons', JSON.stringify(existingPersons))

    dispatch({
      type: SUBMIT_NEW_PERSON
    })
  }, 250)
}
