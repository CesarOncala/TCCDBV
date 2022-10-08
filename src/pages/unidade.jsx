import Header from '../components/header'
import { useNavigation } from '@react-navigation/native'
import { Text, TextInput, RadioButton, Button, FAB } from 'react-native-paper';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import mocks from '../../mocks'
import { useEffect } from 'react';
import { Message } from '../utils'

export const Unidade = ({ route }) => {

    const [obj, setObj] = useState(route?.params || null)
    const navigation = useNavigation();
    useEffect(() => {
        setObj(route.params)
        filterLider(obj?.liderId)
    }, [])

    /// Campos formulario
    const [nome, setNome] = useState(obj?.title || null)
    const [checked, setChecked] = useState(obj?.sex || null);
    const [agetrack, setAgetrack] = useState(obj?.agetrack || 10);
    const [lider, setLider] = useState([])


    function filterLider(id) {
        if (!id)
            return;
        setLider(mocks.lideres.find(o => o.id == id))
    }


    function onChange() {
        return (val) => {
            return setLider(val)
        }
    }

    function Request(type) {

        switch (type) {
            case 'delete':
                Message('Desejar deletar? 😢', 'Esta ação não podera ser desfeita!', () => alert('lindo'))
                break;
            case 'update':
                Message('Atualizar', 'Confirma atualização ? 😎', () => alert('gato'))
                break;
            case 'new':
                navigation.goBack()
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
                value={String(agetrack)}
                onChange={setAgetrack}
            ></TextInput>

            <SelectBox
                style={styles.field}
                label="Selecione um lider"
                options={mocks.lideres}
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
                    style={[styles.fab,{backgroundColor:'blue'}]}
                    onPress={() => Request('update')}
                    color={'white'}
                />

                <FAB
                    icon="trash-can"
                    color='white'
                    style={[styles.fab2,{ backgroundColor:'red'}]}
                    onPress={() => Request('delete')} />

            </> :

                <FAB
                    icon="content-save"
                    color='white'
                    style={[styles.fab,{backgroundColor:'green'}]}
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