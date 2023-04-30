import React, {useState, useEffect} from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { View, StyleSheet, TextInput, Image } from 'react-native'
import {Back, Title, Container } from '../Components'
import ProfilePhoto from '../../assets/svg/Photo Profile.svg'
import CallLogo from '../../assets/svg/Call Logo.svg'
import SendIcon from '../../assets/svg/Icon Send.svg'

const Chat = ({ navigation }) => {
    return (
        <Container>
            <Back navigation={navigation}/>
            <Title text="Chat Support"/>
            <View style={styles.staff}>
                <View style={styles.staff_info}>
                    <Image source={require('../../assets/images/pp60.png')} style={styles.pp_image}/>
                    <View style={{marginLeft:15, fontWeight:'700', color:'#263228', letterSpacing:0.8}}>
                        <Text style={{fontWeight:'500',letterSpacing:0.7,color:'#263228'}}>
                            Raman Dutt
                        </Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{backgroundColor:'#15BE77',width:8,height:8,borderRadius:8,marginRight:5}}/>
                            <Text style={{fontWeight:'400',letterSpacing:0.7,color:'#3B3B3B30'}}>
                                Online
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <CallLogo/>
                </TouchableOpacity>
                
            </View>
            <View></View>
            <View style={styles.chat_input}>
                <TextInput style={styles.form_input}

                    placeholder="Okay I'm waiting  👍" />
                <SendIcon/>
            </View>
        </Container>
    )
}
export default Chat

const styles = StyleSheet.create({
    staff:{
        backgroundColor:'#fff',
        shadowColor: "#5a6cea",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 50,
        elevation: 24,
        borderRadius:18,
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:15,
    },
    staff_info:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    pp_image:{
        borderRadius:15,
    },
    chat_input:{
        position:'absolute',
        left:20,
        right:20,
        bottom:20,
        backgroundColor:'#08452310',
        padding:15,
        borderRadius:18,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
})