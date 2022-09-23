
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Header from '../components/header'
import { Text, StyleSheet, Image, View } from 'react-native'

export const AtividadeView = ({ route }) => {

    const navigation = useNavigation();
    const [obj, setObj] = useState(route?.params || {})

    useEffect(() => setObj(route.params), [])

    return (

        <>
            <Header title={obj.title} goBack={() => navigation.goBack()}>
            </Header>


            <Text style={styles.title}>Unidades que devem fazer</Text>
            <Text style={styles.desc}>{obj.unidades.join(' , ')}</Text>

            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.desc}> {obj.description} </Text>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://ligadanatureza.files.wordpress.com/2012/04/desbravador-10-cc3b3pia.jpg' }} />
            </View>


        </>

    )
}

const styles = StyleSheet.create({
    desc: {
        fontSize: 20,
        backgroundColor: 'darkblue',
        padding: 12,
        color: 'white'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        padding: 12,
        backgroundColor: 'darkblue',
        color: 'white',
        textAlign: 'center'
    },
    image: {
        width: 250,
        height: 250,
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: 23
    }
})