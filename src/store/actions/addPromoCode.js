import * as ActionTypes from '../ActionTypes'

const addPromoCode = (code) => {
  return {
    type: ActionTypes.ADD_PROMO_CODE,
    payload: {code}
  }
}


export default addPromoCode
