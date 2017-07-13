import * as ActionTypes from '../ActionTypes'

const addItem = (productId, quantity) => {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {productId, quantity}
  }
}


export default addItem
