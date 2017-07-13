import products from '../products'
import initialState from '../../store/initialState'

class One {
  static name() {
    return '3 for 2 Deal on Unlimited 1GB Sims'
  }

  constructor(cart = initialState) {
    this.cart = cart
  }

  isOfferValid = () => {
    const items = this.cart.products['ult_small'];
    return items && items.quantity >= 3;
  }

  calcOfferValue = () => {
    if (this.isOfferValid()) {
      const items = this.cart.products['ult_small'];
      const extraProducts = {};
      let priceDiscount = Math.floor(items.quantity / 3) * products['ult_small'].price;
      return {extraProducts, priceDiscount}
    }
    return {extraProducts: {}, priceDiscount: 0}
  }
}

export default One;
