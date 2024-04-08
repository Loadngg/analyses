import { useState } from "react";
import {
	Button,
	FlatList,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Alert,
	TextInput,
} from "react-native";
import { Base } from "../components/Utils/Base";
import { Colors } from "../const";
import { Shadow } from "react-native-shadow-2";
import { TextButton } from "../components/Utils/TextButton";

import { IndicatorButton } from "../components/Home/IndicatorButton";

export const Home = ({ navigation }) => {
	const [data, setData] = useState([
		{ key: "Белок", value: "50мг" },
		{ key: "Холестерин", value: "50мг" },
		{ key: "Сахар", value: "50мг" },
		{ key: "Вес", value: "50мг" },
	]);

	const [modalVisible, setModalVisible] = useState(false);
	const [indicatorTitle, setIndicatorTitle] = useState("");

	const hideModal = () => {
		setIndicatorTitle("");
		setModalVisible(false);
	};

	const addIndicator = () => {
		if (indicatorTitle.length === 0) return Alert.alert("Ошибка", "Вы не ввели название категории");
		const existingObject = data.find((obj) => obj.key === indicatorTitle);
		if (existingObject) return Alert.alert("Ошибка", "Такая категория уже существует");
		setData([...data, { key: indicatorTitle, value: "" }]);
		hideModal();
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
							<TextButton text={"Добавить"} onPress={addIndicator} />
						</View>
					</Shadow>
				</View>
			</Modal>

			<FlatList
				contentContainerStyle={{ gap: 15 }}
				data={data}
				renderItem={({ item }) => (
					<IndicatorButton title={item.key} value={item.value} navigation={navigation} />
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
