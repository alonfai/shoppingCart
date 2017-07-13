import {Promo} from '../../model'

const addPromoCode = (state, payload) => {
  const {code} = payload
  return {
    ...state,
    promoCodes: [
      ...state.promoCodes,
      new Promo(code)
    ]
  }
}

export default addPromoCode
