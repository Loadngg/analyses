import moment from "moment";
import { useEffect, useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import ChartIcon from "../components/icons/ChartIcon";
import { IndicatorItem } from "../components/Indicator/IndicatorItem";
import { Base } from "../components/Utils/Base";
import { IconButton } from "../components/Utils/IconButton";
import { TextButton } from "../components/Utils/TextButton";
import { Colors, NavEnum } from "../const";
import { setIndicatorsItems } from "../storage/storage";

export const Indicator = ({ route, navigation }) => {
	const { title, values, unit, openModal } = route.params;

	const [data, setData] = useState(values);
	const setIndicatorsItemData = async (newData) => {
		newData = newData.sort((a, b) => {
			const [dayA, monthA, yearA, hourA, minuteA, secondA] = a.key.split(/[\/\s:]/);
			const [dayB, monthB, yearB, hourB, minuteB, secondB] = b.key.split(/[\/\s:]/);
			const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA, secondA);
			const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB, secondB);
			return dateB - dateA;
		});
		setData(newData);
		await setIndicatorsItems(newData);
	};

	useEffect(() => {
		navigation.setOptions({
			title,
			headerRight: () => (
				<IconButton
					icon={<ChartIcon />}
					onPress={() =>
						navigation.navigate(NavEnum.Chart, {
							data: data.filter((value) => value.title === title),
							title: title,
						})
					}
				/>
			),
		});
	}, []);

	const [modalVisible, setModalVisible] = useState(openModal);
	const [indicatorItemValue, setIndicatorItemValue] = useState("");

	const hideModal = () => {
		setIndicatorItemValue("");
		setModalVisible(false);
	};

	const addIndicatorItem = () => {
		if (indicatorItemValue.length === 0) return Alert.alert("Ошибка", "Вы не ввели значение");
		setIndicatorsItemData([
			...data,
			{ title: title, key: moment().format("DD/MM/YY HH:mm:ss"), value: indicatorItemValue },
		]);
		hideModal();
		if (!openModal) return;
		navigation.navigate(NavEnum.Home);
	};

	const deleteIndicatorItem = (key) => {
		const updatedData = data.filter((item) => item.key !== key && item.title !== title);
		setIndicatorsItemData(updatedData);
	};

	const handleLongPress = (key) => {
		Alert.alert(
			"Удалить",
			"Вы уверены, что хотите удалить эту запись?",
			[
				{
					text: "Отмена",
					style: "cancel",
				},
				{
					text: "Удалить",
					style: "destructive",
					onPress: () => deleteIndicatorItem(key),
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
								onChangeText={setIndicatorItemValue}
								value={indicatorItemValue}
								keyboardType="numeric"
								placeholder="Значение"
							/>
							<TextButton text={"Добавить"} onPress={addIndicatorItem} />
						</View>
					</Shadow>
				</View>
			</Modal>

			{data.length !== 0 ? (
				<FlatList
					contentContainerStyle={{ gap: 15 }}
					data={data.filter((value) => value.title === title)}
					renderItem={({ item }) => (
						<IndicatorItem
							onLongPress={() => handleLongPress(item.key)}
							date={moment().format("DD/MM/YY HH:mm")}
							value={item.value + " " + unit}
						/>
					)}
				/>
			) : (
				<Text>Записей не найдено. Создайте новую.</Text>
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
