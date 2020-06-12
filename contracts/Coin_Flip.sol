import "./Ownable_coin.sol";
pragma solidity 0.5.12;

contract CoinFlip is Ownable{

    //Contract Balance
    uint public contractBalance;


    // ^^^^ Contract Balance ^^^^^


mapping(address => uint) public playerBalance;
mapping(address => string) public flipResult;




  // Private
    function randomFlip() private view returns(uint){
        return now % 2;
    }



  // Public
    function addFunds() public payable{
        playerBalance[msg.sender] += msg.value;
    }

    function getContractBalance() public view returns(uint){
        return address(this).balance;
  }

    function coinFlip(uint sideChoosen) public payable returns(string memory){
        require(sideChoosen == 1 || sideChoosen == 0);
        require(msg.value >= 100 wei);
        if((randomFlip() == 0 && sideChoosen == 0) || (randomFlip() == 1 && sideChoosen == 1)){
            playerBalance[msg.sender] += msg.value;
            contractBalance -= msg.value;
                flipResult[msg.sender] = "Congratulations, you won!!!";
                    return flipResult[msg.sender];
        } else{
            playerBalance[msg.sender] -= msg.value;
            contractBalance += msg.value;
                flipResult[msg.sender] = "Sorry you lost, better luck next";
                    return flipResult[msg.sender];
        }

    }

    function getFlipResult(address player) public view returns(string memory){
    return flipResult[player];
}

    function getPlayerBalance(address _player) public view returns(uint){
        return playerBalance[_player];

    }

    function withdrawAll() public onlyOwner returns(uint) {
    uint transferTo = playerBalance[msg.sender];
    playerBalance[msg.sender] = 0;
    msg.sender.transfer(transferTo);
    return transferTo;
}

}
