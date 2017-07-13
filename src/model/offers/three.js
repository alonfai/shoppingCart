import products from '../products'
import initialState from '../../store/initialState'

class Three {
  static name() {
    return 'free 1GB data-pack free of charge with every Unlimited 2GB'
  }

  constructor(cart = initialState) {
    this.cart = cart
  }

  isOfferValid = () => {
    return this.cart.products['ult_medium'] !== undefined;
  }

  calcOfferValue = () => {
    if (this.isOfferValid()) {
      const items = this.cart.products['ult_medium'];
      const extraProducts = {
        '1gb': {
          type: products['1gb'],
          quantity: items.quantity
        }
      };
      let priceDiscount = 0;

      return {extraProducts, priceDiscount}
    }
    return {extraProducts: {}, priceDiscount: 0}
  }
}

export default Three;
