
import { TextInput, RadioButton, FAB, Appbar } from "react-native-paper"
import Header from '../components/header'
import { useState } from "react"
import { View, Text, StyleSheet } from 'react-native'
import { Message } from '../utils'
import env from '../../environments'

export const Register = (props) => {

    const [checked, setChecked] = useState('0');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')



    function Save() {
        if (!validate())
            return;


        fetch(`${env.apiAddress}Users/register`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    yearOfBirth: birthDate,
                    role: checked
                })
            })
            .then(o => o.json())
            .then(o => props.finished(false))
            .catch(e => alert(e))
    }

    function validate() {

        if (name == '' || email == '' || password == '') {
            Message('Cadastro Invalido', 'Por favor preencha todos os campos para continuar! 😒'
                , null, null, false)

            return false;
        }

        if (!email.includes('@') || !email.includes('.')) {
            Message('Preencha um email válido!', 'exemplo@gmail.com', null, null, false)

            return false;
        }

        if (birthDate.length < 3) {
            Message('Ah vamos lá!', 'Você não é tão velho assim! 😒', null, null, false)
            return false;
        }

        if (Number(birthDate) == NaN ){
            Message('Ah vamos lá!', 'Letras não são números!', null, null, false)
            return false;
        }


        return true;

    }



    return <>

        <Header title={'Cadastro'} >
            <Appbar.Action icon="close" onPress={() => props.finished(false)} />
        </Header>

        <TextInput
            label={'Nome'}
            placeholder={'Digite seu nome'}
            onChangeText={setName}
            value={name}
        ></TextInput>

        <TextInput
            label={'Ano de Nascimento'}
            placeholder={'Digite o ano de nascimento'}
            onChangeText={setBirthDate}
            value={birthDate}
            keyboardType={'numeric'}
        ></TextInput>

        <TextInput
            label={'Email'}
            placeholder={'exemplo@gmail.com'}
            onChangeText={setEmail}
            value={email}
            keyboardType={'email-address'}
        ></TextInput>

        <TextInput
            secureTextEntry
            label={'Password'}
            placeholder={'Digite uma nova senha'}
            onChangeText={setPassword}
            value={password}
        ></TextInput>

        <View style={styles.typeUser}>
            <Text style={styles.h1}>Tipo de Usuário</Text>
            <View style={styles.radioContainer}>
                <View style={styles.radioBtn} >
                    <Text style={styles.label}>Lider</Text>
                    <RadioButton
                        value="1"
                        status={checked === '1' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('1')}
                    />
                </View>
                <View style={styles.radioBtn}>
                    <Text style={styles.label}>Desbravador</Text>
                    <RadioButton
                        value="0"
                        status={checked === '0' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('0')}
                    />
                </View>

            </View>
        </View>

        <FAB
            icon="content-save"
            color='white'
            style={[styles.fab, { backgroundColor: 'green' }]}
            onPress={Save} />

    </>
}

const styles = StyleSheet.create({

    label: {
        fontSize: 15,
    },

    radioBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10
    },

    radioContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },

    typeUser: {
        marginTop: 15,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },

})