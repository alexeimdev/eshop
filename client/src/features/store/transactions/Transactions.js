import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Transactions.module.scss';
import TransactionsList from './TransactionsList';
import TransactionDetails from './TransactionDetails';
import { addTransaction } from './transactionsSlice';

export default function Transactions(props) {

    const dispatch = useDispatch();

    function handleAddTransaction() {
        dispatch(addTransaction());
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.transactionsListWrapper}>
                <button onClick={handleAddTransaction}> Add </button>
                <TransactionsList />
            </div>
            <div className={styles.transactionDetailsWrapper}>
                <TransactionDetails />
            </div>
        </div>
    )
}