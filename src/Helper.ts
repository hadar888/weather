import { CityData } from 'city-timezones';
const JSITM = require('js-itm');

export function toTitleCase(text: string) {
  return text.replace(
    /\w\S*/g,
    function (text) {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    }
  );
}

export enum DegreesType {
  Celsius = 'metric',
  Farenheit = 'imperial',
}

export function isTexContainsHebrew(text: string) {
  return (/[\u0590-\u05FF]/).test(text);
}

export function dataGovCityToCityData(dataGovCity: any): CityData {
  const cords = JSITM.itmRef2gpsRef(String(dataGovCity["קואורדינטות"]));
  const city = {
    lat: cords[0],
    lng: cords[1],
    pop: dataGovCity["סך הכל אוכלוסייה 2019"],
    city: dataGovCity["שם יישוב"],
    iso2: '',
    iso3: '',
    country: 'ישראל',
    timezone: '',
    province: '',
    exactCity: dataGovCity["שם יישוב"],
    city_ascii: '',
    state_ansi: '',
    exactProvince: '',
  }

  return city;
}

export interface Location {
  x: number;
  y: number;
}

export const daysNames = 
  ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
