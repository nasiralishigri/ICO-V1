pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol";

contract ERC20_Implementation is ERC20 , ERC20Detailed, ERC20Capped {
    
string _symbol = "BAH";
string _name = "B-Head";
uint8 _decimal = 3;
uint256 tokenPrice;
uint256 _cap = 10000;

constructor()public
ERC20Detailed(_name,_symbol,_decimal)
ERC20Capped(_cap)
{
tokenPrice = 0.001 ether;
// emit checkBalance(msg.sender,5);
}


event checkBalance(address _address, uint256 _amount); // Event check the account balance


function totalSupply()public view returns (uint256){  // Get Total Supply of Token

    return super.totalSupply();

}
function balanceOf(address _addr) public view returns(uint256){ // Get Balance of Account

    return super.balanceOf(_addr);

}

function transfer(address _recipient, uint256 _amount) public returns(bool){ // Transfer Token to other
    return super.transfer(_recipient,_amount);
}

function transferFrom(address _sender, address _recipient, uint256 _amount) public returns(bool){ // Transfer Token from other Users account 
    return super.transferFrom(_sender, _recipient , _amount);
}

function approve(address _spender , uint256 _amount) public returns(bool){  // Approve token to use other address
    return super.approve(_spender , _amount);
}

function increaseAllowance(address _spender, uint256 _addValue) public returns(bool){   // Increase to allow token to others
    return super.increaseAllowance(_spender , _addValue);
}
function decreaseAllowance(address _spender, uint _subVallue)public returns(bool){ // Decreease the token to use other

    return super.decreaseAllowance(_spender , _subVallue);
}
function buyToken(uint256  _amount)public payable returns(bool){
    uint256 totalAmount = _amount * tokenPrice;

require(address(msg.sender).balance >= totalAmount , "You have unsufficient Balance");
emit checkBalance(msg.sender, address(msg.sender).balance);
return super.buyToken(msg.sender, _amount, totalAmount);

}

function ownerAddress()public returns(address) {

   return super.ownerAddress();
}


function tokenSold() public returns(uint256){
  uint256 _cap = super.cap();
   return _cap;
}
}