import Web3 from 'web3'

const ZeroClientProvider = require('web3-provider-engine/zero.js')

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
    return {
        type: WEB3_INITIALIZED,
        payload: results
    } 
}

export const WEB3_DESTROY = 'WEB3_DESTROY'
function web3Destroy() {
    return {
        type: WEB3_DESTROY
    } 
}

export const ADD_BLOCK = 'ADD_BLOCK'
function addBlock(number) {
    return {
        type: ADD_BLOCK,
        payload: number
    } 
}

export function setWeb3() {

    return function(dispatch) {

        let engine = ZeroClientProvider({
            rpcUrl: 'https://rinkeby.infura.io/cWROvF4DmYYVP2bWfvZO',
        })

        let web3 = new Web3(engine)

        engine.on('block', function(block) {

            let blockNumber = Number.parseInt(block.number.toString('hex'), 16)
            dispatch(addBlock(blockNumber))
        })
        
        let results = {
            web3Instance: web3,
            engine: engine
        }

        return dispatch(web3Initialized(results))
    }
}

export function deleteWeb3(engine) 
{
    return function(dispatch) {
        
        engine.stop();
        return dispatch(web3Destroy())
    }
}
