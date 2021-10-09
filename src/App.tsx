import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import './App.css';
import CurrentTemp from './CurrentTemp';
import { Location } from './Helper';
import { currentLocationContext } from './currentLocationContext';
import NavBar from './NavBar';
const weather = require('openweather-apis');

const useStyles = makeStyles(() => ({
  app: {
    height: '100vh',
    backgroundImage: "linear-gradient(0, #5eabba, #177b9b)",
    '& *': {
      fontFamily: 'Open Sans',
    },
  },
  mainContainer: {
    height: '100%',
  }
}));

function App() {
  const classes = useStyles();
  const [location, setLocation] = React.useState<Location>({x: 0, y:0});

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
      <currentLocationContext.Provider value={{currentLocation: location, setCurrentLocation: setLocation}}>
        <NavBar />
        <Grid container direction="row-reverse" className={classes.mainContainer}>
          <Grid item xs={8}>
            <Grid container direction="column" className={classes.mainContainer}>
              {location &&
                <Grid item>
                  <CurrentTemp />
                </Grid>
              }
              <Grid item>
                {/* <TodayTemp> */}
              </Grid>
              <Grid item>
                {/* <WeekTemp> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {/* <AirQality / ads? > */}
        </Grid>
      </currentLocationContext.Provider>
    </Box>
  );
}

export default App;
