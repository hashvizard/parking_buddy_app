import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {Back, Title, Subtitle, Button } from '../Components'
import Map from '../../assets/svg/MapScreen.svg'
import VoucherIcon from '../../assets/svg/Voucher Icon.svg'
import ProfilePhoto from '../../assets/svg/Photo Profile.svg'
import CarIcon from '../../assets/svg/Car.svg'
import ScooterIcon from '../../assets/svg/Scooter.svg'

const Profile = ({navigation}) => {    
    return (
        <View style={styles.container}>
            <ProfilePhoto style={{top:-20, position:'absolute', flex:1}} height="100%"/>
            <View style={{margin:20}}>
                <Back navigation={navigation}/>
            </View>
            <View style={styles.bd_container}>
                <View style={styles.bar}/>
                <Title text="Booking Details"/>
                <Subtitle text="Parking Spot Name" opacity={0.5}/>
                <TouchableOpacity onPress={() => navigation.navigate('Voucher')}>
                    <View style={styles.voucher}>
                        <VoucherIcon/>
                        <Text style={{fontWeight:'700', marginLeft:10}}>
                            You Have No Vouchers
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.vehicle}>
                    <CarIcon width={60} height={40}/>
                    <View style={{marginLeft:10}}>
                        <Text style={{fontWeight:'700'}}>
                            4 Wheel Park
                        </Text>
                        <Text style={{opacity:0.5}}>
                            from 13:00-14:00
                        </Text>
                        <Text style={{fontWeight:'700', color:'#fecf3e'}}>
                            ₹ 80/hour
                        </Text>
                    </View>
                </View>
                <View style={styles.amount}>
                    <View style={styles.calc}>
                        <Text style={{color:'#fff'}}>
                            Sub-Total
                        </Text>
                        <Text style={{color:'#fff'}}>
                        ₹ 213
                        </Text>
                    </View>
                    <View style={styles.calc}>
                        <Text style={{color:'#fff'}}>
                            Booking Charge
                        </Text>
                        <Text style={{color:'#fff'}}>
                        ₹ 21
                        </Text>
                    </View>
                    <View style={styles.calc}>
                        <Text style={{color:'#fff'}}>
                            Discount - 5%
                        </Text>
                        <Text style={{color:'#fff'}}>
                            ₹ 33.75
                        </Text>
                    </View>
                    <View style={styles.calc}>
                        <Text style={{color:'#fff',fontSize:18}}>
                        Total
                        </Text>
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>
                        ₹ 191.25
                        </Text>
                    </View>
                    <View style={{alignItems:'center', backgroundColor:'#fff', borderRadius:15,marginTop:10}}>
                        <Button bgColor="#fff" navigation={navigation} text="Register Your Vehicle" route='AddVehicle'/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Poppins',        
        flex: 1,
        backgroundColor: '#FEFEFF',
    },
    bd_container: {
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        padding:20,
        borderTopLeftRadius:22,
        borderTopRightRadius:22,
        backgroundColor:'#fff',
    },
    bar:{
        marginLeft:'auto',
        marginRight:'auto',
        width:60,
        height:5,
        backgroundColor:'#FEF6ED',
        marginBottom:15,
    },
    voucher: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: '#fff',
        shadowColor: "#5a6cea",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 50,
        elevation: 24,
        marginBottom:15,
        borderRadius:22,
        padding:15,
    },
    vehicle: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: '#fff',
        shadowColor: "#5a6cea",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 50,
        elevation: 24,
        marginBottom:15,
        borderRadius:22,
        padding:15,
    },
    amount: {
        backgroundColor: '#FECF3E',
        borderRadius:15,
        padding:15,
    },
    calc: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
})

export default Profile