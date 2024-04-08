import { Button, FlatList } from "react-native";
import { IndicatorItem } from "../components/Indicator/IndicatorItem";
import { Base } from "../components/Utils/Base";

export const Indicator = () => {
	return (
		<Base>
			<FlatList
				contentContainerStyle={{ gap: 15 }}
				data={[
					{ key: "08/04/2024", value: "45.7мг" },
					{ key: "07/04/2024", value: "45.7мг" },
					{ key: "06/04/2024", value: "45.7мг" },
					{ key: "05/04/2024", value: "45.7мг" },
					{ key: "04/04/2024", value: "45.7мг" },
					{ key: "03/04/2024", value: "45.7мг" },
					{ key: "02/04/2024", value: "45.7мг" },
					{ key: "01/04/2024", value: "45.7мг" },
					{ key: "31/03/2024", value: "45.7мг" },
					{ key: "30/03/2024", value: "45.7мг" },
					{ key: "29/03/2024", value: "45.7мг" },
					{ key: "28/03/2024", value: "45.7мг" },
					{ key: "27/03/2024", value: "45.7мг" },
				]}
				renderItem={({ item }) => <IndicatorItem date={item.key} value={item.value} />}
			/>
			<Button title="Добавить" />
		</Base>
	);
};
