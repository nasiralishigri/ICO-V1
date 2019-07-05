
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  // tokenPrice: 1000000000,
  // tokensSold: 0,
  // tokensAvailable: 1000,

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: async function() {


    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
      // Request account access
      await window.ethereum.enable();
      } catch (error) {
      // User denied account access...
      console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    // if (typeof web3 !== 'undefined') {
    //   // If a web3 instance is already provided by Meta Mask.
    //   App.web3Provider = web3.currentProvider;
    //   web3 = new Web3(web3.currentProvider);
    // } else {
    //   // Specify default instance if no web3 instance provided
    //   App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    //   web3 = new Web3(App.web3Provider);
    // }
    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON("ERC20_Implementation.json", function(dappTokenSale) {
      App.contracts.ERC20_Implementation = TruffleContract(dappTokenSale);
      App.contracts.ERC20_Implementation.setProvider(App.web3Provider);
      App.contracts.ERC20_Implementation.deployed().then(function(dappTokenSale) {
        console.log("Dapp Token Sale Address:", dappTokenSale.address);
      

        // App.listenForEvents();
        return App.render();
      });
  
    })
   
  },

  // // Listen for events emitted from the contract
  // listenForEvents: function() {
  //   App.contracts.DappTokenSale.deployed().then(function(instance) {
  //     instance.Sell({}, {
  //       fromBlock: 0,
  //       toBlock: 'latest',
  //     }).watch(function(error, event) {
  //       console.log("event triggered", event);
  //       App.render();
  //     })
  //   })
  // },

  render: function() {




    $('#selected-crypto').click(function(){
      alert("clicked");
    })
    $('#selected-crypto').addEventListener('onkeyup',function(){
      alert("Key Pressed");
    })
    
    $('#buyTokens').click(function(){
      alert("Buy Tokens");
    });

    $('#clickOnDev').click(function(){
      alert("Dev Card Clicked");
    });
    



    App.contracts.ERC20_Implementation.deployed().then(function(instance){

return instance.balanceOf(web3.eth.accounts[0]);

    }).then(function(balance){
      $('#balanceIsBuy').html(balance.toNumber()+ "    B-Head");
      console.log(balance.toNumber()+ "   B-Head");
      $('#balanceIs').html(balance.toNumber()+ "    B-Head");
      $('#navBalanceIs').html(" B-Head   "+balance.toNumber());
     
    })

    // if (App.loading) {
    //   return;
    // }
    // App.loading = true;

    // var loader  = $('#loader');
    // var content = $('#content');

    // loader.show();
    // content.hide();

    // Load account data
    // web3.eth.getCoinbase(function(err, account) {
    //   if(err === null) {
    //     App.account = account;
    //     $('#accountAddress').html("Your Account: " + account);
    //   }
    // })
    // loader.hide();
    // content.show();
    // App.contracts.ERC20_Implementation.deployed().then(function(instance){

    //  return instance.totalSupply();

    // }).then(function(totalSupply){
    //   console.log("Total Supply is :"+totalSupply);
    // })



    // App.contracts.ERC20_Implementation.deployed().then(function(instance){

    //   return instance.totalSupply();
    // }).then(function(totalSupply){
    //   $('.tokens-sold').html(totalSupply.toNumber());
    // })

   

    // Load token sale contract
    // App.contracts.ERC20_Implementation.deployed().then(function(instance) {
    //   dappTokenSaleInstance = instance;
    //   return dappTokenSaleInstance.balanceOf();
    // }).then(function(tokenPrice) {
    //   App.tokenPrice = tokenPrice;
    //   $('.token-price').html(App.tokenPrice);
    //   return dappTokenSaleInstance.totalSupply();
    // }).then(function(tokensSold) {
    //   console.log("Total Supply is :"+tokensSold);

    //   App.tokensSold = tokensSold.toNumber();
      // $('.tokens-sold').html(App.tokensSold);
      // $('.tokens-available').html(App.tokensAvailable);

      // var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
      // $('#progress').css('width', progressPercent + '%');

    //   // Load token contract
    //   App.contracts.DappToken.deployed().then(function(instance) {
    //     dappTokenInstance = instance;
    //     return dappTokenInstance.balanceOf(0x42a55843d7df4d2f9664cda731cc0cc8488beb15
    //       );
    //   }).then(function(balance) {
    //     $('.dapp-balance').html(balance.toNumber());
    //   //   App.loading = false;
    //   //   loader.hide();
    //   //   content.show();
    //   })
     
    // });

    // App.contracts.ERC20_Implementation.deployed().then(function(instance){
      // console.log("Instance of ERC20_Imp : "+instance);
    // })

    // $('#checkBalance').click(function(){
     
      // App.contracts.ERC20_Implementation.deployed().then(function(instance){
      //   return instance.balanceOf(web3.eth.accounts[0]);
      // }).then(function(balance){
      //   var data = "Your Balance is : "+balance.toNumber();
      //  console.log(data);
      //  $('#balanceIs').html(data);
      // //  $('#showBalance').html(data)

      // })
      // alert("check Balance Clicked");
    // })

  // }
  // buyTokens: function() {

  //   var instances;
  //   var ownerAdd;
  //   // $('#content').hide();

  //   // $('#loader').show();
  //   alert("Going to Buy Token");
  //   var numberOfTokens = $('#ico-token').val();
  //   App.contracts.ERC20_Implementation.deployed().then(function(instance) {
  //     instances = instance;
      
  //    return instances.ownerAddress();
  //   }).then(function(inst){

  //     ownerAdd = inst.logs[0].args._owner;
  //     console.log("Instance of ERC20  To Address: "+ web3.eth.accounts[0]);
  //     console.log("Address of Account Token Contract : "+App.account);
  //     console.log("Stringify ownerAddress function call :"+JSON.stringify(inst));
  //     console.log("Owner Address is : "+ownerAdd);
     
  //     return instances.balanceOf(ownerAdd);
   
  //   }).then(function(bala){
  //     console.log("Balance is :"+ bala.toNumber());
    
      

     
  //     return instances.buyToken(numberOfTokens, {
  //       from: ownerAdd,
  //       value: numberOfTokens * App.tokenPrice,
  //       gas: 500000 // Gas limit
  //     });
  //   }).then(function(result) {
  //     console.log("Tokens bought..." + result);
  //     $('form').trigger('reset') // reset number of tokens in form
  //     // Wait for Sell event
     
  //   });
  // },

  // transferTokens: function(){ // Transfre token to others
  //   alert("Buy Token Clicked");
  //   var tokenAddress = $('#accountAddress').val();
  //   var noOfToken = $('#noOfToken').val();
   
  //   App.contracts.ERC20_Implementation.deployed().then(function(instance){
  //     return instance.transfer(tokenAddress, noOfToken);
  //   }).then(function(message){
  //     console.log("Balance Transfer Stringify object: "+JSON.stringify(message));
  //     console.log("You Transfer  Token Cong!");
  //   })

  // }
 
}
}
$(function() {
  $(window).load(function() {
   
    // alert("Call to App.js ");
   
    App.init();
  })
});



