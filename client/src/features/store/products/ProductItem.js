import React from 'react';
import styles from './ProductItem.module.scss';

export default function ProductItem(props) {

    return (
        <li className={styles.container}>
            <img src="" alt={props.product.name} className={styles.image} />
            <div className={styles.productInfo}>
                <div>{props.product.name}</div>
                <div>{props.product.description}</div>
                <div>{props.product.price}</div>
            </div>
            <div>
                <button onClick={() => props.onEditProduct(props.product.id)}>Edit</button>
            </div>
            <div>
                <button onClick={() => props.onDeleteProduct(props.product.id)}>Delete</button>
            </div>
        </li>
    )
}