export default () => ([
  {
    fieldName: 'name',
    displayName: 'Name',
    expectedErrorName: 'InvalidCompanyNameError'
  },
  {
    fieldName: 'address',
    displayName: 'Address',
    expectedErrorName: 'InvalidCompanyAddressError'
  },
  {
    fieldName: 'revenue',
    displayName: 'Revenue',
    expectedErrorName: 'InvalidCompanyRevenueError'
  },
  {
    fieldName: 'phone',
    displayName: 'Phone',
    expectedErrorName: 'InvalidCompanyPhoneError'
  }
])
