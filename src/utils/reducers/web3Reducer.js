const initialState = {
    isLoaded: false,
    web3Instance: null,
    engine: null
}

const web3Reducer = (state = initialState, action) => {
    if (action.type === 'WEB3_INITIALIZED'){
        return Object.assign({}, state, {
            isLoaded: true,
            web3Instance: action.payload.web3Instance,
            engine:action.payload.engine
        })
    }

    if (action.type === 'WEB3_DESTROY'){
        return Object.assign({}, state, {
            isLoaded: false,
            web3Instance: null,
            engine:null
        })
    }

    return state
}

export default web3Reducer
