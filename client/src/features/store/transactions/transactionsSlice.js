import { createSlice } from "@reduxjs/toolkit";

const initialTransactions = [
    {
        "_id": "12345",
        "customer_id": "813-86-3131",
        "first_name": "Benedikt",
        "last_name": "Abberley",
        "email": "babberley0@artisteer.com",
        "gender": "Male",
        "country": "Nicaragua",
        "city": "San Jorge",
        "street": "415 Green Lane",
        "phone": "887-564-6105",
        "total_price": "1329.12",
        "currency": "NIO",
        "cerdit_card_type": "mastercard",
        "cerdit_card_number": "5010126046192324"
    },
]

const initialTransactionForm = {
    _id: '',
    customer_id: '',
    first_name: '',
    last_name: '',
    gender: '',
    country: '',
    city: '',
    street: '',
    phone: '',
    total_price: '',
    currency: '',
    cerdit_card_type: '',
    cerdit_card_number: '',
}

const initialState = {
    transactions: localStorage.getItem("storeDemoTransactions") || initialTransactions,
    transactionForm: initialTransactionForm,
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        addTransaction: (state, action) => {
            state.transactionForm = initialTransactionForm;
        },
        editTransaction: (state, action) => {
            const transaction = state.transactions.find(transaction => transaction._id === action.payload);
            state.transactionForm = transaction;
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload);
        },
        saveTransaction: (state, action) => {
            if (state.transactionForm?.id) {
                // edit mode
                const transactions = state.transactions.map(transaction => {
                    return transaction._id === state.transactionForm._id ? state.transactionForm : transaction;
                });
                state.transactions = [...transactions];
                state.transactionForm = initialTransactionForm;
            } else {
                // new mode
                state.transactionForm.creationDate = Date.now();
                state.transactions.push(state.transactionForm);
                state.transactionForm = initialTransactionForm;
            }
        },
        setTransactionField: (state, action) => {
            state.transactionForm[action.payload.name] = action.payload.value;
        },
    }
})

export const {
    setTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    saveTransaction,
    setTransactionField,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;