import { TextInput, Text, Button, Appbar } from 'react-native-paper'
import { useState } from 'react'
import mocks from '../../mocks.js';
import { xorBy } from 'lodash'
import SelectBox from 'react-native-multi-selectbox'
import { View, StyleSheet, Image } from 'react-native'


export const Atividade = () => {

    const [desbravadores, setDesbravadores] = useState([])
    const [listaDBV, setListaDBV] = useState([])
    const [unidade, setUnidade] = useState({})
    const [descricao, setDescricao] = useState('')

    function onMultiChange() {
        return (item) => {
            return setDesbravadores(xorBy(desbravadores, [item], 'id'))
        }
    }

    function onChange() {
        return (val) => {
            setDesbravadores([])
            setListaDBV(mocks.desbravadores.filter(o => o.unidadeId == val.id))
            return setUnidade(val)
        }
    }

    function sendAtividade() {

        if (Validate())
            return;

        console.log({
            desbravadores,
            unidade,
            descricao
        })
    }

    function Validate() {

        let validations = [];

        if (descricao.trim() == '')
            validations.push('É necessário colocar uma descrição para a atividade  😒')
        else if (descricao.length < 5)
            validations.push('A descrição está muito curta 😒')

        if (unidade['item'] == undefined)
            validations.push('Selecione uma unidade 😒')

        else if (!desbravadores.length)
            validations.push('Selecione pelo menos um Desbravador 😒')

        if (validations.length)
            alert(validations.join('\n'))

        return validations.length > 0;
    }

    return <>
        <Appbar.Header>
            <Appbar.Content title='Atividade' />
        </Appbar.Header>

        <View style={{ padding: 22 }}>

            <TextInput
                label={'Atividade'}
                multiline={true}
                placeholder={'Descrição da atividade'}
                value={descricao}
                onChangeText={text => setDescricao(text)}
            ></TextInput>




            <View style={styles.selectContainer}>

                <View style={styles.select}>
                    <Text style={{ fontSize: 20, paddingBottom: 10 }}>Unidade</Text>
                    <SelectBox
                        label="Selecione uma unidade"
                        options={mocks.unidades}
                        value={unidade}
                        onChange={onChange()}
                        hideInputFilter={false}
                    />
                </View>


                <View style={styles.select}>
                    <Text style={{ fontSize: 20, paddingBottom: 10 }}>Desbravadores</Text>
                    <SelectBox
                        label="Selecione uma ou mais unidades"
                        options={listaDBV}
                        selectedValues={desbravadores}
                        onMultiSelect={onMultiChange()}
                        onTapClose={onMultiChange()}
                        isMulti
                    />
                </View>



            </View>

            <View style={styles.image}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: 'https://i.pinimg.com/originals/8f/d0/fe/8fd0fea5927efb1207ee9d7dd4535260.png' }} />
            </View>



            <Button icon="pen" color='darkblue' mode="contained" onPress={sendAtividade}>
                Cadastrar Atividade
            </Button>
        </View>


    </>
}

const styles = StyleSheet.create({
    selectContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginBottom: 20
    },
    select: {
        marginBottom: 15,
        marginTop: 16,
        alignItems: 'center'
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8
    }
})
