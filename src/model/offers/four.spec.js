import { expect } from 'chai';
import products from '../products'
import {Promo} from '../promos'
import Four from './four'

describe('Offer-4', () => {

  describe('validate', () => {
    it('Cart is valid for offer', () => {
      const offer  = new Four({
        products: {
          'ult_medium': {
            type: products['ult_medium'],
            quantity: 4
          },
          'ult_small': {
            type: products['ult_small'],
            quantity: 1
          }
        },
        promoCodes: [new Promo('I<3AMAYSIM')]
      });
      expect(offer).to.exist
      const isOfferValid = offer.isOfferValid()
      expect(isOfferValid).to.equal(true)
    })

    it('Cart is not valid for offer', () => {
      const offer  = new Four({
        products: {
          'ult_large': {
            type: products['ult_large'],
            quantity: 4
          },
          'ult_small': {
            type: products['ult_small'],
            quantity: 1
          }
        },
        promoCodes: []
      });
      expect(offer).to.exist
      const isOfferValid = offer.isOfferValid()
      expect(isOfferValid).to.equal(false)
    })
  })

  describe('calculate offer values', () => {
    it('not valid offer', () => {
      const offer  = new Four({
        products: {
          'ult_large': {
            type: products['ult_large'],
            quantity: 2
          }
        },
        promoCodes: []
      });
      expect(offer).to.exist
      const value = offer.calcOfferValue()
      expect(value).to.deep.equal({extraProducts: {}, priceDiscount: 0})
    })

    describe('valid offers', () => {
      it('apply promo code "I<3AMAYSIM" will apply a 10% discount across the board', () => {
        const offer  = new Four({
          products: {
            'ult_large': {
              type: products['ult_large'],
              quantity: 1
            },
            'ult_small': {
              type: products['ult_small'],
              quantity: 1
            },
          },
          promoCodes: [new Promo('I<3AMAYSIM')]
        });
        expect(offer).to.exist
        const value = offer.calcOfferValue()
        const priceDiscount = (products['ult_large'].price + products['ult_small'].price) * .1
        expect(value).to.deep.equal({
          extraProducts: {},
          priceDiscount
        })
      })
    })
  })
});
