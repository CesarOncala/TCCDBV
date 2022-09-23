import { Text, StyleSheet } from 'react-native'
import { Appbar, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export const Unidades = () => {

    const navigation = useNavigation();

    return <>
        <Appbar.Header>
            <Appbar.Content title='Unidades' />
        </Appbar.Header>
        <Text> OI </Text>
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate('MinhasAtividades')}
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