import { Text, StyleSheet } from 'react-native'
import { Appbar, FAB } from 'react-native-paper'

export const Unidade = () => {

    return <>
        <Appbar.Header>
            <Appbar.Content title='Unidades' />
        </Appbar.Header>
        <Text> OI </Text>
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => console.log('Pressed')}
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