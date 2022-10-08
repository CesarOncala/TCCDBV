import { useContext, useEffect, useState } from 'react'
import { Text, Appbar } from 'react-native-paper'
import { MinhasAtividades } from './minhas-atividades'
import { StyleSheet, View, Image } from 'react-native'
import { AppContext } from '../contexts/appContext'

export const Perfil = () => {

    const { user, login } = useContext(AppContext)

    const [nome, setNome] = useState(user?.name)
    const [unidade, setUnidade] = useState('Onix')
    const [dataN, setdataN] = useState(Number(user?.yearOfBirth))
    const [nivel, setNivel] = useState(user?.nivel)
    const [score, setScore] = useState(user?.score)


    return (<>

        <Appbar.Header>
            <Appbar.Content title='Perfil' />
            <Appbar.Action icon="logout" onPress={()=>login(false)} />
        </Appbar.Header>

        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{ user?.role == 1 ? 'Lider' : 'Desbravador' } <Text style={styles.value} > {nome}</Text> </Text>
                <Text style={styles.title}>Unidade <Text style={styles.value}>{unidade}</Text></Text>
                <Text style={styles.title}>Idade <Text style={styles.value}>{new Date().getFullYear() - dataN}</Text></Text>
                <Text style={styles.title}>Pontuação <Text style={styles.value}>{score}</Text></Text>
                <Text style={styles.title}>Bottons</Text>
                <View style={styles.bottons}>
                    {
                        [...Array(nivel).keys()].map((o, i) => i <= 5 ? <Image
                            key={i}
                            style={{ width: 25, height: 25 }}
                            source={require(`../../assets/${i + 1}.png`)}
                        /> : null)
                    }
                </View>
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
        width: 200, height: 200,
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