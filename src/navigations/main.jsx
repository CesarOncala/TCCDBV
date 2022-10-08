import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/home'
import {Unidade} from '../pages/unidade'
import {DesbravadoresView} from '../pages/desbravadores-view'
import {AtividadeView} from '../pages/atividade-view'
import {Register} from '../pages/register'

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

       <Stack.Screen
        name="DesbravadoresView"
        component={DesbravadoresView}
        options={{
          header: () => null,
        }}/>
      
       <Stack.Screen
        name="Register"
        component={Register}
        options={{
          header: () => null,
        }}/>
     
    </Stack.Navigator>
  );
};

export default Main;
