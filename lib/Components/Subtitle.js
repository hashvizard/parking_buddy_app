import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Subtitle = ({text, opacity}) => {
    return (
        <Text style={styles.subtitle}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({    
    subtitle: {
        letterSpacing:0.8,
        fontSize: 14,
        fontWeight: '200',
        lineHeight: 23,
        color: '#263228',
    },
})

export default Subtitle