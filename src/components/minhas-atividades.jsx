import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { List } from 'react-native-paper';
import mock from '../../mocks'


export const MinhasAtividades = () => {
    const renderItem = ({ item }) => (
        <List.Item
            title={item.title}
            description={item.description.length > 50 ? 
                item.description.slice(0,30)+'...' : item.description }
            left={props => <List.Icon {...props} icon="folder" />}
        />
    );

    return (
        <>
            <Text style={styles.title}>Lista de Atividades Pendentes</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={mock.atividades}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView></>
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
        textAlign:'center',
        
    },

});

