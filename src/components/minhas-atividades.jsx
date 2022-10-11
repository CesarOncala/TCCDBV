import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../environments'
import {AppContext} from '../contexts/appContext'

export const MinhasAtividades = () => {

    const navigation = useNavigation();
    const [listaAtt, setListaAtt] = useState([])
    const {user} = useContext(AppContext)

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
        const willFocusSubscription = navigation.addListener('focus', () => {
            LoadAtividades();
        });
        return willFocusSubscription;
    }, [])



    async function LoadAtividades() {

        fetch(`${env.apiAddress}Atividade/${user.role == '1' ? 'atividadeslider' : `atividadesdesbravador` }`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        })
            .then(o => o.json())
            .then(o => setListaAtt(o))
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
            <FAB
            icon="refresh"
            color='white'
            style={[styles.fab2, { backgroundColor: 'blue' }]}
            onPress={LoadAtividades}
        />
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
    fab2: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        fontSize: 50,
    },

});

