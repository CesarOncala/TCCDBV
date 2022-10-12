import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";
import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native"
import Header from '../components/header'
import { Checkbox, Button, FAB } from 'react-native-paper';
import env from '../../environments'
import AsyncStorage from '@react-native-async-storage/async-storage';

import p1 from '../../assets/1.png'
import p2 from '../../assets/2.png'
import p3 from '../../assets/3.png'
import p4 from '../../assets/4.png'
import p5 from '../../assets/5.png'
import p6 from '../../assets/6.png'
import star from '../../assets/star.png'
import ghost from '../../assets/ghost.png'

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

    const classes = {
        setclass1,
        setclass2,
        setclass3,
        setclass4,
        setclass5,
        setclass6,
        class1, class2, class3,class4, class5, class6
    }

    function LoadNivel() {

        for (let index = 1; index <= user.nivel; index++)
            classes['setclass' + index](true)
    }

    useEffect(()=>{
        LoadNivel();
    },[])


    function Update(){
        user.nivel = 0
        for (const key in classes) {
            if(typeof classes[key] == 'boolean' && classes[key])
                user.nivel++;
        }
        user.score = score;
    }

    async function Save() {

        Update();

        fetch(`${env.apiAddress}Users`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            },
              body: JSON.stringify(user)
        })
            .then(o => o.json())
            .then(o => navigation.goBack())
            .catch(o => console.log(o))
    }


    return <>
        <Header title={user.name} goBack={() => navigation.goBack()}>
        </Header>

        <View style={styles.score}>

            <Text style={styles.scoreValue}>Pontuação: {score}</Text>

            <TouchableOpacity
                onPress={() => setScore(score + 1)}

            >
                <Image
                    style={styles.img}
                    source={star}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => score > 0 ? setScore(score - 1) : 0}

            >
                <Image
                    style={styles.img}
                    source={ghost}
                />
            </TouchableOpacity>

        </View>




        <View style={styles.classes}>

            <View style={styles.class}>
                <Text style={styles.textClass}>
                    <Image
                        style={styles.imgClass}
                        source={p1}
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
                        source={p2}
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
                    source={p3}
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
                    source={p4}
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
                        source={p5}
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
                        source={p6}
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
            onPress={Save}
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
        backgroundColor: 'darkblue'
    },


})