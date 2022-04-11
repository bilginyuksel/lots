import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Account } from "../../blockchain/Blockchain";

interface DelegateStakeProps {
    delegateStake(fund: Account, staker: Account, authorizedAccount: Account, amount: number, voteAccount: string): Promise<void>
    findAccount(publicKey: string): Account
}

export default function DelegateStakeContainer(props: DelegateStakeProps) {
    const [fundPubKey, setFundPubKey] = useState<string>("")
    const [stakerPubKey, setStakerPubKey] = useState<string>("")
    const [authorizedAccountPubKey, setAuthorizedAccountPubKey] = useState<string>("")
    const [voteAccountPubKey, setVoteAccountPubKey] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(false)

    const delegateFunds = async () => {
        setLoading(true)
        try {
            const fund = props.findAccount(fundPubKey)
            const staker = props.findAccount(stakerPubKey)
            const authorizedAccount = props.findAccount(authorizedAccountPubKey)
            await props.delegateStake(fund, staker, authorizedAccount, amount, voteAccountPubKey)
        } catch (e) {
            console.error(e)
            alert(e)
        }
        setLoading(false)
    }

    return (
        <Card className="card">
            <CardHeader title="Delegate Stake" />
            <CardContent className="card-content">
                <TextField
                    label="Fund Public Key"
                    placeholder="Fund Public key"
                    style={{ marginTop: '1rem' }}
                    value={fundPubKey}
                    onChange={e => setFundPubKey(e.target.value)}>
                </TextField>

                <TextField
                    label="Staker Public Key"
                    placeholder="Staker Public key"
                    style={{ marginTop: '1rem' }}
                    value={stakerPubKey}
                    onChange={e => setStakerPubKey(e.target.value)}>
                </TextField>

                <TextField
                    label="Authorized Public Key"
                    placeholder="Authorized Public key"
                    style={{ marginTop: '1rem' }}
                    value={authorizedAccountPubKey}
                    onChange={e => setAuthorizedAccountPubKey(e.target.value)}>
                </TextField>

                <TextField
                    label="Vote Public Key"
                    placeholder="Vote Public key"
                    style={{ marginTop: '1rem' }}
                    value={voteAccountPubKey}
                    onChange={e => setVoteAccountPubKey(e.target.value)}>
                </TextField>

                <TextField
                    label="Stake Amount"
                    placeholder="Stake Amount"
                    style={{ marginTop: '1rem' }}
                    value={amount}
                    type="number"
                    onChange={e => setAmount(parseInt(e.target.value))}>
                </TextField>

                <Button
                    variant="outlined"
                    style={{ marginTop: '1rem' }}
                    onClick={delegateFunds}>
                    {loading ? <CircularProgress size={24} /> : 'Delegate'}
                </Button>
            </CardContent>
        </Card>
    )
}