import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import detailsCard from '../../reusables/detailsCard/index.jsx'
import simpleForm from '../../reusables/simpleForm/index.jsx'

import styles from './styles.css'
import bootstrap from '../../../init/bootstrap'

const propTypes = {
  actionResults: PropTypes.object, // results of actions accessed by action names
  actions: PropTypes.object, // action creators
  match: PropTypes.object
}

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.firstCompanyFormInput = React.createRef()
    this.firstPersonFormInput = React.createRef()
  }

  async runProviders () {
    const { actionResults, actions } = this.props

    actionResults.route = this.props.match
    return actions.runProviders(actionResults, [ // list of actions to be executed
      'getCompanyEditableFields',
      'getCompanies',
      'getPersonEditableFields'
    ])
  }

  setFocusOnFirstCompanyFormInput () {
    this.firstCompanyFormInput.current.focus()
  }

  setFocusOnFirstPersonFormInput () {
    this.firstPersonFormInput.current.focus()
  }

  async componentDidMount () {
    await this.runProviders() // actions to be executed prior first meaningful rendering
    this.setFocusOnFirstCompanyFormInput()
  }

  render () {
    const { actionResults, actions } = this.props

    return (
      <div className={`${bootstrap.container} ${styles.container}`}>
        <div className={bootstrap.row}>
          <div className={bootstrap['col-md-8']}>
            <div className={`${bootstrap.card} ${styles.cardList}`}>
              <h4 className={`${bootstrap['card-header']} ${styles.cardListHeader}`}>Companies</h4>
              <div className={bootstrap['card-body']}>
                {
                  actionResults.getCompanies.length > 0 ? actionResults.getCompanies.map(company => (
                    <div key={company.id}>
                      {
                        detailsCard({
                          fields: [
                            {
                              fieldName: 'address',
                              displayName: 'Address'
                            },
                            {
                              fieldName: 'revenue',
                              displayName: 'Revenue'
                            },
                            {
                              fieldName: 'phone',
                              displayName: 'Phone'
                            }
                          ],
                          record: company,
                          title: company.name,
                          getSlot: (id) => {
                            if (id === 'overviewLink') {
                              return <Link to={`/details/${company.id}`}>Company Overview</Link>
                            }

                            return null
                          }
                        })
                      }
                    </div>
                  )) : (
                    <p>There are currently no companies to review</p>
                  )
                }
              </div>
            </div>
          </div>
          <div className={bootstrap['col-md-4']}>
            <div className={styles.formContainer}>
              {
                simpleForm({
                  existingData: actionResults.changeNewCompany,
                  existingErrors: actionResults.errors,
                  expectedFormErrorName: 'InvalidCompanyError',
                  fields: actionResults.getCompanyEditableFields,
                  onCancelError: actions.cancelError,
                  onChange: actions.changeNewCompany,
                  onSubmit: async (data) => {
                    await actions.submitNewCompany(data)
                    this.runProviders()
                    this.setFocusOnFirstCompanyFormInput()
                  },
                  refFirstInput: this.firstCompanyFormInput,
                  title: 'Create New Company',
                  validateSubmission: data => !actions.changeNewCompany({
                    changedData: data,
                    existingData: actionResults.changeNewCompany,
                    isReadyToSubmit: true
                  }).payload.haveErrors
                })
              }
            </div>
            <div className={styles.formContainer}>
              {
                actionResults.getCompanies.length > 0 ? (
                  simpleForm({
                    existingData: actionResults.changeNewPerson,
                    existingErrors: actionResults.errors,
                    expectedFormErrorName: 'InvalidPersonError',
                    fields: actionResults.getPersonEditableFields,
                    onCancelError: actions.cancelError,
                    onChange: actions.changeNewPerson,
                    onSubmit: async (data) => {
                      await actions.submitNewPerson(data)
                      this.runProviders()
                      this.setFocusOnFirstPersonFormInput()
                    },
                    refFirstInput: this.firstPersonFormInput,
                    title: 'Create New Person',
                    validateSubmission: data => !actions.changeNewPerson({
                      changedData: data,
                      existingData: actionResults.changeNewPerson,
                      isReadyToSubmit: true
                    }).payload.haveErrors
                  })
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HomePage.propTypes = propTypes
export default HomePage
