import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Congrats from '../../assets/svg/Congrats_Orange.svg'
import { Button } from '../Components'

const Congratulation = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Congrats />
            </View>
            <View style={{marginTop:10,alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:30,color:'#fecf3e',textAlign:'center'}}>
                    Congrats!
                </Text>
                <Text style={{fontSize:22,textAlign:'center'}}>
                    {props.message}
                </Text>
            </View>
            <View style={styles.bottom_container}>
                <Button navigation={props.navigation} text="Home" route='Home' bgColor="#fecf3e"/>
            </View>
        </View>
    )
}
export default Congratulation

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Poppins',
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        color: '#fecf3e',
        fontWeight: '400',
        fontSize: 30,
        lineHeight: 40,
        textAlign:'center',
        marginTop:20
    },
    subtitle: {
        marginTop:15,
        fontSize: 25,
        fontWeight: '200',
        lineHeight: 33,
        textAlign:'center'
    },
    next_container: {
        backgroundColor: '#fecf3e',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
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