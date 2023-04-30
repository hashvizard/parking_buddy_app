import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Back, Title, Button, Container } from '../Components'

const Reservation = ({navigation}) => {
    return (
        <Container>
            <Back navigation={navigation}/>
            <Title text="Tell Us What You Are Looking For"/>
            <View style={styles.bottom_container}>
                <Button navigation={navigation} text="Search" route='BookingDetails'/>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    bottom_container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: '#fecf3e',
        borderRadius:15,
    },
})

export default Reservation