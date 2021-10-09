import React from 'react';
import { Location } from './Helper';

export const currentLocationContext = React.createContext({
    currentLocation: {x: 0, y:0}, setCurrentLocation: (newLocation: Location) => {} 
});