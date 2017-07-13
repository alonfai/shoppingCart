const removeItem = (state, payload) => {
  const {productId} = payload

  const newState = Object.assign({}, state);
  delete newState.products[productId]
  return newState;
}

export default removeItem
