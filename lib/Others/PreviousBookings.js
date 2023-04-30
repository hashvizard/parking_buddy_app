import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Logo from '../../assets/svg/PB_Logo.svg'
import CaretDownIcon from '../../assets/svg/caret-down.svg'
import CarIcon from '../../assets/svg/Car.svg'
import ScooterIcon from '../../assets/svg/Scooter.svg'
import MiniMap from '../../assets/svg/MiniMap.svg'
import { Title, Back, Navigation, Container, BoxShadow } from '../Components'

const Booking = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('BookingInfo')}>
            <BoxShadow style={styles.booking}>
                <Image source={require('../../assets/images/MapScreen60.png')} style={styles.pp_image} />

                <View>
                    <Text style={{ fontSize:15, fontWeight: '400', color:'#09051C', letterSpacing:0.7 }}>
                        {props.type === 4 ? '4 Wheel Park' : '2 Wheel Park'}
                    </Text>
                    <Text style={{ opacity: 0.5, fontWeight:'400', letterSpacing:0.5,  }}>
                        {props.time}
                    </Text>
                    <Text style={{ fontSize:18, fontWeight: '400', letterSpacing:0.7, color: '#fecf3e' }}>
                        {props.date}
                    </Text>
                </View>
            </BoxShadow>
        </TouchableOpacity>
    )
}
const data = [
    { id: 1, type: 2, time: 'from 13:00-14:00', date: '21-03-2022' },
    { id: 2, type: 4, time: 'from 21:00-23:00', date: '08-03-2022' },
    { id: 3, type: 2, time: 'from 3:00-14:00', date: '13-03-2022' },
    { id: 4, type: 4, time: 'from 15:00-18:00', date: '14-03-2022' },
]

const PreviousBookings = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const bookings = data.map((d) => <Booking key={d.id} navigation={navigation} type={d.type} time={d.time} date={d.date} />)

    return (
        <Container>
            <Back navigation={navigation} />
            <Title text="Previous Bookings" />
            <View style={{ marginTop: 15 }}>
                {bookings}
            </View>

            {/* <Navigation active='profile' navigation={navigation} /> */}
        </Container>
    )
}
export default PreviousBookings

const styles = StyleSheet.create({
    booking: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    pp_image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
})