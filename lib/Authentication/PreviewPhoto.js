import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {Back, Title, Subtitle, Button, Container } from '../Components'
import CloseIcon from '../../assets/svg/Close Icon.svg'

const PreviewPhoto = ({ navigation }) => {
    return (
        <Container>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginBottom:10 }}>
                <Back navigation={navigation}/>               
                <View style={styles.skip_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('SetLocation')}>
                        <Text style={styles.skip_text}>
                            SKIP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexShrink:1,width:'75%'}}>
                <Title text="Preview Your Profile Photo"/>
                <Subtitle text="This image will be displayed in your account profile for security purposes"/>
            </View>

            <View style={styles.photo_container}>
                <View style={{ position: 'relative' }}>
                    <Image source={require('../../assets/images/profile-photos.jpg')}
                        style={{ width: 245, height: 245, borderRadius: 15 }} />
                    <View style={styles.closeIcon} >
                        <CloseIcon width={30} height={30} />
                    </View>
                </View>
            </View>
            <View style={styles.bottom_container}>
                <Button navigation={navigation} text="Next" route='SetLocation'/>
            </View>
        </Container>
    )
}
export default PreviewPhoto

const styles = StyleSheet.create({
    photo_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:60,
    },
    closeIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        borderRadius: 50,
        backgroundColor: '#c1c1c1',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
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