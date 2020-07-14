import React, { Component } from 'react'
import PropTypes from 'prop-types'

import detailsCard from '../../reusables/detailsCard/index.jsx'

import styles from './styles.css'
import bootstrap from '../../../init/bootstrap'

const propTypes = {
  actionResults: PropTypes.object, // results of actions accessed by action names
  actions: PropTypes.object, // action creators
  match: PropTypes.object
}

class DetailsPage extends Component {
  async runProviders () {
    const { actionResults, actions } = this.props

    actionResults.route = this.props.match
    return actions.runProviders(actionResults, [ // list of actions to be executed
      'getCompanyEditableFields',
      'getCompanyEmployees',
      'getCompanyDetails'
    ])
  }

  async componentDidMount () {
    await this.runProviders() // actions to be executed prior first meaningful rendering
  }

  render () {
    const { actionResults } = this.props

    return (
      <div className={`${bootstrap.container} ${styles.container}`}>
        <div className={bootstrap.row}>
          <div className={bootstrap['col-md-12']}>
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
                  },
                  {
                    fieldName: 'employeesCount',
                    displayName: 'Total Employees'
                  }
                ],
                record: actionResults.getCompanyDetails,
                title: `Profile Overview (${actionResults.getCompanyDetails.name || ''})`
              })
            }
            <div className={`${bootstrap.card} ${styles.cardList}`}>
              <h4 className={bootstrap['card-header']}>Employees</h4>
              <div className={`${bootstrap['card-body']} ${styles.cardListBody}`}>
                {
                  actionResults.getCompanyEmployees.length > 0 ? actionResults.getCompanyEmployees.map(employee => (
                    <div key={employee.id}>
                      {
                        detailsCard({
                          fields: [
                            {
                              fieldName: 'address',
                              displayName: 'Address'
                            }
                          ],
                          record: employee,
                          title: employee.name
                        })
                      }
                    </div>
                  )) : (
                    <p>There is no employees in this company</p>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DetailsPage.propTypes = propTypes
export default DetailsPage
