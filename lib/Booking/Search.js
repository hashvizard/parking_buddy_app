import React, {useState, setState} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Switch, Image } from 'react-native'
import Map from '../../assets/svg/MapScreen.svg'
import FilterIcon from '../../assets/svg/Filter.svg'
import SearchLens from '../../assets/svg/Search_Lens.svg'
import EyeClosedIcon from '../../assets/svg/EyeClosed.svg'
import EyeOpenedIcon from '../../assets/svg/EyeOpened.svg'
import { Navigation } from '../Components'
import { bookingData } from '../../src/redux/actions'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from 'react-redux'
import colors from '../../src/constants/colors'

const Spot = (props) => {
    const spot_styles = {
        position:'absolute',
        backgroundColor:props.bgcolor,
        top:props.top,
        left:props.left,
        width:70,
        height:35,
        borderRadius:15,
    }
    return (
        <TouchableOpacity style={spot_styles} onPress={props.pressed}/>
    )
}
const dataY = [
    {id:6,top:250,left:90},
    {id:5,top:280,left:190},
    {id:4,top:100,left:180},
    {id:3,top:140,left:50},
    {id:2,top:350,left:70},
    {id:1,top:400,left:150},
]
const dataG = [
    {id:1,top:100,left:180},
    {id:2,top:140,left:50},
    {id:3,top:350,left:70},
    {id:4,top:400,left:250},
]

const Search = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {setIsEnabled(previousState => !previousState)};
    const pressed = () => navigation.navigate('BookingDetails');
    const availableSpots = dataG.map((d) => <Spot key={d.id} bgcolor="#084523AC" top={d.top} left={d.left} pressed={pressed}/>)
    const unavailableSpots = dataY.map((d) => <Spot key={d.id} bgcolor="#FECF3EA2" top={d.top} left={d.left}/>)
    
    return (
        <View style={styles.container}>            
            <Image style={styles.mapScreen}
                    source={require('../../assets/images/MapScreen.png')} />
            <View style={styles.header}>
                <View style={styles.searchbar_container}>
                <GooglePlacesAutocomplete
              placeholder="Where Do You Want To Go Today?"
              fetchDetails={true}
              enablePoweredByContainer={false}
              isRowScrollable={true}
              textInputStyle={{
                backgroundColor: colors.appColor,
              }}
              placeholderTextColor="#a8ada9"
              onPress={(data, details = null) => {
                dispatch(
                  bookingData({
                    searchData: details,
                    longitude: details.geometry.location.lng,
                    latitude: details.geometry.location.lat,
                    place_id: details.place_id,
                    formatted_address: details.formatted_address,
                  })
                );
              }}
              query={{
                key: process.env.GOOGLE_MAP_API,
                language: "en",
                types: "geocode",
              }}
            />
                </View>
                <TouchableOpacity style={styles.filter}>
                    <FilterIcon width="30" height="30"/>
                </TouchableOpacity>
            </View>

            { isEnabled ? availableSpots : unavailableSpots }
            
            <View style={styles.available}>
                {isEnabled ? <EyeOpenedIcon width="30" height="30"/> : <EyeClosedIcon width="30" height="30"/>}
                
                <Text style={{fontWeight:'500',fontSize:16,color:'#084523'}}>
                    Only Show Available Spots
                </Text>
                <Switch
                    trackColor={{false: '#767577', true: '#084523'}}
                    thumbColor={isEnabled ? '#fff' : '#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            {/* <Navigation active='search' navigation={navigation}/> */}
        </View>
    )
}
export default Search

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Poppins',
        flex: 1,
        position:'relative',
    },
    mapScreen:{
        flex:1
    },
    header:{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 30,
        left: 15,
        right: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    searchbar_container:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
        paddingTop:5,
        backgroundColor:'#08452312',
        borderRadius:5,
        marginRight:10,
        flex:8,
    },
    filter:{
        alignItems:'center',
        padding:15,
        backgroundColor:'#08452312',
        borderRadius:15,
        flex:1,
    },
    mapScreen:{
        width:'100%',
        height:'100%',
    },
    available:{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 100,
        left: 15,
        right: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor:'#08452312',
        borderRadius:15,
        padding:15,
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff7e9',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
    },
})