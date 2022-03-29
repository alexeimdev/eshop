import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    saveProduct,
    setProductName,
    setProductDescription,
    setProductPrice,
} from './productsSlice';
import styles from './ProductDetails.module.scss';

export default function ProductDetails(props) {

    const dispatch = useDispatch();
    const productForm = useSelector(state => state.products?.productForm);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(saveProduct());
    }

    function handleNameChange(e) {
        dispatch(setProductName(e.target.value));
    }

    function handleDescriptionChange(e) {
        dispatch(setProductDescription(e.target.value));
    }

    function handlePriceChange(e) {
        dispatch(setProductPrice(e.target.value));
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
                            value={productForm?.name}
                            onChange={handleNameChange} />
                    </div>
                </div>
                <div>
                    <div>
                        <label> Description </label>
                    </div>
                    <div>
                        <textarea
                            maxLength={200}
                            rows={10}
                            cols={50}
                            value={productForm?.description}
                            onChange={handleDescriptionChange} />
                    </div>
                </div>
                <div>
                    <div>
                        <label> Price </label>
                    </div>
                    <div>
                        <input
                            type="number"
                            min={0}
                            required
                            value={productForm?.price}
                            onChange={handlePriceChange} />
                    </div>
                </div>
                <div className={styles.saveFormButtonWrapper}>
                    <button type="submit" >Save</button>
                </div>
            </form>
        </div>
    )
}