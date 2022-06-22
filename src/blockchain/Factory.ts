import { ConnectionConfig } from "@solana/web3.js"
import { SolanaNetwork } from "./Solana"

const solanaRpcUrl = "http://164.92.234.61:8899"

export function createSolanaBlockchainNetworkConnection(): SolanaNetwork {
    const config: ConnectionConfig = {
        commitment: "root",
    }
    const network = new SolanaNetwork()
    console.log(network)
    const voteAccountKey = "FASKWbvw5HSrVkaCwhp3MyHmTvUc92KJsujHhPopQRXk"
    network.onAccountLamportChanged(voteAccountKey, () => {})
    return network
}