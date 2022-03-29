import React from 'react';
import styles from './TransactionItem.module.scss';

export default function TransactionItem(props) {

    return (
        <li className={styles.container}>
            <img src="" alt={props.transaction.name} className={styles.image} />
            <div className={styles.transactionInfo}>
                <div>{props.transaction.name}</div>
                <div>{props.transaction.description}</div>
                <div>{props.transaction.price}</div>
            </div>
            <div>
                <button onClick={() => props.onEditTransaction(props.transaction.id)}>Edit</button>
            </div>
            <div>
                <button onClick={() => props.onDeleteTransaction(props.transaction.id)}>Delete</button>
            </div>
        </li>
    )
}