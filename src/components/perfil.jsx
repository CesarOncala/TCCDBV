import { useContext, useEffect, useState } from 'react'
import { Text, Appbar } from 'react-native-paper'
import { MinhasAtividades } from './minhas-atividades'
import { StyleSheet, View, Image } from 'react-native'
import { AppContext } from '../contexts/appContext'
import { images } from '../utils'


import p1 from '../../assets/1.png'
import p2 from '../../assets/2.png'
import p3 from '../../assets/3.png'
import p4 from '../../assets/4.png'
import p5 from '../../assets/5.png'
import p6 from '../../assets/6.png'

export const Perfil = () => {

    const { user, login } = useContext(AppContext)

    const [nome, setNome] = useState(user?.name)
    const [unidade, setUnidade] = useState(user?.unidade?.name || 'Sem unidade 😒')
    const [dataN, setdataN] = useState(Number(user?.yearOfBirth))
    const [nivel, setNivel] = useState(user?.nivel)
    const [score, setScore] = useState(user?.score)

    const imagesINS = {
        img1: p1,
        img2: p2,
        img3: p3,
        img4: p4,
        img5: p5,
        img6: p6
    }

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
                            source={imagesINS['img'+(i+1)]}
                        /> : null)
                    }
                </View>
            </View>
            <Image style={styles.image}
                source={images.up} />
        </View>


        <MinhasAtividades />
    </>)
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
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