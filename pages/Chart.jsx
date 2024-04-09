import { useEffect } from "react";
import { Text, View } from "react-native";

export const Chart = ({ route, navigation }) => {
	const { title } = route.params;

	useEffect(() => {
		navigation.setOptions({
			title: `Динамика: ${title}`,
		});
	}, []);

	return (
		<View>
			<Text>Страница с графиком</Text>
		</View>
	);
};
