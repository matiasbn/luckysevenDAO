/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import fs from 'fs'
import path from 'path'
import Web3 from 'web3'
import { debugOracle, debugError } from './config/debug'

import './config/environment'

const {
  PRIVATE_KEY, LOCAL_PROVIDER_HOST, LOCAL_PROVIDER_PORT, CONTRACT_NAME,
} = process.env
const web3 = new Web3(`ws://${LOCAL_PROVIDER_HOST}:${LOCAL_PROVIDER_PORT}`)
const { abi, networks } = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../build/contracts/${CONTRACT_NAME}.json`)))

const oracle = async () => {
  // State the master account
  const masterAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY)
  // Get network id and oracle contract
  const chainId = await web3.eth.net.getId()
  const contractAddress = networks[chainId].address
  const oracleContract = new web3.eth.Contract(abi, contractAddress)
  oracleContract
    .events
    .allEvents({ fromBlock: 'latest' })
    .on('data', async (event) => {
      try {
        switch (event.event) {
          case 'LogNumberAsked':
            const { owner } = event.returnValues
            const randomNumber = Math.round(Math.random() * 10000)
            const data = oracleContract.methods.deliverNumber(owner, randomNumber).encodeABI()
            const gasLimit = await oracleContract.methods.deliverNumber(owner, randomNumber).estimateGas()
            const txObject = {
              from: masterAccount.address,
              to: contractAddress,
              gasLimit: gasLimit * 10,
              data,
              chainId,
            }
            const signedTx = await masterAccount.signTransaction(txObject)
            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            break
          case 'LogNumberDelivered':
            debugOracle(event.returnValues)
            break
          default:
            break
        }
      } catch (error) {
        debugError(error)
      }
    })
}
(async () => {
  await oracle()
})()
