import React from 'react'
import PropTypes from 'prop-types'
import bootstrap from '../../../init/bootstrap'
import styles from './styles.css'

const propTypes = {
  existingData: PropTypes.object,
  existingErrors: PropTypes.object,
  expectedFormErrorName: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  onCancelError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  refFirstInput: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  title: PropTypes.string.isRequired,
  validateSubmission: PropTypes.func.isRequired
}

function simpleForm ({
  existingData = {},
  existingErrors = {},
  expectedFormErrorName,
  fields,
  onCancelError,
  onChange,
  onSubmit,
  refFirstInput,
  submitButtonLabel = 'Save',
  title,
  validateSubmission
}) {
  return (
    <form>
      <div className={bootstrap.card}>
        <h4 className={`${bootstrap['card-header']} ${styles.headline}`}>{title}</h4>
        <div className={bootstrap['card-body']}>
          {
            existingErrors[expectedFormErrorName] && !existingErrors[expectedFormErrorName].isCancelled ? (
              <p className={`${bootstrap.alert} ${bootstrap['alert-danger']} ${styles.errorBanner}`}>{existingErrors[expectedFormErrorName].message}</p>
            ) : null
          }
          {
            fields.map((field, index) => (
              <div key={index} className={bootstrap['form-group']}>
                <label>{field.displayName}</label>
                {
                  field.choices ? (
                    <select
                      className={`${bootstrap['form-control']}`}
                      onChange={(e) => {
                        if (existingErrors[field.expectedErrorName]) {
                          onCancelError({ errorName: field.expectedErrorName })
                        }

                        onChange({
                          changedData: {
                            [field.fieldName]: e.target.value || null
                          },
                          existingData,
                          isReadyToSubmit: false
                        })
                      }}
                      value={existingData[field.fieldName] || ''}
                    >
                      <option value=''>{field.selectPrompt}</option>
                      {
                        field.choices.map(choice => (
                          <option value={choice.id} key={choice.id}>{choice.name}</option>
                        ))
                      }
                    </select>
                  ) : (
                    <input
                      type='text'
                      value={existingData[field.fieldName] || ''}
                      className={`${bootstrap['form-control']}`}
                      onKeyUp={(e) => {
                        const expectedErrorName = field.expectedErrorName

                        if (existingErrors[expectedErrorName] && !existingErrors[expectedErrorName].isCancelled) {
                          onCancelError({ errorName: expectedErrorName })

                          onChange({
                            changedData: {
                              [field.fieldName]: e.target.value || null
                            },
                            existingData,
                            isReadyToSubmit: false
                          })
                        }
                      }}
                      onChange={(e) => onChange({
                        changedData: {
                          [field.fieldName]: e.target.value || null
                        },
                        existingData,
                        isReadyToSubmit: false
                      })}
                      {...(refFirstInput && index === 0 ? { ref: refFirstInput } : {})}
                    />
                  )
                }
                {
                  existingErrors[field.expectedErrorName] && !existingErrors[field.expectedErrorName].isCancelled ? (
                    <p className={styles.error}>{existingErrors[field.expectedErrorName].message}</p>
                  ) : null
                }
              </div>
            ))
          }
          <div>
            <button
              type='button'
              className={`${bootstrap.btn} ${bootstrap['btn-primary']} ${bootstrap['btn-block']}`}
              onClick={() => {
                onCancelError({ errorName: expectedFormErrorName })

                const data = fields.reduce((acc, { fieldName }) => ({
                  ...acc,
                  [fieldName]: typeof existingData[fieldName] !== 'undefined' && existingData[fieldName] !== null
                    ? existingData[fieldName]
                    : null
                }), {})

                if (validateSubmission(data)) {
                  onChange({
                    changedData: Object.keys(data).reduce((acc, fieldName) => ({ ...acc, [fieldName]: null }), {}),
                    existingData,
                    isReadyToSubmit: false,
                    shouldIgnoreValidation: true
                  })
                  onSubmit(data)
                }
              }}
            >{submitButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

simpleForm.propTypes = propTypes
export default simpleForm
