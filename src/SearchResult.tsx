import './App.css';
import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import SearchResultItem from './SearchResultItem';
import { cityMapping, CityData } from 'city-timezones';
import { dataGovCityToCityData, isTexContainsHebrew, toTitleCase } from './Helper';

const useStyles = makeStyles(() => ({
    searchResults: {
        marginTop: '2px',
        borderRadius: '5px',
        maxHeight: "450px",
        backgroundColor: 'white',
        overflowY: 'hidden',
        overflowX: 'hidden',
    },
}));

interface SearchResultProps {
    locationText: string;
    onClickAway: () => void;
}

function SearchResult(props: SearchResultProps) {
    const { locationText, onClickAway } = props;
    const [relevantCities, setRelevantCities] = React.useState<CityData[]>([]);

    const classes = useStyles();

    useEffect(() => {
        async function setIsraelCities(text: string) {
            const getIsraelCitiesApiurl = new URL("https://data.gov.il/api/3/action/datastore_search?")
            getIsraelCitiesApiurl.searchParams.append('resource_id', '351d4347-8ee0-4906-8e5b-9533aef13595');
            getIsraelCitiesApiurl.searchParams.append('limit', '10');
            getIsraelCitiesApiurl.searchParams.append('q', text);
            const getIsraelCitiesApiResponse = await fetch(getIsraelCitiesApiurl as any);

            if (getIsraelCitiesApiResponse.ok) {
                const { result } = await getIsraelCitiesApiResponse.json();
                const israelCities = result.records.map((record: any) => {
                    return dataGovCityToCityData(record);
                })
                setRelevantCities(israelCities);
            }
        }

        if (locationText && isTexContainsHebrew(locationText)) {
            setIsraelCities(locationText);
        }
        else {
            const newRelevantCities = locationText ?
                cityMapping.filter((city: CityData) => {
                    return city.city.includes(toTitleCase(locationText))
                })
                    .slice(0, 10)
                : [];

            setRelevantCities(newRelevantCities);
        }
    }, [locationText]);

    return (
        <>
            <Grid container direction="column" className={classes.searchResults}>
                {
                    relevantCities.length ?
                        relevantCities.map((city: CityData) => {
                            return <Grid item key={`${city.city}${city.lat}, ${city.lng}`}>
                                <SearchResultItem result={city} onClickAway={onClickAway}/>
                            </Grid>
                        }) :
                        <SearchResultItem result={null} onClickAway={onClickAway}/>
                }
            </Grid>
        </>
    );
}

export default SearchResult;
