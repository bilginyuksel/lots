export class Account {
    publicKey: string
    secretKey: Uint8Array
    balance: number

    constructor(publicKey: string, secretKey: Uint8Array, balance: number = 0) {
        this.publicKey = publicKey
        this.secretKey = secretKey
        this.balance = balance
    }
}

export interface BlockchainNetwork {
    /**
     * 
     */
    createAccount(): Promise<Account>

    /**
     * 
     * @param publicKey 
     */
    getAccount(publicKey: string): Promise<Account>

    /**
     * 
     * @param from 
     * @param to 
     * @param amount 
     */
    transfer(from: Account, to: Account, amount: number): Promise<void>

    /**
     * 
     * @param publicKey 
     */
    airdrop(publicKey: string, amount: number): Promise<void>

    /**
     * 
     * @param publicKey 
     */
    getBalance(publicKey: string): Promise<number>

    /**
     * 
     * @param fund 
     * @param staker 
     * @param authorizedAccount 
     * @param amount 
     * @param voteAccount 
     */
    delegateStake(fund: Account, staker: Account, authorizedAccount: Account, amount: number, voteAccount: string): Promise<void>
}
