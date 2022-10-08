import Header from '../components/header'
import { useNavigation } from '@react-navigation/native'
import { Text, TextInput, RadioButton, FAB } from 'react-native-paper';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { useEffect } from 'react';
import { Message } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../environments'

export const Unidade = ({ route }) => {

    const [obj, setObj] = useState(route?.params || {})
    const navigation = useNavigation();


    useEffect(() => {
        setObj(route.params)
        LoadLideres()
    }, [])


    const request = async (method, queryp, obj) => {

        return fetch(`${env.apiAddress}Unidade/${queryp || ''}`, {
            method: method,
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(obj)
        }).then(o => o.json())

    }

    /// Campos formulario
    const [nome, setNome] = useState(obj?.name || '')
    const [checked, setChecked] = useState(obj?.sex || 'M');
    const [agetrack, setAgetrack] = useState(obj?.ageTrack || 10);
    const [lider, setLider] = useState([])
    const [lideres, setLiders] = useState([])


    function filterLider(id, items) {
        debugger;
        if (!id)
            return;
        setLider(items?.find(o => o.id == id) || items[0])
    }

    async function LoadLideres() {
        fetch(`${env.apiAddress}Users/Lideres`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            }
        })
            .then(o => o.json())
            .then(o => {
                setLiders(o)
                filterLider(obj?.liderId, o)
            })
    }


    function onChange() {
        return (val) => {
            return setLider(val)
        }
    }

    async function Request(type) {


        let temp = {
            name: nome,
            agetrack: agetrack,
            sex: checked,
            liderid: lider.id,
        }

        if (obj != undefined) {
            obj.name = temp.name;
            obj.ageTrack = temp.agetrack;
            obj.sex = temp.sex;
            obj.liderId = temp.liderid;
        }

        switch (type) {
            case 'delete':
                Message('Desejar deletar? 😢', 'Esta ação não podera ser desfeita!', () =>
                request('DELETE', obj.id).then(o => navigation.goBack()))
              
                break;
            case 'update':
               
                Message('Atualizar', 'Confirma atualização ? 😎', () =>
                request('PUT', '', obj).then(o => navigation.goBack()) )
                break;
            case 'new':
                request('POST', '', temp).then(o => navigation.goBack())

                break;
            default:
                break;
        }
    }




    return <>

        <Header title={nome || 'Nova Unidade'} goBack={() => navigation.goBack()}>
        </Header>

        <View style={styles.container}>
            <TextInput
                style={styles.field}
                placeholder={'Digite o nome da unidade...'}
                label={'Nome da Unidade'}
                value={nome}
                onChangeText={setNome}
            ></TextInput>

            <TextInput
                style={styles.field}
                placeholder={'Digite a faixa etária...'}
                keyboardType={'numeric'}
                value={agetrack}
                onChangeText={setAgetrack}
            ></TextInput>

            <SelectBox
                style={styles.field}
                label="Selecione um lider"
                options={lideres}
                value={lider}
                onChange={onChange()}
                hideInputFilter={false}
            />


            <View style={[styles.field, { marginTop: 50 }]}>
                <Text style={styles.title}>Selecione o sexo da unidade</Text>
                <View style={styles.genero}>
                    <View>
                        <Text>Masculino</Text>
                        <RadioButton
                            value="M"
                            status={checked === 'M' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('M')}
                        />
                    </View>

                    <View>
                        <Text>Feminino</Text>
                        <RadioButton
                            value="F"
                            status={checked === 'F' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('F')}
                        />
                    </View>
                </View>
            </View>

            {obj ? <>

                <FAB
                    icon="update"
                    style={[styles.fab, { backgroundColor: 'blue' }]}
                    onPress={() => Request('update')}
                    color={'white'}
                />

                <FAB
                    icon="trash-can"
                    color='white'
                    style={[styles.fab2, { backgroundColor: 'red' }]}
                    onPress={() => Request('delete')} />

            </> :

                <FAB
                    icon="content-save"
                    color='white'
                    style={[styles.fab, { backgroundColor: 'green' }]}
                    onPress={() => Request('new')} />

            }
        </View>



    </>
}

const styles = StyleSheet.create({

    genero: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 12,
    },
    field: {
        marginBottom: 12,
        marginTop: 8
    },
    button: {
        marginBottom: 12
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        marginBottom: -150,
        backgroundColor: 'darkblue'
    },
    fab2: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
        marginBottom: -150,
        marginLeft: 220,
        backgroundColor: 'darkblue'
    },

})