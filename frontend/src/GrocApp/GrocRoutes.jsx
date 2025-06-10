import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Items from './Items';
import Stores from './Stores';
import ItemDetail from './ItemDetail';
import StoreDetail from './StoreDetail';
import TopNav from './TopNav';

function GrocRoutes() {

    return (
        <>
            <BrowserRouter>
                <h2> Grocery Price Comparatorizer</h2>
                <TopNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fe-items" element={<Items />} />
                    <Route path="/fe-items/:itemId" element={<ItemDetail />} />
                    <Route path="/fe-stores" element={<Stores />} />
                    <Route path="/fe-stores/:storeId" element={<StoreDetail />} />
                    <Route path="/fe-login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );

}

export default GrocRoutes;