import { useState } from 'react';
import { generate } from 'shortid';
import { getGeoCodeData } from './index';

export default function returnCities() {
    const [cities, setCities] = useState([]);

    const addCity = async (cityName) => {
        cities.length = 0;

        const geoDataArray = await getGeoCodeData(cityName);

        if (geoDataArray.length < 1) {
            const newCity = { id: generate(), cityName: 'Inavlid Input' };
            setCities([ ...cities, newCity ]);
        }

        for (var i = 0; i < geoDataArray.length; i++) {
            const cityName = geoDataArray[i].name;
            const cityCountry = geoDataArray[i].country;
            const cityState = geoDataArray[i].state;
            const cityLat = geoDataArray[i].lat;
            const cityLon = geoDataArray[i].lon;

            const newCity = { id: generate(), cityName, cityState, cityCountry, cityLat, cityLon};
            cities.push(newCity);
            setCities([ ...cities, newCity ]);
        }
    }
    return { cities, addCity };
}
