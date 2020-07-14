import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from '../../containers/HomePage'
import DetailsPage from '../../containers/DetailsPage'
import styles from './styles.css'

class App extends Component {
  render () {
    return (
      <Router>
        <>
          <div className={styles.header}>
            <div className={styles['header-title']}>Lean</div>
            <div className={styles['nav-wrapper']}>
              <div className={styles['header-nav']}>
                <span className={styles['nav-link']}>
                  <Link to='/'>Home</Link>
                </span>
              </div>
            </div>
          </div>
          <Route exact path='/' component={HomePage} />
          <Route path='/details/:companyId' component={DetailsPage} />
        </>
      </Router>
    )
  }
}

export default App
