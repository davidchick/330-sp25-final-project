import './App.css'
import GrocRoutes from './GrocApp/GrocRoutes';
import { AuthToken } from './GrocApp/AuthToken';
import { useState } from 'react';

function App() {
 const [authToken, setAuthToken] = useState('');

  return (
    <>
        <AuthToken.Provider value={{authToken, setAuthToken}}>
            <GrocRoutes />
        </AuthToken.Provider>
    </>
  )
}

export default App;
