import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

const BoxShadow = (props) => {
    return(
        <View style={[styles.shadow,props.style]}>
            {props.children}
        </View>  
    )
}

const styles = StyleSheet.create({
    shadow:{
        backgroundColor: '#fff',
        shadowColor: "#5A6CEA40",
        shadowOffset: {
            width: 12,
            height: 35,
        },
        shadowRadius: 50,
        elevation: 35,
       
    }
})

export default BoxShadow