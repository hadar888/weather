import './App.css';
import { ArgumentAxis, ValueAxis, Chart, LineSeries, Title, AreaSeries }
    from '@devexpress/dx-react-chart-material-ui';

interface ForecastChartProps {
    data: any[];
    title: string;
}

function ForecastChart(props: ForecastChartProps) {
    const { data, title } = props;

    return (
        <>
            <Chart
                height={250}
                width={870}
                data={data}
            >
                <AreaSeries
                    valueField="temp"
                    argumentField="time"
                    color={"#f9f17a"}
                />
                <ArgumentAxis showTicks={false} showLine={false} tickSize={1}/>
                <ValueAxis showGrid={false} showLabels={true} indentFromAxis={5} />

                <LineSeries valueField="temp" argumentField="time" color={"#ffcc00"} />
                <Title text={title} />
            </Chart>
        </>
    );
}

export default ForecastChart;
