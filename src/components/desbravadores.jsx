import {  FlatList, SafeAreaView } from 'react-native'
import { Appbar, List, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import {  useEffect, useState } from 'react'
import env from '../../environments'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message} from '../utils'

export const Desbravadores = () => {

    const navigation = useNavigation();
    const [listDBV, setListDBV] = useState([])

    const renderItem = ({ item }) => (
        <List.Item
            title={item.name}
            description={'Pontuação: ' + item.score}
            left={props => <List.Icon {...props} icon="account-circle" />}
            onPress={() => navigation.navigate('DesbravadoresView', item)}
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

        fetch(`${env.apiAddress}Users/ListDBVS`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            }
        })
            .then(o => o.json())
            .then(o => setListDBV(o))
            .catch(o => console.log(o))
    }

    return <>

        <Appbar.Header>
            <Appbar.Content title='Desbravadores' />
        </Appbar.Header>

        <SafeAreaView >
            <FlatList
                data={listDBV}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

        <FAB
            icon="crown-circle"
            style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
                fontSize: 50,
                color:'black',
                backgroundColor: 'yellow'
            }}
            onPress={()=>Message('Top 5 Desbravadores com maior pontuação!',listDBV.sort((x,y)=> x.score < y.score ? 1 : -1)
                .map(o=> `${o.name} : ${o.score}`)
                .slice(0,4)
                .join('\n'),null,null,false)}
        />

    </>
}