import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { IndicatorButton } from "../components/Home/IndicatorButton";
import { Base } from "../components/Utils/Base";
import { Loading } from "../components/Utils/Loading";
import { TextButton } from "../components/Utils/TextButton";
import { Colors } from "../const";
import { getIndicators, getIndicatorsItems, setIndicators, setIndicatorsItems } from "../storage/storage";

export const Home = ({ navigation }) => {
	const [data, setData] = useState([]);
	const [indicatorValues, setIndicatorValues] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const isFocused = useIsFocused();

	const setIndicatorsData = async (newData) => {
		setData(newData);
		await setIndicators(newData);
	};

	const setIndicatorsValuesData = async (newData) => {
		setIndicatorValues(newData);
		await setIndicatorsItems(newData);
	};

	const getData = async () => {
		if (!isFocused) {
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		const indicators = await getIndicators();
		const unsortedValues = await getIndicatorsItems();

		let values = [];
		if (unsortedValues.length > 0)
			values = unsortedValues.sort((a, b) => {
				const [dayA, monthA, yearA, hourA, minuteA, secondA] = a.key.split(/[\/\s:]/);
				const [dayB, monthB, yearB, hourB, minuteB, secondB] = b.key.split(/[\/\s:]/);
				const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA, secondA);
				const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB, secondB);
				return dateB - dateA;
			});
		setData(indicators);
		setIndicatorValues(values);
		setIsLoading(false);
	};

	useEffect(() => {
		getData();
	}, [isFocused]);

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
		const regex = /^\d+([.,]\d+)?$/;
		if (!regex.test(min) || !regex.test(max))
			return Alert.alert(
				"Ошибка",
				"Мин. и Макс. могут содержать только целые значения, либо должны быть цифры до запятой и после"
			);
		setIndicatorsData([
			...data,
			{ key: indicatorTitle, unit: unit, min: min.replace(/,/g, "."), max: max.replace(/,/g, ".") },
		]);
		hideModal();
	};

	const deleteIndicator = (key) => {
		const updatedData = data.filter((item) => item.key !== key);
		const updatedValues = indicatorValues.filter((item) => item.title !== key);
		setIndicatorsData(updatedData);
		setIndicatorsValuesData(updatedValues);
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

	if (isLoading) {
		return <Loading />;
	}

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

			{data.length !== 0 ? (
				<FlatList
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}
					contentContainerStyle={{ gap: 15 }}
					data={data}
					renderItem={({ item }) => (
						<IndicatorButton
							onLongPress={() => handleLongPress(item.key)}
							title={item.key}
							values={indicatorValues}
							unit={item.unit}
							navigation={navigation}
						/>
					)}
				/>
			) : (
				<Text>Категорий не найдено. Создайте новую.</Text>
			)}

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
