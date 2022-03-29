import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    saveTransaction,
    setTransactionField,
} from './transactionsSlice';
import styles from './TransactionDetails.module.scss';

export default function TransactionDetails(props) {

    const dispatch = useDispatch();
    const transactionForm = useSelector(state => state.transactions?.transactionForm);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(saveTransaction());
    }

    function handleNameChange(e) {
        dispatch(setTransactionField(e.target.name, e.target.value));
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label> Name </label>
                    </div>
                    <div>
                        <input
                            type="text"
                            maxLength={30}
                            required 
                            value={transactionForm?.name}
                            onChange={handleNameChange} />
                    </div>
                </div>
                <div className={styles.saveFormButtonWrapper}>
                    <button type="submit" >Save</button>
                </div>
            </form>
        </div>
    )
}