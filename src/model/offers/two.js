import products from '../products'
import initialState from '../../store/initialState'

export const unitPrice = 39.9

class Two {
  static name() {
    return 'Bulk Discount for 5GB Sim';
  }

  constructor(cart = initialState) {
    this.cart = cart
  }

  isOfferValid = () => {
    const items = this.cart.products['ult_large'];
    return items && items.quantity > 3;
  }

  calcOfferValue = () => {
    if (this.isOfferValid()) {
      const items = this.cart.products['ult_large'];
      const extraProducts = {};
      let priceDiscount = items.quantity * (products['ult_large'].price - unitPrice);
      return {extraProducts, priceDiscount}
    }
    return {extraProducts: {}, priceDiscount: 0}
  }
}

export default Two;
