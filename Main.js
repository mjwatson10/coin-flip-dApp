var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0x16c87E78D8868F80b361ABd83F681Fcb79B1D840", {from: accounts[0]});
      console.log(contractInstance);
    });

    $("funds_to_add").click(addEther)
    $("#heads").click(choseHeads)
    $("#tails").click(choseTails)
    $("#get_balance_button").click(getBalanceOfPlayer)

  });

  function addEther(){
    var config = {value: web3.utils.toWei("1", "ether")};

    contractInstance.methods.addFunds().send(config)
    .on("transactionHash", function(hash){
      console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
      console.log(receipt);
    })
    .on("receipt", function(receipt){
      console.log(JSON.stringify(receipt));
      alert("1 Ether Added");
      getBalanceOnContract();
      getBalanceOfPlayer();
    })
  }

  function choseHeads(){
    var betAmount = $("#bet").val();

    var config = {
      value: (betAmount.toString())
    };

    contractInstance.methods.coinFlip(0).send(config)
    .on("transactionHash", function(hash){
      console.log("transactionHash: " + hash);
    })
    .on("confirmation", function(confirmationNr){
      console.log("confirmationNr: " + confirmationNr);
      getResults();
    })
    .on("receipt", function(receipt){
      console.log("receipt: " + JSON.stringify(receipt));
      getBalanceOnContract();
      getBalanceOfPlayer();
    })
  }

  function choseTails(){
    var betAmount = $("#bet").val();

    var config = {
      value: (betAmount.toString())
    };

    contractInstance.methods.coinFlip(1).send(config)
    .on("transactionHash", function(hash){
      console.log("transactionHash: " + hash);
    })
    .on("confirmation", function(confirmationNr){
      console.log("confirmationNr: " + confirmationNr);
      getResults();
    })
    .on("receipt", function(receipt){
      console.log("receipt: " + JSON.stringify(receipt));
      getBalanceOnContract();
      getBalanceOfPlayer();
    })
  }

    function getFunds(){
      contractInstance.methods.withdrawAll()
      .send().then(function(results){
        reuslt = web3.utils.fromWei(result, "ether");
        alert("Funds Withdrawn")
        console.log(result);
      })
    }

    function getResults(){
      contractInstance.methods.getFlipResult(playerAccount).call().then(function(result){
        console.log(result);
        if(result){
          alert("Congratulations, You Won!!!")
        }else{
        alert("You Lost, Better Luck Next Time")
        }
      });
    }

    function getBalanceOnContract(){
      contractInstance.methods.getContractBalance().call().then(function(resultContract){
        newResult = web3.utils.fromWei(resultContract, "ether");
        console.log(newResult);

      })

    }

    function getBalanceOfPlayer(){
      contractInstance.methods.getPlayerBalance().call().then(function(resultPlayer){
        _newResult = web3.utils.fromWei(resultPlayer, "ether");
        console.log(_newResult);
        $("#get_balance_button")
      })
    }
