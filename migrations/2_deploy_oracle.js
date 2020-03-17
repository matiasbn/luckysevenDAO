const OraclePOC = artifacts.require('OraclePOC')

module.exports = function (deployer) {
  deployer.deploy(OraclePOC)
}
