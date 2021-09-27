import { Box, Grid, makeStyles } from '@material-ui/core';
import './App.css';
import CurrentLocation from './CurrentLocation';
import CurrentTemp from './CurrentTemp';
import NavBar from './NavBar';
const weather = require('openweather-apis');

const useStyles = makeStyles(() => ({
  app: {
    height: '100vh',
    backgroundImage: "linear-gradient(0, #5eabba, #177b9b)",
  },
  mainContainer: {
    height: '100%',
  }
}));

function App() {
  const classes = useStyles();

  weather.setAPPID("c5515db1b9a2ba19b421f73acb5c17e0");

  const showPosition = (position: any) => {
    if (position && position.coords) {
      console.log(`${position.coords.latitude}, ${position.coords.longitude}`);
    }
  }

  navigator.geolocation.getCurrentPosition(showPosition);

  return (
    <Box className={classes.app}>
      <NavBar />
      <CurrentLocation />
      <Grid container direction="row-reverse" className={classes.mainContainer}>
        <Grid item xs={8}>
          <Grid container direction="column" className={classes.mainContainer}>
            <Grid item>
              <CurrentTemp x={20} y={20} />
            </Grid>
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
        {/* <AirQality> */}
      </Grid>
    </Box>
  );
}

export default App;
