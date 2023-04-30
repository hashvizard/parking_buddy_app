import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import {Back, Title, Button, Container } from '../Components'

const RefundRequest = ({ navigation }) => {
    return (
        <Container style={styles.container}>
            <Back navigation={navigation}/>
            <Title text="Raise Refund Request"/>

            <View style={styles.form_container}>
                <View style={styles.form_inputWrap}>
                    <TextInput style={styles.form_input}
                        placeholder="Booking No. 123 - Prefilled" />
                </View>
                <View style={styles.form_inputWrap}>
                    <TextInput style={styles.form_input}
                        placeholder="Date - Prefilled" />
                    <TextInput style={[styles.form_input, {marginLeft:10}]}
                        placeholder="Time: x-y - Prefilled" />
                </View>
                <View style={styles.form_inputWrap}>
                    <TextInput style={styles.form_input}
                        placeholder="Reason for Refund" />
                </View>
                <Text>
                    *Not more than 100 words
                </Text>
            </View>
            <View style={styles.bottom_container}>
                <Button navigation={navigation} text="Submit" route='RefundHistory'/>
            </View>
        </Container>
    )
}
export default RefundRequest

const styles = StyleSheet.create({
    form_container: {
        marginTop: 10,
    },
    form_inputWrap: {                
        marginBottom: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf: 'flex-start',
    },
    form_input: {
        fontSize: 16,
        flex:1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal:10,
        backgroundColor: '#08452310',
    },
    bottom_container: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 20,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})