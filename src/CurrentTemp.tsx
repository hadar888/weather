import './App.css';
import { useContext, useEffect } from 'react';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { currentLocationContext } from './currentLocationContext';
import { preferenceTemperatureUnitContext } from './preferenceTemperatureUnitContext';
const weather = require('openweather-apis');

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: "#0000",
        margin: '20px 100px 20px 0',
        padding: '20px',
        backgroundImage: "linear-gradient(0, #5eabba, #177b9b)",
    },
    text: {
        color: "white",
        fontWeight: 'bold',
    },
}));

function CurrentLocation() {
    const classes = useStyles();
    const [weatherData, setWeatherData] = React.useState<any>();
    const [shouldGetWeather, setShouldGetWeather] = React.useState<boolean>(false);
    const currentLocation = useContext(currentLocationContext);
    const preferenceTemperatureUnit = useContext(preferenceTemperatureUnitContext);

    useEffect(() => {
        weather.setUnits(preferenceTemperatureUnit.preferenceTemperatureUnit);
        weather.setCoordinate(currentLocation.currentLocation.x , currentLocation.currentLocation.y);
        setShouldGetWeather(true);
    }, [currentLocation, preferenceTemperatureUnit]);

    useEffect(() => {
        if (shouldGetWeather) {
            weather.getAllWeather(function (err: Error, JSONObj: any) {
                setWeatherData(JSONObj);
            });
            setShouldGetWeather(false);
        }
    }, [shouldGetWeather])

    return (
        <>
            {weatherData &&
                <Card className={classes.container}>
                    <Grid container direction="row-reverse" justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Grid container direction="column" alignItems="flex-end">
                                <Grid item>
                                    <Typography className={classes.text} variant="h6">{weatherData.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color="textSecondary" variant="h6"> ???????? ????????: ??????</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.text} variant="h1">{Math.round(weatherData.main.temp)}??</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.text}> ???????????? ??????: {weatherData.wind.speed}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                        </Grid>
                    </Grid>
                </Card >
            }
        </>
    );
}

export default CurrentLocation;
