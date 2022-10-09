import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { AppContext } from '../contexts/appContext';

import { Atividade } from '../components/atividade'
import { Perfil } from '../components/perfil'
import { Unidades } from '../components/unidades'
import { Desbravadores } from '../components/desbravadores'

const AtividadeRoute = () => <Atividade />

const PerfilRoute = () => <Perfil />

const UnidadeRoute = () => <Unidades />

const DesbravadoresRoute = () => <Desbravadores />


const Home = () => {

  const [index, setIndex] = React.useState(0);
  const { user } = React.useContext(AppContext)
  // 1 - Lider
  // 0 - Desbravador

  const [routes] = React.useState([
    { key: 'perfil', title: 'Perfil', icon: 'account', typeUser: [1, 0] },
    { key: 'atividade', title: 'Atividade', icon: 'lead-pencil', typeUser: [1] },
    { key: 'unidades', title: 'Unidades', icon: 'account-group', typeUser: [1] },
    { key: 'desbravadores', title: 'Desbravadores', icon: 'account-box-multiple', typeUser: [1] },
  ].filter(o=> o.typeUser.includes(user.role)));


  const renderScene = BottomNavigation.SceneMap({
    perfil: PerfilRoute,
    atividade: AtividadeRoute,
    unidades: UnidadeRoute,
    desbravadores: DesbravadoresRoute
  });


  const theme = {

    roundness: 2,
    version: 3,
    colors: {
      primary: '#6200ee',
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