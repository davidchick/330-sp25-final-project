import { useState, useEffect, useContext } from 'react';
import { AuthToken } from './AuthToken';
import { Link } from "react-router-dom";


function Items() {
  const [items, setItems] = useState([]);
  const { authToken } = useContext(AuthToken);

  let API_URL;
  import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then((items) => {
        if (items) {
          setItems(items);
        }
      });

  }, []);

  return (
    <>

      <h2>Items</h2>

      <Link to="/">Home</Link>

      <ul>
        {Boolean(items) && items.map(item => <li key={item._id}><Link to={item._id}>{item.name}</Link>, {item.description}</li>)}
      </ul>

    </>
  )
}

export default Items;
