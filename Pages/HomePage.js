import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator, ScrollView, Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import WeatherDetails from '../components/WeatherDetails';
import HourlyWeather from '../components/HourlyWeather';
import DailyWeather from '../components/DailyWeather';
import InDepthDetails from '../components/InDepthDetails';
import { FontAwesome5, Ionicons } from 'react-native-vector-icons';
import { getUnitsSystem, getCurrLocationFlag, getLocation, getCurrWeatherData, getOneCallWeatherData, getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;
let ctr = 0; // ctr for if currlocation is called

// Degree symbol : °

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function homePage({ navigation  }) {
    const [errMssg, setErrMssg] = useState(null);
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);
    const [refreshing, setRefreshing] = useState(null);
    let units = getUnitsSystem();

    let isDark = getIsDark();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    // synchronous function
    useEffect(() => {
        if (getCurrLocationFlag()) {
            const unsubscribe = navigation.addListener('focus', () => {
                load();
            });
            ctr = 0;
            return unsubscribe;
        } else if (!getCurrLocationFlag()) {
            if (ctr < 1) {
                const unsubscribe = navigation.addListener('focus', () => {
                    load();
                });
                ctr++;
                return unsubscribe;
            } else if (ctr > 1) {
                load();
            }
        }
        load();
    }, []);

    // Loads default weather data & HomePage on startup
    async function load() {
        setErrMssg(null);
        setWeatherInfo(null);

        try {
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

    if (isDark) {
        if (weatherInfo) {
            console.log('\n~ HomePage ~\n');
            
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Deccember'];
            var dayName = days[new Date().getDay()];
            var day = new Date().getDate();
            var monthName = months[new Date().getMonth()];
            var currDate =  dayName + ', ' + monthName + ' ' + day;
    
            const {
                current: {temp, feels_like, weather: [weatherDetails]},
            } = weatherInfo;
    
            const {
                name
            } = locationInfo;
    
            // deconstructs weather details list
            const {description, icon} = weatherDetails;
            const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    
            function navigateToSearchPage() {
                navigation.navigate("Search");
            }
            function navigateToSettingsPage() {
                navigation.navigate("Settings");
            }
    
            if (units === 'imperial') {
                return (
                    <View style={styles.bodyContainer}>
                        <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                        <ScrollView 
                            style={styles.scroll}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={styles.container}>
                                <View style={styles.navContainer}>
                                    <TouchableOpacity style={styles.searchIcon} activeOpacity={0.5} onPress={()=>navigateToSearchPage()}>
                                        <Text style={styles.btnText}><FontAwesome5 name="search" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={styles.btnText}><Ionicons name="settings-sharp" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={styles.LocationPrimaryText}>{name}</Text>
                                    <Text style={styles.dateText}>{currDate}</Text>
                                </View>
                                <View style={styles.mainWeatherInfo}>
                                    {/* Outputs the specified weather icon */}
                                    <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                                    {/* Outputs specific description of weather conditions */}
                                    <Text style={styles.descriptText}>{description}</Text>
                                    {/* Outputs temperature */}
                                    <Text style={styles.tempText}>{Math.round(temp)}°F</Text>
                                    {/* Outputs the feels like temperature */}
                                    <Text style={styles.feelText}>Feels Like {Math.round(feels_like)}°F</Text>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                        </ScrollView>
                    </View>
                );
            } else if (units === 'metric') {
                return (
                    <View style={styles.bodyContainer}>
                        <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                        <ScrollView 
                            style={styles.scroll}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={styles.container}>
                                <View style={styles.navContainer}>
                                    <TouchableOpacity style={styles.searchIcon} activeOpacity={0.5} onPress={()=>navigateToSearchPage()}>
                                        <Text style={styles.btnText}><FontAwesome5 name="search" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={styles.btnText}><Ionicons name="settings-sharp" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={styles.LocationPrimaryText}>{name}</Text>
                                    <Text style={styles.dateText}>{currDate}</Text>
                                </View>
                                <View style={styles.mainWeatherInfo}>
                                    {/* Outputs the specified weather icon */}
                                    <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                                    {/* Outputs specific description of weather conditions */}
                                    <Text style={styles.descriptText}>{description}</Text>
                                    {/* Outputs temperature */}
                                    <Text style={styles.tempText}>{Math.round(temp)}°C</Text>
                                    {/* Outputs the feels like temperature */}
                                    <Text style={styles.feelText}>Feels Like {Math.round(feels_like)}°C</Text>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                        </ScrollView>
                    </View>
                );
            }
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
                        <Text style={styles.loadingMssg_main}>StormyWeather</Text>
                        <Text style={styles.openWeatherMssg}>Powered by OpenWeather™</Text>
                    </View>
                </View>
            );
        } 
    } else {
        if (weatherInfo) {
            console.log('\n~ HomePage ~\n');
            
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Deccember'];
            var dayName = days[new Date().getDay()];
            var day = new Date().getDate();
            var monthName = months[new Date().getMonth()];
            var currDate =  dayName + ', ' + monthName + ' ' + day;
    
            const {
                current: {temp, feels_like, weather: [weatherDetails]},
            } = weatherInfo;
    
            const {
                name
            } = locationInfo;
    
            // deconstructs weather details list
            const {description, icon} = weatherDetails;
            const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    
            function navigateToSearchPage() {
                navigation.navigate("Search");
            }
            function navigateToSettingsPage() {
                navigation.navigate("Settings");
            }
    
            if (units === 'imperial') {
                return (
                    <View style={lightStyles.bodyContainer}>
                        <StatusBar barStyle="dark-content" backgroundColor={TEXT_COLOR_LIGHT}/>
                        <ScrollView 
                            style={lightStyles.scroll}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={lightStyles.container}>
                                <View style={lightStyles.navContainer}>
                                    <TouchableOpacity style={lightStyles.searchIcon} activeOpacity={0.5} onPress={()=>navigateToSearchPage()}>
                                        <Text style={lightStyles.btnText}><FontAwesome5 name="search" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={lightStyles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={lightStyles.btnText}><Ionicons name="settings-sharp" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={lightStyles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={lightStyles.LocationPrimaryText}>{name}</Text>
                                    <Text style={lightStyles.dateText}>{currDate}</Text>
                                </View>
                                <View style={lightStyles.mainWeatherInfo}>
                                    {/* Outputs the specified weather icon */}
                                    <Image style={lightStyles.iconStyle} source={{uri: iconURL}}/>
                                    {/* Outputs specific description of weather conditions */}
                                    <Text style={lightStyles.descriptText}>{description}</Text>
                                    {/* Outputs temperature */}
                                    <Text style={lightStyles.tempText}>{Math.round(temp)}°F</Text>
                                    {/* Outputs the feels like temperature */}
                                    <Text style={lightStyles.feelText}>Feels Like {Math.round(feels_like)}°F</Text>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                        </ScrollView>
                    </View>
                );
            } else if (units === 'metric') {
                return (
                    <View style={lightStyles.bodyContainer}>
                        <StatusBar barStyle="dark-content" backgroundColor={TEXT_COLOR_LIGHT}/>
                        <ScrollView 
                            style={lightStyles.scroll}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={lightStyles.container}>
                                <View style={lightStyles.navContainer}>
                                    <TouchableOpacity style={lightStyles.searchIcon} activeOpacity={0.5} onPress={()=>navigateToSearchPage()}>
                                        <Text style={lightStyles.btnText}><FontAwesome5 name="search" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={lightStyles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={lightStyles.btnText}><Ionicons name="settings-sharp" size={25} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={lightStyles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={lightStyles.LocationPrimaryText}>{name}</Text>
                                    <Text style={lightStyles.dateText}>{currDate}</Text>
                                </View>
                                <View style={lightStyles.mainWeatherInfo}>
                                    {/* Outputs the specified weather icon */}
                                    <Image style={lightStyles.iconStyle} source={{uri: iconURL}}/>
                                    {/* Outputs specific description of weather conditions */}
                                    <Text style={lightStyles.descriptText}>{description}</Text>
                                    {/* Outputs temperature */}
                                    <Text style={lightStyles.tempText}>{Math.round(temp)}°C</Text>
                                    {/* Outputs the feels like temperature */}
                                    <Text style={lightStyles.feelText}>Feels Like {Math.round(feels_like)}°C</Text>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                        </ScrollView>
                    </View>
                );
            }
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
        backgroundColor: PRIMARY_COLOR,
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

    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
    },

    scroll: {
        flex: 1,
        width: Dimensions.get('window').width,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },

    navContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },

    searchIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: Dimensions.get('window').width - 140,
        marginLeft: 20,
        backgroundColor: TIERTIARY_COLOR,
    },

    settingsIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 20,
        backgroundColor: TIERTIARY_COLOR,
    },

    headerContainer: {
        alignItems: 'center',
    },

    mainWeatherInfo: {
        alignItems: 'center',
    },

    LocationPrimaryText: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
    },  

    dateText: {
        fontSize: 13,
        color: TEXT_COLOR_LIGHTGRAY,
        fontWeight: '400',
    },

    descriptText: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
        textTransform: 'capitalize',
        marginTop: -15,
    },

    tempText: {
        fontSize: 65,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
    },

    feelText: {
        fontSize: 14,
        color: TEXT_COLOR_LIGHTGRAY,
        fontWeight: '400',
    },

    iconStyle: {
        width: 125,
        height: 125,
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
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: TEXT_COLOR_LIGHT,
    },

    scroll: {
        flex: 1,
        width: Dimensions.get('window').width,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },

    navContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },

    searchIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: Dimensions.get('window').width - 140,
        marginLeft: 20,
        backgroundColor: TIERTIARY_COLOR,
    },

    settingsIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 20,
        backgroundColor: TIERTIARY_COLOR,
    },

    headerContainer: {
        alignItems: 'center',
    },

    mainWeatherInfo: {
        alignItems: 'center',
    },

    LocationPrimaryText: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR_BLACK,
    },  

    dateText: {
        fontSize: 13,
        color: TEXT_COLOR_DARKGRAY,
        fontWeight: '400',
    },

    descriptText: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR_BLACK,
        textTransform: 'capitalize',
        marginTop: -15,
    },

    tempText: {
        fontSize: 65,
        color: TEXT_COLOR_BLACK,
        fontWeight: '700',
    },

    feelText: {
        fontSize: 14,
        color: TEXT_COLOR_DARKGRAY,
        fontWeight: '400',
    },

    iconStyle: {
        width: 125,
        height: 125,
    },

    errContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
    },
});
