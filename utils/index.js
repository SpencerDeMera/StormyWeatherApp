import * as Location from "expo-location";

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ONECALL_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';

// REDACTED

let currLocation;
var newLat;
var newLon;
let unitsSystem = 'imperial'; // defaults to imperial

let dark;
let setDark;

export const getIsDark = () => { return dark; }

export const setIsDark = (setDark) => {
    if (setDark == true) {
        dark = true;
    } else { 
        dark = false;
    }
}

export const setLocation = (flag) => {
    if (flag) {
        currLocation = true;
    } else if (!flag) {
        currLocation = false;
    }
}

export const getCurrLocationFlag = () => { return currLocation; }

export const setUnitsSystem = (units) => { unitsSystem = units; }

export const getUnitsSystem = () => { return unitsSystem; }

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

