
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/navigations/main'
import { Unidade } from './src/pages/unidade';


export default function App() {
  return (
    <>
      <NavigationContainer>
        {/* <Main /> */}
        <Unidade />
      </NavigationContainer>
    </>
  );
}

