import token_contract from '../../build/contracts/Token.json'

const contract = require('truffle-contract')

export const INIT_BALANCE = 'INIT_BALANCE'
function initBalance(balances) {
    return {
        type: INIT_BALANCE,
        payload: balances
    } 
}

export function initData(address, web3) {

    return function(dispatch) {

        let cInstance
        let tokenBalance = '0'

        const TokenContract = contract(token_contract)
        TokenContract.setProvider(web3.currentProvider)

        TokenContract.deployed().then((contractInstance) => {
            cInstance = contractInstance	
        
            return cInstance.balanceOf(address)
        }).then((result) => {

            tokenBalance = result.toString();
        
            web3.eth.getBalance(address, function(error, result){
                if(!error){

                    let balance = web3.fromWei(result.toString()) 
                    return dispatch(initBalance({'ethBalance':balance,'tokenBalance':tokenBalance}))
                } else {

                    console.error(error);
                    return dispatch(initBalance({'ethBalance':'0','tokenBalance':tokenBalance}))
                }
            })
        })
    }
}