import './App.css';
import { Box, Grid, InputBase, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    locationSearch: {
        width: "400px",
        backgroundColor: "#798cf1",
        borderRadius: "15px",
        padding: "5px 10px"
    },
    searchInput: {
        display: "block",
    },
}));

interface LocationSearchProps {
    onTextChange: (newLocationName: string) => void;
    onClick: () => void;
}

function LocationSearch(props: LocationSearchProps) {
    const { onTextChange, onClick } = props;
    const classes = useStyles();

    const locationTextChange = (event: any) => {
        onTextChange(event.currentTarget.value)
    }

    return (
        <>
            <Box className={classes.locationSearch} onClick={onClick}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container direction="row-reverse" alignItems="flex-end" spacing={1}>
                            <Grid item xs={1}>
                                <Search color="disabled" />
                            </Grid>
                            <Grid item xs={11}>
                                <InputBase
                                    fullWidth
                                    dir="rtl"
                                    onChange={locationTextChange}
                                    className={classes.searchInput} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default LocationSearch;
