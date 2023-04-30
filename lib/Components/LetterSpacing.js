import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

const LetterSpacing = (props) => {
    return(
        <View style={[styles.shadow,props.style]}>
            {props.children}
        </View>  
    )
}

const styles = StyleSheet.create({
    shadow:{
       letterSpacing:0.8,      
    }
})

export default LetterSpacing