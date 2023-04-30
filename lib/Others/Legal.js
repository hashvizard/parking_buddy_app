import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text } from 'react-native'
import {Back, Title, Button, Container } from '../Components'
import RightArrowIcon from '../../assets/svg/angle-right.svg'

const Legal = ({ navigation }) => {
    return (
        <Container>
            <Back navigation={navigation}/>
            <Title style={{marginBottom:30}} text="Legal"/>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Text style={{letterSpacing:0.7}}>
                        Disclaimer
                    </Text>
                    <RightArrowIcon/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Text style={{letterSpacing:0.7}}>
                    License Agreement
                    </Text>
                    <RightArrowIcon/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Text style={{letterSpacing:0.7}}>
                    Privacy Policy
                    </Text>
                    <RightArrowIcon/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Text style={{letterSpacing:0.7}}>
                    Refund Policy
                    </Text>
                    <RightArrowIcon/>
                </View>
            </TouchableOpacity>
        </Container>
    )
}
export default Legal

const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:10,
        
    },
})