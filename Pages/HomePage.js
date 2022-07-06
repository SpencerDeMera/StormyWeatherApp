import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator, ScrollView, Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import WeatherDetails from '../components/WeatherDetails';
import HourlyWeather from '../components/HourlyWeather';
import DailyWeather from '../components/DailyWeather';
import InDepthDetails from '../components/InDepthDetails';
import RainForcaster from '../components/RainForcaster';
import { FontAwesome5, Ionicons } from 'react-native-vector-icons';
import { getUnitsSystem, getCurrLocationFlag, getLocation, getCurrWeatherData, getOneCallWeatherData, getIsDark, getUnitsLong } from '../utils/index';
import { colors } from '../utils/colors';
import { ICONS } from '../utils/weatherIcons';

const {PRIMARY_COLOR, SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY, BLUEBACK} = colors;
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
        load();
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
        console.log('\n-- Load Weather Data --');
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
            console.log('\n~ HomePage ~');
            
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
            const {id, description, icon} = weatherDetails;
            var iconNum = 8001;

            if ((id > 799 && id < 805) || (id > 299 && id < 623)) {
                if (icon.charAt(2) == 'd') {
                    iconNum = (id * 10) + 1;
                } else {
                    iconNum = (id * 10) + 2;
                }
            } else if ((id > 199 && id < 300) || (id > 699 && id < 782)) {
                iconNum = id;
            }
    
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
                                        <Text style={styles.btnText}><FontAwesome5 name="search" size={23} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={styles.btnText}><Ionicons name="ios-menu-sharp" size={35} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={styles.LocationPrimaryText}>{name}</Text>
                                    <Text style={styles.dateText}>{currDate}</Text>
                                </View>
                                <View style={styles.headerCard}>
                                    <View style={styles.mainWeatherInfo}>
                                        {/* Outputs the specified weather icon */}
                                        <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                                        {/* Outputs specific description of weather conditions */}
                                        <Text style={styles.descriptText}>{description}</Text>
                                        {/* Outputs temperature */}
                                        <Text style={styles.tempText}>{Math.round(temp)}°F</Text>
                                        {/* Outputs the feels like temperature */}
                                        <Text style={styles.feelText}>Feels Like {Math.round(feels_like)}°F</Text>
                                    </View>
                                    <RainForcaster weatherInfo={weatherInfo}/>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                            <View style={styles.openWeatherMssg_container}>
                                <Text style={styles.openWeatherMssg}>Powered by OpenWeatherMap</Text>
                            </View>
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
                                        <Text style={styles.btnText}><FontAwesome5 name="search" size={23} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={styles.btnText}><Ionicons name="ios-menu-sharp" size={35} color={TEXT_COLOR_LIGHT}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={styles.LocationPrimaryText}>{name}</Text>
                                    <Text style={styles.dateText}>{currDate}</Text>
                                </View>
                                <View style={styles.headerCard}>
                                    <View style={styles.mainWeatherInfo}>
                                        {/* Outputs the specified weather icon */}
                                        <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                                        {/* Outputs specific description of weather conditions */}
                                        <Text style={styles.descriptText}>{description}</Text>
                                        {/* Outputs temperature */}
                                        <Text style={styles.tempText}>{Math.round(temp)}°C</Text>
                                        {/* Outputs the feels like temperature */}
                                        <Text style={styles.feelText}>Feels Like {Math.round(feels_like)}°F</Text>
                                    </View>
                                    <RainForcaster weatherInfo={weatherInfo}/>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                            <View style={styles.openWeatherMssg_container}>
                                <Text style={styles.openWeatherMssg}>Powered by OpenWeatherMap</Text>
                            </View>
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
                    {/* <ActivityIndicator size={85} color={SECONDARY_COLOR} /> */}
                    <View style={styles.firstLoadInfo}>
                        <Image style={styles.appIconImage} source={require('../assets/adaptive-icon.png')} />
                        <Text style={styles.loadingMssg_main}>StormyWeather</Text>
                        <Text style={styles.loadingMssg_sub}>Always Stormy</Text>
                        <View style={styles.loading}>
                            <Text style={styles.loadingMssg_minor}>Loading The Weather</Text>  
                            {/* Loading wheel */}
                            <ActivityIndicator size={35} color={SECONDARY_COLOR} />  
                        </View>
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
            const {id, description, icon} = weatherDetails;
            var iconNum = 8001;

            if ((id > 799 && id < 805) || (id > 299 && id < 623)) {
                if (icon.charAt(2) == 'd') {
                    iconNum = (id * 10) + 1;
                } else {
                    iconNum = (id * 10) + 2;
                }
            } else if ((id > 199 && id < 300) || (id > 699 && id < 782)) {
                iconNum = id;
            }
    
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
                                        <Text style={lightStyles.btnText}><FontAwesome5 name="search" size={23} color={TIERTIARY_COLOR}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={lightStyles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={lightStyles.btnText}><Ionicons name="ios-menu-sharp" size={35} color={TIERTIARY_COLOR}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={lightStyles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={lightStyles.LocationPrimaryText}>{name}</Text>
                                    <Text style={lightStyles.dateText}>{currDate}</Text>
                                </View>
                                <View style={lightStyles.headerCard}>
                                    <View style={lightStyles.mainWeatherInfo}>
                                        {/* Outputs the specified weather icon */}
                                        <Image style={lightStyles.iconStyle} source={ICONS[iconNum].image}/>
                                        {/* Outputs specific description of weather conditions */}
                                        <Text style={lightStyles.descriptText}>{description}</Text>
                                        {/* Outputs temperature */}
                                        <Text style={lightStyles.tempText}>{Math.round(temp)}°F</Text>
                                        {/* Outputs the feels like temperature */}
                                        <Text style={lightStyles.feelText}>Feels Like {Math.round(feels_like)}°F</Text>
                                    </View>
                                    <RainForcaster weatherInfo={weatherInfo}/>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                            <View style={lightStyles.openWeatherMssg_container}>
                                <Text style={lightStyles.openWeatherMssg}>Powered by OpenWeatherMap</Text>
                            </View>
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
                                        <Text style={lightStyles.btnText}><FontAwesome5 name="search" size={23} color={TIERTIARY_COLOR}/></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={lightStyles.settingsIcon} activeOpacity={0.5} onPress={()=>navigateToSettingsPage()}>
                                        <Text style={lightStyles.btnText}><Ionicons name="ios-menu-sharp" size={35} color={TIERTIARY_COLOR}/></Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={lightStyles.headerContainer}>
                                    {/* Refresh icon for page refreshing */}
                                    <Text style={lightStyles.LocationPrimaryText}>{name}</Text>
                                    <Text style={lightStyles.dateText}>{currDate}</Text>
                                </View>
                                <View style={lightStyles.headerCard}>
                                    <View style={lightStyles.mainWeatherInfo}>
                                        {/* Outputs the specified weather icon */}
                                        <Image style={lightStyles.iconStyle} source={ICONS[iconNum].image}/>
                                        {/* Outputs specific description of weather conditions */}
                                        <Text style={lightStyles.descriptText}>{description}</Text>
                                        {/* Outputs temperature */}
                                        <Text style={lightStyles.tempText}>{Math.round(temp)}°C</Text>
                                        {/* Outputs the feels like temperature */}
                                        <Text style={lightStyles.feelText}>Feels Like {Math.round(feels_like)}°F</Text>
                                    </View>
                                    <RainForcaster weatherInfo={weatherInfo}/>
                                </View>
                            </View>
                            
                            <WeatherDetails weatherInfo={weatherInfo} units={units}/>
                            <HourlyWeather weatherInfo={weatherInfo} units={units}/>
                            <InDepthDetails weatherInfo={weatherInfo} units={units}/>
                            <DailyWeather weatherInfo={weatherInfo} units={units}/>
                            <View style={lightStyles.openWeatherMssg_container}>
                                <Text style={lightStyles.openWeatherMssg}>Powered by OpenWeatherMap</Text>
                            </View>
                        </ScrollView>
                    </View>
                );
            }
        } else if (errMssg) {
            return (
                <View style={styles.errContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor={TEXT_COLOR_LIGHT}/>
                    <Text style={{color: TEXT_COLOR_LIGHT}}>{errMssg}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.loadingContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                    {/* Loading wheel */}
                    {/* <ActivityIndicator size={85} color={SECONDARY_COLOR} /> */}
                    <View style={styles.firstLoadInfo}>
                        <Image style={styles.appIconImage} source={require('../assets/adaptive-icon.png')} />
                        <Text style={styles.loadingMssg_main}>StormyWeather</Text>
                        <Text style={styles.loadingMssg_sub}>Always Stormy</Text>
                        <View style={styles.loading}>
                            <Text style={styles.loadingMssg_minor}>Loading The Weather</Text>  
                            {/* Loading wheel */}
                            <ActivityIndicator size={35} color={SECONDARY_COLOR} />  
                        </View>
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

    appIconImage: {
        width: 150,
        height: 150,
    },

    loadingMssg_main: {
        marginBottom: 10,
        marginTop: -10,
        color: TEXT_COLOR_LIGHT,
        fontSize: 25,
        fontWeight: '700',
    },

    loadingMssg_sub: {
        marginBottom: 140,
        color: TEXT_COLOR_LIGHTGRAY,
        fontSize: 20,
        fontWeight: '500',
    },

    loading: {
        flex: 1,
        position: 'absolute',
        bottom: -150,
        flexDirection: 'row',
    },

    loadingMssg_minor: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 17,
        fontWeight: '500',
        marginRight: 10,
        marginTop: 3,
    },

    openWeatherMssg_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 15,
    },

    openWeatherMssg: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 15,
        fontWeight: '700',
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
        paddingVertical: 5,
        borderRadius: 50,
        marginRight: Dimensions.get('window').width - 140,
        marginLeft: 20,
    },

    settingsIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 50,
        marginRight: 20,
    },

    headerContainer: {
        alignItems: 'center',
    },

    mainWeatherInfo: {
        marginTop: -15,
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

    openWeatherMssg_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 15,
    },

    openWeatherMssg: {
        color: TEXT_COLOR_BLACK,
        fontSize: 15,
        fontWeight: '700',
    },

    searchIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 50,
        marginRight: Dimensions.get('window').width - 140,
        marginLeft: 20,
    },

    settingsIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 50,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 50,
        marginRight: 20,
    },

    headerContainer: {
        alignItems: 'center',
    },

    mainWeatherInfo: {
        marginTop: -15,
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
});
