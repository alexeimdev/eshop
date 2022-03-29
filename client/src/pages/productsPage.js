import { DefaultLayout } from '../layouts/defaultLayout';
import Products from '../features/store/products/Products';

export function ProductsPage(props) {
    return (
        <DefaultLayout headerTitle="My Products">
           <Products />
        </DefaultLayout>
    )
}