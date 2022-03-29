import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/defaultLayout';

export function HomePage(props) {
    return (
        <DefaultLayout headerTitle="My Store">
            <ul>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/transactions">Transactions</Link>
                </li>
            </ul>
        </DefaultLayout>
    )
}