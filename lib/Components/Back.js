import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import BackIcon from '../../assets/svg/back.svg'

const Back = ({navigation,param=false,route=null}) => {
    return (
        <TouchableOpacity onPress={() =>{
            if(param){
                if(route){
                    navigation.navigate(route)
                }
            }else{
                navigation.goBack()
            }
         
        } }>
            <View style={styles.back_container}>
                <BackIcon />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    back_container: {
        backgroundColor: '#fff1f1',
        width: 45,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop:15,
    },
})

export default Back