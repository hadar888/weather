import './App.css';
import dayjs from 'dayjs'
import ForecastChart from './ForecastChart';
import { daysNames } from './Helper';

interface WeekForecastProps {
    forecastTemps: [Number, Number, Number, Number, Number, Number, Number]
}

function WeekForecast(props: WeekForecastProps) {
    const { forecastTemps } = props;

    const data = forecastTemps.map((temp, index) => {
        const day = daysNames[dayjs().add(index, 'day').day()];
        return { time: day, temp }
    });

    return (
        <>
            <ForecastChart
            data = {data}
            title = {"מזג אוויר שבועי ב"}
            />
        </>
    );
}

export default WeekForecast;
