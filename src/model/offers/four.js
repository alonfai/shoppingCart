import initialState from '../../store/initialState'

class Four {

  static name() {
    return 'Apply promo code I<3AMAYSIM will apply a 10% discount across the board'
  }

  constructor(cart = initialState) {
    this.cart = cart
  }

  isOfferValid = () => {
    const promoCodes = this.cart.promoCodes;
    return promoCodes.find(promo => promo.code === 'I<3AMAYSIM') !== undefined;
  }

  calcOfferValue = () => {
    if (this.isOfferValid()) {
      const extraProducts = {};
      let currentPrice = 0
      Object.values(this.cart.products).forEach(item => {
        currentPrice = currentPrice + item.type.price
      });
      let priceDiscount = currentPrice * .1;
      return {extraProducts, priceDiscount}
    }
    return {extraProducts: {}, priceDiscount: 0}
  }
}

export default Four;
