import { useEffect } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export const ChartScreen = ({ route, navigation }) => {
	const { data, title } = route.params;

	useEffect(() => {
		navigation.setOptions({
			title: `Динамика: ${title}`,
		});
	}, []);

	const chartData = {
		labels: [data.map((item) => item.key)],
		datasets: [
			{
				data: [1, 8, 3, 4, 19, 6],
			},
			{
				data: [6, 6, 6, 6, 6, 6],
			},
			{
				data: [30, 30, 30, 30, 30, 30],
			},
		],
	};

	const chartConfig = {
		backgroundGradientFrom: "#ffffff",
		backgroundGradientTo: "#ffffff",
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	};

	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;

	return (
		<LineChart
			data={data}
			width={screenWidth}
			height={screenHeight}
			chartConfig={chartConfig}
			bezier
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
		/>
	);
};
