export default async actionResults => new Promise((resolve) => setTimeout(() => {
  const { companyId } = actionResults.route.params
  const existingPersons = JSON.parse(window.localStorage.getItem('lean_persons')) || []
  const filteredEmployees = existingPersons.filter(({ employer }) => (employer === companyId))

  resolve(filteredEmployees)
}, 250))
