export default actionResults => ([
  {
    fieldName: 'name',
    displayName: 'Name',
    expectedErrorName: 'InvalidPersonNameError'
  },
  {
    fieldName: 'address',
    displayName: 'Address',
    expectedErrorName: 'InvalidPersonAddressError'
  },
  {
    fieldName: 'employer',
    displayName: 'Employer',
    expectedErrorName: 'InvalidPersonEmployerError',
    selectPrompt: 'Select Employer',
    choices: actionResults.getCompanies.map((company) => ({
      id: company.id,
      name: company.name
    }))
  }
])
