import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function ItemDetail() {
    const [item, setItem] = useState(null);
    const { authToken } = useContext(AuthToken);

    const params = useParams();

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `http://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

    useEffect(() => {

        fetch(`${API_URL}/items/${params.itemId}/prices`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((item) => {
                if (item) {
                    setItem(item[0]);
                }
            });

    }, []);

    if (item) {

        return (
            <>

                <h2>{item.name}</h2>

                <p><Link to="/">Back</Link></p>

                <p>
                    Description: {item.description}<br />
                    Category: {item.category}<br />
                    Low Price: {item.lowPrice.toFixed(2)}<br />
                    High Price: {item.highPrice.toFixed(2)}<br />
                    Average Price: {item.averagePrice.toFixed(2)}<br />
                    Price Count: {item.priceCount}<br />
                </p>

                <ul>
                    {item.prices.map(price => <li key={price._id}><Link to={`/fe-stores/${price.storeId}`}>{price.store.name}</Link> price: {price.price.toFixed(2)}{price.onsale ? ', on sale' : ''}</li>)}
                </ul>

            </>
        )

    } else {

        return (<p>No prices found. Choose a store and add a price for this item.</p>);

    }
}

export default ItemDetail;
