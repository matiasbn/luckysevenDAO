import TruffleContract from '@truffle/contract'
import OraclePOCArtifact from '../../../build/contracts/OraclePOC.json'

const truffleContract = () => {
  const truffleContractInstance = TruffleContract(OraclePOCArtifact)
  truffleContractInstance.setProvider(process.env.LOCAL_PROVIDER)
  return truffleContractInstance.deployed()
}

export default truffleContract
