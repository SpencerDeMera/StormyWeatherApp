import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Feather } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';
import { detailsICONS } from '../utils/detailsIcons';

const {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;

// Degree symbol : °

export default function WeatherDetails({ weatherInfo, units }) {
    const {
        current: {sunrise, sunset, clouds, wind_speed},
        daily: [dailyDetails],
    } = weatherInfo;

    const {temp: {min, max}} = dailyDetails;

    let isDark = getIsDark();

    function getFormattedTime(epoch) {
        var formattedTime;
        const time = new Date(epoch * 1000);
        const hours = time.getHours();
        const mins = time.getMinutes();

        if (hours < 1 && mins > 9) {
            formattedTime = `12:${mins} AM`;
        } else if (hours < 1 && mins < 10) {
            formattedTime = `12:0${mins} AM`;
        } else if (hours < 12 && mins > 9) {
            formattedTime = `${hours}:${mins} AM`;
        } else if (hours < 12 && mins < 10) {
            formattedTime = `${hours}:0${mins} AM`;
        } else if (hours == 12 && mins > 9) {
            formattedTime = `${hours}:${mins} PM`;
        } else if (hours == 12 && mins < 10) {
            formattedTime = `${hours - 12}:0${mins} PM`;
        } else if (hours > 12 && hours < 24 && mins > 9) {
            formattedTime = `${hours - 12}:${mins} PM`;
        } else if (hours > 12 && hours < 24 && mins < 10) {
            formattedTime = `${hours - 12}:0${mins} PM`;
        } else if (hours == 24 && mins > 9) {
            formattedTime = `${hours - 12}:${mins} AM`;
        } else if (hours == 24 && mins < 10) {
            formattedTime = `${hours - 12}:0${mins} AM`;
        }
        return formattedTime;
    } // getFormattedTime function

    if (isDark) {
        if (units === 'imperial') {
            return (
                <View style={styles.container}>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="temperature-low" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['thermo'].image}/>
                            <View style={styles.detailsContainer}>
                                <View style={styles.tempsContainer}>
                                    <Text style={styles.weatherData1}>{Math.round(min)}°</Text>
                                    <Text style={styles.weatherDataSlash}> / </Text>
                                    <Text style={styles.weatherData2}>{Math.round(max)}°</Text>
                                </View>
                                <Text style={styles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="wind" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['wind'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round(wind_speed)} mph</Text>
                                <Text style={styles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            {/* <Ionicons name="water" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['rain'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round((weatherInfo.daily[0].pop)*100)} %</Text>
                                <Text style={styles.weatherSubData}>Precipitation</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            {/* <MaterialCommunityIcons name="cloud-outline" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['cloud'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{clouds} %</Text>
                                <Text style={styles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            {/* <Feather name="sunrise" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['rise'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{getFormattedTime(sunrise)}</Text>
                                <Text style={styles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            {/* <Feather name="sunset" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['set'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{getFormattedTime(sunset)}</Text>
                                <Text style={styles.weatherSubData}>Sunset</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={styles.container}>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="temperature-low" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['thermo'].image}/>
                            <View style={styles.detailsContainer}>
                                <View style={styles.tempsContainer}>
                                    <Text style={styles.weatherData1}>{Math.round(min)}°</Text>
                                    <Text style={styles.weatherDataSlash}> / </Text>
                                    <Text style={styles.weatherData2}>{Math.round(max)}°</Text>
                                </View>
                                <Text style={styles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="wind" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['wind'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round(wind_speed)} km/h</Text>
                                <Text style={styles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            {/* <Ionicons name="water" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['rain'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round((weatherInfo.daily[0].pop)*100)} %</Text>
                                <Text style={styles.weatherSubData}>Precipitation</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            {/* <MaterialCommunityIcons name="cloud-outline" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['cloud'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{clouds} %</Text>
                                <Text style={styles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            {/* <Feather name="sunrise" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['rise'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{getFormattedTime(sunrise)}</Text>
                                <Text style={styles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            {/* <Feather name="sunset" size={20} style={styles.weatherIcons}/> */}
                            <Image style={styles.detailsIcons} source={detailsICONS['set'].image}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{getFormattedTime(sunset)}</Text>
                                <Text style={styles.weatherSubData}>Sunset</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    } else {
        if (units === 'imperial') {
            return (
                <View style={lightStyles.container}>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="temperature-low" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['thermo'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <View style={lightStyles.tempsContainer}>
                                    <Text style={lightStyles.weatherData1}>{Math.round(min)}°</Text>
                                    <Text style={lightStyles.weatherDataSlash}> / </Text>
                                    <Text style={lightStyles.weatherData2}>{Math.round(max)}°</Text>
                                </View>
                                <Text style={lightStyles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="wind" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['wind'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round(wind_speed)} mph</Text>
                                <Text style={lightStyles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <Ionicons name="water" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['rain'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round((weatherInfo.daily[0].pop)*100)} %</Text>
                                <Text style={lightStyles.weatherSubData}>Precipitation</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <MaterialCommunityIcons name="cloud-outline" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['cloud'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{clouds} %</Text>
                                <Text style={lightStyles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <Feather name="sunrise" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['rise'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{getFormattedTime(sunrise)}</Text>
                                <Text style={lightStyles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <Feather name="sunset" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['set'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{getFormattedTime(sunset)}</Text>
                                <Text style={lightStyles.weatherSubData}>Sunset</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={lightStyles.container}>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="temperature-low" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['thermo'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <View style={lightStyles.tempsContainer}>
                                    <Text style={lightStyles.weatherData1}>{Math.round(min)}°</Text>
                                    <Text style={lightStyles.weatherDataSlash}> / </Text>
                                    <Text style={lightStyles.weatherData2}>{Math.round(max)}°</Text>
                                </View>
                                <Text style={lightStyles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <FontAwesome5 name="wind" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['wind'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round(wind_speed)} km/h</Text>
                                <Text style={lightStyles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <Ionicons name="water" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['rain'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round((weatherInfo.daily[0].pop)*100)} %</Text>
                                <Text style={lightStyles.weatherSubData}>Precipitation</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <MaterialCommunityIcons name="cloud-outline" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['cloud'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{clouds} %</Text>
                                <Text style={lightStyles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <Feather name="sunrise" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['rise'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{getFormattedTime(sunrise)}</Text>
                                <Text style={lightStyles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            {/* <Feather name="sunset" size={20} style={styles.weatherIcons}/> */}
                            <Image style={lightStyles.detailsIcons} source={detailsICONS['set'].image}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{getFormattedTime(sunset)}</Text>
                                <Text style={lightStyles.weatherSubData}>Sunset</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
    },

    weatherDetailsRow: {
        marginTop: 20,
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    weatherDetialsBox: {
        width: 135,
        marginHorizontal: 10,
        marginVertical: -5,
        padding: 5,
        marginLeft: 5,
        borderRadius: 10,
        flexDirection: 'row',
    },

    detailsContainer: {
        paddingLeft: 20, 
    },

    tempsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    weatherData: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
    },

    weatherData1: {
        fontSize: 15,
        fontWeight: '700',
        color: '#74ccf7',
    },

    weatherData2: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ff4a68',
    },

    weatherDataSlash: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
    },

    weatherSubData: {
        fontSize: 12,
        color: TEXT_COLOR_LIGHTGRAY,
        fontWeight: '600',
    },

    detailsIcons: {
        marginTop: 3,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
    },
});

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
    },

    weatherDetailsRow: {
        marginTop: 20,
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    weatherDetialsBox: {
        width: 135,
        marginHorizontal: 10,
        marginVertical: -5,
        padding: 5,
        marginLeft: 5,
        borderRadius: 10,
        flexDirection: 'row',
    },

    detailsContainer: {
        paddingLeft: 20, 
    },

    tempsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    weatherData: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_DARK,
    },

    weatherData1: {
        fontSize: 15,
        fontWeight: '700',
        color: '#74ccf7',
    },

    weatherData2: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ff4a68',
    },

    weatherDataSlash: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_DARK,
    },

    weatherSubData: {
        fontSize: 12,
        color: TEXT_COLOR_DARKGRAY,
        fontWeight: '600',
    },

    detailsIcons: {
        marginTop: 3,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
    },
});
