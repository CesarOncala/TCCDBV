import { Text, FlatList, SafeAreaView } from 'react-native'
import { Appbar, List } from 'react-native-paper'
import mock from '../../mocks'
import { useNavigation } from '@react-navigation/native'

export const Desbravadores = () => {

    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <List.Item
            title={item.item}
            description={'vazio'}
            left={props => <List.Icon {...props} icon="account-circle" />}
            onPress={() => navigation.navigate('DesbravadoresView', item)}
        />
    );


    return <>
        
        <Appbar.Header>
            <Appbar.Content title='Desbravadores' />
        </Appbar.Header>

        <SafeAreaView >
            <FlatList
                data={mock.desbravadores}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    </>
}