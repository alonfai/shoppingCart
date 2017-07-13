import { expect } from 'chai';
import cartReducer from './reducers'
import initialState from './initialState'
import * as ActionTypes from './ActionTypes'
import {products, Promo} from '../model'

describe('cartReducer', () => {

  it('default empty state', () => {
    expect(cartReducer(undefined, {})).to.deep.equal({})
  })

  it('should handle given initialState', () => {
    const newState = cartReducer(initialState, {})
    expect(newState).to.deep.equal(initialState)
  })

  it('should handle ADD_ITEM', () => {
    const newState = cartReducer(initialState, {
      type: ActionTypes.ADD_ITEM,
      payload: {
        productId: '1gb',
        quantity: 2
      }
    })
    expect(newState).to.deep.equal({
      products: {
        '1gb': {
          type: products['1gb'],
          quantity: 2
        }
      },
      promoCodes: []
    })
  })

  it('should handle REMOVE_ITEM', () => {
    let newState = cartReducer(initialState, {
      type: ActionTypes.ADD_ITEM,
      payload: {
        productId: '1gb',
        quantity: 2
      }
    })
    newState = cartReducer(newState, {
      type: ActionTypes.ADD_ITEM,
      payload: {
        productId: 'ult_medium',
        quantity: 3
      }
    })
    expect(newState).to.deep.equal({
      products: {
        '1gb': {type: products['1gb'], quantity: 2},
        'ult_medium': {type: products['ult_medium'], quantity: 3}
      },
      promoCodes: []
    })

    newState = cartReducer(newState, {
      type: ActionTypes.REMOVE_ITEM,
      payload: {productId: '1gb'}
    })
    expect(newState).to.deep.equal({
      products: {
        'ult_medium': {
          type: products['ult_medium'],
          quantity: 3
        }
      },
      promoCodes: []
    })
  })

  it('should handle UPDATE_QUANTITY', () => {
    let newState = cartReducer(initialState, {
      type: ActionTypes.ADD_ITEM,
      payload: {
        productId: '1gb',
        quantity: 2
      }
    })
    expect(newState).to.deep.equal({
      products: {
        '1gb': {type: products['1gb'], quantity: 2}
      },
      promoCodes: []
    })

    newState = cartReducer(newState, {
      type: ActionTypes.UPDATE_QUANTITY,
      payload: {
        productId: '1gb',
        quantity: 6
      }
    })
    expect(newState).to.deep.equal({
      products: {
        '1gb': {type: products['1gb'], quantity: 6}
      },
      promoCodes: []
    })
  })

  it('should handle ADD_PROMO_CODE', () => {
    let newState = cartReducer(initialState, {
      type: ActionTypes.ADD_ITEM,
      payload: {
        productId: '1gb',
        quantity: 2
      }
    })
    expect(newState).to.deep.equal({
      products: {
        '1gb': {type: products['1gb'], quantity: 2}
      },
      promoCodes: []
    })

    newState = cartReducer(newState, {
      type: ActionTypes.ADD_PROMO_CODE,
      payload: {code: 'I<3AMAYSIM'}
    })
    expect(newState).to.deep.equal({
      products: {
        '1gb': {type: products['1gb'], quantity: 2}
      },
      promoCodes: [new Promo('I<3AMAYSIM')]
    })
  })

  it('should handle REMOVE_PROMO_CODE', () => {
    let newState = cartReducer(initialState, {
      type: ActionTypes.ADD_ITEM,
      payload: {
        productId: '1gb',
        quantity: 2
      }
    })
    newState = cartReducer(newState, {
      type: ActionTypes.ADD_PROMO_CODE,
      payload: {code: 'I<3AMAYSIM'}
    })
    expect(newState).to.deep.equal({
      products: {
        '1gb': {type: products['1gb'], quantity: 2}
      },
      promoCodes: [new Promo('I<3AMAYSIM')]
    })

    newState = cartReducer(newState, {
      type: ActionTypes.REMOVE_PROMO_CODE,
      payload: {code: 'I<3AMAYSIM'}
    })

    expect(newState).to.deep.equal({
      products: {
        '1gb': {type: products['1gb'], quantity: 2}
      },
      promoCodes: []
    })
  })
})
