import { DefaultLayout } from '../layouts/defaultLayout';
import Transactions from '../features/store/transactions/Transactions';

export function TransactionsPage(props) {
    return (
        <DefaultLayout headerTitle="My Transactions">
           <Transactions />
        </DefaultLayout>
    )
}