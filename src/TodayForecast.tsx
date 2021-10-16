import './App.css';
import { ArgumentAxis, ValueAxis, Chart, LineSeries, Title, AreaSeries }
    from '@devexpress/dx-react-chart-material-ui';
import dayjs from 'dayjs'

interface TodayForecastProps {
    forecastTemps: [Number, Number, Number, Number, Number, Number, Number, Number]
}

function TodayForecast(props: TodayForecastProps) {
    const { forecastTemps } = props;
    const startHour = dayjs().startOf('hour').add(1, 'hour');

    const data = forecastTemps.map((temp, index) => {
        const hour = startHour.add(index, 'hour').hour() + ":00";
        return { hour, temp }
    });

    return (
        <>
            <Chart
                height={250}
                width={870}
                data={data}
            >
                <AreaSeries
                    valueField="temp"
                    argumentField="hour"
                    color={"#f9f17a"}
                />
                <ArgumentAxis showTicks={false} showLine={false} />
                <ValueAxis showGrid={false} showLabels={true} indentFromAxis={5} />

                <LineSeries valueField="temp" argumentField="hour" color={"#ffcc00"} />
                <Title text="מזג אוויר יומי ב" />
            </Chart>
        </>
    );
}

export default TodayForecast;
