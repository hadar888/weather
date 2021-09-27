import './App.css';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
const weather = require('openweather-apis');

const useStyles = makeStyles(() => ({
}));

function CurrentLocation() {
    const classes = useStyles();

    const userLocation: Number[] = [];
    const setUserPosition = (position: GeolocationPosition) => {
        if (position && position.coords) {
            userLocation[0] = position.coords.latitude;
            userLocation[1] = position.coords.longitude;

            weather.setCoordinate(userLocation[0], userLocation[1]);
            weather.getTemperature((err: Error, temp: number) => {
                console.log("user position cords:", userLocation);
                console.log("temp:", temp);
            });
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setUserPosition);
        }
    }, []);

    return (
        <>
        </>
    );
}

export default CurrentLocation;
