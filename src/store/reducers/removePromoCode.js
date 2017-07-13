const removePromoCode = (state, payload) => {
  const {code} = payload
  const codeIndex = state.promoCodes.findIndex(promo => promo.code === code);
  return {
    ...state,
    promoCodes: [
      ...state.promoCodes.slice(0, codeIndex),
      ...state.promoCodes.slice(codeIndex + 1)
    ]
  }
}

export default removePromoCode
