import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import { setLocation } from '../utils/index';
import { FontAwesome5 } from 'react-native-vector-icons';
import { getUnitsSystem, getLocation, getCurrWeatherData, getOneCallWeatherData } from '../utils/index';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_LIGHTGRAY} = colors;

// Degree symbol : °

export default function LocationCurrWeather() {
    const [errMssg, setErrMssg] = useState(null);
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    let units = getUnitsSystem();

    // Navgation parameters
    const navigation = useNavigation();

    // synchronous function
    useEffect(() => {
        load();
    }, []);

    // Loads default weather data & HomePage on startup
    async function load() {
        setWeatherInfo(null);
        setErrMssg(null);

        try {
            const useCurrLocationFlag = true;
            setLocation(useCurrLocationFlag); // uses current location on load

            const location = await getLocation();

            // Get city name and country abbrev
            const locationData = await getCurrWeatherData(location);
            setLocationInfo(locationData);

            const weatherData = await getOneCallWeatherData(location);

            if (weatherData != null) {
                setWeatherInfo(weatherData);
            } else { // if weatherData == null -> error with API call
                setErrMssg(weatherData.message);
            }
        } catch (err) {
            setErrMssg(err.message);
        }
    }

    if (weatherInfo) {
        const {
            current: {temp, weather: [weatherDetails]},
        } = weatherInfo;

        const {
            name
        } = locationInfo;

        const {description, icon} = weatherDetails;
        const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;

        function onPressFunc() {
            const useCurrLocationFlag = true;
            setLocation(useCurrLocationFlag); // uses current location on load
            navigation.navigate("Home");
        }

        if (units === 'imperial') {
            return (
                <View style={styles.currWeatherContainer}>
                    <View style={styles.currenTitling}>
                        <Text style={styles.currTitle}>Current</Text>
                        <FontAwesome5 name="location-arrow" size={15} color={TEXT_COLOR_LIGHT} style={styles.arrowIcon}/>
                    </View>
                    <TouchableOpacity style={styles.currWeatherDetails} onPress={() => onPressFunc()}>
                    <View style={styles.FrontContainer}>
                            <View style={styles.innerFrontContainer}>
                                <Text style={styles.currLocationName}>{name}</Text>
                                <Text style={styles.descriptData}>{description}</Text> 
                            </View>
                        </View>
                        <View style={styles.BackContainer}>
                            <View style={styles.innerBackContainer}>
                                <Text style={styles.tempData}>{Math.round(temp)}°F</Text>
                                <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={styles.currWeatherContainer}>
                    <View style={styles.currenTitling}>
                        <Text style={styles.currTitle}>Current</Text>
                        <FontAwesome5 name="location-arrow" size={15} color={TEXT_COLOR_LIGHT} style={styles.arrowIcon}/>
                    </View>
                    <TouchableOpacity style={styles.currWeatherDetails} onPress={() => onPressFunc()}>
                        <View style={styles.FrontContainer}>
                            <View style={styles.innerFrontContainer}>
                                <Text style={styles.currLocationName}>{name}</Text>
                                <Text style={styles.descriptData}>{description}</Text> 
                            </View>
                        </View>
                        <View style={styles.BackContainer}>
                            <View style={styles.innerBackContainer}>
                                <Text style={styles.tempData}>{Math.round(temp)}°C</Text>
                                <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    } else if (errMssg) {
        return (
            <View style={styles.errContainer}>
                <StatusBar style="light" backgroundColor={PRIMARY_COLOR}/>
                <Text style={{color: TEXT_COLOR_LIGHT}}>{errMssg}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.loadingContainer}>
                {/* Loading wheel */}
                <ActivityIndicator size={45} color={PRIMARY_COLOR} />
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
    },

    currWeatherContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5,
        width: Dimensions.get('window').width - 100,
    },

    currWeatherDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
        width: Dimensions.get('window').width - 100,
    },

    currenTitling: {
        flexDirection: 'row',
        width: Dimensions.get('window').width - 100,
        justifyContent: 'flex-start',
        marginBottom: 5,
    },

    FrontContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: -5,
        width: (Dimensions.get('window').width - 100) / 1.5,
    },

    innerFrontContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    BackContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: -5,
        width: (Dimensions.get('window').width - 100) / 3,
    },

    innerBackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -8,
    },

    currTitle: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5,
    },

    arrowIcon: {
        marginTop: 5,
        marginLeft: 10,
    },

    currLocationName: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 18,
        fontWeight: '700',
    },

    descriptData: {
        color: TEXT_COLOR_LIGHTGRAY,
        fontSize: 15,
        fontWeight: '700',
        textTransform: 'capitalize',
    },

    tempData: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 25,
        fontWeight: '700',
    },

    iconStyle: {
        width: 65,
        height: 65,
        marginRight: -17,
    },

    errContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
    },
});
