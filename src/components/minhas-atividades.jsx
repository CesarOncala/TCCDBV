import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { List } from 'react-native-paper';
import mock from '../../mocks'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../environments'

export const MinhasAtividades = () => {

    const navigation = useNavigation();
    const [listaAtt, setListaAtt] = useState([])


    const renderItem = ({ item }) => (
        <List.Item
            title={item.titulo}
            description={item.descricao?.length > 50 ?
                item.descricao?.slice(0, 30) + '...' : item?.descricao}
            left={props => <List.Icon {...props} icon="folder" />}
            onPress={() => navigation.navigate('AtividadeView', item)}
        />
    );

    useEffect(() => {
        LoadAtividades();
    }, [])

    useEffect(()=>{
        console.log(listaAtt)
    },[listaAtt])


    async function LoadAtividades() {

        fetch(`${env.apiAddress}Atividade/atividadeslider`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        })
        .then(o => o.json())
        .then(o=>setListaAtt(o))
    }




    return (
        <>
            <Text style={styles.title}>Lista de Atividades Pendentes</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={listaAtt.filter(o => !o.finalizada)}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <Text style={styles.title}>Lista de Atividades Concluídas</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={listaAtt.filter(o => o.finalizada)}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8

    },

});

