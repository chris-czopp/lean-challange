import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import bootstrap from '../../../init/bootstrap'

const propTypes = {
  getSlot: PropTypes.func,
  fields: PropTypes.array.isRequired,
  record: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

function detailsCard ({
  getSlot,
  fields,
  record,
  title
}) {
  return (
    <div className={`${bootstrap.card} ${styles.container}`}>
      <h5 className={bootstrap['card-header']}>{title}</h5>
      <div className={`${bootstrap['card-body']} ${styles.cardBody}`}>
        {
          fields.map(field => (
            <p key={field.fieldName}>
              <strong>{field.displayName}</strong>
              <br />
              <span>{record[field.fieldName]}</span>
            </p>
          ))
        }
      </div>
      <div className={bootstrap['card-footer']}>
        {typeof getSlot === 'function' ? getSlot('overviewLink') : null}
      </div>
    </div>
  )
}

detailsCard.propTypes = propTypes
export default detailsCard
