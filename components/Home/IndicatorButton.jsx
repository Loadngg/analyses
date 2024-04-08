import { Pressable, StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import ChartIcon from "../icons/ChartIcon";
import AddIcon from "../icons/AddIcon";
import ClearIcon from "../icons/ClearIcon";
import { IconButton } from "../Utils/IconButton";
import { Colors } from "../../const";

export const IndicatorButton = ({ title, value, navigation, navigateTo }) => {
	return (
		<Shadow
			style={{ width: "100%" }}
			distance={2}
			startColor={Colors.shadow}
			containerViewStyle={{ marginVertical: 20 }}
			radius={10}
		>
			<Pressable style={styles.view} onPress={() => navigation.navigate(navigateTo)}>
				<View style={styles.container}>
					<Text style={styles.text}>{title}:</Text>
					<Text style={styles.value}>{value}</Text>
				</View>
				<View style={styles.buttons}>
					<IconButton icon={<AddIcon />} color={{ backgroundColor: "#b9f5d9" }} />
					<IconButton icon={<ChartIcon />} color={{ backgroundColor: "#bcd7ff" }} />
					<IconButton icon={<ClearIcon />} color={{ backgroundColor: "#f5afb6" }} />
				</View>
			</Pressable>
		</Shadow>
	);
};

const styles = StyleSheet.create({
	view: {
		padding: 15,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.text,
	},
	value: {
		fontSize: 16,
		color: Colors.secondary,
	},
	buttons: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
});
