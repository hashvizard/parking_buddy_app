import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

const Container = (props) => {
    return(
        <View style={[styles.container,props.style]}>
            {props.children}
        </View>  
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Poppins',
        padding: 15,
        flex: 1,
        backgroundColor: '#FEFEFF',
        letterSpacing:0.8,
    },
})

export default Container