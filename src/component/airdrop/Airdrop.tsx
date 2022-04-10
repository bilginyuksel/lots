import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@mui/material'
import { useState } from 'react'

interface AirdropProps {
    airdrop(publicKey: string, amount: number): Promise<void>
}

export default function Airdrop(props: AirdropProps) {
    const [publicKey, setPublicKey] = useState('')
    const [amount, setAmount] = useState<number>(0)

    const [loading, setLoading] = useState(false)

    const handleAirdrop = async () => {
        setLoading(true)
        await props.airdrop(publicKey, amount)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <Card
            className='card'
            variant="elevation"
            elevation={4}
        >
            <CardHeader title='Airdrop Request' />

            <CardContent className='card-content'>
                <TextField
                    label="Public Key"
                    placeholder="Public key"
                    style={{ marginTop: '1rem' }}
                    value={publicKey}
                    onChange={e => setPublicKey(e.target.value)}>
                </TextField>

                <TextField
                    label="Airdrop Amount"
                    placeholder="Airdrop Amount"
                    type="number"
                    style={{ marginTop: '1rem' }}
                    value={amount}
                    onChange={e => setAmount(parseInt(e.target.value))}>
                </TextField>

                <Button
                    variant='outlined'
                    style={{ marginTop: '1rem' }}
                    disabled={loading}
                    onClick={handleAirdrop}>
                        {loading ? <CircularProgress size={24} /> : 'Airdrop'}
                </Button>

            </CardContent>
        </Card>
    )
}