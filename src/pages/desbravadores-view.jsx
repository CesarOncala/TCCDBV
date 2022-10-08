import { useNavigation } from "@react-navigation/native"
import { useState } from "react";
import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native"
import Header from '../components/header'
import { Checkbox, Button, FAB } from 'react-native-paper';


export const DesbravadoresView = ({ route }) => {

    const navigation = useNavigation();
    const [user, setUser] = useState(route?.params || null);
    const [score, setScore] = useState(user?.score || 0);
    const [class1, setclass1] = useState(false);
    const [class2, setclass2] = useState(false);
    const [class3, setclass3] = useState(false);
    const [class4, setclass4] = useState(false);
    const [class5, setclass5] = useState(false);
    const [class6, setclass6] = useState(false);


    return <>
        <Header title={user.item} goBack={() => navigation.goBack()}>
        </Header>

        <View style={styles.score}>

            <Text style={styles.scoreValue}>Pontuação: {score}</Text>

            <TouchableOpacity
                onPress={() => setScore(score + 1)}

            >
                <Image
                    style={styles.img}
                    source={{ uri: 'https://www.pngitem.com/pimgs/m/230-2305936_mario-star-png-image-background-power-star-mario.png' }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => score > 0 ? setScore(score - 1) : 0}

            >
                <Image
                    style={styles.img}
                    source={{ uri: 'https://static.wikia.nocookie.net/universomario/images/a/a3/77519_1301185592608_full.jpg/revision/latest?cb=20120920224727&path-prefix=pt' }}
                />
            </TouchableOpacity>

        </View>




        <View style={styles.classes}>

            <View style={styles.class}>
                <Text style={styles.textClass}>
                    <Image
                        style={styles.imgClass}
                        source={{ uri: 'https://www.pngitem.com/pimgs/m/230-2305936_mario-star-png-image-background-power-star-mario.png' }}
                    /><Text style={styles.ImgClassText}>  Amigo</Text></Text>
                <Checkbox
                    status={class1 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setclass1(!class1);
                    }}
                />
            </View>

            <View style={styles.hr}></View>

            <View style={styles.class}>
                <Text style={styles.textClass}>
                    <Image
                        style={styles.imgClass}
                        source={{ uri: 'https://www.pngitem.com/pimgs/m/230-2305936_mario-star-png-image-background-power-star-mario.png' }}
                    /><Text style={styles.ImgClassText}>  Companheiro</Text></Text>
                <Checkbox
                    status={class2 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setclass2(!class2);
                    }}
                />
            </View>

            <View style={styles.hr}></View>

            <View style={styles.class}>

                <Text style={styles.textClass}><Image
                    style={styles.imgClass}
                    source={{ uri: 'https://www.pngitem.com/pimgs/m/230-2305936_mario-star-png-image-background-power-star-mario.png' }}
                /><Text style={styles.ImgClassText}>  Pesquisador</Text>
                </Text>
                <Checkbox
                    status={class3 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setclass3(!class3);
                    }}
                />
            </View>

            <View style={styles.hr}></View>

            <View style={styles.class}>

                <Text style={styles.textClass}><Image
                    style={styles.imgClass}
                    source={{ uri: 'https://www.pngitem.com/pimgs/m/230-2305936_mario-star-png-image-background-power-star-mario.png' }}
                /><Text style={styles.ImgClassText}>  Pioneiro </Text></Text>
                <Checkbox
                    status={class4 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setclass4(!class4);
                    }}
                />
            </View>

            <View style={styles.hr}></View>

            <View style={styles.class}>

                <Text style={styles.textClass}>
                    <Image
                        style={styles.imgClass}
                        source={{ uri: 'https://www.pngitem.com/pimgs/m/230-2305936_mario-star-png-image-background-power-star-mario.png' }}
                    />
                    <Text style={styles.ImgClassText}>  Excursionista </Text> </Text>
                <Checkbox
                    status={class5 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setclass5(!class5);
                    }}
                />
            </View>

            <View style={styles.hr}></View>

            <View style={styles.class}>

                <Text style={styles.textClass}>
                    <Image
                        style={styles.imgClass}
                        source={{ uri: 'https://www.pngitem.com/pimgs/m/230-2305936_mario-star-png-image-background-power-star-mario.png' }}
                    />
                    <Text style={styles.ImgClassText}>  Guia</Text>
                </Text>
                <Checkbox
                    status={class6 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setclass6(!class6);
                    }}
                />
            </View>


        </View>

     

        <FAB
            icon="content-save"
            style={styles.fab}
            onPress={() => alert('salvar')}
        />

    </>
}

const styles = StyleSheet.create({

    score: {
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    scoreValue: {
        fontSize: 30,
        marginLeft: 12
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 12
    },

    classes: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 12,
    },

    class: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20
    },
    textClass: {
        fontSize: 25
    },

    hr: {
        alignItems: 'center',
        marginRight: 12,
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,

    },

    imgClass: {
        height: 35,
        width: 35,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:'darkblue'
    },


})