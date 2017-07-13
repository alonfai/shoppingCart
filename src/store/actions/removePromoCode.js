import * as ActionTypes from '../ActionTypes'

const removePromoCode = (code) => {
  return {
    type: ActionTypes.REMOVE_PROMO_CODE,
    payload: {code}
  }
}


export default removePromoCode
