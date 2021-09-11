import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableHighlight, TouchableOpacity, Image, Alert } from 'react-native';
import { setUnitsSystem, getUnitsSystem, getIsDark, setIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY} = colors;

// TM symbol : ™

export default function SettingsPage({ navigation }) {
    console.log('\n~ SettingsPage ~\n');

    var unitsFlag = 'imperial';
    let isDark = getIsDark();
    const [darkMode, setDarkMode] = useState(true);

    const selectUnits = () => {
        if (unitsFlag === 'imperial') {
            setUnitsSystem(unitsFlag);
            console.log('Units set to Imperial');
        } else if (unitsFlag === 'metric') {
            setUnitsSystem(unitsFlag);
            console.log('Units set to Metric');
        }
    }

    function navigateToHomePage() {
        navigation.navigate("Home");
    }

    const units = getUnitsSystem();

    const darkAlert = () => {
        Alert.alert(
            'Dark Mode',
            'Enable Dark Mode Yes or No?',
            [
                {
                    text: 'ON',
                    onPress: () => {setIsDark(true);}
                },
                {
                    text: 'OFF',
                    onPress: () => {setIsDark(false);}
                },
            ],
            {cancelable: true},
        );
    };
    
    if (isDark) {
        return (
            <View style={styles.bodyContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#00002B"/>
                <View style={styles.container}>
                    <View style={styles.body}>
                        <View style={styles.settingsList}>
                            <View style={styles.unitstList}>
                                <View style={styles.unitsTextBlock}>
                                    <Text style={styles.unitsTitleText}>Units</Text>
                                    <Text style={styles.unitsSubText}>Pick the unit of weather data</Text>
                                    <Text style={styles.unitsSubText}>Current units system : {units}</Text>
                                </View>
                                <View style={styles.unitsPicker}>
                                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                                        unitsFlag = 'metric';
                                        selectUnits();
                                        // Navigate to homepage when new unit is selected
                                        navigateToHomePage();
                                    }}>
                                        <Text style={styles.tempUnitC}>C</Text>
                                    </TouchableOpacity >
                                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                                        unitsFlag = 'imperial';
                                        selectUnits();
                                        // Navigate to homepage when new unit is selected
                                        navigateToHomePage();
                                    }}>
                                        <Text style={styles.tempUnitF}>F</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.darktList}>
                                <View style={styles.darkText}>
                                    <Text style={styles.dataTitleText}>Dark Mode</Text>
                                    <Text style={styles.dataSubText}>Toggle Dark Mode On or Off</Text>
                                    <Text style={styles.dataSubText}>StormyWeather is set to On by Default</Text>
                                </View>
                                <View style={styles.switchBox} onPress={darkAlert}>
                                    {/* <Button title="DarkMode" onPress={darkAlert} /> */}
                                </View>
                            </View>
                            <View style={styles.datatList}>
                                <Text style={styles.dataTitleText}>Data Source</Text>
                                <Text style={styles.dataSubText}>OpenWeather™</Text>
                                <Text style={styles.dataSubText}>Data provided by OpenWeather One Call API™</Text>
                            </View>
                            <View style={styles.aboutList}>
                                <Text style={styles.aboutTitleText}>About</Text>
                                <Text style={styles.aboutSubText}>StormyWeather App Developed by Frost Labs</Text>
                                <Text style={styles.aboutSubText}>Version 0.6.1 Beta</Text>
                                <Text></Text>
                                <Text style={styles.aboutBuiltText}>StormyWeather is built with React-Native</Text>
                            </View>
                        </View>
                        <View style={styles.settingsBottom}>
                            <Image style={styles.appIconImage} source={require('../assets/adaptive-icon.png')} />
                        </View>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={lightStyles.bodyContainer}>
                <StatusBar barStyle="dark-content" backgroundColor={TEXT_COLOR_LIGHT}/>
                <View style={lightStyles.container}>
                    <View style={lightStyles.body}>
                        <View style={lightStyles.settingsList}>
                            <View style={lightStyles.unitstList}>
                                <View style={lightStyles.unitsTextBlock}>
                                    <Text style={lightStyles.unitsTitleText}>Units</Text>
                                    <Text style={lightStyles.unitsSubText}>Pick the unit of weather data</Text>
                                    <Text style={lightStyles.unitsSubText}>Current units system : {units}</Text>
                                </View>
                                <View style={lightStyles.unitsPicker}>
                                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                                        unitsFlag = 'metric';
                                        selectUnits();
                                        // Navigate to homepage when new unit is selected
                                        navigateToHomePage();
                                    }}>
                                        <Text style={lightStyles.tempUnitC}>C</Text>
                                    </TouchableOpacity >
                                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                                        unitsFlag = 'imperial';
                                        selectUnits();
                                        // Navigate to homepage when new unit is selected
                                        navigateToHomePage();
                                    }}>
                                        <Text style={lightStyles.tempUnitF}>F</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={lightStyles.darktList}>
                                <View style={lightStyles.darkText}>
                                    <Text style={lightStyles.dataTitleText}>Dark Mode</Text>
                                    <Text style={lightStyles.dataSubText}>Toggle Dark Mode On or Off</Text>
                                    <Text style={lightStyles.dataSubText}>StormyWeather is set to On by Default</Text>
                                </View>
                                <View style={lightStyles.switchBox} onPress={darkAlert}>
                                    {/* <Button title="DarkMode" onPress={darkAlert} /> */}
                                </View>
                            </View> 
                            <View style={lightStyles.datatList}>
                                <Text style={lightStyles.dataTitleText}>Data Source</Text>
                                <Text style={lightStyles.dataSubText}>OpenWeather™</Text>
                                <Text style={lightStyles.dataSubText}>Data provided by OpenWeather One Call API™</Text>
                            </View>
                            <View style={lightStyles.aboutList}>
                                <Text style={lightStyles.aboutTitleText}>About</Text>
                                <Text style={lightStyles.aboutSubText}>StormyWeather App Developed by Frost Labs</Text>
                                <Text style={lightStyles.aboutSubText}>Version 0.6.1 Beta</Text>
                                <Text></Text>
                                <Text style={lightStyles.aboutBuiltText}>StormyWeather is built with React-Native</Text>
                            </View>
                        </View>
                        <View style={lightStyles.settingsBottom}>
                            <Image style={lightStyles.appIconImage} source={require('../assets/adaptive-icon.png')} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
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

    settingsBottom: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        marginTop: 25,
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

    appIconImage: {
        width: 250,
        height: 250,
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

    settingsBottom: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        marginTop: 25,
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

    appIconImage: {
        width: 250,
        height: 250,
    },
});
