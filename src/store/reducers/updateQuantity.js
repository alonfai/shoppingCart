const updateQuantity = (state, payload) => {
  const {productId, quantity} = payload

  return {
    ...state,
    products: {
      ...state.products,
      [productId]: {
        ...state.products[productId],
        quantity: quantity
      }
    }
  }
}

export default updateQuantity
