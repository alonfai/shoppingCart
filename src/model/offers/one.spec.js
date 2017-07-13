import { expect } from 'chai';
import products from '../products'
import One from './one'

describe('Offer-1', () => {

  describe('validate', () => {
    it('Cart is valid for offer', () => {
      const offer  = new One({
        products: {
          'ult_small': {
            type: products['ult_small'],
            quantity: 3
          }
        },
        promoCodes: []
      });
      expect(offer).to.exist
      const isOfferValid = offer.isOfferValid()
      expect(isOfferValid).to.equal(true)
    })

    it('Cart is not valid for offer', () => {
      const offer  = new One({
        products: {
          'ult_small': {
            type: products['ult_small'],
            quantity: 2
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
      const offer  = new One({
        products: {
          'ult_small': {
            type: products['ult_small'],
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
      it('valid offer => 3 for the price of 2', () => {
        const offer  = new One({
          products: {
            'ult_small': {
              type: products['ult_small'],
              quantity: 3
            }
          },
          promoCodes: []
        });
        expect(offer).to.exist
        let priceDiscount = products['ult_small'].price;
        const value = offer.calcOfferValue()
        expect(value).to.deep.equal({extraProducts: {}, priceDiscount })
      })

      it('valid offer => 6 for the price of 3', () => {
        const offer  = new One({
          products: {
            'ult_small': {
              type: products['ult_small'],
              quantity: 6
            }
          },
          promoCodes: []
        });
        expect(offer).to.exist
        let priceDiscount = products['ult_small'].price * 2;
        const value = offer.calcOfferValue()
        expect(value).to.deep.equal({extraProducts: {}, priceDiscount })
      })
    })
  })
});
