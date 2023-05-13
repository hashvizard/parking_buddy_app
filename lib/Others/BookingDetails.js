import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MapScreen from '../../assets/svg/MapWide.svg'
import { Title, Back, Container } from '../Components'
import FindIcon from '../../assets/svg/Find icon.svg'
import ShieldIcon from '../../assets/svg/SHIELD.svg'
import CarParkedIcon from '../../assets/svg/Car Parked.svg'
import PBOrangeIcon from '../../assets/svg/PB logo Orange.svg'
import GoogleMap from '../Components/GoogleMap'
import DetailViewBooking from '../Components/DetailViewBooking'
import { formatTime } from '../../src/helpers'

const BookingDetails = ({ navigation,route }) => {
 
    const {data} =route?.params;

console.log(data,"I receive")

    return (
        <Container>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Back navigation={navigation} />
                <TouchableOpacity onPress={() => navigation.navigate('RefundRequest',{data:data})}>
                    <Text>
                        Request Refund
                    </Text>
                </TouchableOpacity>
            </View>

            <Title text="Your Booking Details" />
            <DetailViewBooking  data={data} />
           
            {/* <View style={{ marginHorizontal: -20, marginVertical: 10 }}>
                <GoogleMap width="100%" height="104" />
            </View> */}
            <View style={{ flexDirection: 'row',marginBottom:10,padding:10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>
                    {formatTime(data?.start_time,data?.end_time,true)}
                </Text>
                <Text>
                    ₹ {data?.charges}
                </Text>
            </View>
            {/* <Text style={{ fontWeight: '700', fontSize: 16,padding:10 }}>
                Help
            </Text> */}
            <TouchableOpacity>
                <View style={styles.help_item}>
                    <View style={{ flex: 2 }}>
                        <FindIcon />
                    </View>
                    <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                        <Text style={{ fontWeight: '700' }}>
                            Find Lost Item
                        </Text>
                        <Text style={{ color: '#3B3B3B40' }}>
                            We can help you get in touch with the operator
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.help_item}>
                    <View style={{ flex: 2 }}>
                        <ShieldIcon />
                    </View>
                    <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                        <Text style={{ fontWeight: '700' }}>
                            Report Safety Issue
                        </Text>
                        <Text style={{ color: '#3B3B3B40' }}>
                            Let us know if you have a safety related issue
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.help_item}>
                    <View style={{ flex: 2 }}>
                        <CarParkedIcon />
                    </View>
                    <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                        <Text style={{ fontWeight: '700' }}>
                            Provide Parking Feedback
                        </Text>
                        <Text style={{ color: '#3B3B3B40' }}>
                            For issues that aren’t safety related
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.help_item}>
                    <View style={{ flex: 2 }}>
                        <PBOrangeIcon />
                    </View>
                    <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                        <Text style={{ fontWeight: '700' }}>
                            Get Booking Help
                        </Text>
                        <Text style={{ color: '#3B3B3B40' }}>
                            Need help for something else? Find it here
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        </Container>
    )
}
const styles = StyleSheet.create({
    help_item: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingVertical: 10,
    },
})
export default BookingDetails