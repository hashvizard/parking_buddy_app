import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Back, Title, Container, BoxShadow, Navigation } from '../Components'
import SuccessIcon from '../../assets/svg/Success Icon.svg'
import TopUpIcon from '../../assets/svg/Top Up Icon.svg'
import CancelIcon from '../../assets/svg/Cancel Icon.svg'

const Item = (props) => {
    return (
        <TouchableOpacity>
            <BoxShadow style={styles.notification}>
                <View style={styles.icon}>
                    {props.icon}
                </View>
                <View style={styles.text_wrapper}>
                    <Text style={styles.n_text}>
                        {props.nText}
                    </Text>
                    <Text style={styles.n_time}>
                        {props.nTime}
                    </Text>
                </View>
            </BoxShadow>
        </TouchableOpacity>
    )
}
const data = [
    {id:2,icon:<CancelIcon/>,nText:'Booking Unsuccessful',nTime:'11:00 Am, 22 August 2022'},
    {id:1,icon:<TopUpIcon/>,nText:'Save Big with Coupon Code',nTime:'10.00 Am'},
    {id:0,icon:<SuccessIcon/>,nText:'Your parking spot has been successfully booked',nTime:'Recently'},
]
const Notifications = ({ navigation }) => {
    const notification = data.map((d) => <Item key={d.id} nText={d.nText} nTime={d.nTime} icon={d.icon}/>)
    return (
        <Container>
            <Back navigation={navigation} />
            <View style={{ marginBottom: 15 }}>
                <Title text="Notifications" />
            </View>
            {notification}
            {/* <Navigation active='notification' navigation={navigation}/> */}
        </Container>
    )
}
export default Notifications

const styles = StyleSheet.create({
    notification: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 15,
        padding: 25,
    },
    icon: {
        flex: 3
    },
    text_wrapper: {
        flex: 9
    },
    n_text: {
        fontWeight: '700'
    },
    n_time: {
        color: '#3B3B3B40'
    },
})