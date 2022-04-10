import { List, ListItem, Divider, ListItemText, TextField, Button, ListSubheader, Card, CardHeader, CardContent, ListItemButton } from "@mui/material";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { Account } from "../../blockchain/Blockchain";

interface AccountProps {
    accounts: Account[]

    createAccount(): Promise<Account>
    getBalance(publicKey: string): Promise<number>
}

export default function AccountContainer(props: AccountProps) {
    const initialAccounts = [...props.accounts]
    const [accounts, setAccounts] = useState<Account[]>(initialAccounts)

    const handleCreateAccount = async () => {
        const account = await props.createAccount()
        setAccounts([...accounts, account])
        props.accounts.push(account)
    }

    const handleFetchAccountBalance = async (accountIndex: number) => {
        const account = accounts[accountIndex]
        const accountBalance = await props.getBalance(account.publicKey)
        account.balance = accountBalance / LAMPORTS_PER_SOL
        console.log(`Fetched account balance ${account.balance}`)
        setAccounts([...accounts])
        props.accounts[accountIndex].balance = account.balance
    }

    return (
        <Card
            className="card"
            variant="elevation"
            elevation={4}
        >
            <CardHeader title="Accounts" />
            <CardContent>
                {accounts.length === 0 &&
                    "There are no accounts!"
                }

                <List>
                    {accounts.map((a, idx) => (
                        <ListItem 
                        style={{ border: "1px solid #ccc", marginTop: "10px" }}
                        key={a.publicKey}>
                            <ListItemText
                                key={a.publicKey}
                                primary={a.publicKey}
                                secondary={`${a.balance} SOL`}
                            />
                            <Button 
                            size="small"
                             variant="outlined"
                             onClick={() => handleFetchAccountBalance(idx)}>Balance</Button>
                        </ListItem>)
                    )}
                </List>

                <Button
                    variant="outlined"
                    onClick={handleCreateAccount}>
                    Create Account
                </Button>
            </CardContent>
        </Card>
    )
}