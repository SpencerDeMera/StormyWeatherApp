import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { setUnitsSystem, getUnitsSystem, getIsDark, setIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;

// TM symbol : ™

export default function SettingsPage({ navigation }) {
    console.log('\n~ SettingsPage ~');

    const [errMssg, setErrMssg] = useState(null);
    const [statusFlag, setStatusFlag] = useState(null);
    var unitsFlag = 'imperial';
    let isDark = getIsDark();

    let versionNum = "0.9.3.2";
    
    // synchronous function
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            load();
        });
        return unsubscribe;
    }, []);

    // Loads default weather data & HomePage on startup
    async function load() {
        setErrMssg(null);
        setStatusFlag(null);

        try {
            setStatusFlag(true);
        } catch (err) {
            setErrMssg(err.message);
        }
    }

    const selectUnits = () => {
        if (unitsFlag === 'imperial') {
            setUnitsSystem(unitsFlag);
            console.log('Units set to Imperial');
        } else if (unitsFlag === 'metric') {
            setUnitsSystem(unitsFlag);
            console.log('Units set to Metric');
        }
    }

    const units = getUnitsSystem();
    
    if (isDark) {
        if (statusFlag) {
            return (
                <View style={styles.bodyContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                    <View style={styles.container}>
                        <View style={styles.topRounder}>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.settingsList}>
                                <TouchableOpacity style={styles.unitstList}onPress={() => {
                                    Alert.alert(
                                        'Weather Units',
                                        '',
                                        [
                                            {
                                                text: 'Fahrenheit',
                                                onPress: () => {
                                                    unitsFlag = 'imperial';
                                                    selectUnits();
                                                    load();
                                                }
                                            },
                                            {
                                                text: 'Celcius',
                                                onPress: () => {
                                                    unitsFlag = 'metric';
                                                    selectUnits();
                                                    load();
                                                }
                                            },
                                        ],
                                        {cancelable: true},
                                    );
                                }}>
                                    <View style={styles.unitsTextBlock}>
                                        <Text style={styles.unitsTitleText}>Units</Text>
                                        <Text style={styles.unitsSubText}>Pick the unit of weather data</Text>
                                        <Text style={styles.unitsSubText}>Current units system : {units}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.darktList} onPress={() => {
                                    Alert.alert(
                                        'Dark Mode',
                                        '',
                                        [
                                            {
                                                text: 'Always Dark',
                                                onPress: () => {
                                                    setIsDark(true);
                                                    load();
                                                }
                                            },
                                            {
                                                text: 'Always Light',
                                                onPress: () => {
                                                    setIsDark(false);
                                                    load();
                                                }
                                            },
                                        ],
                                        {cancelable: true},
                                    );
                                }}>
                                    <View style={styles.darkText}>
                                        <Text style={styles.dataTitleText}>Dark Mode</Text>
                                        <Text style={styles.dataSubText}>Toggle Always Dark / Light</Text>
                                        <Text style={styles.dataSubText}>StormyWeather is set to Dark by Default</Text>
                                    </View>
                                    <View style={styles.switchBox}>
                                        {/* <Button title="DarkMode" onPress={darkAlert} /> */}
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.datatList}>
                                    <Text style={styles.dataTitleText}>Data Source</Text>
                                    <Text style={styles.dataSubText}>OpenWeatherMap</Text>
                                    <Text style={styles.dataSubText}>Data provided by OpenWeather One Call API</Text>
                                </View>
                                <View style={styles.aboutList}>
                                    <Text style={styles.aboutTitleText}>About</Text>
                                    <Text style={styles.aboutSubText}>StormyWeather App Developed by Frost Labs</Text>
                                    <Text style={styles.aboutSubText}>Version {versionNum} Beta</Text>
                                    <Text></Text>
                                    <Text style={styles.aboutBuiltText}>StormyWeather is built with React-Native on Expo</Text>
                                </View>
                            </View>
                        </View>
                    </View>
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
        if (statusFlag) {
            return (
                <View style={lightStyles.bodyContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                    <View style={lightStyles.container}>
                        <View style={lightStyles.topRounder}>
                        </View>
                        <View style={lightStyles.body}>
                            <View style={lightStyles.settingsList}>
                                <TouchableOpacity style={lightStyles.unitstList}onPress={() => {
                                    Alert.alert(
                                        'Weather Units',
                                        '',
                                        [
                                            {
                                                text: 'Fahrenheit',
                                                onPress: () => {
                                                    unitsFlag = 'imperial';
                                                    selectUnits();
                                                    load();
                                                }
                                            },
                                            {
                                                text: 'Celcius',
                                                onPress: () => {
                                                    unitsFlag = 'metric';
                                                    selectUnits();
                                                    load();
                                                }
                                            },
                                        ],
                                        {cancelable: true},
                                    );
                                }}>
                                    <View style={lightStyles.unitsTextBlock}>
                                        <Text style={lightStyles.unitsTitleText}>Units</Text>
                                        <Text style={lightStyles.unitsSubText}>Pick the unit of weather data</Text>
                                        <Text style={lightStyles.unitsSubText}>Current units system : {units}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={lightStyles.darktList} onPress={() => {
                                    Alert.alert(
                                        'Dark Mode',
                                        '',
                                        [
                                            {
                                                text: 'Always Dark',
                                                onPress: () => {
                                                    setIsDark(true);
                                                    load();
                                                }
                                            },
                                            {
                                                text: 'Always Light',
                                                onPress: () => {
                                                    setIsDark(false);
                                                    load();
                                                }
                                            },
                                        ],
                                        {cancelable: true},
                                    );
                                }}>
                                    <View style={lightStyles.darkText}>
                                        <Text style={lightStyles.dataTitleText}>Dark Mode</Text>
                                        <Text style={lightStyles.dataSubText}>Toggle Always Dark / Light</Text>
                                        <Text style={lightStyles.dataSubText}>StormyWeather is set to Always Dark by Default</Text>
                                    </View>
                                    <View style={lightStyles.switchBox}>
                                        {/* <Button title="DarkMode" onPress={darkAlert} /> */}
                                    </View>
                                </TouchableOpacity>
                                <View style={lightStyles.datatList}>
                                    <Text style={lightStyles.dataTitleText}>Data Source</Text>
                                    <Text style={lightStyles.dataSubText}>OpenWeatherMap</Text>
                                    <Text style={lightStyles.dataSubText}>Data provided by OpenWeather One Call API</Text>
                                </View>
                                <View style={lightStyles.aboutList}>
                                    <Text style={lightStyles.aboutTitleText}>About</Text>
                                    <Text style={lightStyles.aboutSubText}>StormyWeather App Developed by Frost Labs</Text>
                                    <Text style={lightStyles.aboutSubText}>Version {versionNum} Beta</Text>
                                    <Text></Text>
                                    <Text style={styles.aboutBuiltText}>StormyWeather is built with React-Native on Expo</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else if (errMssg) {
            return (
                <View style={lightStyles.errContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                    <Text style={{color: TEXT_COLOR_LIGHT}}>{errMssg}</Text>
                </View>
            );
        } else {
            return (
                <View style={lightStyles.loadingContainer}>
                    <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR}/>
                    {/* Loading wheel */}
                    {/* <ActivityIndicator size={85} color={SECONDARY_COLOR} /> */}
                    <View style={lightStyles.firstLoadInfo}>
                        <Image style={lightStyles.appIconImage} source={require('../assets/adaptive-icon.png')} />
                        <Text style={lightStyles.loadingMssg_main}>StormyWeather</Text>
                        <Text style={lightStyles.loadingMssg_sub}>Always Stormy</Text>
                        <View style={lightStyles.loading}>
                            <Text style={lightStyles.loadingMssg_minor}>Loading The Weather</Text>  
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

    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: -10,
        backgroundColor: PRIMARY_COLOR,
    },

    backContainer: {
        flex: 1,
        position: 'absolute',
        backgroundColor: SECONDARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 25,
        top: 5,
        left: 40,
    },

    topRounder: {
        flex: 1,
        position: 'absolute',
        backgroundColor: PRIMARY_COLOR,
        height: 30,
        width: Dimensions.get('window').width,
        borderRadius: 55,
        top: -10,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    }, 

    settingsText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 22,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 10,
    },

    settingsList: {
        flexDirection: 'column',
        margin: 10,
        width: Dimensions.get('window').width,
        height: 400,
    },

    unitstList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
    },

    unitsTextBlock: {
        flexDirection: 'column',
    },

    unitsTitleText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 20,
        fontWeight: '700',
    },

    unitsSubText: {
        color: TEXT_COLOR_LIGHTGRAY,
    },

    unitsPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    tempUnitC: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 25,
        fontWeight: '700',
        paddingVertical: 8,
        paddingHorizontal: 17,
        borderRadius: 25,
        backgroundColor: TIERTIARY_COLOR,
    },

    tempUnitF: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 25,
        fontWeight: '700',
        paddingVertical: 8,
        paddingHorizontal: 17,
        marginLeft: 10,
        borderRadius: 25,
        backgroundColor: TIERTIARY_COLOR,
    },

    darktList: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    darkText: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },

    switchBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },

    datatList: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },


    dataTitleText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 20,
        fontWeight: '700',
    },

    dataSubText: {
        color: TEXT_COLOR_LIGHTGRAY,
    },

    aboutList: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },

    aboutTitleText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 20,
        fontWeight: '700',
    },

    aboutSubText: {
        color: TEXT_COLOR_LIGHTGRAY,
    },

    aboutBuiltText: {
        color: SECONDARY_COLOR,
    },
});

const lightStyles = StyleSheet.create({
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

    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: -10,
        backgroundColor: TEXT_COLOR_LIGHT,
    },

    topRounder: {
        flex: 1,
        position: 'absolute',
        backgroundColor: PRIMARY_COLOR,
        height: 30,
        width: Dimensions.get('window').width,
        borderRadius: 55,
        top: -10,
    },

    backContainer: {
        flex: 1,
        position: 'absolute',
        backgroundColor: SECONDARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 25,
        top: 5,
        left: 40,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    },  

    settingsText: {
        color: TEXT_COLOR_BLACK,
        fontSize: 22,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 10,
    },

    settingsList: {
        flexDirection: 'column',
        margin: 10,
        width: Dimensions.get('window').width,
        height: 400,
    },

    unitstList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
    },

    unitsTextBlock: {
        flexDirection: 'column',
    },

    unitsTitleText: {
        color: TEXT_COLOR_BLACK,
        fontSize: 20,
        fontWeight: '700',
    },

    unitsSubText: {
        color: TEXT_COLOR_DARKGRAY,
    },

    unitsPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    tempUnitC: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 25,
        fontWeight: '700',
        paddingVertical: 8,
        paddingHorizontal: 17,
        borderRadius: 25,
        backgroundColor: TIERTIARY_COLOR,
    },

    tempUnitF: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 25,
        fontWeight: '700',
        paddingVertical: 8,
        paddingHorizontal: 17,
        marginLeft: 10,
        borderRadius: 25,
        backgroundColor: TIERTIARY_COLOR,
    },

    darktList: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    darkText: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },

    switchBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },

    datatList: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },


    dataTitleText: {
        color: TEXT_COLOR_BLACK,
        fontSize: 20,
        fontWeight: '700',
    },

    dataSubText: {
        color: TEXT_COLOR_DARKGRAY,
    },

    aboutList: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },

    aboutTitleText: {
        color: TEXT_COLOR_BLACK,
        fontSize: 20,
        fontWeight: '700',
    },

    aboutSubText: {
        color: TEXT_COLOR_DARKGRAY,
    },

    aboutBuiltText: {
        color: SECONDARY_COLOR,
    },
});
