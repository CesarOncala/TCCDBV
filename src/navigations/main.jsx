import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/home'
import {Unidade} from '../pages/unidade'
import {AtividadeView} from '../pages/atividade-view'

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}/>

       <Stack.Screen
        name="AtividadeView"
        component={AtividadeView}
        options={{
          header: () => null,
        }}/>
       
       <Stack.Screen
        name="Unidade"
        component={Unidade}
        options={{
          header: () => null,
        }}/>
     
    </Stack.Navigator>
  );
};

export default Main;
