import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Title, Back, Button, BoxShadow, Container } from '../Components'
import VisaIcon from '../../assets/svg/visa.svg'
import MasterCardIcon from '../../assets/svg/mastercard.svg'
import RupayIcon from '../../assets/svg/Rupay logo.svg'
import UPIIcon from '../../assets/svg/UPI LOGO.svg'
import CheckBox from '@react-native-community/checkbox'

const PaymentMethod = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <Container>
            <Back navigation={navigation} />
            <Title text="Payment Method" />

            <TouchableOpacity>
                <BoxShadow style={styles.payment_method}>
                    <MasterCardIcon />
                </BoxShadow>
            </TouchableOpacity>
            <TouchableOpacity>
                <BoxShadow style={styles.payment_method}>
                    <VisaIcon />
                </BoxShadow>
            </TouchableOpacity>
            <TouchableOpacity>
                <BoxShadow style={styles.payment_method}>
                    <RupayIcon />
                </BoxShadow>
            </TouchableOpacity>
            <TouchableOpacity>
                <BoxShadow style={styles.payment_method}>
                    <UPIIcon />
                </BoxShadow>
            </TouchableOpacity>
            {/* <View style={styles.checkbox_container}>
                <CheckBox style={styles.checkbox}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{ true: '#FECF3E', false: 'black' }} />
                <TouchableOpacity onPress={() => setToggleCheckBox(previousState => !previousState)}>
                    <Text style={styles.label}>
                        Add New Payment Method
                    </Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.bottom_container}>
                <Button navigation={navigation} text="Next" route='AddNewCard' />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    payment_method: {
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 15,
        padding: 30,
    },
    checkbox_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'center',
    },
    label: {
        color: '#263228',
        opacity: 0.5,
    },
    bottom_container: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 40,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

export default PaymentMethod