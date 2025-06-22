import { useState, useContext, useEffect } from 'react';
import { AuthToken } from './AuthToken';

function AddPrice(props) {

    const { storeId, onStoreAdded } = props;
    const { authToken } = useContext(AuthToken);
    const [items, setItems] = useState([]);

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `http://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

    const [formData, setFormData] = useState({
        price: 0,
        onsale: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tempData = formData;
        tempData.storeId = storeId;
        setFormData(tempData);

        try {
            const response = await fetch(`${API_URL}/prices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Store Added!');
                console.log('Success:', result);
                // Handle successful login (e.g., redirect, store token, etc.)
                if (onStoreAdded) {
                    onStoreAdded();
                }

            } else {
                const error = await response.json();
                setMessage(`Error: ${error.message || 'Add Store failed'}`);
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        fetch(`${API_URL}/items`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })
            .then(res => res.json())
            .then((items) => {
                if (items) {
                    setItems(items);
                }
            });
    }, []);

    return (
        <>
            <h3>Add a Price</h3>

            <form>
                <label htmlFor="itemId">Item: </label>
                <select name="itemId" onChange={handleInputChange}>
                    <option value=""></option>
                    {items.map(item => <option key={item._id} value={item._id}>{item.name} ({item.description})</option>)}
                </select><br />
                <label htmlFor="price">Price: </label>
                <input type="number" name="price" onChange={handleInputChange}></input><br />

                <label htmlFor="onsale">On Sale: </label>
                <input type="radio" name="onsale" id="true" value="true" onChange={handleInputChange} />
                <label htmlFor="true"> true </label>
                <input type="radio" name="onsale" id="false" value="false" onChange={handleInputChange} />
                <label htmlFor="false"> false </label><br />
                <br />
                <button type="submit" onClick={handleSubmit}>Add Price</button><br />
                <br />
            </form>
        </>
    );

}

export default AddPrice;