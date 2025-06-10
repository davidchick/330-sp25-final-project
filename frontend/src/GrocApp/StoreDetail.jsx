import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddPrice from './AddPrice';

function StoreDetail() {
    const [store, setStore] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { authToken } = useContext(AuthToken);

    const params = useParams();

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

    useEffect(() => {

        fetch(`${API_URL}/stores/${params.storeId}/prices`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((obj) => {
                if (obj) {
                    setStore(obj);
                }
            });

    }, [refreshTrigger]);

    const handleStoreAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    if (store[0]) {


        return (
            <>

                <h2>{store[0].name}</h2>

                <p>Location: {store[0].location}<br /></p>

                <h3>Prices</h3>

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
                            <tr key={store.prices._id}>
                                <td><Link to={`/fe-items/${store.items._id}`}>{store.items.name}</Link></td>
                                <td>{store.items.description}</td>
                                <td>{store.items.category}</td>
                                <td>{store.prices.price.toFixed(2)}</td>
                                <td>{store.prices.onsale.toString()}</td>
                                <td>{store.prices.date}</td>
                            </tr>
                        )}
                    </tbody>

                </table>

                <AddPrice storeId={params.storeId} onStoreAdded={handleStoreAdded} />
            </>
        )

    } else {

        return (
            <>
                <p>No prices saved for this store yet.</p>

                <AddPrice storeId={params.storeId} onStoreAdded={handleStoreAdded} />
            </>
        );

    }

}

export default StoreDetail;
