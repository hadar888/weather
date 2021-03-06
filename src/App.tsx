import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import './App.css';
import CurrentTemp from './CurrentTemp';
import { Location } from './Helper';
import { currentLocationContext } from './currentLocationContext';
import { preferenceTemperatureUnitContext } from './preferenceTemperatureUnitContext';
import NavBar from './NavBar';
import ForecastChart from './ForecastChart';
import TodayForecast from './TodayForewcast';
import WeekForecast from './WeekForecast';
import { DegreesType } from './Helper';
const weather = require('openweather-apis');

const useStyles = makeStyles(() => ({
  app: {
    backgroundImage: "linear-gradient(0, #5eabba, #177b9b)",
    '& *': {
      fontFamily: 'Open Sans',
    },
  },
}));

function App() {
  const classes = useStyles();
  const [location, setLocation] = React.useState<Location>({ x: 0, y: 0 });
  const [preferenceTemperatureUnit, setPreferenceTemperatureUnit] =
    React.useState<DegreesType>(DegreesType.Celsius)

  weather.setAPPID("c5515db1b9a2ba19b421f73acb5c17e0");

  const setUserPosition = (position: GeolocationPosition) => {
    if (position && position.coords) {
      setLocation({ x: position.coords.latitude, y: position.coords.longitude });
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setUserPosition);
    }
  }, []);

  return (
    <Box className={classes.app}>
      <preferenceTemperatureUnitContext.Provider
        value={{ preferenceTemperatureUnit: preferenceTemperatureUnit, setPreferenceTemperatureUnit: setPreferenceTemperatureUnit }}>
        <currentLocationContext.Provider value={{ currentLocation: location, setCurrentLocation: setLocation }}>
          <NavBar />
          <Grid container direction="row-reverse">
            <Grid item xs={8}>
              <Grid container direction="column">
                {location &&
                  <Grid item>
                    <CurrentTemp />
                  </Grid>
                }
                <Grid item>
                  <TodayForecast forecastTemps={[1, 0.5, 3, 4, 5, 20, 7, 8]} />
                </Grid>
                <Grid item>
                  <WeekForecast forecastTemps={[1, 2, 20, 4, 5, 6, -7]} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {/* <AirQality / ads? > */}
          </Grid>
        </currentLocationContext.Provider>
      </preferenceTemperatureUnitContext.Provider>
    </Box>
  );
}

export default App;
