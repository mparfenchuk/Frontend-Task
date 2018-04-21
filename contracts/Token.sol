pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract Token is StandardToken {

    string public name = "Token";
    string public symbol = "TKN";
    uint8 public decimals = 0;
    uint public INITIAL_SUPPLY = 1000000;

    function Token() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

}