import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function StoreDetail() {
    const [store, setStore] = useState(null);
    const { authToken } = useContext(AuthToken);

    const params = useParams();

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';


    useEffect(() => {

        if (authToken) {

            fetch(`${API_URL}/stores/${params.storeId}`, {
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

    if (store) {

        return (
            <>

                <h2>{store.name}</h2>

                <p><Link to="/fe-stores">Back</Link></p>

                <p>Location: {store.location}<br /></p>

                {/* <ul>
                    {Boolean(stores) && stores.map(store => <li key={store._id}>{store.name}, {store.location}</li>)}
                </ul> */}

            </>
        )

    } else {

        return (<p>no store</p>)

    }

}

export default StoreDetail;
