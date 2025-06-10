import { useState, useContext } from 'react';
import { AuthToken } from './AuthToken';

function AddItem({ onItemAdded }) {

    const { authToken } = useContext(AuthToken);

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: ''
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

        try {
            const response = await fetch(`${API_URL}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Item Added!');
                console.log('Success:', result);
                // Handle successful login (e.g., redirect, store token, etc.)
                if (onItemAdded) {
                    onItemAdded();
                }

            } else {
                const error = await response.json();
                setMessage(`Error: ${error.message || 'Add Item failed'}`);
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <>
            <h3>Add an Item</h3>


            <form>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={handleInputChange} disabled={!Boolean(authToken)}></input><br />
                    <label htmlFor="location">Description: </label>
                    <input type="text" name="description" onChange={handleInputChange} disabled={!Boolean(authToken)}></input><br />
                    <label htmlFor="category">Category: </label>
                    <input type="text" name="category" onChange={handleInputChange} disabled={!Boolean(authToken)}></input><br />
                    <br />
                    <button type="submit" onClick={handleSubmit} disabled={!Boolean(authToken)}>Add Item</button><br />
            </form>


        </>
    );

}

export default AddItem;