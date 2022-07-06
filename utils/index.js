import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ONECALL_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';

// API KEY REDACTED
const WEATHER_API_KEY = '';

let currLocation;
var newLat;
var newLon;
let unitsSystem = 'imperial'; // defaults to imperial
let dark = true; // defaults to dark

export const setIsDark = (setDark) => {
    if (setDark == true) {
        dark = true;
    } else {
        dark = false;
    }
    setDarkLong();
}

export const getIsDark = () => { return dark; }

export const setDarkLong = async () => {
    if (dark == true) {
        try {
            await AsyncStorage.removeItem('isDark');
            await AsyncStorage.setItem('isDark', 'true');
            console.log("ALERT: Dark Set to: TRUE");
        } catch (error) {
            console.log("ERROR: isDark Not Stored")
        }
    } else {
        try {
            await AsyncStorage.removeItem('isDark');
            await AsyncStorage.setItem('isDark', 'false');
            console.log("ALERT: Dark Set to: FALSE");
        } catch (error) {
            console.log("ERROR: isDark Not Stored")
        }
    }
}

export const getDarkLong = async () => {
    try {
        const isDark = await AsyncStorage.getItem('isDark');
        if (isDark !== null) {
            if (isDark == 'true') {
                console.log("\nALERT: Stored Dark: TRUE");
                setIsDark(true);
            } else {
                console.log("\nALERT: Stored Dark: FALSE");
                setIsDark(false);
            }
        }
    } catch (error) {
        console.log("ERROR: Could Not Get isDark")
    }
    return dark;
}

export const setUnitsSystem = (units) => { 
    unitsSystem = units;
    setUnitsLong();
}

export const getUnitsSystem = () => { return unitsSystem; }

export const setUnitsLong = async () => {
    if (unitsSystem == 'imperial') {
        try {
            await AsyncStorage.removeItem('units');
            await AsyncStorage.setItem('units', 'imperial');
            console.log("ALERT: Units Set to: IMPERIAL");
        } catch (error) {
            console.log("ERROR: Units Not Stored")
        }
    } else if (unitsSystem == 'metric') {
        try {
            await AsyncStorage.removeItem('units');
            await AsyncStorage.setItem('units', 'metric');
            console.log("ALERT: Units Set to: METRIC");
        } catch (error) {
            console.log("ERROR: Units Not Stored")
        }
    }
}

export const getUnitsLong = async () => {
    try {
        const unitsRes = await AsyncStorage.getItem('units');
        if (unitsRes !== null) {
            if (unitsRes == 'imperial') {
                console.log("ALERT: Stored Units: IMPERIAL");
                setUnitsSystem('imperial');
            } else if (unitsRes == 'metric') {
                console.log("ALERT: Stored Units: METRIC");
                setUnitsSystem('metric');
            }
        }
    } catch (error) {
        console.log("ERROR: Could Not Get Units")
    }
    return unitsSystem;
}

export const setLocation = (flag) => {
    if (flag) {
        currLocation = true;
    } else if (!flag) {
        currLocation = false;
    }
}

export const getCurrLocationFlag = () => { return currLocation; }

export const setCoords = (cityLat, cityLon) => {
    newLat = cityLat;
    newLon = cityLon;
}

export const getLocation = async () => {
    if (currLocation) { // if using currLocation
        let {status} = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            setErrorMessage('Location access is needed');
            return;
        } // if

        const { coords } = await Location.getCurrentPositionAsync();
        
        console.log("Lat: " + coords.latitude + " Lon: " + coords.longitude);

        return { latitude: coords.latitude, longitude: coords.longitude };
    } else if (!currLocation) {
        return { latitude:  newLat, longitude: newLon };
    }
};

export const getStateName = async () => {
    const stateURL = `https://worldpopulationreview.com/static/states/abbr-name-list.json`;
    const stateResponse = await fetch(stateURL);
    var stateResult = await stateResponse.json();

    let stateDataArr = [];
    for (var i = 0; i < stateResult.length; i++) {
        stateDataArr.push(stateResult[i]);
    }
    return stateDataArr;
}

export const getCurrWeatherData = async (location) => {
    // alert("This is debug alert 2");
    const defaultWeatherURL = `${BASE_WEATHER_URL}lat=${location.latitude}&lon=${location.longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
    const defaultResponse = await fetch(defaultWeatherURL); // fetches repsonse from API call and places into repsonse
    var defaultResult = await defaultResponse.json(); // converts json to result variable

    if (defaultResponse.ok) { // if response is ok
        return defaultResult;
    } else {
        return defaultResult = null; // else if repsonse !ok return result as null
    }
};

export const getOneCallWeatherData = async (location) => {
    const oneCallURL = `${ONECALL_WEATHER_URL}lat=${location.latitude}&lon=${location.longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
    const oenCallResponse = await fetch(oneCallURL); // fetches repsonse from API call and places into repsonse
    var oneCallResult = await oenCallResponse.json(); // converts json to result variable

    if (oenCallResponse.ok) { // if response is ok
        return oneCallResult;
    } else {
        return oneCallResult = null; // else if repsonse !ok return result as null
    }
}

export const getGeoCodeData = async (cityName) => {
    const geoCodeURL = `${GEOCODE_URL}q=${cityName}&limit=8&appid=${WEATHER_API_KEY}`;
    const geoCodeResponse = await fetch(geoCodeURL);
    var geoCodeResult = await geoCodeResponse.json();

    let geoDataArr = [];
    for (var i = 0; i < geoCodeResult.length; i++) {
        geoDataArr.push(geoCodeResult[i]);
    }

    return geoDataArr;
}

