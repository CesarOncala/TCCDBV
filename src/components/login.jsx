import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../contexts/appContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Register } from '../pages/register';
import env from '../../environments'


export function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isregistering, setRegistering] = useState(false)

  const { setUser, setLogin, login } = useContext(AppContext);

  function Authenticate() {

    fetch(`${env.apiAddress}Users/authenticate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(o => o.json())
      .then(o => AuthValidation(o))
      .catch(e => console.log(e))

  }

  function AuthValidation(user) {

    if (user['jwt'] == undefined) {
      alert('Usuário ou senha inválidos ! 😒')
      return;
    }

    setUser(user.user)
    setLogin(()=> (o)=>{ props.authenticate(o) })
    
    props.authenticate(true)

    AsyncStorage.setItem('token', user.jwt)
  }



  return (
    <>
      {!isregistering ? <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Desbravadores</Text>
          <Image
            style={{ width: 200, height: 200, marginTop: -30, marginBottom: 30 }}
            source={{ uri: 'https://files.adventistas.org/institucional/pt/sites/20/2013/03/18160828/D1.png' }}
          />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)} />
        </View>

        <TouchableOpacity onPress={Authenticate} style={[styles.loginBtn, { marginBottom: 0 }]}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRegistering(true)} style={[styles.loginBtn, { marginTop: 12 }]}>
          <Text style={styles.loginText}>CADASTRAR-SE</Text>
        </TouchableOpacity>

      </View> : <Register finished={setRegistering} />}

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#6200ee",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});
