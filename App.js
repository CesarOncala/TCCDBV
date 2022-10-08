
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/navigations/main'
import { Login } from './src/components/login'
import { AppContextProvider } from './src/contexts/appContext'
import { useState } from 'react';


export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <AppContextProvider>
        <NavigationContainer>
          {!isAuthenticated ? <Login authenticate={setIsAuthenticated} /> : <Main />}
        </NavigationContainer>
      </AppContextProvider>
    </>
  );
}

