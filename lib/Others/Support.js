import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text } from 'react-native'
import {Back, Title, Container } from '../Components'
import ChatIcon from '../../assets/svg/Chat.svg'

const Support = ({ navigation }) => {
    return (
        <Container>
            <Back navigation={navigation}/>
            <Title text="ParkinBuddy Support"/>
            <Text style={{marginBottom:15,marginTop:15, letterSpacing:0.7, fontWeight:'300'}}>
                At ParkinBuddy, customer satisfaction is our top priority! Our “Support Centre” is our commitment to millions of customers of a safe experience.
            </Text>
            <Text style={{marginBottom:15, letterSpacing:0.7, fontWeight:'300'}}>
                In case of an issue, reach out to our support team on  <Text style={{marginBottom:15, color:'#263228', letterSpacing:0.7, fontWeight:'500'}}>Inquiries@parkinbuddy.in.</Text> Our Support Team will reach out to you in 24-48 Hrs.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <View style={styles.support}>
                    <ChatIcon/>
                    <Text style={{marginLeft:10,fontWeight:'500', color:'#263228', letterSpacing:0.8}}>
                        For Immediate Support, Chat With Us
                    </Text>
                </View>
            </TouchableOpacity>
        </Container>
    )
}
export default Support

const styles = StyleSheet.create({
    support:{
        backgroundColor:'#fecf3e',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        padding:15,
        borderRadius:18,
    },
})