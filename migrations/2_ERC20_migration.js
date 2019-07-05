const ERC20 = artifacts.require("ERC20_Implementation");

module.exports = function(deployer) {
  deployer.deploy(ERC20);
};
