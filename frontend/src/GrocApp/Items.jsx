import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';
import { Link } from "react-router-dom";
import AddItem from './AddItem';


function Items() {
  const [items, setItems] = useState([]);
  const { authToken } = useContext(AuthToken);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  let API_URL;
  import.meta.env.VITE_API_URL ? API_URL = `http://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

  useEffect(() => {
    fetch(`${API_URL}/items`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then((items) => {
        if (items) {
          setItems(items);
        }
      });

  }, [refreshTrigger]);

  const handleItemAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>

      <h2>Items</h2>

      <ul>
        {Boolean(items) && items.map(item => <li key={item._id}><Link to={item._id}>{item.name}</Link>, {item.description}</li>)}
      </ul>

      <AddItem onItemAdded={handleItemAdded} />

    </>
  )
}

export default Items;
