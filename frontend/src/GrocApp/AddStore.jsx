
import { useState, useContext } from 'react';
import { AuthToken } from './AuthToken';

function AddStore({ onStoreAdded }) {

    const { authToken } = useContext(AuthToken);

    let API_URL;
    import.meta.env.VITE_API_URL ? API_URL = `https://${import.meta.env.VITE_API_URL}` : API_URL = 'http://localhost:3000';

    const [formData, setFormData] = useState({
        name: '',
        location: ''
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
            const response = await fetch(`${API_URL}/stores`, {
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

    return (
        <>
            <h3>Add A Store</h3>

            <form>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" onChange={handleInputChange}></input><br />
                <label htmlFor="location">Location: </label>
                <input type="text" name="location" onChange={handleInputChange}></input><br />
                <br />
                <button type="submit" onClick={handleSubmit}>Add Store</button><br />
            </form>
        </>
    );

}

export default AddStore;