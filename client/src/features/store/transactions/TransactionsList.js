import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTransaction, deleteTransaction } from './transactionsSlice';
import TransactionItem from './TransactionItem';
import styles from './TransactionsList.module.scss';

export default function TransactionsList(props) {

    const dispatch = useDispatch();
    
    const transactions = useSelector(state => state.transactions.transactions);

    const [filter, setFilter] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    useEffect(() => {
        if (filter != '') {
            setFilteredTransactions(transactions.filter(p => p.name.includes(filter) || p.description.includes(filter)));
        } else {
            setFilteredTransactions(transactions);
        }
    }, [filter, transactions])
    
    function handleDeleteTransaction(transactionId) {
        dispatch(deleteTransaction(transactionId));
    }

    function handleEditTransaction(transactionId) {
        dispatch(editTransaction(transactionId));
    }

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    return (
        <div className={styles.container}>
            <div>
                <label>search </label>
                <input type="search" value={filter} onChange={handleFilterChange} />
            </div>
            <ul>
                {filteredTransactions?.map(transaction => 
                    <TransactionItem key={transaction.id}
                        transaction={transaction}
                        onEditTransaction={handleEditTransaction}
                        onDeleteTransaction={handleDeleteTransaction} />
                )}
            </ul>
        </div>
    )
}