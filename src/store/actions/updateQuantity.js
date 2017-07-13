import * as ActionTypes from '../ActionTypes'

const updateQuantity = (productId, quantity) => {
  return {
    type: ActionTypes.UPDATE_QUANTITY,
    payload: {productId, quantity}
  }
}


export default updateQuantity
