import { useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, TextInput, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Base } from "../components/Utils/Base";
import { TextButton } from "../components/Utils/TextButton";
import { Colors } from "../const";
import { IndicatorButton } from "../components/Home/IndicatorButton";

export const Home = ({ navigation }) => {
	const [data, setData] = useState([
		{ key: "Белок", value: "50", unit: "мг", min: "0", max: "100" },
		{ key: "Холестерин", value: "50", unit: "мг", min: "0", max: "100" },
		{ key: "Сахар", value: "50", unit: "мг", min: "0", max: "100" },
		{ key: "Вес", value: "50", unit: "мг", min: "0", max: "100" },
	]);

	const [modalVisible, setModalVisible] = useState(false);
	const [indicatorTitle, setIndicatorTitle] = useState("");
	const [unit, setUnit] = useState("");
	const [min, setMin] = useState("");
	const [max, setMax] = useState("");

	const hideModal = () => {
		setIndicatorTitle("");
		setUnit("");
		setMin("");
		setMax("");
		setModalVisible(false);
	};

	const addIndicator = () => {
		if (indicatorTitle.length === 0) return Alert.alert("Ошибка", "Вы не ввели название категории");
		const existingObject = data.find((obj) => obj.key === indicatorTitle);
		if (existingObject) return Alert.alert("Ошибка", "Такая категория уже существует");
		setData([...data, { key: indicatorTitle, value: "", unit: unit, min: min, max: max }]);
		hideModal();
	};

	const deleteIndicator = (key) => {
		const updatedData = data.filter((item) => item.key !== key);
		setData(updatedData);
	};

	const handleLongPress = (key) => {
		Alert.alert(
			"Удалить",
			"Вы уверены, что хотите удалить эту категорию?",
			[
				{
					text: "Отмена",
					style: "cancel",
				},
				{
					text: "Удалить",
					style: "destructive",
					onPress: () => deleteIndicator(key),
				},
			],
			{ cancelable: true }
		);
	};

	return (
		<Base>
			<Modal
				animationType={"fade"}
				transparent={true}
				visible={modalVisible}
				onSwipeCancel={hideModal}
				onRequestClose={hideModal}
			>
				<View style={styles.modalContainer} onPress={hideModal}>
					<Shadow
						distance={7}
						startColor={Colors.shadow}
						containerViewStyle={{ marginVertical: 20 }}
						radius={10}
					>
						<View style={styles.modalView}>
							<TextInput
								style={styles.modalInput}
								onChangeText={setIndicatorTitle}
								value={indicatorTitle}
								placeholder="Название категории"
							/>
							<TextInput
								style={styles.modalInput}
								onChangeText={setUnit}
								value={unit}
								placeholder="Единица измерения"
							/>
							<TextInput
								style={styles.modalInput}
								onChangeText={setMin}
								value={min}
								keyboardType="numeric"
								placeholder="Норма: минимум"
							/>
							<TextInput
								style={styles.modalInput}
								onChangeText={setMax}
								value={max}
								keyboardType="numeric"
								placeholder="Норма: максимум"
							/>
							<TextButton text={"Добавить"} onPress={addIndicator} />
						</View>
					</Shadow>
				</View>
			</Modal>

			<FlatList
				contentContainerStyle={{ gap: 15 }}
				data={data}
				renderItem={({ item }) => (
					<IndicatorButton
						onLongPress={() => handleLongPress(item.key)}
						title={item.key}
						value={item.value}
						unit={item.unit}
						navigation={navigation}
					/>
				)}
			/>
			<TextButton text={"Добавить"} onPress={() => setModalVisible(true)} />
		</Base>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.shadow,
	},
	modalView: {
		backgroundColor: Colors.background,
		borderRadius: 20,
		padding: 35,
		gap: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	modalInput: {
		width: 250,
		height: 50,
		borderRadius: 10,
		padding: 10,
		color: Colors.text,
		backgroundColor: Colors.primary,
	},
});
