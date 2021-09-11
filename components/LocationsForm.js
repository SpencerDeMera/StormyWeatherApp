import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { getIsDark } from '../utils/index';
import { colors } from '../utils/colors';

const {PRIMARY_COLOR, SECONDARY_COLOR, TIERTIARY_COLOR, TEXT_COLOR_LIGHT, TEXT_COLOR_BLACK, TEXT_COLOR_LIGHTGRAY} = colors;

export default function LocationsForm({ onNewCity = f => f }) {
    const [city, setCity] = useState('');
    const input = useRef();

    let isDark = getIsDark();

    if (isDark) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInput}>
                            <TextInput 
                                ref={input}
                                style={styles.text}
                                value={city}
                                onChangeText={(text) => setCity(text)}
                                placeholder='Search Locations...'
                                placeholderTextColor={TEXT_COLOR_LIGHTGRAY}
                                color={TEXT_COLOR_LIGHT}
                            />
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            input.current.blur();
                            onNewCity(city);
                            setCity('');
                        }}>
                            <Text style={styles.btnText}><FontAwesome5 style={styles.addIconStyle} name="plus" size={20}/></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={lightStyles.container}>
                <View style={lightStyles.headerContainer}>
                    <View style={lightStyles.textInputContainer}>
                        <View style={lightStyles.textInput}>
                            <TextInput 
                                ref={input}
                                style={lightStyles.text}
                                value={city}
                                onChangeText={(text) => setCity(text)}
                                placeholder='Search Locations...'
                                placeholderTextColor={TEXT_COLOR_BLACK}
                                color={TEXT_COLOR_BLACK}
                            />
                        </View>
                        <TouchableOpacity style={lightStyles.btn} onPress={() => {
                            input.current.blur();
                            onNewCity(city);
                            setCity('');
                        }}>
                            <Text style={lightStyles.btnText}><FontAwesome5 style={lightStyles.addIconStyle} name="plus" size={20}/></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_COLOR,
        width: Dimensions.get('window').width,
        marginTop: -15,
    },

    headerContainer: {
        backgroundColor: SECONDARY_COLOR,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },

    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },

    textInput: {
        backgroundColor: TIERTIARY_COLOR,
        borderRadius: 25,
        padding: 10,
        width: Dimensions.get('window').width - 150,
        marginBottom: 10,
    },

    text: {
        marginLeft: 5,
        color: TEXT_COLOR_LIGHT
    },

    inputBox: {
        marginLeft: 10,
    },

    btn: {
        marginLeft: 10,
        width: 45,
        height: 45,
        backgroundColor: TIERTIARY_COLOR,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addIconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: TEXT_COLOR_LIGHTGRAY,
    },
});

const lightStyles = StyleSheet.create({
    container: {
        backgroundColor: TEXT_COLOR_LIGHT,
        width: Dimensions.get('window').width,
        marginTop: -15,
    },

    headerContainer: {
        backgroundColor: SECONDARY_COLOR,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },

    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        color: TEXT_COLOR_LIGHT,
    },

    textInput: {
        backgroundColor: TEXT_COLOR_LIGHT,
        borderRadius: 25,
        padding: 10,
        width: Dimensions.get('window').width - 150,
        marginBottom: 10,
    },

    text: {
        marginLeft: 5,
    },

    inputBox: {
        marginLeft: 10,
    },

    btn: {
        marginLeft: 10,
        width: 45,
        height: 45,
        backgroundColor: TEXT_COLOR_LIGHT,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addIconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: TEXT_COLOR_BLACK,
    },
});
