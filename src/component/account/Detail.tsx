import { Account } from "../../blockchain/Blockchain";

interface AccountDetailComponentProps {
    getAccountDetails(): Promise<Account>
}

export function AccountDetailComponent(props: AccountDetailComponentProps) {
    return (
        <div>
            <h1>Account Details</h1>
            <p>
                <button onClick={() => props.getAccountDetails()}>
                    Get Account Details
                </button>
            </p>
        </div>
    );
}