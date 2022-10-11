import { TextInput, Text, Appbar, FAB } from 'react-native-paper'
import { useState, useEffect } from 'react'
import { xorBy } from 'lodash'
import SelectBox from 'react-native-multi-selectbox'
import { View, StyleSheet, Image, ScrollView } from 'react-native'
import { Message } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../environments'


export const Atividade = () => {

    const [desbravadores, setDesbravadores] = useState([])
    const [listaDBV, setListaDBV] = useState([])
    const [unidade, setUnidade] = useState({})
    const [unidades, setUnidades] = useState([])
    const [descricao, setDescricao] = useState('')
    const [titulo, setTitulo] = useState('')

    function onMultiChange() {
        return (item) => {
            return setDesbravadores(xorBy(desbravadores, [item], 'id'))
        }
    }

    function onChange() {
        return (val) => {
            LoadDesbravadores(val.id)
            return setUnidade(val)
        }
    }


    useEffect(() => {
        LoadUnidades();
    }, [])



    async function LoadDesbravadores(unidadeId) {
        fetch(`${env.apiAddress}Users/Desbravadores/${unidadeId}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            }
        })
            .then(o => o.json())
            .then(o => {
                setDesbravadores([])
                setListaDBV(o)
            })
    }

    async function LoadUnidades() {

        fetch(`${env.apiAddress}Unidade/UnidadesList`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            }
        })
            .then(o => o.json())
            .then(o => setUnidades(o))
            .catch(o => console.log(o))
    }



    async function sendAtividade() {

        if (Validate())
            return;

        fetch(`${env.apiAddress}Atividade`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                desbravadores: desbravadores.map(o => o.obj),
                unidade: unidade.obj,
                descricao,
                titulo
            })
        })
            .then(o => o.json())
            .then(o => {

                if (o['sucess'] != undefined && !o.sucess) {
                    alert(o.message)
                    return
                }
                setDescricao('')
                setDesbravadores([])
                setUnidade({})
                setTitulo('')
            })


    }

    function Validate() {

        let validations = [];

        if (descricao.trim() == '' || titulo.trim() == '')
            validations.push('É necessário preencher todos os campos! 😒')
        else if (descricao.length < 5 || titulo.length < 5)
            validations.push('A descrição e ou titulo estão muito curtos 😒')

        if (unidade['item'] == undefined)
            validations.push('Selecione uma unidade 😒')

        else if (!desbravadores.length)
            validations.push('Selecione pelo menos um Desbravador 😒')

        if (validations.length)
            Message('Por favor, corrija todos os itens para continuar!', validations.join('\n'), null, null, false)

        return validations.length > 0;
    }

    return <>
        <Appbar.Header>
            <Appbar.Content title='Atividade' />
        </Appbar.Header>

        <ScrollView>
            <View style={{ padding: 22 }}>

                <TextInput
                    label={'Título da atividade'}
                    placeholder={'Digite um título para a atividade'}
                    value={titulo}
                    style={{ marginBottom: 5 }}
                    onChangeText={text => setTitulo(text)}
                ></TextInput>


                <TextInput
                    label={'Atividade'}
                    multiline={true}
                    placeholder={'Descrição da atividade'}
                    value={descricao}
                    onChangeText={text => setDescricao(text)}
                ></TextInput>


                <View style={styles.selectContainer}>

                    <View style={styles.select}>
                        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Unidade</Text>
                        <SelectBox
                            label="Selecione uma unidade"
                            options={unidades}
                            value={unidade}
                            onChange={onChange()}
                            hideInputFilter={false}
                        />
                    </View>


                    <View style={styles.select}>
                        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Desbravadores</Text>
                        <SelectBox
                            label="Selecione uma ou mais desbravadores"
                            options={listaDBV}
                            selectedValues={desbravadores}
                            onMultiSelect={onMultiChange()}
                            onTapClose={onMultiChange()}
                            isMulti
                        />
                    </View>



                </View>

                <View style={styles.image}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: require('../../assets/m.png') ||  'https://i.pinimg.com/originals/8f/d0/fe/8fd0fea5927efb1207ee9d7dd4535260.png' }} />
                </View>




            </View>

        </ScrollView>

        <FAB
            icon="content-save"
            color='white'
            style={[styles.fab, { backgroundColor: 'green' }]}
            onPress={sendAtividade}
        />


        <FAB
            icon="refresh"
            color='white'
            style={[styles.fab2, { backgroundColor: 'blue' }]}
            onPress={LoadUnidades}
        />


    </>
}

const styles = StyleSheet.create({
    selectContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginBottom: 20
    },
    select: {
        marginBottom: 15,
        marginTop: 16,
        alignItems: 'center'
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        fontSize: 50,
        marginRight: 100
    },
    fab2: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        fontSize: 50,
    },
})
