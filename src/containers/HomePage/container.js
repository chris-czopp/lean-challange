import { connect } from 'react-redux'
import HomePage from '../../components/pages/HomePage'
import * as actions from '../../store/features/companyManagement/actions'
import runProviders from '../../store/features/companyManagement/providers/runProviders'

const mapDispatchToProps = dispatch => ({
  actions: Object.keys(actions).reduce((acc, actionName) => ({
    ...acc,
    [actionName]: (...args) => dispatch(actions[actionName](...args))
  }), {
    runProviders: (...args) => dispatch(runProviders(...args))
  })
})

const mapStateToProps = state => state.companyManagement

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
