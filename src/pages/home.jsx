import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';


import {Atividade} from '../components/atividade'
import {Perfil} from '../components/perfil'
import {Unidade} from '../components/unidade'

const AtividadeRoute = () => <Atividade/>

const PerfilRoute = () => <Perfil/>

const UnidadeRoute = () => <Unidade/>


const Home = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'perfil', title: 'Perfil', icon: 'account' },
    { key: 'atividade', title: 'Atividade', icon: 'lead-pencil' },
    { key: 'unidade', title: 'Unidades', icon: 'account-group' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    perfil: PerfilRoute,
    atividade: AtividadeRoute,
    unidade: UnidadeRoute
  });


  const theme = {
    
    roundness: 2,
    version: 3,
    colors: {
      primary: 'darkblue',
    },
  };


  return (
    <BottomNavigation
      theme={theme}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;