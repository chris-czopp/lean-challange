import { connect } from 'react-redux'
import DetailsPage from '../../components/pages/DetailsPage'
import * as actions from '../../store/features/companyManagement/actions'
import runProviders from '../../store/features/companyManagement/providers/runProviders'
import clearState from '../../store/features/companyManagement/clearState'

const mapDispatchToProps = dispatch => ({
  actions: Object.keys(actions).reduce((acc, actionName) => ({
    ...acc,
    [actionName]: (...args) => dispatch(actions[actionName](...args))
  }), {
    runProviders: (...args) => dispatch(runProviders(...args)),
    clearState: (...args) => dispatch(clearState(...args))
  })
})

const mapStateToProps = state => state.companyManagement

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)
