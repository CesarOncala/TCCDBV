
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import Header from '../components/header'
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native'
import { TextInput, Appbar, Avatar } from 'react-native-paper';
import { Message } from '../utils'
import env from '../../environments'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../contexts/appContext'


export const AtividadeView = ({ route }) => {

    const navigation = useNavigation();
    const [obj, setObj] = useState(route?.params || {})
    const [report, setReport] = useState(obj?.relatorio || '')

    const { user } = useContext(AppContext)

    useEffect(() => {
        setObj(route.params)
    }, [])

    async function Request() {

        obj.Relatorio = report;
        obj.desbravadores = null;
        obj.unidade = null;

        Message("Tem certeza que deseja finalizar esta atividade?", user.role == 1 ? "Esta ação não poderá ser desfeita!" : '', async () => {
            if (!validate()) {

                if (user.role == 1) {
                    Message('Relatório não preenchido!', 'Deve haver pelomenos um relatório preenchido para finalizar a atividade! 😒😢'
                        , null, null, false)
                }
                else
                    Message('Relatório Invalido', 'O relatório precisa ser preenchido com pelo menos 12 caracteres 😒😢'
                        , null, null, false)

                return;
            }

            fetch(`${env.apiAddress}Atividade`, {
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(obj)
            })
                .then(o => o.json())
                .then(o => navigation.goBack())
        })



    }

    function validate() {

        return !(report == '' || report.length <= 12);
    }

    return (

        <>
            <Header title={obj.titulo} goBack={() => navigation.goBack()}>
                {
                    obj.finalizada ? <Avatar.Icon size={50} icon="account-check" /> :
                        <Appbar.Action icon="check" onPress={Request} />
                }
            </Header>

            <ScrollView>
                <View>
                    <Text style={styles.title}>Unidade</Text>
                    <Text style={styles.desc}>{obj?.unidade?.name}</Text>

                    <Text style={styles.title}>Descrição</Text>
                    <Text style={styles.desc}> {obj.descricao} </Text>

                    <TextInput
                        // style={styles.field}
                        placeholder={'Digite o relatório da atividade....'}
                        label={'Relatório da Atividade'}
                        multiline={true}
                        value={report}
                        onChangeText={setReport}
                        disabled={user.role == '1' || obj?.finalizada}
                        style={[{ fontSize: 22, color: 'red' }]}
                    ></TextInput>
                </View>

            </ScrollView>
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
    },
    button: {
        marginTop: 12
    }
})