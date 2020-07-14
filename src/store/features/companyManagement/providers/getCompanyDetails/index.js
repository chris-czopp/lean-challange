export default async actionResults => new Promise((resolve) => setTimeout(() => {
  const { companyId } = actionResults.route.params
  const existingCompanies = JSON.parse(window.localStorage.getItem('lean_companies')) || []
  const targetCompany = existingCompanies.find(({ id }) => (id === companyId))

  if (!targetCompany) {
    resolve(null)
    return
  }

  resolve({
    ...targetCompany,
    employeesCount: actionResults.getCompanyEmployees.length
  })
}, 250))
