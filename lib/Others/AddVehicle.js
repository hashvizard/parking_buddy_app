import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Back, Title, Container, Button } from '../Components'
import VoucherIcon from '../../assets/svg/Voucher Icon.svg'
import CheckBox from '@react-native-community/checkbox'

const AddVehicle = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [selectedValue, setSelectedValue] = useState("java");
    return (
        <Container>
            <Back navigation={navigation} />
            <View style={{ flexShrink: 1, width: '85%' }}>
                <Title text="Add A New Vehicle For Faster Checkout!" />
            </View>
            <View style={styles.form_container}>
                <View style={styles.form_inputWrap}>
                    <TextInput style={[styles.form_input, { flex: 3 }]}
                        placeholder="Name Of Owner" />
                    <TextInput style={[styles.form_input, { marginLeft: 10 }]}
                        placeholder="Type" />
                    {/* <Picker selectedValue={selectedValue}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker> */}
                </View>
                <View style={styles.form_inputWrap}>
                    <TextInput style={styles.form_input}
                        placeholder="Vehicle Registration Number" />
                </View>
                <View style={styles.form_inputWrap}>
                    <TextInput style={styles.form_input}
                        placeholder="City" />
                    <TextInput style={[styles.form_input, { marginLeft: 10 }]}
                        maxLength={6}
                        placeholder="Pincode"
                        keyboardType='number-pad' />
                </View>
                <View style={styles.form_inputWrap}>
                    <TextInput style={styles.form_input}
                        placeholder="Address" />
                </View>
                {/* <View style={styles.checkbox_container}>
                    <CheckBox style={styles.checkbox}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        tintColors={{ true: '#FECF3E', false: 'black' }} />
                    <TouchableOpacity onPress={() => setToggleCheckBox(previousState => !previousState)}>
                        <Text style={styles.label}>
                            Save This Vehicle
                        </Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={styles.bottom_container}>
                <Button navigation={navigation} text="Submit" route='Booked' />
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    form_container: {
        marginTop: 10,
    },
    form_inputWrap: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    form_input: {
        fontSize: 16,
        flex: 1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#08452310',
    },
    checkbox_container: {
        flexDirection: 'row',
        alignItems: 'center',
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

export default AddVehicle