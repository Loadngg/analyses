import { useState } from "react";
import { Button, FlatList } from "react-native";
import { Base } from "../components/Utils/Base";
import { IndicatorButton } from "../components/Home/IndicatorButton";

export const Home = ({ navigation }) => {
	const [data, setData] = useState([
		{ key: "Белок", value: "50мг" },
		{ key: "Холестерин", value: "50мг" },
		{ key: "Сахар", value: "50мг" },
		{ key: "Вес", value: "50мг" },
	]);
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<Base>
			<FlatList
				contentContainerStyle={{ gap: 15 }}
				data={data}
				renderItem={({ item }) => (
					<IndicatorButton
						title={item.key}
						value={item.value}
						navigation={navigation}
						navigateTo={"Показатель"}
						style={{ elevation: 2, backgroundColor: "red" }}
					/>
				)}
			/>
			<Button
				title="Добавить"
				onPress={() => {
					setData([...data, { key: "Белок", value: "50мг" }]);
				}}
			/>
		</Base>
	);
};
