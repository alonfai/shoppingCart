import * as ActionTypes from '../ActionTypes'
import addItem from './addItem'
import removeItem from './removeItem'
import addPromoCode from './addPromoCode'
import removePromoCode from './removePromoCode'
import updateQuantity from './updateQuantity'

const cartReducer = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_ITEM:
            return addItem(state, action.payload)

        case ActionTypes.REMOVE_ITEM:
            return removeItem(state, action.payload)

        case ActionTypes.UPDATE_QUANTITY:
            return updateQuantity(state, action.payload)

        case ActionTypes.ADD_PROMO_CODE:
            return addPromoCode(state, action.payload)

        case ActionTypes.REMOVE_PROMO_CODE:
            return removePromoCode(state, action.payload)

        default:
            return state
    }
}

export default cartReducer;