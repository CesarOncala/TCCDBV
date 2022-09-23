import { useState } from 'react'
import { Text, Appbar } from 'react-native-paper'
import { MinhasAtividades } from './minhas-atividades'
import { StyleSheet, View, Image } from 'react-native'

export const Perfil = () => {

    const [nome, setNome] = useState('rick')
    const [unidade, setUnidade] = useState('Onix')
    const [dataN, setdataN] = useState(new Date('2000-11-12'))
    const [nivel, setNivel] = useState(6)

    return (<>

        <Appbar.Header>
            <Appbar.Content title='Perfil' />
        </Appbar.Header>

        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Desbravador <Text style={styles.value} > {nome}</Text> </Text>
                <Text style={styles.title}>Unidade <Text style={styles.value}>{unidade}</Text></Text>
                <Text style={styles.title}>Idade <Text style={styles.value}>{new Date().getFullYear() - dataN.getFullYear()}</Text></Text>
                <Text style={styles.title}>Bottons</Text>
                {/* <View style={styles.bottons}>
                    {
                        [...Array(nivel).keys()].map((o, i) => i <= 5 ? <Image
                            key={i}
                            style={{ width: 25, height: 25 }}
                            source={require(`../../assets/${i + 1}.png`)}
                        /> : null)
                    }
                </View> */}
            </View>
            <Image style={styles.image}
                source={{ uri: 'https://i.pinimg.com/736x/e4/b0/9c/e4b09c6651c30d4d6226ca75797871a7--disney-up-russell.jpg' }} />
        </View>




        <MinhasAtividades />
    </>)
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 12
    },
    value: {
        color: 'white',
    },
    container: {
        backgroundColor: 'darkblue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    },
    image: {
        width: 250, height: 250,
        borderRadius: 130,
        marginRight: 15
    },
    bottons: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'bluesky',
        marginBottom: 8
    }
})