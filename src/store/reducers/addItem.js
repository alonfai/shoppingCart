import products from '../../model/products'

const addItem = (state, payload) => {
  const {productId, quantity} = payload

  let result = {};
  if (!state.products[productId]) {
    result = {
      ...state,
      products: {
        ...state.products,
        [productId]: {
          type: products[productId],
          quantity: quantity
        }
      }
    }
  } else {
    result = {
     ...state,
     products: {
       ...state.products,
       [productId]: {
         ...state.products[productId],
         quantity: state.products[productId].quantity + quantity
       }
     }
   }
  }

  return result;
}

export default addItem
