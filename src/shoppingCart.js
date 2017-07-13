import store, {Actions} from './store'
import {promos, products} from './model'

class ShoppingCart {

  offerTemplates = [];
  store = undefined
  benefits = {
    extraProducts: {},
    priceDiscount: 0
  }

  static new(offers = []) {
    return new ShoppingCart({offers})
  }

  constructor({offers = [], initialCart = undefined} = {}) {
    this.offerTemplates = offers; //STORE THE SHOPPING CART OFFER TEMPLATES
    this.store = store(initialCart)
    this.store.subscribe(this.updateOffers)
  }

  updateOffers = () => {
    const {getState} = this.store;
    const cart = getState()
    const cartOffers = Object.keys(this.offerTemplates).map(offerKey => new this.offerTemplates[offerKey](cart))  //INSTITATE EACH OFFER WITH THE CURRENT CART DATA
    const benefits = {
      extraProducts: {},
      priceDiscount: 0
    }
    //CALCULATE THE TOTAL BENEFITS FROM ALL GIVEN OFFERS APPLIED
    //----------------------------------------------------------
    cartOffers.forEach(offer => {
      const {extraProducts, priceDiscount} = offer.calcOfferValue()
      if (extraProducts) { //add extra product to the benefits colleciton
        Object.keys(extraProducts).forEach(code => {
          const product = extraProducts[code]
          if (benefits.extraProducts[code]) {
            benefits.extraProducts[code].quantity = product.quantity
          } else {
            benefits.extraProducts[code] = product
          }
        })
      }
      benefits.priceDiscount += priceDiscount
    })

    this.benefits = benefits //update the cart benefits
  }

  add = (productId, quantity = 1) => {
    if (!products[productId]) {
      throw new Error('No Product Id was found')
    } else if (quantity < 1 || isNaN(quantity)) {
      throw new Error('Quantity value was invalid');
    }
    const action = Actions.addItem(productId, quantity);
    this.store.dispatch(action)
  }

  removeItem = (productId) => {
    const {getState, dispatch} = this.store
    if (!products[productId]) {
      throw new Error('No Product Id was found')
    } else if (!getState().products[productId]) {
      throw new Error('No Product was found in the cart with the given id')
    }
    const action = Actions.removeItem(productId);
    dispatch(action)
  }

  updateQuantity = (productId, quantity) => {
    const {getState, dispatch} = this.store
    if (!products[productId]) {
      throw new Error('No Product Id was found')
    } else if (quantity < 1 || isNaN(quantity)) {
      throw new Error('Quantity value was invalid');
    } else if (!getState().products[productId]) {
      throw new Error('No Product was found in the cart with the given id')
    }
    const action = Actions.updateQuantity(productId, quantity);
    dispatch(action)
  }

  addPromoCode = (code) => {
    const {getState, dispatch} = this.store
    if (!promos.find(promo => promo.code === code)) {
      throw new Error('No promo code was found')
    } else if (getState().promoCodes.find(promo => promo.code === code)) {
      throw new Error('Promotion Code was added already');
    }
    const action = Actions.addPromoCode(code, getState());
    dispatch(action)
  }

  removePromoCode = (code) => {
    const {getState, dispatch} = this.store
    if (!promos.find(promo => promo.code === code)) {
      throw new Error('No promo code was found')
    } else if (!getState().promoCodes.find(promo => promo.code === code)) {
      throw new Error('No promo code was found in the cart')
    }
    const action = Actions.removePromoCode(code);
    dispatch(action)
  }

  get promos() {
    return this.store.getState().promoCodes
  }

  get total() {
    let fullPrice = 0;
    Object.values(this.store.getState().products).forEach(product => {
      fullPrice += product.type.price * product.quantity;
    })
    const cartTotal = (fullPrice - this.benefits.priceDiscount).toFixed(2)

    // /* eslint-disable no-console */
    // console.log(`Price is $ ${cartTotal}`);
    // /* eslint-enable no-console */

    return parseFloat(cartTotal)
  }

  get items() {
    const cartItems = {
      ...this.store.getState().products
    }
    const {extraProducts} = this.benefits
    Object.keys(extraProducts).forEach(productKey => {
      const extraProduct = extraProducts[productKey]
      const {quantity} = extraProduct

      if (cartItems[productKey]) {
        cartItems[productKey] = {
          ...cartItems[productKey],
          quantity: cartItems[productKey].quantity + quantity
        }
      } else {
        cartItems[productKey] = extraProduct
      }
    })

    // Object.values(cartItems).forEach(product => {
    //   /* eslint-disable no-console */
    //   console.log(`${product.quantity} x ${product.type.name}`);
    //   /* eslint-enable no-console */
    // })

    return Object.values(cartItems)
  }
}

export default ShoppingCart;
