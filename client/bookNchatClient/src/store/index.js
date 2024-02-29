import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/root'


// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)


export default store

