import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function StoreDetail() {
    const [store, setStore] = useState([]);
    const { authToken } = useContext(AuthToken);

    const params = useParams();

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';


    useEffect(() => {

        if (authToken) {

            fetch(`${API_URL}/stores/${params.storeId}/prices`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            })
                .then(res => res.json())
                .then((store) => {
                    if (store) {
                        setStore(store);
                    }
                });

            // 'Content-Type': 'application/json', // Optional: if sending JSON
            // body: JSON.stringify(data), // Optional: if sending data in the body

        }

    }, [authToken]);

    if (store[0]) {

        //console.log(store)

        return (
            <>

                <h2>{store[0].name}</h2>

                <p><Link to="/fe-stores">Back</Link></p>

                <p>Location: {store[0].location}<br /></p>

                <h3>Items</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>On Sale</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {store.map(store =>
                            <tr key={store.items._id}>
                                <td>{store.items.name}</td>
                                <td>{store.items.description}</td>
                                <td>{store.items.category}</td>
                                <td>{store.prices.price}</td>
                                <td>{store.prices.onsale.toString()}</td>
                                <td>{store.prices.date}</td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </>
        )

    } else {

        return (
            <>
                <p>no items for store</p>
                <p><Link to="/fe-stores">Back</Link></p>
            </>
        );

    }

}

export default StoreDetail;
