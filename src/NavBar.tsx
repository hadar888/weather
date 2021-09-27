import './App.css';
import React from 'react';
import { AppBar, ClickAwayListener, Grid, makeStyles, Toolbar } from '@material-ui/core';
import SearchResult from './SearchResult';
import DegreesSelect from './DegreesSelect';
import LocationSearch from './LocationSearch';
import { DegreesType } from './Helper';
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
    const [degreesType, setDegreesType] = React.useState<DegreesType>(DegreesType.Celsius);
    const [showResults, setShowResults] = React.useState(false);

    const classes = useStyles();

    const onSearchBarTextChange = (newLocationName: string) => {
        setLocationText(newLocationName);
        setShowResults(true);
    }

    const searchBarOnClick = () => {
        setShowResults(true);
    }

    const onDegreeTypeChange = (newDegreeType: DegreesType) => {
        weather.setUnits(newDegreeType);
        setDegreesType(newDegreeType);
    }

    const handleSearchResultsClickAway = () => {
        setShowResults(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.degreesTypeSelectContainer}>
                    <DegreesSelect degreesType={degreesType} onDegreeTypeChange={onDegreeTypeChange} />
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
                                <SearchResult locationText={locationText} />
                            </div>
                        </ClickAwayListener>
                    </Grid>
                </Grid>
            }
        </>
    );
}

export default NavBar;
