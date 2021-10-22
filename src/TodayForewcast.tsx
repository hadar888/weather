import './App.css';
import dayjs from 'dayjs'
import ForecastChart from './ForecastChart';

interface TodayForecastProps {
    forecastTemps: [Number, Number, Number, Number, Number, Number, Number, Number]
}

function TodayForecast(props: TodayForecastProps) {
    const { forecastTemps } = props;
    const startHour = dayjs().startOf('hour').add(1, 'hour');

    const data = forecastTemps.map((temp, index) => {
        const hour = startHour.add(index, 'hour').hour() + ":00";
        return { time: hour, temp }
    });

    return (
        <>
            <ForecastChart
            data = {data}
            title = {"מזג אוויר יומי ב"}
            />
        </>
    );
}

export default TodayForecast;
