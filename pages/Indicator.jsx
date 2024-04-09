import { useEffect, useState } from "react";
import { Alert, FlatList, Modal, StyleSheet, TextInput, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import ChartIcon from "../components/icons/ChartIcon";
import { IndicatorItem } from "../components/Indicator/IndicatorItem";
import { Base } from "../components/Utils/Base";
import { IconButton } from "../components/Utils/IconButton";
import { TextButton } from "../components/Utils/TextButton";
import { Colors, NavEnum } from "../const";
import moment from "moment";

export const Indicator = ({ route, navigation }) => {
	const { title } = route.params;

	useEffect(() => {
		navigation.setOptions({
			title,
			headerRight: () => (
				<IconButton icon={<ChartIcon />} onPress={() => navigation.navigate(NavEnum.Chart, { title })} />
			),
		});
	}, []);

	const [data, setData] = useState([
		{ key: "27/03/24 10:00", value: "45.7мг" },
		{ key: "28/03/24 10:00", value: "45.7мг" },
		{ key: "29/03/24 10:00", value: "45.7мг" },
		{ key: "30/03/24 10:00", value: "45.7мг" },
		{ key: "31/03/24 10:00", value: "45.7мг" },
		{ key: "01/04/24 10:00", value: "45.7мг" },
		{ key: "02/04/24 10:00", value: "45.7мг" },
		{ key: "03/04/24 10:00", value: "45.7мг" },
		{ key: "04/04/24 10:00", value: "45.7мг" },
		{ key: "05/04/24 10:00", value: "45.7мг" },
		{ key: "06/04/24 10:00", value: "45.7мг" },
		{ key: "07/04/24 10:00", value: "45.7мг" },
		{ key: "08/04/24 10:00", value: "45.7мг" },
	]);

	const [modalVisible, setModalVisible] = useState(false);
	const [indicatorItemValue, setIndicatorItemValue] = useState("");

	const hideModal = () => {
		setIndicatorItemValue("");
		setModalVisible(false);
	};

	const addIndicatorItem = () => {
		if (indicatorItemValue.length === 0) return Alert.alert("Ошибка", "Вы не ввели значение");
		setData([...data, { key: moment().format("DD/MM/YY HH:mm"), value: indicatorItemValue }]);
		hideModal();
	};

	const deleteIndicatorItem = (key) => {
		const updatedData = data.filter((item) => item.key !== key);
		setData(updatedData);
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

	const sortedData = data.sort((a, b) => {
		const [dayA, monthA, yearA, hourA, minuteA] = a.key.split(/[\/\s:]/);
		const [dayB, monthB, yearB, hourB, minuteB] = b.key.split(/[\/\s:]/);
		const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA);
		const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB);
		return dateB - dateA;
	});

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
								placeholder="Название категории"
							/>
							<TextButton text={"Добавить"} onPress={addIndicatorItem} />
						</View>
					</Shadow>
				</View>
			</Modal>
			<FlatList
				contentContainerStyle={{ gap: 15 }}
				data={sortedData}
				renderItem={({ item }) => (
					<IndicatorItem onLongPress={() => handleLongPress(item.key)} date={item.key} value={item.value} />
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
