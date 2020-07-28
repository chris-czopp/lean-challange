import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension'
import rootReducer from 'store/features/reducers'
import './src/index.css'
import App from 'components/App'

/*
As you can see, there's no middleware included here.
So to make things a little easier for you I've added the redux-devtools-extension.
documentation found here: https://github.com/zalmoxisus/redux-devtools-extension
*/

const store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  devToolsEnhancer
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
