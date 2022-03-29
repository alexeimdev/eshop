import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Products.module.scss';
import ProductsList from './ProductsList';
import ProductDetails from './ProductDetails';
import { addProduct } from './productsSlice';

export default function Products(props) {

    const dispatch = useDispatch();

    function handleAddProduct() {
        dispatch(addProduct());
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.productsListWrapper}>
                <button onClick={handleAddProduct}> Add </button>
                <ProductsList />
            </div>
            <div className={styles.productDetailsWrapper}>
                <ProductDetails />
            </div>
        </div>
    )
}