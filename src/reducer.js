import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import web3Reducer from './utils/reducers/web3Reducer'
import walleteducer from './utils/reducers/walletReducer'
import transactionReducer from './utils/reducers/transactionReducer'

const reducer = combineReducers({
    routing: routerReducer,
    web3: web3Reducer,
    wallet: walleteducer,
    transaction: transactionReducer
})

export default reducer
