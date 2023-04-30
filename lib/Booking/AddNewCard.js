import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Back, Title, Button, Container } from '../Components'
import CreditCard from '../../assets/svg/CreditCard.svg'
import CheckBox from '@react-native-community/checkbox'

const AddNewCard = ({navigation}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <Container>
            <Back navigation={navigation}/>
            <Title text="Add New Card"/>
            <View style={{}}>
                <CreditCard width="100%"/>
            </View>
            <View style={styles.form_inputWrap}>
                <TextInput style={styles.form_input}
                    placeholder="Card Number"
                    keyboardType='number-pad' />
            </View>
            <View style={styles.form_inputWrap}>
                <TextInput style={styles.form_input}
                    placeholder="Expiry" />
                <TextInput style={[styles.form_input,{marginLeft:10}]}
                    placeholder="CVV"
                    maxLength={3}
                    keyboardType='number-pad' />
            </View>
            <View style={styles.form_inputWrap}>
                <TextInput style={styles.form_input}
                    placeholder="Name" />
            </View>
            <View style={styles.checkbox_container}>
                <CheckBox style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: '#FECF3E', false: 'black' }} />
                <TouchableOpacity onPress={() => setToggleCheckBox(previousState => !previousState)}>
                    <Text style={styles.label}>
                        Save This Credit Card
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom_container}>
                <Button navigation={navigation} text="Submit" route='PaymentMethod'/>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    form_inputWrap: {                
        marginBottom: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf: 'flex-start',
    },
    form_input: {
        flex:1,
        fontSize: 16,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal:10,
        backgroundColor: '#08452310',
    },
    checkbox_container:{
        flexDirection:'row',
        alignItems:'center',
    },
    label:{
        color:'#263228',
        opacity:0.5,
    },
    bottom_container: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 15,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

export default AddNewCard