import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';


function Stores() {
  const [stores, setStores] = useState([]);
  const { authToken } = useContext(AuthToken);

  let API_URL;
  import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';


  useEffect(() => {

    if (authToken) {

      fetch(`${API_URL}/stores`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        }
      })
        .then(res => res.json())
        .then((stores) => {
          if (stores) {
            setStores(stores);
          }
        });

      // 'Content-Type': 'application/json', // Optional: if sending JSON
      // body: JSON.stringify(data), // Optional: if sending data in the body

    }

  }, [authToken]);

  return (
    <>

      <h2>Stores</h2>

      <ul>
        {Boolean(stores) && stores.map(store => <li key={store._id}>{store.name}, {store.location}</li>)}
      </ul>

    </>
  )
}

export default Stores;
