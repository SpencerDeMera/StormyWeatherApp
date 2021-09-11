import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import countryList from 'react-select-country-list';
import { setLocation, setCoords } from '../utils/index';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_LIGHTGRAY} = colors;

export default function Locations({ states, cityName, cityState, cityCountry, cityLat, cityLon }) {
    const countries = countryList();
    var stateName;

    // Navgation parameters
    const navigation = useNavigation();

    function onPressFunc() {
        const useCurrLocationFlag = false;
        setLocation(useCurrLocationFlag); // uses current location on load
        setCoords(cityLat, cityLon);
        navigation.navigate("Home");
    }

    for (var i = 0; i < states.length; i++) {
        if (states[i].abbreviation === cityState) {
            stateName = states[i].name;
        }
    }

    if (cityName && cityCountry) {
        if (cityState == undefined || cityState == null) { // if state DNE (not in US or AU)
            return (
                <TouchableOpacity style={styles.container} onPress={() => onPressFunc()}>
                    <View style={styles.FrontContainer}>
                        <Text style={styles.frontText}>{cityName}</Text>
                        <Text style={styles.subFrontText}>{countries.getLabel(cityCountry)}</Text>
                    </View>
                    <View style={styles.BackContainer}>
                        <Text style={styles.btnText}><MaterialCommunityIcons name="weather-lightning" size={20} color={TEXT_COLOR_LIGHT} style={styles.favIcon}/></Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={() => onPressFunc()}>
                    <View style={styles.FrontContainer}>
                        <Text style={styles.frontText}>{cityName}</Text>
                        <Text style={styles.subFrontText}>{stateName}, {countries.getLabel(cityCountry)}</Text>
                    </View>
                    <View style={styles.BackContainer}>
                        <Text style={styles.btnText}><MaterialCommunityIcons name="weather-lightning" size={20} color={TEXT_COLOR_LIGHT} style={styles.favIcon}/></Text>
                    </View>
                </TouchableOpacity>
            );
        }
    } else {
        return (
            <View style={styles.errContainer}>
                <Text style={styles.errTextMain}>No Results.</Text>
                <Text style={styles.errTextSub}>Try again with a different city.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
        marginTop: 200,
    },

    firstLoadInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    loadingMssg_main: {
        marginBottom: 150,
        marginTop: 25,
        color: TEXT_COLOR_LIGHT,
        fontSize: 25,
        fontWeight: '700',
    },

    openWeatherMssg: {
        flex: 1,
        position: 'absolute',
        bottom: -200,
        color: TEXT_COLOR_LIGHT,
        fontSize: 17,
        fontWeight: '500',
    },

    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: TIERTIARY_COLOR,
        width: 320,
        padding: 10,
        marginBottom: 15,
        borderRadius: 20,
    },

    FrontContainer: {
        flexDirection: 'column',
        marginLeft: 12,
        width: 240,
    },

    BackContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR_LIGHT,
    },

    frontText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: TEXT_COLOR_LIGHT,
        fontSize: 17,
        fontWeight: '700',
    },

    subFrontText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: TEXT_COLOR_LIGHTGRAY,
        fontSize: 13,
        fontWeight: '700',
    },

    backText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 15,
        fontWeight: '700',
    },

    errContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 100,
    },

    errTextMain: {
        fontSize: 25,
        fontWeight: 'bold',
        color: TEXT_COLOR_LIGHT,
    },

    errTextSub: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: TEXT_COLOR_LIGHTGRAY,
    },
});
