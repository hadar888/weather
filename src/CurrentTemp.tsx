import './App.css';
import { useEffect } from 'react';
import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Location } from './Helper';
const weather = require('openweather-apis');

interface CurrentTempProps {
    location: Location;
}


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

function CurrentLocation(props: CurrentTempProps) {
    const classes = useStyles();
    const { location } = props;
    const [weatherData, setWeatherData] = React.useState<any>();
    const [shouldGetWeather, setShouldGetWeather] = React.useState<boolean>(false);

    useEffect(() => {
        weather.setCoordinate(location.x , location.y);
        setShouldGetWeather(true);
    }, [location]);

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
                                    <Typography color="textSecondary" variant="h6"> נכון לשעה: שעה</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.text} variant="h1">{Math.round(weatherData.main.temp)}°</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.text}> מהירות רוח: {weatherData.wind.speed}</Typography>
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
