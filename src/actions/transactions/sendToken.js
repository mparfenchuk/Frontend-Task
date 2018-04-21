import token_contract from '../../../build/contracts/Token.json'
import lightwallet from 'eth-lightwallet'

const contract = require('truffle-contract')

export const SET_TRANSACTION = 'SET_TRANSACTION'
function transactionUpdated(result) {
    return {
        type: SET_TRANSACTION,
        payload: result
    } 
}

export function sendToken(seed, recipient, amount, web3) {

    return function(dispatch) {

        lightwallet.keystore.createVault({password: '123456', seedPhrase: seed, hdPathString: "m/44'/60'/0'/0"}, function (err, ks) {
            ks.keyFromPassword('123456', function(err, pwDerivedKey) {
                ks.generateNewAddress(pwDerivedKey);
                
                let address = ks.getAddresses()
                
                web3.eth.getGasPrice(function(error, result){
                    if (!error){
                        let gasPriceHex =  web3.toHex(result);
                        let gasLimitHex =  web3.toHex('1000000');
        
                        web3.eth.getTransactionCount(address[0], function(error, result){
                            if (!error){
                                let nonceHex = web3.toHex(result);
                                
                                const TokenContract = contract(token_contract)
                                TokenContract.setProvider(web3.currentProvider)

                                let cInstance
                                
                                TokenContract.deployed().then((contractInstance) => {
                                    cInstance = contractInstance

                                    let rawTx = {
                                        nonce: nonceHex,
                                        gasPrice: gasPriceHex,
                                        gasLimit: gasLimitHex,
                                        to: cInstance.address,
                                        from: address[0],
                                        value: web3.toHex('0'),
                                        chainId: web3.toHex('4')
                                    }
                                    
                                    let transferTx = lightwallet.txutils.functionTx(token_contract.abi, 'transfer', [recipient, amount], rawTx)
                                    
                                    let signedTx = lightwallet.signing.signTx(ks, pwDerivedKey, transferTx, address[0])

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
                                })
                            }
                        })
                    }
                })
            })
        })
    }
}