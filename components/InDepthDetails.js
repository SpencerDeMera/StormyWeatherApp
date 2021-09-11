import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;

// Degree symbol : °

export default function InDepthDetails({ weatherInfo, units }) {
    let isDark = getIsDark();

    const {
        current: {pressure, humidity, dew_point, uvi, visibility, wind_speed, wind_deg, weather: [weatherDetails]},
    } = weatherInfo;

    const {main, description} = weatherDetails;

    if (isDark) {
        if (units === 'imperial') {
            return (
                <View style={styles.container}>
                    <View style={styles.detailTitling}>
                        <Text style={styles.detailTitle}>Details</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{main}</Text>
                                    <Text style={styles.weatherSubData}>{description}</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <FontAwesome5 name="eye" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(visibility * 0.000621371)} Mi</Text>
                                    <Text style={styles.weatherSubData}>Visibility</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <Entypo name="water" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{humidity} %</Text>
                                    <Text style={styles.weatherSubData}>Humidity</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <MaterialCommunityIcons name="watering-can" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(dew_point)} ° F</Text>
                                    <Text style={styles.weatherSubData}>Dew Point</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="tailwind" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.hourly[0].wind_gust)} mph</Text>
                                    <Text style={styles.weatherSubData}>Wind Speed</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <Entypo name="direction" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(wind_deg)} °</Text>
                                    <Text style={styles.weatherSubData}>Wind Degrees</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="speedometer" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(pressure / 1000)} bar</Text>
                                    <Text style={styles.weatherSubData}>Pressure</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <FontAwesome5 name="binoculars" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(uvi)}</Text>
                                    <Text style={styles.weatherSubData}>UV Index</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={styles.container}>
                    <View style={styles.detailTitling}>
                        <Text style={styles.detailTitle}>Details</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{main}</Text>
                                    <Text style={styles.weatherSubData}>{description}</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <FontAwesome5 name="eye" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(visibility / 1000)} Km</Text>
                                    <Text style={styles.weatherSubData}>Visibility</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <Entypo name="water" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{humidity} %</Text>
                                    <Text style={styles.weatherSubData}>Humidity</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <MaterialCommunityIcons name="watering-can" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(dew_point)} ° C</Text>
                                    <Text style={styles.weatherSubData}>Dew Point</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="tailwind" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.hourly[0].wind_gust)} km/h</Text>
                                    <Text style={styles.weatherSubData}>Wind Speed</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <Entypo name="direction" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(wind_deg)} °</Text>
                                    <Text style={styles.weatherSubData}>Wind Degrees</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="speedometer" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(pressure / 1000)} bar</Text>
                                    <Text style={styles.weatherSubData}>Pressure</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox}>
                                <FontAwesome5 name="binoculars" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(uvi)}</Text>
                                    <Text style={styles.weatherSubData}>UV Index</Text>
                                </View>
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
                    <View style={lightStyles.detailTitling}>
                        <Text style={lightStyles.detailTitle}>Details</Text>
                    </View>
                    <View style={lightStyles.detailsContainer}>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{main}</Text>
                                    <Text style={lightStyles.weatherSubData}>{description}</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <FontAwesome5 name="eye" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(visibility * 0.000621371)} Mi</Text>
                                    <Text style={lightStyles.weatherSubData}>Visibility</Text>
                                </View>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <Entypo name="water" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{humidity} %</Text>
                                    <Text style={lightStyles.weatherSubData}>Humidity</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <MaterialCommunityIcons name="watering-can" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(dew_point)} ° F</Text>
                                    <Text style={lightStyles.weatherSubData}>Dew Point</Text>
                                </View>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="tailwind" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(weatherInfo.hourly[0].wind_gust)} mph</Text>
                                    <Text style={lightStyles.weatherSubData}>Wind Speed</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <Entypo name="direction" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(wind_deg)} °</Text>
                                    <Text style={lightStyles.weatherSubData}>Wind Degrees</Text>
                                </View>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="speedometer" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(pressure / 1000)} bar</Text>
                                    <Text style={lightStyles.weatherSubData}>Pressure</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <FontAwesome5 name="binoculars" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(uvi)}</Text>
                                    <Text style={lightStyles.weatherSubData}>UV Index</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={lightStyles.container}>
                    <View style={lightStyles.detailTitling}>
                        <Text style={lightStyles.detailTitle}>Details</Text>
                    </View>
                    <View style={lightStyles.detailsContainer}>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{main}</Text>
                                    <Text style={lightStyles.weatherSubData}>{description}</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <FontAwesome5 name="eye" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(visibility / 1000)} Km</Text>
                                    <Text style={lightStyles.weatherSubData}>Visibility</Text>
                                </View>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <Entypo name="water" size={20} color={TEXT_COLOR_LIGHT} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{humidity} %</Text>
                                    <Text style={lightStyles.weatherSubData}>Humidity</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <MaterialCommunityIcons name="watering-can" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(dew_point)} ° C</Text>
                                    <Text style={lightStyles.weatherSubData}>Dew Point</Text>
                                </View>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="tailwind" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(weatherInfo.hourly[0].wind_gust)} km/h</Text>
                                    <Text style={lightStyles.weatherSubData}>Wind Speed</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <Entypo name="direction" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(wind_deg)} °</Text>
                                    <Text style={lightStyles.weatherSubData}>Wind Degrees</Text>
                                </View>
                            </View>
                        </View>
                        <View style={lightStyles.weatherDetailsRow}>
                            <View style={lightStyles.weatherDetialsBox}>
                            <MaterialCommunityIcons name="speedometer" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(pressure / 1000)} bar</Text>
                                    <Text style={lightStyles.weatherSubData}>Pressure</Text>
                                </View>
                            </View>
                            <View style={lightStyles.weatherDetialsBox}>
                                <FontAwesome5 name="binoculars" size={20} color={TEXT_COLOR_BLACK} style={styles.weatherIcons}/>
                                <View style={lightStyles.detailsContainer}>
                                    <Text style={lightStyles.weatherData}>{Math.round(uvi)}</Text>
                                    <Text style={lightStyles.weatherSubData}>UV Index</Text>
                                </View>
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
        marginTop: 40,
        marginBottom: 30,
    },

    detailTitling: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width - 90,
    },

    detailTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR_LIGHT,
        fontSize: 17,
        fontWeight: '700',
    },

    detailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: Dimensions.get('window').width - 150,
    },

    weatherDetailsRow: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -10,
    },

    weatherDetialsBox: {
        width: 135,
        marginHorizontal: 20,
        marginVertical: -5,
        padding: 5,
        flexDirection: 'row',
        opacity: 0.9,
        borderColor: PRIMARY_COLOR,
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomColor: SECONDARY_COLOR,
    },

    detailsContainer: {
        paddingLeft: 10, 
    },

    weatherIcons: {
        paddingTop: 6,
        paddingLeft: 6,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
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
        textTransform: 'capitalize',
    },
});

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },

    detailTitling: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width - 90,
    },

    detailTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR_BLACK,
        fontSize: 17,
        fontWeight: '700',
    },

    detailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: Dimensions.get('window').width - 90,
    },

    weatherDetailsRow: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -10,
    },

    weatherDetialsBox: {
        width: 135,
        marginHorizontal: 20,
        marginVertical: -5,
        padding: 5,
        flexDirection: 'row',
        opacity: 0.9,
        borderColor: TEXT_COLOR_LIGHT,
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomColor: SECONDARY_COLOR,
    },

    detailsContainer: {
        paddingLeft: 10, 
    },

    weatherIcons: {
        paddingTop: 6,
        paddingLeft: 6,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    weatherData: {
        fontSize: 13,
        color: TEXT_COLOR_BLACK,
        fontWeight: '700',
    },

    weatherSubData: {
        fontSize: 10,
        color: TEXT_COLOR_DARKGRAY,
        fontWeight: '700',
        textTransform: 'capitalize',
    },
});
