import {
    Keypair,
    Connection,
    ConnectionConfig,
    PublicKey,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    StakeProgram,
    Authorized,
    Lockup
} from '@solana/web3.js'
import { Account, BlockchainNetwork } from './Blockchain';

const solanaRpcUrl = "http://164.92.234.61:8899"
const connection = new Connection(solanaRpcUrl, { commitment: "root" })

export class SolanaNetwork implements BlockchainNetwork {

    async delegateStake(fund: Account, staker: Account, authorizedAccount: Account, amount: number, voteAccount: string): Promise<void> {
        const lamportsForStakeAccount = await connection.getMinimumBalanceForRentExemption(StakeProgram.space)
        console.log(`Minimum balance for stake account: ${lamportsForStakeAccount}`)

        const fundPublicKey = new PublicKey(fund.publicKey)
        const stakerPublicKey = new PublicKey(staker.publicKey)
        const authorizedAccountPublicKey = new PublicKey(authorizedAccount.publicKey)

        const fundSigner = Keypair.fromSecretKey(fund.secretKey)
        const stakerSigner = Keypair.fromSecretKey(staker.secretKey)
        const authorizedAccountSigner = Keypair.fromSecretKey(authorizedAccount.secretKey)

        const lockup = new Lockup(0, 0, fundPublicKey)

        const createStakeAccountTransaction = StakeProgram.createAccount({
            fromPubkey: fundPublicKey,
            authorized: new Authorized(authorizedAccountPublicKey, authorizedAccountPublicKey),
            lamports: LAMPORTS_PER_SOL * amount,
            lockup: lockup,
            stakePubkey: stakerPublicKey
        })
        const createStakeAccountTxResponse = await sendAndConfirmTransaction(connection, createStakeAccountTransaction, [fundSigner, stakerSigner])
        console.log(`Create Stake Account: ${createStakeAccountTxResponse}`)

        const stakeBalance = await connection.getBalance(stakerPublicKey)
        console.log(`Stake account balance: ${stakeBalance}`)

        const stakeState = await connection.getStakeActivation(stakerPublicKey)
        console.log(`Stake state: ${stakeState}`)

        const voteAccountPublicKey = new PublicKey(voteAccount)
        const delegateTransaction = StakeProgram.delegate({
            stakePubkey: stakerPublicKey,
            authorizedPubkey: authorizedAccountPublicKey,
            votePubkey: voteAccountPublicKey
        })
        const delegateTransactionResponse = await sendAndConfirmTransaction(connection, delegateTransaction, [fundSigner, authorizedAccountSigner])
        console.log(`Delegate Transaction: ${delegateTransactionResponse}`)
    }

    createAccount(): Promise<Account> {
        const keypair = Keypair.generate()
        const account = new Account(
            keypair.publicKey.toBase58(),
            keypair.secretKey
        )

        return Promise.resolve(account)
    }

    getAccount(publicKey: string): Promise<Account> {
        const pubkey = new PublicKey(publicKey)
        const accountInfo = connection.getAccountInfo(pubkey)
        console.log(accountInfo)

        return Promise.reject()
    }

    async airdrop(publicKey: string, amount: number): Promise<void> {
        const pub = new PublicKey(publicKey)
        const amountOfSol = amount * LAMPORTS_PER_SOL
        console.log(`Airdrop ${amountOfSol} to ${pub.toBase58()}`)

        const airdropSignature = await connection.requestAirdrop(pub, amountOfSol)
        console.log(`Signature ${airdropSignature}`)
        const signatureResponse = await connection.confirmTransaction(airdropSignature)
        console.log(signatureResponse)
    }

    async transfer(from: Account, to: Account, amount: number): Promise<void> {
        const transaction = new Transaction()
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(from.publicKey),
                toPubkey: new PublicKey(to.publicKey),
                lamports: LAMPORTS_PER_SOL * amount
            })
        )

        const signer = Keypair.fromSecretKey(from.secretKey)
        const sendConfirmResponse = await sendAndConfirmTransaction(connection, transaction, [signer])
        console.log(sendConfirmResponse)
    }

    async getBalance(publicKey: string): Promise<number> {
        const pubkey = new PublicKey(publicKey)
        return await connection.getBalance(pubkey)
    }
}