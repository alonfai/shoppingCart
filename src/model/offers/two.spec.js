import { expect } from 'chai';
import products from '../products'
import Two, {unitPrice} from './two'

describe('Offer-2', () => {

  describe('validate', () => {
    it('Cart is valid for offer', () => {
      const offer  = new Two({
        products: {
          'ult_large': {
            type: products['ult_large'],
            quantity: 4
          }
        },
        promoCodes: []
      });
      expect(offer).to.exist
      const isOfferValid = offer.isOfferValid()
      expect(isOfferValid).to.equal(true)
    })

    it('Cart is not valid for offer', () => {
      const offer  = new Two({
        products: {
          'ult_large': {
            type: products['ult_large'],
            quantity: 3
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
      const offer  = new Two({
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
      it('valid offer => 4 units of "ult_large" SIMS', () => {
        const offer  = new Two({
          products: {
            'ult_large': {
              type: products['ult_large'],
              quantity: 4
            }
          },
          promoCodes: []
        });
        expect(offer).to.exist
        let priceDiscount = (products['ult_large'].price - unitPrice) * 4;
        const value = offer.calcOfferValue()
        expect(value).to.deep.equal({extraProducts: {}, priceDiscount })
      })
    })
  })
});
