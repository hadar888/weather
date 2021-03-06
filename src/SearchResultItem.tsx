import './App.css';
import { Box, Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { CityData } from 'city-timezones';
import { MouseEventHandler, useContext, useEffect } from 'react';
import React from 'react';
import { isTexContainsHebrew } from './Helper';
import { currentLocationContext } from './currentLocationContext';

const useStyles = makeStyles(() => ({
    searchResult: {
        width: "400px",
        height: '41px',
    },
    noResultContainer: {
        height: '100%',
        paddingRight: '10px',
    },
}));

interface SearchResultItemProps {
    result: CityData | null;
    onClickAway: () => void;
}

function SearchResultItem(props: SearchResultItemProps) {
    const { result, onClickAway} = props;
    const [countryName, setCountryName] = React.useState<string>(result ? result.country : '');
    const classes = useStyles();
    const currentLocation = useContext(currentLocationContext);

    useEffect(() => {
        async function setHebrewCountryName(countryName: string) {
            const url = new URL("https://data.gov.il/api/3/action/datastore_search?")
            url.searchParams.append('resource_id', 'c84082e9-7d45-4853-9a95-e7eaad7f66d5');
            url.searchParams.append('limit', '10');
            url.searchParams.append('q', countryName);
            const response = await fetch(url as any);

            if (response.ok) {
                const { result } = await response.json();
                if (result.records[0]) {
                    const hebrewCountryName = result.records[0]["שם_ארץ"];
                    console.log("hebrewCountryName: ", hebrewCountryName);
                    setCountryName(hebrewCountryName);
                }
            } else {
                console.log("HTTP-Error: " + response.status);
            }
        }
        
        if(countryName && !isTexContainsHebrew(countryName)) {
            setHebrewCountryName(countryName);
        }
    }, [])

    const getWeather = (event: any) => { //React.MouseEvent<HTMLElement>
        const location = event.target.id.split(',');
        currentLocation.setCurrentLocation({x:Number(location[0]), y:Number(location[1])});
    }

    const locationText = result ? `${result.city} ,
        ${result.province ? result.province + ',' : ''} 
        ${countryName}` : 'אין תוצאות חיפוש';

    return (
        <>
            <Box className={classes.searchResult} dir="rtl" onClick={onClickAway}>
                {
                    result ?
                        <Button onClick={getWeather} fullWidth>
                            <Grid container direction="row" alignItems="flex-start" id={`${result.lat}, ${result.lng}`}>
                                <Grid item id={`${result.lat}, ${result.lng}`}>
                                    {
                                        locationText
                                    }
                                </Grid>
                            </Grid>
                        </Button> :
                        <Grid container direction="column" justifyContent="center" className={classes.noResultContainer}>
                            <Grid item>
                                <Typography> {locationText} </Typography>
                            </Grid>
                        </Grid>
                }
            </Box>
            <Divider />
        </>
    );
}

export default SearchResultItem;
