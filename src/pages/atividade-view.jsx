
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Header from '../components/header'
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native'
import { TextInput, Appbar, Avatar } from 'react-native-paper';
import { Message } from '../utils'

export const AtividadeView = ({ route }) => {

    const navigation = useNavigation();
    const [obj, setObj] = useState(route?.params || {})
    const [report, setReport] = useState(obj?.report || '')

    useEffect(() => setObj(route.params), [])

    function Request() {

        if (!validate()) {

            Message('Relatório Invalido', 'O relatório precisa ser preenchido com pelo menos 12 caracteres 😒😢'
                , null, null, false)

            return;
        }

    }

    function validate() {

        if (report == '' || report.lenght <= 12)
            return false
        
        return true;
    }

    return (

        <>
            <Header title={obj.title} goBack={() => navigation.goBack()}>
                {
                    obj.finished ? <Avatar.Icon size={50} icon="account-check" /> :
                        <Appbar.Action icon="check" onPress={Request} />
                }
            </Header>

            <ScrollView>
                <View>
                    <Text style={styles.title}>Unidades que devem fazer</Text>
                    <Text style={styles.desc}>{obj.unidades.join(' , ')}</Text>

                    <Text style={styles.title}>Descrição</Text>
                    <Text style={styles.desc}> {obj.description} </Text>

                    <TextInput
                        // style={styles.field}
                        placeholder={'Digite o relatório da atividade....'}
                        label={'Relatório da Atividade'}
                        multiline={true}
                        value={report}
                        onChangeText={setReport}
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