import * as ActionTypes from '../ActionTypes'

const removeItem = (productId) => {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {productId}
  }
}


export default removeItem
