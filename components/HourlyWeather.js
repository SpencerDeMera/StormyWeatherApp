import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY} = colors;

// Degree symbol : °

let isDark = getIsDark();

function _getFormattedTime(epoch) {
    var formattedTime;
    const time = new Date(epoch * 1000);
    const hours = time.getHours();

    if (hours < 1) {
        formattedTime = `12 AM`;
    } else if (hours < 12) {
        formattedTime = `${hours} AM`;
    } else if (hours == 12) {
        formattedTime = `${hours} PM`;
    } else if (hours > 12 && hours < 24) {
        formattedTime = `${hours - 12} PM`;
    } else if (hours == 24) {
        formattedTime = `${hours - 12} AM`;
    }
    return formattedTime;
} // _getFormattedTime function

export default function HourlyWeather({ weatherInfo, units }) {
    const WeatherScroll = () => {
        return (
            <ScrollView horizontal={true} style={styles.scrollView} bounces={true} showsHorizontalScrollIndicator={false}>
                <CurrTempForecast />
                <FurtureForecasts index={1}/>
                <FurtureForecasts index={2}/>
                <FurtureForecasts index={3}/>
                <FurtureForecasts index={4}/>
                <FurtureForecasts index={5}/>
                <FurtureForecasts index={6}/>
                <FurtureForecasts index={7}/>
                <FurtureForecasts index={8}/>
                <FurtureForecasts index={9}/>
                <FurtureForecasts index={10}/>
                <FurtureForecasts index={11}/>
                <FurtureForecasts index={12}/>
                <FurtureForecasts index={13}/>
                <FurtureForecasts index={14}/>
                <FurtureForecasts index={15}/>
                <FurtureForecasts index={16}/>
                <FurtureForecasts index={17}/>
                <FurtureForecasts index={18}/>
                <FurtureForecasts index={19}/>
                <FurtureForecasts index={20}/>
                <FurtureForecasts index={21}/>
                <FurtureForecasts index={22}/>
                <FurtureForecasts index={23}/>
                <FurtureForecasts index={24}/>
                <FurtureForecasts index={99}/>
            </ScrollView>
        );
    }

    const CurrTempForecast = () => {
        const iconURL = `https://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@4x.png`;
    
        if (units === 'imperial') {
            return (
                <View style={styles.CurrDetailsContainer}>
                    <Text style={styles.timeData}>{_getFormattedTime(weatherInfo.current.dt)}</Text> 
                    <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                    <Text style={styles.tempText}>{Math.round(weatherInfo.current.temp)}°F</Text>
                    <View style={styles.rainContainer}>
                        <Text style={styles.popText}>{Math.round((weatherInfo.hourly[0].pop)*100)}%</Text>
                    </View>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={styles.CurrDetailsContainer}>
                    <Text style={styles.timeData}>{_getFormattedTime(weatherInfo.current.dt)}</Text> 
                    <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                    <Text style={styles.tempText}>{Math.round(weatherInfo.current.temp)}°C</Text>
                    <View style={styles.rainContainer}>
                        <Text style={styles.popText}>{Math.round((weatherInfo.hourly[0].pop)*100)}%</Text>
                    </View>
                </View>
            );
        }
    }

    const FurtureForecasts = ({index}) => {
        if (isDark) {
            if (index > 0 && index <= 24) {
                const iconURL = `https://openweathermap.org/img/wn/${weatherInfo.hourly[index].weather[0].icon}@4x.png`;
                if (units === 'imperial') {
                    return (
                        <View style={styles.detailsContainer}>
                            <Text style={styles.timeData}>{_getFormattedTime(weatherInfo.hourly[index].dt)}</Text> 
                            <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                            <Text style={styles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°F</Text>
                            <View style={styles.rainContainer}>
                                <Text style={styles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                } else if (units === 'metric') {
                    return (
                        <View style={styles.detailsContainer}>
                            <Text style={styles.timeData}>{_getFormattedTime(weatherInfo.hourly[index].dt)}</Text> 
                            <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                            <Text style={styles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°C</Text>
                            <View style={styles.rainContainer}>
                                <Text style={styles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                }
            } else if (index == 99) {
                return (
                    <View style={styles.padDetailsContainer}>
                    </View>
                );
            }
        } else {
            if (index > 0 && index <= 24) {
                const iconURL = `https://openweathermap.org/img/wn/${weatherInfo.hourly[index].weather[0].icon}@4x.png`;
                if (units === 'imperial') {
                    return (
                        <View style={lightStyles.detailsContainer}>
                            <Text style={lightStyles.timeData}>{_getFormattedTime(weatherInfo.hourly[index].dt)}</Text> 
                            <Image style={lightStyles.iconStyle} source={{uri: iconURL}}/>
                            <Text style={lightStyles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°F</Text>
                            <View style={lightStyles.rainContainer}>
                                <Text style={lightStyles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                } else if (units === 'metric') {
                    return (
                        <View style={lightStyles.detailsContainer}>
                            <Text style={lightStyles.timeData}>{_getFormattedTime(weatherInfo.hourly[index].dt)}</Text> 
                            <Image style={lightStyles.iconStyle} source={{uri: iconURL}}/>
                            <Text style={lightStyles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°C</Text>
                            <View style={lightStyles.rainContainer}>
                                <Text style={lightStyles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                }
            } else if (index == 99) {
                return (
                    <View style={lightStyles.padDetailsContainer}>
                    </View>
                );
            }
        }
    }

    if (isDark) {
        return (
            <View style={styles.container}>
                <View style={styles.labelsContainer}>
                    <View style={styles.todayLabel}>
                        <Text style={styles.todayText}>Today</Text>
                    </View>
                    <View style={styles.nextDaysButton}>
                        <Text style={styles.labelText}>Next 24 Hours</Text>
                        <FontAwesome5 name="arrow-right" size={15} color={TEXT_COLOR_LIGHT} style={styles.arrowIcon} onPress={()=>navigateToDailyPage()}/>
                    </View>
                </View>
                <View style={styles.detailsSectionContainer}>
                    <WeatherScroll />
                </View>
            </View>
        );
    } else {
        return (
            <View style={lightStyles.container}>
                <View style={lightStyles.labelsContainer}>
                    <View style={lightStyles.todayLabel}>
                        <Text style={lightStyles.todayText}>Today</Text>
                    </View>
                    <View style={lightStyles.nextDaysButton}>
                        <Text style={lightStyles.labelText}>Next 24 Hours</Text>
                        <FontAwesome5 name="arrow-right" size={15} color={TEXT_COLOR_LIGHT} style={styles.arrowIcon} onPress={()=>navigateToDailyPage()}/>
                    </View>
                </View>
                <View style={lightStyles.detailsSectionContainer}>
                    <WeatherScroll />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
    },

    labelsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width - 75,
    },

    todayText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR_LIGHT,
        fontSize: 17,
        fontWeight: '700',
    },

    labelText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR_LIGHT,
        fontSize: 13,
        fontWeight: '700',
        padding: 5,
    },

    arrowIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    todayLabel: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: -3,
        padding: 5,
        marginLeft: 10,
        color: TEXT_COLOR_LIGHT,
        width: (Dimensions.get('window').width - 100) / 1.6,
    },

    nextDaysButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        marginVertical: -3,
        padding: 3,
        borderRadius: 25,
        width: 100,
    },

    scrollView: {
        flex: 1,
        width: Dimensions.get('window').width - 80,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: Dimensions.get('window').width - 80,
    },

    CurrDetailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        marginRight: 8,
    },

    detailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 8,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },

    padDetailsContainer: {
        alignItems: 'center',
        marginHorizontal: 1,
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 1,
    },

    rainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    timeData: {
        fontSize: 14,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: -5,
    },

    iconStyle: {
        width: 50,
        height: 50,
    },

    tempText: {
        marginTop: -5,
        fontSize: 15,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
    },

    popText: {
        marginTop: 5,
        fontSize: 13,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
    },

    rainIcon: {
        marginTop: 5,
    },
});

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
    },

    labelsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width - 75,
    },

    todayText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR_BLACK,
        fontSize: 17,
        fontWeight: '700',
    },

    labelText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR_LIGHT,
        fontSize: 13,
        fontWeight: '700',
        padding: 5,
    },

    arrowIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    todayLabel: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: -3,
        padding: 5,
        marginLeft: 10,
        color: TEXT_COLOR_BLACK,
        width: (Dimensions.get('window').width - 100) / 1.6,
    },

    nextDaysButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        marginVertical: -3,
        padding: 3,
        borderRadius: 25,
        width: 100,
    },

    scrollView: {
        flex: 1,
        width: Dimensions.get('window').width - 80,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: Dimensions.get('window').width - 80,
    },

    CurrDetailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        marginRight: 8,
    },

    detailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 8,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },

    padDetailsContainer: {
        alignItems: 'center',
        marginHorizontal: 1,
        backgroundColor: TEXT_COLOR_LIGHT,
    },

    rainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    timeData: {
        fontSize: 14,
        color: TEXT_COLOR_BLACK,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: -5,
    },

    iconStyle: {
        width: 50,
        height: 50,
    },

    tempText: {
        marginTop: -5,
        fontSize: 15,
        color: TEXT_COLOR_BLACK,
        fontWeight: '700',
    },

    popText: {
        marginTop: 5,
        fontSize: 13,
        color: TEXT_COLOR_BLACK,
        fontWeight: '700',
    },

    rainIcon: {
        marginTop: 5,
    },
});