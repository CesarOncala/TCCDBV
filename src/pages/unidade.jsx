import Header from '../components/header'
import { useNavigation } from '@react-navigation/native'
import { Text, TextInput, RadioButton } from 'react-native-paper';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import mocks from '../../mocks'

export const Unidade = () => {

    const navigation = useNavigation();
    const [checked, setChecked] = useState('first');
    const [lider, setLider] = useState([])

    function onChange() {
        return (val) => {
            return setLider(val)
        }
    }

    return <>

        <Header title={'Teste'} goBack={() => navigation.goBack()}>
        </Header>

        <View style={styles.container}>
            <TextInput
                style={styles.field}
                placeholder={'Digite o nome da unidade...'}
                label={'Nome da Unidade'}
            ></TextInput>

            <TextInput
                style={styles.field}
                placeholder={'Digite a faixa etária...'}
                keyboardType={'numeric'}
            ></TextInput>

            <SelectBox
                style={styles.field}
                label="Selecione um lider"
                options={mocks.lideres}
                value={lider}
                onChange={onChange()}
                hideInputFilter={false}
            />


            <View style={[styles.field,{marginTop:50}]}>
                <Text style={styles.title}>Selecione o sexo da unidade</Text>
                <View style={styles.genero}>
                    <View>
                        <Text>Masculino</Text>
                        <RadioButton
                            value="M"
                            status={checked === 'M' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('M')}
                        />
                    </View>

                    <View>
                        <Text>Feminino</Text>
                        <RadioButton
                            value="F"
                            status={checked === 'F' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('F')}
                        />
                    </View>
                </View>
            </View>
        </View>




    </>
}

const styles = StyleSheet.create({

    genero: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 12,
    },
    field: {
        marginBottom: 12,
        marginTop: 8
    }

})