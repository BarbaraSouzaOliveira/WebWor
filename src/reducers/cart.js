import ActionType from '../actions/actionTypes'

const initialState = {
    produtos: []
}

export  function cart(state = initialState, action) {
    switch (action.type) {
    case ActionType.CART.CLEAR:
        return initialState
    case ActionType.CART.SET_FIELDS:
        return {
            ...state,
            ...action.data
        }
    default:
    }
    return state
}
