import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import { Ionicons } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY} = colors;

// Degree symbol : °

let isDark = getIsDark();

export default function DailyWeather({ weatherInfo, units }) {
    const WeatherScroll = () => {
        return (
            <ScrollView horizontal={false} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <CurrDailyForecast />
                <FurtureForecasts index={1}/>
                <FurtureForecasts index={2}/>
                <FurtureForecasts index={3}/>
                <FurtureForecasts index={4}/>
                <FurtureForecasts index={5}/>
                <FurtureForecasts index={6}/>
                <FurtureForecasts index={7}/>
                <FurtureForecasts index={99}/>
            </ScrollView>
        );
    }

    const CurrDailyForecast = () => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const time = new Date(weatherInfo.daily[0].dt * 1000);
        var dayName = days[time.getDay()];
        const iconURL = `https://openweathermap.org/img/wn/${weatherInfo.daily[0].weather[0].icon}@4x.png`;

        if (units === 'imperial') {
            return (
                <View style={styles.CurrDetailsContainer}>
                    <View style={styles.FrontContainer}>
                        <Text style={styles.dayData}>Today</Text>
                        <Text style={styles.currDescriptData}>{weatherInfo.daily[0].weather[0].description}</Text>  
                    </View>
                    <View style={styles.MidContainer}>
                        <Text style={styles.tempData}>{Math.round(weatherInfo.daily[0].temp.day)}°F</Text>
                        <View style={styles.rainContainer}>
                            <Ionicons name="water" size={15} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                            <Text style={styles.popText}>{Math.round((weatherInfo.hourly[0].pop)*100)}%</Text>
                        </View>
                    </View>
                    <View style={styles.EndContainer}>
                        <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                    </View>
                </View>
            );
        } else if (units === 'metric') {
            return (
                <View style={styles.CurrDetailsContainer}>
                    <View style={styles.FrontContainer}>
                        <Text style={styles.dayData}>Today</Text>
                        <Text style={styles.currDescriptData}>{weatherInfo.daily[0].weather[0].description}</Text>  
                    </View>
                    <View style={styles.MidContainer}>
                        <Text style={styles.tempData}>{Math.round(weatherInfo.daily[0].temp.day)}°C</Text>
                        <View style={styles.rainContainer}>
                            <Ionicons name="water" size={15} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                            <Text style={styles.popText}>{Math.round((weatherInfo.hourly[0].pop)*100)}%</Text>
                        </View>
                    </View>
                    <View style={styles.EndContainer}>
                        <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                    </View>
                </View>
            );
        }
    }

    const FurtureForecasts = ({index}) => {
        if (index > 0 && index <= 7) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const time = new Date(weatherInfo.daily[index].dt * 1000);
            var dayName = days[time.getDay()];
            const iconURL = `https://openweathermap.org/img/wn/${weatherInfo.daily[index].weather[0].icon}@4x.png`;

            if (units === 'imperial') {
                return (
                    <View style={styles.detailsContainer}>
                        <View style={styles.FrontContainer}>
                            <Text style={styles.dayData}>{dayName}</Text>
                            <Text style={styles.descriptData}>{weatherInfo.daily[index].weather[0].description}</Text>  
                        </View>
                        <View style={styles.MidContainer}>
                            <Text style={styles.tempData}>{Math.round(weatherInfo.daily[index].temp.day)}°F</Text>
                            <View style={styles.rainContainer}>
                                <Ionicons name="water" size={15} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                                <Text style={styles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                        <View style={styles.EndContainer}>
                            <Image style={styles.iconStyle} source={{uri: iconURL}}/>
                        </View>
                    </View>
                );
            } else if (units === 'metric') {
                return (
                    <View style={styles.detailsContainer}>
                        <View style={styles.FrontContainer}>
                            <Text style={styles.dayData}>{dayName}</Text>
                            <Text style={styles.descriptData}>{weatherInfo.daily[index].weather[0].description}</Text>  
                        </View>
                        <View style={styles.MidContainer}>
                            <Text style={styles.tempData}>{Math.round(weatherInfo.daily[index].temp.day)}°C</Text>
                            <View style={styles.rainContainer}>
                                <Ionicons name="water" size={15} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                                <Text style={styles.popText}>{Math.round((weatherInfo.hourly[index].pop)*100)}%</Text>
                            </View>
                        </View>
                        <View style={styles.EndContainer}>
                            <Image style={styles.iconStyle} source={{uri: iconURL}}/>
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
    
    if (isDark) {
        return (
            <View style={styles.container}>
                <View style={styles.weeklyabel}>
                    <Text style={styles.weeklyText}>Weekly Outlook</Text>
                </View>
                <ScrollView style={styles.scrollView} bounces={true} showsVerticalScrollIndicator={false}></ScrollView>
                    <View style={styles.detailsSectionContainer}>
                        <WeatherScroll />
                    </View>
                <ScrollView/>
            </View>
        );
    } else {
        return (
            <View style={lightStyles.container}>
                <View style={lightStyles.weeklyabel}>
                    <Text style={lightStyles.weeklyText}>Weekly Outlook</Text>
                </View>
                <ScrollView style={lightStyles.scrollView} bounces={true} showsVerticalScrollIndicator={false}></ScrollView>
                    <View style={lightStyles.detailsSectionContainer}>
                        <WeatherScroll />
                    </View>
                <ScrollView/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },

    weeklyText: {
        fontSize: 17,
        marginBottom: 25,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
        textTransform: 'capitalize',
    },

    weeklyabel: {
        width: Dimensions.get('window').width - 90,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 75,
        marginTop: 5,
    },

    scrollView: {
        flex: 1,
        marginTop: -5,
    },

    CurrDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 7,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 15,
        padding: 10,
    },

    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 7,
        backgroundColor: TIERTIARY_COLOR,
        borderRadius: 15,
        padding: 10,
    },

    FrontContainer: {
        flexDirection: 'column',
        marginLeft: 15,
        marginTop: 3,
        width: 120,
    },

    MidContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: -30,
    },

    rainContainer: {
        flexDirection: 'row',
    },

    EndContainer: {
        alignItems: 'center',
    },

    dayData: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
    },

    descriptData: {
        fontSize: 12,
        fontWeight: '500',
        color: TEXT_COLOR_LIGHTGRAY,
        textTransform: 'capitalize',
    },

    currDescriptData: {
        fontSize: 12,
        fontWeight: '500',
        color: TEXT_COLOR_LIGHT,
        textTransform: 'capitalize',
    },

    tempData: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
    },

    popText: {
        fontSize: 13,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
        marginTop: 1,
    },

    rainIcon: {
        marginTop: 2,
        marginRight: 2,
    },

    iconStyle: {
        width: 55,
        height: 55,
        marginTop: -5,
        marginBottom: -5,
    },
});

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },

    weeklyText: {
        fontSize: 17,
        marginBottom: 25,
        fontWeight: '700',
        color: TEXT_COLOR_BLACK,
        textTransform: 'capitalize',
    },

    weeklyabel: {
        color: TEXT_COLOR_BLACK,
        width: Dimensions.get('window').width - 90,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 75,
        marginTop: 5,
    },

    scrollView: {
        flex: 1,
        marginTop: -5,
    },

    CurrDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 7,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 15,
        padding: 10,
    },

    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 7,
        backgroundColor: TIERTIARY_COLOR,
        borderRadius: 15,
        padding: 10,
    },

    FrontContainer: {
        flexDirection: 'column',
        marginLeft: 15,
        marginTop: 3,
        width: 120,
    },

    MidContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: -30,
    },

    rainContainer: {
        flexDirection: 'row',
    },

    EndContainer: {
        alignItems: 'center',
    },

    dayData: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
    },

    descriptData: {
        fontSize: 12,
        fontWeight: '500',
        color: TEXT_COLOR_LIGHTGRAY,
        textTransform: 'capitalize',
    },

    currDescriptData: {
        fontSize: 12,
        fontWeight: '500',
        color: TEXT_COLOR_LIGHT,
        textTransform: 'capitalize',
    },

    tempData: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_COLOR_LIGHT,
    },

    popText: {
        fontSize: 13,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
        marginTop: 1,
    },

    rainIcon: {
        marginTop: 2,
        marginRight: 2,
    },

    iconStyle: {
        width: 55,
        height: 55,
        marginTop: -5,
        marginBottom: -5,
    },
});
