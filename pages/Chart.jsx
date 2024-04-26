import moment from "moment";
import {useEffect, useState} from "react";
import {Dimensions, StatusBar} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {Base} from "../components/Utils/Base";
import {getIndicators} from "../storage/storage";

export const ChartScreen = ({route, navigation}) => {
    const {data, title} = route.params;
    const [dates, setDates] = useState([""]);
    const [values, setValues] = useState([0]);
    const [min, setMin] = useState([0]);
    const [max, setMax] = useState([0]);

    useEffect(() => {
        const reversed = data.reverse();
        const dates = reversed.map((item) => moment(item.key, "DD/MM/YY HH:mm:ss").format("DD/MM/YY"));
        setDates(dates);

        const values = reversed.map((item) => parseFloat(item.value));
        setValues(values);

        const fetchIndicators = async () => {
            let res = await getIndicators();
            res = res.find((item) => item.key === title);

            const min = dates.map((_) => parseFloat(res.min));
            setMin(min);

            const max = dates.map((_) => parseFloat(res.max));
            setMax(max);
        };

        fetchIndicators();

        navigation.setOptions({
            title: `Динамика: ${title}`,
        });
    }, []);

    const chartData = {
        labels: dates,
        datasets: [
            {
                data: values,
                strokeWidth: 2,
            },
            {
                data: min,
                color: (opacity = 1) => `rgba(76, 187, 23, ${opacity})`,
                strokeWidth: 3,
            },
            {
                data: max,
                color: (opacity = 1) => `rgba(255, 43, 43, ${opacity})`,
                strokeWidth: 3,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };

    const screenWidth = Dimensions.get("window").width - 30;
    const screenHeight = Dimensions.get("window").height - StatusBar.currentHeight - 30;

    return (
        <Base>
            <LineChart
                data={chartData}
                width={screenWidth}
                height={screenHeight}
                chartConfig={chartConfig}
                withShadow={false}
                bezier
                style={{
                    borderRadius: 16,
                }}
            />
        </Base>
    );
};
