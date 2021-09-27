import './App.css';
import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { DegreesType } from './Helper';

const useStyles = makeStyles(() => ({
    degreesTypeSelectContainer: {
        position: 'relative',
    },
    degreesTypeSelect: {
        position: 'absolute',
        paddingTop: '8px',
        top: 0,
    },
    degreesTypeOption: {
        color: 'white !important',
    },
}));

interface DegreesSelectProps {
    degreesType: DegreesType;
    onDegreeTypeChange: (newDegreeType: DegreesType) => void;
}

function DegreesSelect(props: DegreesSelectProps) {
    const { degreesType, onDegreeTypeChange} = props;
    const classes = useStyles();

    const handleChangeDegreesType = (event: any) => {
        onDegreeTypeChange(event.currentTarget.value);
    }

    return (
        <Box className={classes.degreesTypeSelect}>
            <ToggleButtonGroup
                value={degreesType}
                exclusive
                onChange={handleChangeDegreesType}
                className={classes.degreesTypeSelect}
            >
                <ToggleButton value={DegreesType.Celsius} className={classes.degreesTypeOption}>
                    °C
                </ToggleButton>
                <ToggleButton value={DegreesType.Farenheit} className={classes.degreesTypeOption}>
                    °F
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

export default DegreesSelect;
