import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// ID (number, unique)
// Name (string, up to 30 characters, mandatory)
// Description (string, up to 200 characters, optional)
// Price (number, larger than zero, mandatory)
// Creation Date (Date, mandatory)

const initialProducts = [
    { id: nanoid(), name: 'aaa', description: 'aaa111', price: 100, creationDate: Date.now() },
    { id: nanoid(), name: 'bbb', description: 'bbb222', price: 200, creationDate: Date.now() },
    { id: nanoid(), name: 'ccc', description: 'ccc333', price: 300, creationDate: Date.now() },
    { id: nanoid(), name: 'ddd', description: 'ddd444', price: 400, creationDate: Date.now() },
]

const initialProductForm = {
    id: '',
    name: '',
    description: '',
    price: '',
}

const initialState = {
    products: initialProducts,
    productForm: initialProductForm,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.productForm = initialProductForm;
        },
        editProduct: (state, action) => {
            const product = state.products.find(product => product.id === action.payload);
            state.productForm = product;
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        saveProduct: (state, action) => {
            if (state.productForm?.id) {
                // edit mode
                const products = state.products.map(product => {
                    return product.id === state.productForm.id ? state.productForm : product;
                });
                state.products = [...products];
                state.productForm = initialProductForm;
            } else {
                // new mode
                const isProductNameExists = state.products.findIndex(product => product.name == state.productForm.name) > -1;
                if (!isProductNameExists) {
                    state.productForm.id = nanoid();
                    state.productForm.creationDate = Date.now();
                    state.products.push(state.productForm);
                    state.productForm = initialProductForm;
                } else {
                    console.error('product name is already exists!');
                }

            }
        },
        setProductName: (state, action) => {
            state.productForm.name = action.payload;
        },
        setProductDescription: (state, action) => {
            state.productForm.description = action.payload;
        },
        setProductPrice: (state, action) => {
            state.productForm.price = action.payload;
        },
    }
})

export const {
    setProducts,
    addProduct,
    editProduct,
    deleteProduct,
    saveProduct,
    setProductName,
    setProductDescription,
    setProductPrice,
} = productsSlice.actions;

export default productsSlice.reducer;