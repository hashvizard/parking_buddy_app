import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Back, Title, Button, Container, BoxShadow } from '../Components'
import VisaIcon from '../../assets/svg/visa.svg'
import MasterCardIcon from '../../assets/svg/mastercard.svg'
import RupayIcon from '../../assets/svg/Rupay logo.svg'
import UPIIcon from '../../assets/svg/UPI LOGO.svg'
import CheckBox from '@react-native-community/checkbox'

const PayMethod = (props) => {
    return (
        <BoxShadow style={styles.payment_method}>
            <View style={{ flex: 1, padding: 5, alignItems:'flex-start' }}>
                <Text style={{ fontSize: 15, opacity: 0.5 }}>
                    Payment Method
                </Text>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    {props.icon}
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', padding: 5 }}>
                <TouchableOpacity>
                    <Text style={{ color: '#fecf3e' }}>
                        Edit
                    </Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10 }}>
                    {props.number}
                </Text>
            </View>
        </BoxShadow>
    )
}
const data = [
    { id: 1, icon: <MasterCardIcon />, number: '2121 6352 8465 ****' },
    { id: 2, icon: <VisaIcon />, number: '2121 6352 8465 ****' },
    { id: 3, icon: <RupayIcon />, number: '2121 6352 8465 ****' },
    { id: 4, icon: <UPIIcon />, number: '2121 6352 8465 ****' },
]

const Confirm = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const methods = data.map((d) => <PayMethod key={d.id} icon={d.icon} number={d.number} />)
    return (
        <Container>
            <Back navigation={navigation} />
            <Title text="Confirm Your Booking" />
            {methods}
            <View style={styles.checkbox_container}>
                <CheckBox style={styles.checkbox}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{ true: '#FECF3E', false: '#FECF3E' }} />
                <Text style={styles.label}>
                    Offline Payment At Parking Site
                </Text>
            </View>
            <View style={styles.bottom_container}>
                <View style={styles.calc}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>
                        Total
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                        ₹ 191.25
                    </Text>
                </View>
                <View style={{ alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, marginTop: 10 }}>
                    <Button bgColor='#fff' navigation={navigation} text="Reserve My Spot" route='BookingDataView' />
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    payment_method: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 22,
        padding: 10,
        paddingVertical:18,
    },
    checkbox_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    label: {
        color: '#263228',
        opacity: 0.5,
    },
    calc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottom_container: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 15,
        backgroundColor: '#fecf3e',
        borderRadius: 15,
        padding: 10
    }
})

export default Confirm