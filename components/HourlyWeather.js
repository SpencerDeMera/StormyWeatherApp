import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';
import { ICONS } from '../utils/weatherIcons';

const {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_BLACK} = colors;

// Degree symbol : °

let isDark;

function getFormattedTime(epoch) {
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
} // getFormattedTime function

export default function HourlyWeather({ weatherInfo, units }) {
    isDark = getIsDark();

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
        const id = weatherInfo.current.weather[0].id;
        const icon = weatherInfo.current.weather[0].icon;

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
    
        if (units === 'imperial') {
            return (
                <View style={styles.CurrDetailsContainer}>
                    <Text style={styles.timeData}>{getFormattedTime(weatherInfo.current.dt)}</Text> 
                    <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                    <Text style={styles.tempText}>{Math.round(weatherInfo.current.temp)}°F</Text>
                    <View style={styles.rainContainer}>
                        <Text style={styles.popText}>{Math.round((weatherInfo.hourly[0].pop)*100)}%</Text>
                    </View>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={styles.CurrDetailsContainer}>
                    <Text style={styles.timeData}>{getFormattedTime(weatherInfo.current.dt)}</Text> 
                    <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                    <Text style={styles.tempText}>{Math.round(weatherInfo.current.temp)}°C</Text>
                    <View style={styles.rainContainer}>
                        <Text style={styles.popText}>{Math.round((weatherInfo.hourly[0].pop)*100)}%</Text>
                    </View>
                </View>
            );
        }
    }

    const FurtureForecasts = ({index}) => {
        isDark = getIsDark();

        if (isDark) {
            if (index > 0 && index <= 24) {
                const id = weatherInfo.hourly[index].weather[0].id;
                const icon = weatherInfo.hourly[index].weather[0].icon;
                const dt = weatherInfo.hourly[index].dt;

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

                if (units === 'imperial') {
                    return (
                        <View style={styles.detailsContainer}>
                            <Text style={styles.timeData}>{getFormattedTime(dt)}</Text> 
                            <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                            <Text style={styles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°F</Text>
                            <View style={styles.rainContainer}>
                                <Text style={styles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                } else if (units === 'metric') {
                    return (
                        <View style={styles.detailsContainer}>
                            <Text style={styles.timeData}>{getFormattedTime(dt)}</Text> 
                            <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                            <Text style={styles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°C</Text>
                            <View style={styles.rainContainer}>
                                <Text style={styles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                }
            } else if (index == 99) {
                return (
                    <View>
                    </View>
                );
            }
        } else {
            if (index > 0 && index <= 24) {
                const id = weatherInfo.hourly[index].weather[0].id;
                const icon = weatherInfo.hourly[index].weather[0].icon;

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

                if (units === 'imperial') {
                    return (
                        <View style={lightStyles.detailsContainer}>
                            <Text style={lightStyles.timeData}>{getFormattedTime(weatherInfo.hourly[index].dt)}</Text> 
                            <Image style={lightStyles.iconStyle} source={ICONS[iconNum].image}/>
                            <Text style={lightStyles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°F</Text>
                            <View style={lightStyles.rainContainer}>
                                <Text style={lightStyles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                } else if (units === 'metric') {
                    return (
                        <View style={lightStyles.detailsContainer}>
                            <Text style={lightStyles.timeData}>{getFormattedTime(weatherInfo.hourly[index].dt)}</Text> 
                            <Image style={lightStyles.iconStyle} source={ICONS[iconNum].image}/>
                            <Text style={lightStyles.tempText}>{Math.round(weatherInfo.hourly[index].temp)}°C</Text>
                            <View style={lightStyles.rainContainer}>
                                <Text style={lightStyles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                    );
                }
            } else if (index == 99) {
                return (
                    <View>
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
                        <Text style={styles.todayText}>24 Hour Forecast</Text>
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
                        <Text style={lightStyles.todayText}>24 Hour Forecast</Text>
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

    arrowIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    todayLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: -3,
        padding: 5,
        marginLeft: 10,
        color: TEXT_COLOR_LIGHT,
        width: (Dimensions.get('window').width - 100) / 1.6,
    },

    scrollView: {
        flex: 1,
        width: Dimensions.get('window').width - 80,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 10,
    },

    CurrDetailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 5,
        marginRight: 5,
    },

    detailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 5,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 5,
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

    arrowIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    todayLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: -3,
        padding: 5,
        marginLeft: 10,
        color: TEXT_COLOR_BLACK,
        width: (Dimensions.get('window').width - 100) / 1.6,
    },

    scrollView: {
        flex: 1,
        width: Dimensions.get('window').width - 80,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 10,
    },

    CurrDetailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 5,
        marginRight: 5,
    },

    detailsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 5,
        borderRadius: 50,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 5,
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