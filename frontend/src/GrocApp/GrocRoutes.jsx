import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Items from './Items';
import Login from './Login';
import Stores from './Stores';

function GrocRoutes() {

    return(
        <>
            <BrowserRouter>
                <Login />
                <Routes>
                    <Route path="/" element={<Items />} />
                    <Route path="/fe-stores" element={<Stores />} />
                </Routes>
            </BrowserRouter>
        </>
    );

}

export default GrocRoutes;