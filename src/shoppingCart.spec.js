import { expect } from 'chai';
import ShoppingCart from './shoppingCart'
import {offers, products, promos} from './model'

describe('ShoppingCart', () => {
  
  describe('init cart', () => {

    it('empty cart', () => {
      const cart = new ShoppingCart()
      expect(cart).to.exist
      expect(cart.items).to.deep.equal([])
      expect(cart.total).to.equal(0)
    })

    it('pre-defined cart', () => {
      const initialCart = {
        products: {
          'ult_small': {
            type: products['ult_small'],
            quantity: 2
          },
          'ult_large': {
            type: products['ult_large'],
            quantity: 1
          }
        },
        promoCodes: []
      }
      const cart = new ShoppingCart({initialCart})
      expect(cart).to.exist
      expect(cart.items).to.deep.equal(Object.values(initialCart.products))
      const expectedPrice = parseFloat((2 * products['ult_small'].price + products['ult_large'].price).toFixed(2))
      expect(cart.total).to.equal(expectedPrice)
    })
  })

  describe('add item', () => {

    describe('validate input', () => {
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }
      let cart = undefined
      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
      })
      afterEach(() => {
        cart = undefined
      })

      it('missing productId input', () => {
        let error
        try {
          cart.add(null)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No Product Id was found')
      })

      it('invalid quantity value', () => {
        let error
        try {
          cart.add('ult_small', 0)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('Quantity value was invalid')
      })
    })

    describe('ADD action', () => {

      let cart = undefined
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }
      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
        expect(cart).to.exist
      })
      afterEach(() => {
        cart = undefined
      })

      it('check new product added correctly to the cart', () => {
        cart.add('1gb', 2)
        const updatedCart = cart.items
        const datapackItem = updatedCart.find(item => item.type === products['1gb'])
        expect(datapackItem).to.exist
        expect(datapackItem.quantity).to.equal(2)
      })

      it('add extra quantity to an existing product saved properly in the cart', () => {
        expect(cart.items.find(item => item.type === products['ult_small']).quantity).to.equal(2)
        cart.add('ult_small', 4)
        const updatedCart = cart.items
        const smallDataItem = updatedCart.find(item => item.type === products['ult_small'])
        expect(smallDataItem).to.exist
        expect(smallDataItem.quantity).to.equal(6)
      })
    })
  })

  describe('remove item', () => {

    describe('validate input', () => {

      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }
      let cart = undefined
      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
      })
      afterEach(() => {
        cart = undefined
      })

      it('invalid product id', () => {
        let error
        try {
          cart.removeItem(null)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No Product Id was found')
      })

      it('product not found in the cart', () => {
        let error
        try {
          cart.removeItem('1gb')
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No Product was found in the cart with the given id')
      })
    })

    describe('REMOVE action', () => {

      let cart = undefined
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }
      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
        expect(cart).to.exist
      })
      afterEach(() => {
        cart = undefined
      })

      it('check product removed completly from the cart', () => {
        cart.removeItem('ult_large')
        const updatedCart = cart.items
        const smallPackItem = updatedCart.find(item => item.type === products['ult_large'])
        expect(smallPackItem).to.not.exist
        expect(updatedCart).to.deep.equal([
          {
            type: products['ult_small'], quantity: 2
          }
        ])
      })
    })
  })

  describe('update Quantity', () => {

    describe('validate input', () => {
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }
      let cart = undefined
      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
      })
      afterEach(() => {
        cart = undefined
      })

      it('invalid product id', () => {
        let error
        try {
          cart.updateQuantity(null)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No Product Id was found')
      })

      it('missing productId input', () => {
        let error
        try {
          cart.updateQuantity('ult_medium', 1)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No Product was found in the cart with the given id')
      })

      it('invalid quantity value', () => {
        let error
        try {
          cart.updateQuantity('ult_small', -1)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('Quantity value was invalid')
      })
    })

    describe('UPDATE QUANTITY aciton', () => {

      let cart = undefined
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }
      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
        expect(cart).to.exist
      })
      afterEach(() => {
        cart = undefined
      })

      it('check product quantity updated as expected', () => {
        cart.updateQuantity('ult_large', 4)
        const updatedCart = cart.items
        expect(updatedCart).to.deep.equal([
          {type: products['ult_small'], quantity: 2},
          {type: products['ult_large'], quantity: 4}
        ])
      })
    })
  })

  describe('add promo code', () => {

    describe('validate input', () => {

      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: promos
      }
      let cart = undefined

      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
      })
      afterEach(() => {
        cart = undefined
      })

      it('invalid promo code', () => {
        let error
        try {
          cart.addPromoCode('1212')
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No promo code was found')
      })

      it('promo code was added already', () => {
        let error
        try {
          cart.addPromoCode(promos[0].code)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('Promotion Code was added already')
      })
    })

    describe('ADD PROMO CODE action', () => {

      let cart = undefined
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }

      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
        expect(cart).to.exist
      })

      afterEach(() => {
        cart = undefined
      })

      it('check cart has added promo code', () => {
        cart.addPromoCode(promos[0].code)
        const cartPromos = cart.promos
        expect(cartPromos).to.deep.equal([promos[0]])
      })
    })
  })

  describe('remove promo code', () => {

    describe('validate input', () => {
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: []
      }
      let cart = undefined

      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
      })
      afterEach(() => {
        cart = undefined
      })

      it('invalid promo code', () => {
        let error
        try {
          cart.removePromoCode('1212')
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No promo code was found')
      })

      it('promo code was not found in the cart', () => {
        let error
        try {
          cart.removePromoCode(promos[0].code)
        } catch (e) {
          error = e
        }
        expect(error).to.exist
        expect(error.message).to.equal('No promo code was found in the cart')
      })
    })

    describe('REMOVE PROMO CODE action', () => {
      let cart = undefined
      const initialCart = {
        products: {
          'ult_small': {type: products['ult_small'], quantity: 2},
          'ult_large': {type: products['ult_large'],quantity: 1}
        },
        promoCodes: promos
      }

      beforeEach(() => {
        cart = new ShoppingCart({initialCart})
        expect(cart).to.exist
      })

      afterEach(() => {
        cart = undefined
      })

      it('check cart doesnt have code', () => {
        cart.removePromoCode(promos[0].code)
        const cartPromos = cart.promos
        expect(cartPromos).to.be.empty
      })
    })
  })

  describe('updateOffers', function() {

    it('no offer match with the cart => empty benefits', () => {
      let userOffers = [offers.one, offers.two]
      let cart = new ShoppingCart({offers: userOffers})
      expect(cart).to.exist
      cart.add('ult_small', 1)
      cart.add('ult_medium', 2)
      const {benefits, items} = cart

      expect(items).to.deep.equal([
        {type: products['ult_small'], quantity: 1},
        {type: products['ult_medium'], quantity: 2}
      ])
      expect(benefits).to.deep.equal({
        extraProducts: {},
        priceDiscount: 0
      })
    })

    it('1 offer match cart items', () => {
      let userOffers = [offers.one, offers.two]
      let cart = new ShoppingCart({offers: userOffers})
      expect(cart).to.exist
      cart.add('ult_small', 3)
      cart.add('ult_medium', 2)
      const {benefits, items} = cart

      expect(items).to.deep.equal([
        {type: products['ult_small'], quantity: 3},
        {type: products['ult_medium'], quantity: 2}
      ])
      expect(benefits).to.deep.equal({
        extraProducts: {},
        priceDiscount: products['ult_small'].price
      })
    })

    it('2 offers match cart items', () => {
      let userOffers = [offers.one, offers.two, offers.three, offers.four]
      let cart = new ShoppingCart({offers: userOffers})
      expect(cart).to.exist
      cart.add('ult_small', 3)
      cart.add('ult_medium', 2)
      const {benefits, items} = cart

      expect(items).to.deep.equal([
        {type: products['ult_small'], quantity: 3},
        {type: products['ult_medium'], quantity: 2},
        {type: products['1gb'], quantity: 2}
      ])
      expect(benefits).to.deep.equal({
        extraProducts: {
          '1gb': {type: products['1gb'], quantity: 2}
        },
        priceDiscount: products['ult_small'].price
      })
    })
  });
});
