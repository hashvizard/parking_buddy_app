import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Title = (props) => {
    return (
        <Text style={[styles.title,props.style]}>
            {props.text}
        </Text>
    )
}

const styles = StyleSheet.create({    
    title: {
        letterSpacing:0.8,
        color: '#263238',
        fontWeight: '500',
        fontSize: 25,
        lineHeight: 33,
        marginBottom:10,
        marginTop:10,
    },
})

export default Title