import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import LocationsForm from '../components/LocationsForm';
import Locations from '../components/Locations';
import LocationCurrWeather from '../components/LocationCurrWeather';
import returnCities from '../utils/cityHooks';
import { getStateName, getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;

// Degree symbol : °

export default function SearchPage({ navigation }) {
    const [errMssg, setErrMssg] = useState(null);
    const [states, setStates] = useState(null);
    const { cities, addCity } = returnCities();
    let filteredCities = [];

    let isDark = getIsDark();

    // synchronous function
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            load();
        });
        return unsubscribe;
    }, []);

    // Loads default weather data & HomePage on startup
    async function load() {
        setStates(null);

        try {
            const stateData = await getStateName();
            setStates(stateData);
        } catch (err) {
            setErrMssg(err.message);
        }
    }

    if (isDark) {
        if (states) {
            console.log('\n~ SearchPage ~\n');
    
            function searchArr (id) {
                for (var i = 0; i < filteredCities.length; i++) {
                    if (filteredCities[i].id === id) {
                        return true;
                    }
                } 
            }
    
            for (var i = 0; i < cities.length; i++) {
                if (!(searchArr(cities[i].id))) { // if city id DNE in filteredCities
                    filteredCities.push(cities[i]);
                }
            }
    
            return (
                <View style={styles.bodyContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={SECONDARY_COLOR}/>
                    <View>
                        <View style={styles.container}>
                            <LocationCurrWeather />
                            <LocationsForm onNewCity={addCity}/>
                        </View>
                    </View>
    
                    <FlatList 
                        style={styles.flatContainer}
                        data={filteredCities}
                        renderItem={({ item }) => {
                            return (
                                <Locations 
                                    key={item.id}
                                    states={states}
                                    cityName={item.cityName}
                                    cityState={item.cityState}
                                    cityCountry={item.cityCountry}
                                    cityLat={item.cityLat}
                                    cityLon={item.cityLon}
                                />
                            );
                        }}
                    />
                </View>
            );
        } else if (errMssg) {
            return (
                <View style={styles.errContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                    <Text style={{color: TEXT_COLOR_LIGHT}}>{errMssg}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.loadingContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                    {/* Loading wheel */}
                    <ActivityIndicator size={85} color={SECONDARY_COLOR} />
                    <View style={styles.firstLoadInfo}>
                        <Text style={styles.loadingMssg_main}>Fetching Locations...</Text>
                        <Text style={styles.openWeatherMssg}>Powered by OpenWeather™</Text>
                    </View>
                </View>
            );
        } 
    } else {
        if (states) {
            console.log('\n~ SearchPage ~\n');
    
            function searchArr (id) {
                for (var i = 0; i < filteredCities.length; i++) {
                    if (filteredCities[i].id === id) {
                        return true;
                    }
                } 
            }
    
            for (var i = 0; i < cities.length; i++) {
                if (!(searchArr(cities[i].id))) { // if city id DNE in filteredCities
                    filteredCities.push(cities[i]);
                }
            }
    
            return (
                <View style={lightStyles.bodyContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={SECONDARY_COLOR}/>
                    <View>
                        <View style={lightStyles.container}>
                            <LocationCurrWeather />
                            <LocationsForm onNewCity={addCity}/>
                        </View>
                    </View>
    
                    <FlatList 
                        style={lightStyles.flatContainer}
                        data={filteredCities}
                        renderItem={({ item }) => {
                            return (
                                <Locations 
                                    key={item.id}
                                    states={states}
                                    cityName={item.cityName}
                                    cityState={item.cityState}
                                    cityCountry={item.cityCountry}
                                    cityLat={item.cityLat}
                                    cityLon={item.cityLon}
                                />
                            );
                        }}
                    />
                </View>
            );
        } else if (errMssg) {
            return (
                <View style={lightStyles.errContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor={TEXT_COLOR_LIGHT}/>
                    <Text style={{color: TEXT_COLOR_LIGHT}}>{errMssg}</Text>
                </View>
            );
        } else {
            return (
                <View style={lightStyles.loadingContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor={TEXT_COLOR_LIGHT}/>
                    {/* Loading wheel */}
                    <ActivityIndicator size={85} color={SECONDARY_COLOR} />
                    <View style={lightStyles.firstLoadInfo}>
                        <Text style={lightStyles.loadingMssg_main}>StormyWeather</Text>
                        <Text style={lightStyles.openWeatherMssg}>Powered by OpenWeather™</Text>
                    </View>
                </View>
            );
        } 
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: TEXT_COLOR_LIGHT,
    },

    firstLoadInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    loadingMssg_main: {
        marginBottom: 150,
        marginTop: 25,
        color: TEXT_COLOR_BLACK,
        fontSize: 25,
        fontWeight: '700',
    },

    openWeatherMssg: {
        flex: 1,
        position: 'absolute',
        bottom: -200,
        color: TEXT_COLOR_BLACK,
        fontSize: 17,
        fontWeight: '500',
    },

    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
    },

    container: {
        backgroundColor: SECONDARY_COLOR,
        width: Dimensions.get('window').width,
        height: 180,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        position: 'relative',
        top: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backContainer: {
        flex: 1,
        position: 'absolute',
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 25,
        top: 5,
        left: 40,
    },

    textInputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    listContainer: {
        marginTop: 30,
        height: 200,
    },

    savedTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: -10,
    },

    savedLocText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 15,
        fontWeight: 'bold',
    },

    flatContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: PRIMARY_COLOR,
        marginTop: 50,
    },

    errContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
    },
});

const lightStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: TEXT_COLOR_LIGHT,
    },

    firstLoadInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    loadingMssg_main: {
        marginBottom: 150,
        marginTop: 25,
        color: TEXT_COLOR_BLACK,
        fontSize: 25,
        fontWeight: '700',
    },

    openWeatherMssg: {
        flex: 1,
        position: 'absolute',
        bottom: -200,
        color: TEXT_COLOR_BLACK,
        fontSize: 17,
        fontWeight: '500',
    },

    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: TEXT_COLOR_LIGHT,
    },

    container: {
        backgroundColor: SECONDARY_COLOR,
        width: Dimensions.get('window').width,
        height: 180,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        position: 'relative',
        top: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backContainer: {
        flex: 1,
        position: 'absolute',
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 25,
        top: 5,
        left: 40,
    },

    textInputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    listContainer: {
        marginTop: 30,
        height: 200,
    },

    savedTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: -10,
    },

    savedLocText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 15,
        fontWeight: 'bold',
    },

    flatContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: TEXT_COLOR_LIGHT,
        marginTop: 50,
    },

    errContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
    },
});
