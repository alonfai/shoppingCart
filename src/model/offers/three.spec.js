import { expect } from 'chai';
import products from '../products'
import Three from './three'

describe('Offer-3', () => {

  describe('validate', () => {
    it('Cart is valid for offer', () => {
      const offer  = new Three({
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
        promoCodes: []
      });
      expect(offer).to.exist
      const isOfferValid = offer.isOfferValid()
      expect(isOfferValid).to.equal(true)
    })

    it('Cart is not valid for offer', () => {
      const offer  = new Three({
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
      const offer  = new Three({
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
      it('2x 2GB SIMS bundled with free 2x 1GB Data-Packs', () => {
        const offer  = new Three({
          products: {
            'ult_large': {
              type: products['ult_large'],
              quantity: 4
            },
            'ult_medium': {
              type: products['ult_medium'],
              quantity: 2
            },
          },
          promoCodes: []
        });
        expect(offer).to.exist
        const value = offer.calcOfferValue()
        expect(value).to.deep.equal({
          extraProducts: {
            '1gb': {
              type: products['1gb'],
              quantity: 2
            }
          },
          priceDiscount: 0
        })
      })
    })
  })
});
