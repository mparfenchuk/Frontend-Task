const initialState = {
    blockNumber: 0,
    ethBalance: '0',
    tokenBalance: '0',
    address: '0x03ee5e7e2a18d957f8ecaea4972a35dbaabe22fb',
    seed: 'mystery dolphin lumber kiwi gallery old isolate scale begin glory barrel coin'
}

const walletReducer = (state = initialState, action) => {
    if (action.type === 'ADD_BLOCK'){
        return Object.assign({}, state, {
            blockNumber: action.payload,
            ethBalance: state.ethBalance,
            tokenBalance: state.tokenBalance,
            address: state.address,
            seed: state.seed
        })
    }

    if (action.type === 'INIT_BALANCE'){
        return Object.assign({}, state, {
            blockNumber: state.blockNumber,
            ethBalance: action.payload.ethBalance,
            tokenBalance: action.payload.tokenBalance,
            address: state.address,
            seed: state.seed
        })
    }

    if (action.type === 'SET_TRANSACTION'){
        return Object.assign({}, state, {
            blockNumber: state.blockNumber,
            ethBalance: state.ethBalance,
            tokenBalance: state.tokenBalance,
            address: state.address,
            seed: state.seed
        })
    }

    if (action.type === 'WALLET_DESTROY'){
        return Object.assign({}, state, {
            blockNumber: 0,
            ethBalance: '0',
            tokenBalance: '0',
            address: state.address,
            seed: state.seed
        })
    }

    return state
}

export default walletReducer
