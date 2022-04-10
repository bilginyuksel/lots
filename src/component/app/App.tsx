import { Account } from '../../blockchain/Blockchain';
import { createSolanaBlockchainNetworkConnection } from '../../blockchain/Factory';
import AccountContainer from '../account/Account';
import AirdropContainer from '../airdrop/Airdrop';
import DelegateStakeContainer from '../delegation/Delegate';
import TransferContainer from '../transfer/Transfer';
import './App.css'

function App() {
  const network = createSolanaBlockchainNetworkConnection()
  const accounts: Account[] = []

  const findAccount = (publicKey: string) => {
    console.log(accounts)
    const account = accounts.find(a => a.publicKey === publicKey)
    if (!account) throw new Error(`Account ${publicKey} not found`)
    return account
  }


  return (
    <div>
      <h1
        style={{ textAlign: "center", fontWeight: "normal" }}>
        Welcome to Lord of the Stakes
      </h1>

      <div className="app-container">
        <AccountContainer accounts={accounts} createAccount={network.createAccount} getBalance={network.getBalance} />
        <AirdropContainer airdrop={network.airdrop} />
        <DelegateStakeContainer findAccount={findAccount} delegateStake={network.delegateStake} />
        <TransferContainer />
      </div>

    </div>
  );
}

export default App;
