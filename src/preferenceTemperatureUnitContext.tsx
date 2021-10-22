import React from 'react';
import { DegreesType } from './Helper';

export const preferenceTemperatureUnitContext = React.createContext({
    preferenceTemperatureUnit: DegreesType.Celsius,
    setPreferenceTemperatureUnit: (newPreferenceTemperatureUnit: DegreesType) => { }
});