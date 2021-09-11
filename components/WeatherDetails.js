import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Feather } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;

// Degree symbol : °

export default function WeatherDetails({ weatherInfo, units }) {
    const {
        current: {sunrise, sunset, clouds, wind_speed},
        daily: [dailyDetails],
    } = weatherInfo;

    const {temp: {min, max}} = dailyDetails;

    let isDark = getIsDark();

    function _getFormattedTime(epoch) {
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
    } // _getFormattedTime function


    if (isDark) {
        if (units === 'imperial') {
            return (
                <View style={styles.container}>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            <FontAwesome5 name="temperature-low" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round(min)} ° | {Math.round(max)} °</Text>
                                <Text style={styles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            <FontAwesome5 name="wind" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round(wind_speed)} mph</Text>
                                <Text style={styles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            <Ionicons name="water" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{weatherInfo.hourly[0].pop} %</Text>
                                <Text style={styles.weatherSubData}>Rain Probability</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="cloud-outline" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{clouds} %</Text>
                                <Text style={styles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            <Feather name="sunrise" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{_getFormattedTime(sunrise)}</Text>
                                <Text style={styles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            <Feather name="sunset" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{_getFormattedTime(sunset)}</Text>
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
                            <FontAwesome5 name="temperature-low" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round(min)} ° | {Math.round(max)} °</Text>
                                <Text style={styles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            <FontAwesome5 name="wind" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{Math.round(wind_speed)} km/h</Text>
                                <Text style={styles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            <Ionicons name="water" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{weatherInfo.hourly[0].pop} %</Text>
                                <Text style={styles.weatherSubData}>Rain Probability</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="cloud-outline" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{clouds} %</Text>
                                <Text style={styles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.weatherDetialsBox}>
                            <Feather name="sunrise" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{_getFormattedTime(sunrise)}</Text>
                                <Text style={styles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={styles.weatherDetialsBox}>
                            <Feather name="sunset" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.weatherData}>{_getFormattedTime(sunset)}</Text>
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
                            <FontAwesome5 name="temperature-low" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round(min)} ° | {Math.round(max)} °</Text>
                                <Text style={lightStyles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            <FontAwesome5 name="wind" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round(wind_speed)} mph</Text>
                                <Text style={lightStyles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            <Ionicons name="water" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{weatherInfo.hourly[0].pop} %</Text>
                                <Text style={lightStyles.weatherSubData}>Rain Probability</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="cloud-outline" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{clouds} %</Text>
                                <Text style={lightStyles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            <Feather name="sunrise" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{_getFormattedTime(sunrise)}</Text>
                                <Text style={lightStyles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            <Feather name="sunset" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{_getFormattedTime(sunset)}</Text>
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
                            <FontAwesome5 name="temperature-low" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round(min)} ° | {Math.round(max)} °</Text>
                                <Text style={lightStyles.weatherSubData}>Temperature</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            <FontAwesome5 name="wind" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{Math.round(wind_speed)} km/h</Text>
                                <Text style={lightStyles.weatherSubData}>Wind Speed</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            <Ionicons name="water" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{weatherInfo.hourly[0].pop} %</Text>
                                <Text style={lightStyles.weatherSubData}>Rain Probability</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="cloud-outline" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{clouds} %</Text>
                                <Text style={lightStyles.weatherSubData}>Cloud Cover</Text>
                            </View>
                        </View>
                    </View>
                    <View style={lightStyles.weatherDetailsRow}>
                        <View style={lightStyles.weatherDetialsBox}>
                            <Feather name="sunrise" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{_getFormattedTime(sunrise)}</Text>
                                <Text style={lightStyles.weatherSubData}>Sunrise</Text>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetialsBox}>
                            <Feather name="sunset" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                            <View style={lightStyles.detailsContainer}>
                                <Text style={lightStyles.weatherData}>{_getFormattedTime(sunset)}</Text>
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
        marginHorizontal: 20,
        marginVertical: -5,
        backgroundColor: TEXT_COLOR_LIGHT,
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        opacity: 0.9,
    },

    weatherIcons: {
        paddingTop: 6,
        paddingLeft: 6,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    detailsContainer: {
        paddingLeft: 10, 
    },

    weatherData: {
        fontSize: 13,
        color: TEXT_COLOR_DARK,
        fontWeight: '700',
    },

    weatherSubData: {
        fontSize: 10,
        color: TEXT_COLOR_DARKGRAY,
        fontWeight: '700',
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
        marginHorizontal: 20,
        marginVertical: -5,
        backgroundColor: PRIMARY_COLOR,
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        opacity: 0.9,
    },

    weatherIcons: {
        paddingTop: 6,
        paddingLeft: 6,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    detailsContainer: {
        paddingLeft: 10, 
    },

    weatherData: {
        fontSize: 13,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
    },

    weatherSubData: {
        fontSize: 10,
        color: TEXT_COLOR_LIGHTGRAY,
        fontWeight: '700',
    },
});
