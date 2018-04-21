var Token = artifacts.require("Token");

contract('Token test', async (accounts) => {

  it("should put 1000000 Token in the first account", async () => {
     let instance = await Token.deployed();
     let balance = await instance.balanceOf.call(accounts[0]);
     assert.equal(balance.valueOf(), 1000000);
  })

  it("should send coin correctly", async () => {

    // Get initial balances of first and second account.
    let account_one = accounts[0];
    let account_two = accounts[1];

    let amount = 10;

    let instance = await Token.deployed();
    let meta = instance;

    let balance = await meta.balanceOf.call(account_one);
    let account_one_starting_balance = balance.toNumber();

    balance = await meta.balanceOf.call(account_two);
    let account_two_starting_balance = balance.toNumber();
    await meta.transfer(account_two, amount, {from: account_one});

    balance = await meta.balanceOf.call(account_one);
    let account_one_ending_balance = balance.toNumber();

    balance = await meta.balanceOf.call(account_two);
    let account_two_ending_balance = balance.toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });

})