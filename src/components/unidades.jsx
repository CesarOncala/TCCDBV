import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Appbar, FAB, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import env from '../../environments'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Unidades = () => {

    const navigation = useNavigation();
    const [unidadesList, setUnidadesList] = useState([])
    const renderItem = ({ item }) => (
        <List.Item
            title={item.name}
            // description={item.description.length > 50 ?
            //     item.description.slice(0, 30) + '...' : item.description}
            left={props => <List.Icon {...props} icon="home-group" />}
            onPress={() => navigation.navigate('Unidade', item)}
        />
    );

    useEffect(() => {

        LoadUsers()
        const willFocusSubscription = navigation.addListener('focus', () => {
            LoadUsers();
        });
        return willFocusSubscription;
    }, [])

    async function LoadUsers() {

        fetch(`${env.apiAddress}Unidade`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            }
        })
            .then(o => o.json())
            .then(o => {
                setUnidadesList(o)
            })
            .catch(o => console.log(o))
    }


    return <>
        <Appbar.Header>
            <Appbar.Content title='Unidades' />
        </Appbar.Header>

        <SafeAreaView style={styles.container}>
            <FlatList
                data={unidadesList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate('Unidade')}
        />
    </>
}


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})