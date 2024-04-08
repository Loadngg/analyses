import { Button, FlatList } from "react-native";
import { IndicatorButton } from "../components/IndicatorButton";
import { Base } from "../components/Base";

export const Home = ({ navigation }) => {
	return (
		<Base>
			<FlatList
				contentContainerStyle={{ gap: 15 }}
				data={[{ key: "Белок" }, { key: "Холестерин" }, { key: "Сахар" }, { key: "Вес" }]}
				renderItem={({ item }) => (
					<IndicatorButton title={item.key} navigation={navigation} navigateTo={"Показатель"} />
				)}
			/>
			<Button title="Добавить" />
		</Base>
	);
};
