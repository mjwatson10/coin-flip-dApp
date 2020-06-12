const CoinFlip = artifacts.require("CoinFlip");
const truffleAssert = require("truffle-assertions");

contract("CoinFlip", async function(accounts){

  let instance;

      it("shouldn't allow a third coin side choice", async function(){
        instance = await CoinFlip.deployed();
        await truffleAssert.fails(instance.coinFlip(3, {value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);
      });

      it("should allow only two choices for a coinside", async function(){
        instance = await CoinFlip.deployed();
        await truffleAssert.passes(instance.coinFlip(0, {value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);
      });

      it("Should return more than 0", async function () {
        let instance = await CoinFlip.deployed();
        await assert(web3.utils.fromWei(await instance.getPlayerBalance(accounts[0]), "wei") !== '0');
        });



});
