var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = "mystery dolphin lumber kiwi gallery old isolate scale begin glory barrel coin"

module.exports = {
   networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" 
    }, 
	  rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/cWROvF4DmYYVP2bWfvZO")
      },
      network_id: 4,
	    gas: 3000000
    } 
  }
};