import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, Feather, Entypo } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';
import { ICONS } from '../utils/weatherIcons';
import CollapsibleView from "@eliav2/react-native-collapsible-view";

const {SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_DARKGRAY, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY} = colors;

// Degree symbol : °

export default function DailyWeather({ weatherInfo, units }) {
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
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const time = new Date(weatherInfo.daily[0].dt * 1000);
        var dayName = days[time.getDay()];
        var fullMonthName = months[time.getMonth()];
        var date = time.getDate();
        const id = weatherInfo.daily[0].weather[0].id;
        const icon = weatherInfo.daily[0].weather[0].icon;

        var iconNum = 8001;
        if ((id > 799 && id < 805) || (id > 299 && id < 623)) {
            iconNum = (id * 10) + 1;
        } else if ((id > 199 && id < 300) || (id > 699 && id < 782)) {
            iconNum = id;
        }

        if (units === 'imperial') {
            return (
                <CollapsibleView initExpanded={false} noArrow={true} activeOpacityFeedback={0.75} style={styles.CurrDetailsContainer} title={
                    <View style={styles.CurrDetailsInnerContainer}>
                        <View style={styles.FrontContainer}>
                            <Text style={styles.dayData}>{dayName}, {fullMonthName} {date}</Text>
                            <Text style={styles.currDescriptData}>{weatherInfo.daily[0].weather[0].description}</Text>  
                        </View>
                        <View style={styles.MidContainer}>
                            <View style={styles.tempsContainer}>
                                <Text style={styles.tempData1}>{Math.round(weatherInfo.daily[0].temp.min)}°</Text>
                                <Text style={styles.tempDataSlash}> / </Text>
                                <Text style={styles.tempData2}>{Math.round(weatherInfo.daily[0].temp.max)}°</Text>
                            </View> 
                            <View style={styles.rainContainer}>
                                <Ionicons name="water" size={13} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                                <Text style={styles.popText}>{Math.round((weatherInfo.daily[0].pop)*100)}%</Text>
                            </View>
                        </View>
                        <View style={styles.EndContainer}>
                            <Image style={styles.iconCurrStyle} source={ICONS[iconNum].image}/>
                        </View>
                    </View>
                }>
                    <View style={styles.expandedDetailsContainer}>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <Entypo name="water" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{weatherInfo.daily[0].humidity} %</Text>
                                    <Text style={styles.weatherSubData}>Humidity</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <MaterialCommunityIcons name="cloud-outline" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{weatherInfo.daily[0].clouds} %</Text>
                                    <Text style={styles.weatherSubData}>Cloud Cover</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <FontAwesome5 name="wind" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].wind_speed)} mph</Text>
                                    <Text style={styles.weatherSubData}>Wind Speed</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <MaterialCommunityIcons name="tailwind" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].wind_gust)} mph</Text>
                                    <Text style={styles.weatherSubData}>Wind Gusts</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <MaterialCommunityIcons name="watering-can" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].dew_point)} ° F</Text>
                                    <Text style={styles.weatherSubData}>Dew Point</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <MaterialCommunityIcons name="binoculars" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].uvi)}</Text>
                                    <Text style={styles.weatherSubData}>UV Index</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <Feather name="sunrise" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[0].sunrise)}</Text>
                                    <Text style={styles.weatherSubData}>Sunrise</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <Feather name="sunset" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[0].sunset)}</Text>
                                    <Text style={styles.weatherSubData}>Sunset</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </CollapsibleView>
            );
        } else if (units === 'metric') {
            return (
                <CollapsibleView initExpanded={false} noArrow={true} activeOpacityFeedback={0.75} style={styles.CurrDetailsContainer} title={
                    <View style={styles.CurrDetailsInnerContainer}>
                        <View style={styles.FrontContainer}>
                            <Text style={styles.dayData}>{dayName}, {fullMonthName} {date}</Text>
                            <Text style={styles.currDescriptData}>{weatherInfo.daily[0].weather[0].description}</Text>  
                        </View>
                        <View style={styles.MidContainer}>
                            <View style={styles.tempsContainer}>
                                <Text style={styles.tempData1}>{Math.round(weatherInfo.daily[0].temp.min)}°</Text>
                                <Text style={styles.tempDataSlash}> / </Text>
                                <Text style={styles.tempData2}>{Math.round(weatherInfo.daily[0].temp.max)}°</Text>
                            </View> 
                            <View style={styles.rainContainer}>
                                <Ionicons name="water" size={13} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                                <Text style={styles.popText}>{Math.round((weatherInfo.daily[0].pop)*100)}%</Text>
                            </View>
                        </View>
                        <View style={styles.EndContainer}>
                            <Image style={styles.iconCurrStyle} source={ICONS[iconNum].image}/>
                        </View>
                    </View>
                }>
                    <View style={styles.expandedDetailsContainer}>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <Entypo name="water" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{weatherInfo.daily[0].humidity} %</Text>
                                    <Text style={styles.weatherSubData}>Humidity</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <MaterialCommunityIcons name="cloud-outline" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{weatherInfo.daily[0].clouds} %</Text>
                                    <Text style={styles.weatherSubData}>Cloud Cover</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <FontAwesome5 name="wind" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].wind_speed)} km/h</Text>
                                    <Text style={styles.weatherSubData}>Wind Speed</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <MaterialCommunityIcons name="tailwind" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].wind_gust)} km/h</Text>
                                    <Text style={styles.weatherSubData}>Wind Gusts</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <MaterialCommunityIcons name="watering-can" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].dew_point)} ° C</Text>
                                    <Text style={styles.weatherSubData}>Dew Point</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <MaterialCommunityIcons name="binoculars" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[0].uvi)}</Text>
                                    <Text style={styles.weatherSubData}>UV Index</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.weatherDetailsRow}>
                            <View style={styles.weatherDetialsBox1}>
                                <Feather name="sunrise" size={22} style={styles.weatherIcons1}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[0].sunrise)}</Text>
                                    <Text style={styles.weatherSubData}>Sunrise</Text>
                                </View>
                            </View>
                            <View style={styles.weatherDetialsBox2}>
                                <Feather name="sunset" size={22} style={styles.weatherIcons2}/>
                                <View style={styles.subDetailsContainer}>
                                    <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[0].sunset)}</Text>
                                    <Text style={styles.weatherSubData}>Sunset</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </CollapsibleView>
            );
        }
    }

    const FurtureForecasts = ({index}) => {
        if (index > 0 && index <= 7) {
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const time = new Date(weatherInfo.daily[index].dt * 1000);
            var dayName = days[time.getDay()];
            var fullMonthName = months[time.getMonth()];
            var date = time.getDate();

            const id = weatherInfo.daily[index].weather[0].id;
            const icon = weatherInfo.daily[index].weather[0].icon;

            var iconNum = 8001;
            if ((id > 799 && id < 805) || (id > 299 && id < 623)) {
                iconNum = (id * 10) + 1;
            } else if ((id > 199 && id < 300) || (id > 699 && id < 782)) {
                iconNum = id;
            }

            if (units === 'imperial') {
                return (
                    <CollapsibleView initExpanded={false} noArrow={true} activeOpacityFeedback={0.75} style={styles.detailsContainer} title={
                        <View style={styles.detailsInnerContainer}>
                            <View style={styles.FrontContainer}>
                                <Text style={styles.dayData}>{dayName}, {fullMonthName} {date}</Text>
                                <Text style={styles.descriptData}>{weatherInfo.daily[index].weather[0].description}</Text>  
                            </View>
                            <View style={styles.MidContainer}>
                            <View style={styles.tempsContainer}>
                                <Text style={styles.tempData1}>{Math.round(weatherInfo.daily[index].temp.min)}°</Text>
                                <Text style={styles.tempDataSlash}> / </Text>
                                <Text style={styles.tempData2}>{Math.round(weatherInfo.daily[index].temp.max)}°</Text>
                            </View> 
                            <View style={styles.rainContainer}>
                                <Ionicons name="water" size={13} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                                <Text style={styles.popText}>{Math.round((weatherInfo.daily[index].pop)*100)}%</Text>
                            </View>
                        </View>
                            <View style={styles.EndContainer}>
                                <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                            </View>
                        </View>
                    }>
                        <View style={styles.expandedDetailsContainer}>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <Entypo name="water" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{weatherInfo.daily[index].humidity} %</Text>
                                        <Text style={styles.weatherSubData}>Humidity</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <MaterialCommunityIcons name="cloud-outline" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{weatherInfo.daily[index].clouds} %</Text>
                                        <Text style={styles.weatherSubData}>Cloud Cover</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <FontAwesome5 name="wind" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].wind_speed)} mph</Text>
                                        <Text style={styles.weatherSubData}>Wind Speed</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <MaterialCommunityIcons name="tailwind" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].wind_gust)} mph</Text>
                                        <Text style={styles.weatherSubData}>Wind Gusts</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <MaterialCommunityIcons name="watering-can" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].dew_point)} ° F</Text>
                                        <Text style={styles.weatherSubData}>Dew Point</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <MaterialCommunityIcons name="binoculars" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].uvi)}</Text>
                                        <Text style={styles.weatherSubData}>UV Index</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <Feather name="sunrise" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[index].sunrise)}</Text>
                                        <Text style={styles.weatherSubData}>Sunrise</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <Feather name="sunset" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[index].sunset)}</Text>
                                        <Text style={styles.weatherSubData}>Sunset</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </CollapsibleView>
                );
            } else if (units === 'metric') {
                return (
                    <CollapsibleView initExpanded={false} noArrow={true} activeOpacityFeedback={0.75} style={styles.detailsContainer} title={
                        <View style={styles.detailsInnerContainer}>
                            <View style={styles.FrontContainer}>
                                <Text style={styles.dayData}>{dayName}, {fullMonthName} {date}</Text>
                                <Text style={styles.descriptData}>{weatherInfo.daily[index].weather[0].description}</Text>  
                            </View>
                            <View style={styles.MidContainer}>
                            <View style={styles.tempsContainer}>
                                <Text style={styles.tempData1}>{Math.round(weatherInfo.daily[index].temp.min)}°</Text>
                                <Text style={styles.tempDataSlash}> / </Text>
                                <Text style={styles.tempData2}>{Math.round(weatherInfo.daily[index].temp.max)}°</Text>
                            </View> 
                            <View style={styles.rainContainer}>
                                <Ionicons name="water" size={13} color={TEXT_COLOR_LIGHT} style={styles.rainIcon}/>
                                <Text style={styles.popText}>{Math.round((weatherInfo.daily[index].pop)*100)}%</Text>
                            </View>
                        </View>
                            <View style={styles.EndContainer}>
                                <Image style={styles.iconStyle} source={ICONS[iconNum].image}/>
                            </View>
                        </View>
                    }>
                        <View style={styles.expandedDetailsContainer}>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <Entypo name="water" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{weatherInfo.daily[index].humidity} %</Text>
                                        <Text style={styles.weatherSubData}>Humidity</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <MaterialCommunityIcons name="cloud-outline" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{weatherInfo.daily[index].clouds} %</Text>
                                        <Text style={styles.weatherSubData}>Cloud Cover</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <FontAwesome5 name="wind" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].wind_speed)} km/h</Text>
                                        <Text style={styles.weatherSubData}>Wind Speed</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <MaterialCommunityIcons name="tailwind" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].wind_gust)} km/h</Text>
                                        <Text style={styles.weatherSubData}>Wind Gusts</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <MaterialCommunityIcons name="watering-can" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].dew_point)} ° C</Text>
                                        <Text style={styles.weatherSubData}>Dew Point</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <MaterialCommunityIcons name="binoculars" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{Math.round(weatherInfo.daily[index].uvi)}</Text>
                                        <Text style={styles.weatherSubData}>UV Index</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.weatherDetailsRow}>
                                <View style={styles.weatherDetialsBox1}>
                                    <Feather name="sunrise" size={22} style={styles.weatherIcons1}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[index].sunrise)}</Text>
                                        <Text style={styles.weatherSubData}>Sunrise</Text>
                                    </View>
                                </View>
                                <View style={styles.weatherDetialsBox2}>
                                    <Feather name="sunset" size={22} style={styles.weatherIcons2}/>
                                    <View style={styles.subDetailsContainer}>
                                        <Text style={styles.weatherData}>{getFormattedTime(weatherInfo.daily[index].sunset)}</Text>
                                        <Text style={styles.weatherSubData}>Sunset</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </CollapsibleView>
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
                <View style={styles.weekylabel}>
                    <Text style={styles.weeklyText}>Weekly Outlook</Text>
                </View>
                <ScrollView style={styles.scrollView} bounces={true} showsVerticalScrollIndicator={false}></ScrollView>
                    <View style={styles.detailsSectionContainer}>
                        <WeatherScroll />
                    </View>
                <ScrollView/>
            </View>
        );
    } else if (!isDark) {
        return (
            <View style={lightStyles.container}>
                <View style={lightStyles.weekylabel}>
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

    weeklabel: {
        color: TEXT_COLOR_LIGHT,
        width: Dimensions.get('window').width - 90,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50,
        marginTop: 5,
    },

    scrollView: {
        flex: 1,
        marginTop: -5,
    },

    CurrDetailsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: TIERTIARY_COLOR,
        borderRadius: 15,
        padding: 10,
        borderWidth: 0,
    },

    CurrDetailsInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        width: Dimensions.get('window').width - 120,
    },

    detailsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: TIERTIARY_COLOR,
        borderRadius: 15,
        padding: 10,
        borderWidth: 0,
    },

    detailsInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        width: Dimensions.get('window').width - 120,
    },

    FrontContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 3,
        width: 122,
    },

    MidContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: -30,
        marginTop: 2,
    },

    tempsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 50,
        marginTop: 5,
        width: 65,
    },

    EndContainer: {
        alignItems: 'center',
    },

    expandedDetailsContainer: {
        color: TEXT_COLOR_LIGHT,
        marginHorizontal: 5,
        marginTop: 15,
        height: 170,
        alignItems: 'center',
    },

    weatherDetailsRow: {
        marginTop: 5,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    weatherDetialsBox1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 125,
        marginHorizontal: 15,
        marginVertical: -5,
        marginLeft: -5,
    },

    weatherDetialsBox2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 125,
        marginHorizontal: 10,
        marginVertical: -5,
        marginLeft: -5,
    },

    weatherIcons1: {
        paddingTop: 6,
        paddingLeft: 6,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: SECONDARY_COLOR,
    },

    weatherIcons2: {
        paddingTop: 6,
        paddingLeft: 6,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        color: SECONDARY_COLOR,
    },

    subDetailsContainer: {
        paddingLeft: 20, 
    },

    weatherData: {
        fontSize: 15,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
    },

    weatherSubData: {
        fontSize: 12,
        color: TEXT_COLOR_LIGHTGRAY,
        fontWeight: '600',
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
        color: TEXT_COLOR_LIGHTGRAY,
        textTransform: 'capitalize',
    },

    tempData1: {
        fontSize: 15,
        fontWeight: '700',
        color: '#74ccf7',
    },

    tempData2: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ff4a68',
    },

    tempDataSlash: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },

    popText: {
        fontSize: 13,
        color: TEXT_COLOR_LIGHT,
        fontWeight: '700',
        marginTop: 1,
        marginBottom: 2,
    },

    rainIcon: {
        marginTop: 2,
        marginRight: 1,
    },

    iconStyle: {
        width: 55,
        height: 55,
        marginTop: -5,
        marginBottom: -5,
    },

    iconCurrStyle: {
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

    weeklabel: {
        color: TEXT_COLOR_BLACK,
        width: Dimensions.get('window').width - 90,
    },

    detailsSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 50,
        marginTop: 5,
    },
});
