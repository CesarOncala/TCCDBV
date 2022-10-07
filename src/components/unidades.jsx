import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Appbar, FAB, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import mock from '../../mocks'

export const Unidades = () => {

    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <List.Item
            title={item.title}
            description={item.description.length > 50 ?
                item.description.slice(0, 30) + '...' : item.description}
            left={props => <List.Icon {...props} icon="folder" />}
            onPress={() => navigation.navigate('Unidade', item)}
        />
    );

    return <>
        <Appbar.Header>
            <Appbar.Content title='Unidades' />
        </Appbar.Header>

        <SafeAreaView style={styles.container}>
            <FlatList
                data={mock.unidadeslist}
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