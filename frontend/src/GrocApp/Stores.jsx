import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthToken } from './AuthToken';
import AddStore from './AddStore';

function Stores() {
  const [stores, setStores] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
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
        .then((obj) => {
          if (obj) {
            setStores(obj);
          }
        });

    }

  }, [refreshTrigger, authToken]);

  const handleStoreAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>

      <h2>Stores</h2>

      <Link to="/">Home</Link>

      <ul>
        {Boolean(stores) && stores.map(store => <li key={store._id}><Link to={store._id}>{store.name}</Link>, {store.location}</li>)}
      </ul>

      <AddStore onStoreAdded={handleStoreAdded} />

    </>
  )
}

export default Stores;
