const initialState = {
    transactionFailed: null,
    transactionResult: ''
}

const transactionReducer = (state = initialState, action) => {

    if (action.type === 'SET_TRANSACTION'){
        return Object.assign({}, state, {
            transactionFailed: action.payload.transactionFailed,
            transactionResult: action.payload.transactionResult
        })
    }

    if (action.type === 'DESTROY_TRANSACTION'){
        return Object.assign({}, state, {
            transactionFailed: null,
            transactionResult: ''
        })
    }

    return state
}

export default transactionReducer
