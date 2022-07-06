import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY, TEXT_COLOR_DARKGRAY, RAIN_GREEN} = colors;

let isDark;

export default function RainForcaster({ weatherInfo }) {
    isDark = getIsDark();
    let rainFlag = 0;

    const RainBox = ({ index, color }) => {
        if (color) {
            return (
                <View style={styles.rainBoxesTrue} />
            );
        } else {
            return (
                <View style={styles.rainBoxes} />
            );
        }
    }

    // Loops 60 times
    var rainLoop = [];
    var rainPopLoop = [];
    for (let i = 0; i < 60; i+=2) {
        const pop = weatherInfo.minutely[i].precipitation;

        if (pop > 0) {
            rainFlag += 2;
            rainPopLoop.push(1); // rain
            rainLoop.push(
                <RainBox index={i} color={true}/>
            );
        } else {
            rainPopLoop.push(0); // no rain
            rainLoop.push(
                <RainBox index={i} color={false}/>
            );
        }
    }

    let rainMssg;
    let noRainCtr = 0;
    let yesRainCtr = 0;

    if (rainFlag == 0) {
        rainMssg = "No precipitation for the next hour";
    } else if (rainFlag == 60) {
        rainMssg = "Precipitation for the next hour";
    } else if (rainFlag > 0 && rainFlag < 60) {
        for (let i = 0; i < 60; i+=2) {
            if (rainPopLoop[i] == 0) {
                noRainCtr += 2;
            } else {
                yesRainCtr += 2;
            }
        }

        if (rainPopLoop[0] == 0) {
            rainMssg = "Precipitation starting in " + noRainCtr + " minutes"
        } else if (rainPopLoop[0] == 1) {
            rainMssg = "Precipitation ending in " + yesRainCtr + " minutes"
        }
    }

    if (isDark) {
        return (
            <View style={styles.container}>
                <View style={styles.rainHeader}>
                    <Text style={styles.rainHeadertext}>{rainMssg}</Text>
                </View>
                <View style={styles.rainBoxesContainer}>
                    {rainLoop}
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.rainHeader}>
                    <Text style={lightStyles.rainHeadertext}>{rainMssg}</Text>
                </View>
                <View style={styles.rainBoxesContainer}>
                    {rainLoop}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: -10,
    },

    rainBoxesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    rainHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    rainHeadertext: {
        fontSize: 14,
        color: TEXT_COLOR_LIGHTGRAY,
        fontWeight: '400',
    },

    rainBoxes: {
        marginHorizontal: 2,
        width: 3.2,
        height: 15,
        borderRadius: 50,
        backgroundColor: TEXT_COLOR_LIGHTGRAY,
    },

    rainBoxesTrue: {
        marginHorizontal: 2,
        width: 3.2,
        height: 15,
        borderRadius: 50,
        backgroundColor: RAIN_GREEN,
    },
});

const lightStyles =StyleSheet.create({
    rainHeadertext: {
        fontSize: 14,
        color: TEXT_COLOR_DARK,
        fontWeight: '700',
    },
});