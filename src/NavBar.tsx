import './App.css';
import React, { useContext } from 'react';
import { AppBar, ClickAwayListener, Grid, makeStyles, Toolbar } from '@material-ui/core';
import SearchResult from './SearchResult';
import DegreesSelect from './DegreesSelect';
import LocationSearch from './LocationSearch';
import { DegreesType } from './Helper';
import { preferenceTemperatureUnitContext } from './preferenceTemperatureUnitContext';
const weather = require('openweather-apis');

const useStyles = makeStyles(() => ({
    degreesTypeSelectContainer: {
        position: 'relative',
        margin: '7px',
    },
    searchResultContainer: {
        position: 'absolute',
    },
}));

function NavBar() {
    const [locationText, setLocationText] = React.useState("");
    const [showResults, setShowResults] = React.useState(false);
    const preferenceTemperatureUnit = useContext(preferenceTemperatureUnitContext);

    const classes = useStyles();

    const onSearchBarTextChange = (newLocationName: string) => {
        setLocationText(newLocationName);
        setShowResults(true);
    }

    const searchBarOnClick = () => {
        setShowResults(true);
    }

    const onDegreeTypeChange = (newDegreeType: DegreesType) => {
        preferenceTemperatureUnit.setPreferenceTemperatureUnit(newDegreeType);
    }

    const handleSearchResultsClickAway = () => {
        setShowResults(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.degreesTypeSelectContainer}>
                    <DegreesSelect
                        degreesType={preferenceTemperatureUnit.preferenceTemperatureUnit}
                        onDegreeTypeChange={onDegreeTypeChange} />
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                        <Grid item>
                            <LocationSearch onTextChange={onSearchBarTextChange} onClick={searchBarOnClick} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                locationText && showResults &&
                <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.searchResultContainer}>
                    <Grid item >
                        <ClickAwayListener onClickAway={handleSearchResultsClickAway} >
                            <div >
                                <SearchResult
                                    locationText={locationText}
                                    onClickAway={handleSearchResultsClickAway} />
                            </div>
                        </ClickAwayListener>
                    </Grid>
                </Grid>
            }
        </>
    );
}

export default NavBar;
