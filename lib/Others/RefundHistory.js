import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {Back, Title, Navigation, Container, BoxShadow } from '../Components'
import RefundRaisedIcon from '../../assets/svg/REFUND.svg'
import RefundProgressIcon from '../../assets/svg/RefundInProgress.svg'
import RefundApprovedIcon from '../../assets/svg/RefundApproved.svg'
import RefundDeniedIcon from '../../assets/svg/RefundDenied.svg'

const History = (props) => {
    return (
        <BoxShadow style={styles.refundHistory}>
            <View style={styles.icon}>
                {props.icon}
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.date}>
                {props.date}
                </Text>
                <Text style={styles.status}>
                {props.status}
                </Text>
            </View>
        </BoxShadow>
    )
}
const data = [
    { id: 1, icon: <RefundRaisedIcon/>, status: 'Refund request raised', date: '26-01-2022, Request No. 23' },
    { id: 2, icon: <RefundProgressIcon/>, status: 'Refund request in progress', date: '26-01-2022, Request No. 123' },
    { id: 3, icon: <RefundApprovedIcon/>, status: 'Refund request approved. Amount refunded, ₹789', date: '26-01-2022, Request No. 1234' },
    { id: 4, icon: <RefundDeniedIcon/>, status: 'Refund request denied. Amount refunded, 0', date: '26-01-2022, request No. 12389' },
]
const RefundHistory = ({ navigation }) => {
    const histories = data.map((d) => <History key={d.id} icon={d.icon} status={d.status} date={d.date} />)
    return (
        <Container>
            <Back navigation={navigation}/>
            <Title text="Refund History"/>
            {histories}
            <Text style={{marginTop:15, letterSpacing:0.7}}>
                In case of an issue, reach out to our support team on <Text style={{marginBottom:15, color:'#263228', letterSpacing:0.7, fontWeight:'500'}}>Inquiries@parkinbuddy.in.</Text> Our Support Team will reach out to you in 24-48 Hrs.
            </Text>
            {/* <Navigation active='profile' navigation={navigation}/> */}
        </Container>
    )
}
export default RefundHistory

const styles = StyleSheet.create({
    refundHistory:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius:15,
        paddingHorizontal:10,
        paddingVertical:20,
        marginVertical:5
    },
    icon:{
        flex:2.5,
    },
    wrapper:{
        flex:8
    },
    date:{
        fontWeight:'700',
    },
    status:{
        color:'#3B3B3B40'
    },
})