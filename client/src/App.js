import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { HomePage } from './pages/homePage';
import { ProductsPage } from './pages/productsPage';
import { TransactionsPage } from './pages/transactionsPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/products">
                    <ProductsPage />
                </Route>
                <Route path="/transactions">
                    <TransactionsPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
