const OraclePOC = artifacts.require('OraclePOC')
const OracleRBAC = artifacts.require('OracleRBAC')
require('dotenv').config({ path: '../.env' })

module.exports = function (deployer) {
  deployer.deploy(OraclePOC)
  deployer.deploy(OracleRBAC, process.env.ADDRESS)
}
