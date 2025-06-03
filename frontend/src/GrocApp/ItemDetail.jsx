import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function ItemDetail() {
    const [item, setItem] = useState(null);
    const { authToken } = useContext(AuthToken);


    const params = useParams();

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

    useEffect(() => {

        if (authToken) {

            fetch(`${API_URL}/items/${params.itemId}/prices`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            })
                .then(res => res.json())
                .then((item) => {
                    if (item) {
                        setItem(item[0]);
                    }
                });

        }

    }, [authToken]);

    if (item) {

        return (
            <>

                <h2>{item.name}</h2>

                <p><Link to="/">Back</Link></p>

                <p>
                    Description: {item.description}<br />
                    Category: {item.category}<br />
                    Low Price: {item.lowPrice}<br />
                    High Price: {item.highPrice}<br />
                    Average Price: {item.averagePrice}<br />
                    Price Count: {item.priceCount}<br />
                </p>

                <ul>
                    {item.prices.map(price => <li key={price._id}>Price: <Link to={`/fe-stores/${price.storeId}`}>{price.price}</Link>, On sale: {price.onsale.toString()}</li>)}
                </ul>

            </>
        )

    } else {

        return (<p>not found</p>);

    }
}

export default ItemDetail;
