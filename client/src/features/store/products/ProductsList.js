import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, deleteProduct } from './productsSlice';
import ProductItem from './ProductItem';
import styles from './ProductsList.module.scss';

export default function ProductsList(props) {

    const dispatch = useDispatch();
    
    const products = useSelector(state => state.products.products);

    const [filter, setFilter] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (filter != '') {
            setFilteredProducts(products.filter(p => p.name.includes(filter) || p.description.includes(filter)));
        } else {
            setFilteredProducts(products);
        }
    }, [filter, products])
    
    function handleDeleteProduct(productId) {
        dispatch(deleteProduct(productId));
    }

    function handleEditProduct(productId) {
        dispatch(editProduct(productId));
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
                {filteredProducts?.map(product => 
                    <ProductItem key={product.id}
                        product={product}
                        onEditProduct={handleEditProduct}
                        onDeleteProduct={handleDeleteProduct} />
                )}
            </ul>
        </div>
    )
}