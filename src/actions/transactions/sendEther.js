import lightwallet from 'eth-lightwallet'

export const SET_TRANSACTION = 'SET_TRANSACTION'
function transactionUpdated(result) {
    return {
        type: SET_TRANSACTION,
        payload: result
    } 
}

export function sendEther(seed, recipient, amount, gas, web3) {

    return function(dispatch) {

        lightwallet.keystore.createVault({password: '123456', seedPhrase: seed, hdPathString: "m/44'/60'/0'/0"}, function (err, ks) {
            ks.keyFromPassword('123456', function(err, pwDerivedKey) {
                ks.generateNewAddress(pwDerivedKey);
                
                let address = ks.getAddresses()
                
                web3.eth.getGasPrice(function(error, result){
                    if (!error){
                        let gasPriceHex =  web3.toHex(result);
        
                        web3.eth.getTransactionCount(address[0], function(error, result){
                            if (!error){
                                let nonceHex = web3.toHex(result);
                              
                                let rawTx = {
                                    nonce: nonceHex,
                                    gasPrice: gasPriceHex,
                                    gasLimit: web3.toHex(gas),
                                    to: recipient,
                                    from: address[0],
                                    value: web3.toHex(web3.toWei(amount, 'ether')),
                                    chainId: web3.toHex('4')
                                }
                                
                                let sendTx = lightwallet.txutils.valueTx(rawTx)
                                
                                let signedTx = lightwallet.signing.signTx(ks, pwDerivedKey, sendTx, address[0])

                                web3.eth.sendRawTransaction('0x' + signedTx,function(error, hash){
                                    if (!error){
                                        let filter = web3.eth.filter("latest",function(error, blockHash) {
                                            if (!error) {
                                                web3.eth.getBlock(blockHash, function(error, result){
                                                    if(!error) {
                                                        if (result.transactions.length > 0 && result.transactions.includes(hash)) {  
                                                            filter.stopWatching(function(error){
                                                                if(!error) {
                                                                    web3.eth.getTransactionReceipt(hash, function(error, result){
                                                                        if(!error) {
                                                                            if(web3.toDecimal(result.status) === 1){
                                                                                return dispatch(transactionUpdated({
                                                                                    transactionFailed: false,
                                                                                    transactionResult: hash}))
                                                                                
                                                                            } else {
                                                                                return dispatch(transactionUpdated({
                                                                                    transactionFailed: true,
                                                                                    transactionResult: 'Transaction failed.'}))
                                                                            }
                                                                        }
                                                                    })
                                                                } 
                                                            })        
                                                        } 
                                                    } 
                                                })     
                                            } 
                                        })
                                    } else {
                                        return dispatch(transactionUpdated({
                                            transactionFailed: true,
                                            transactionResult: error.message}))
                                    }
                                })
                              
                            }
                        })
                    }
                })
            })
        })
    }
}