import reducer from './reducers'
import initialState from './initialState'
import createStore from './createStore'

export * as Actions from './actions'

export default (preloadedState = initialState) => {
  return createStore(reducer, preloadedState)
}
