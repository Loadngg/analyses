import { StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "../../const";

export const IndicatorItem = ({ date, value }) => {
	return (
		<Shadow
			style={{ width: "100%" }}
			distance={2}
			startColor={Colors.shadow}
			containerViewStyle={{ marginVertical: 20 }}
			radius={10}
		>
			<View style={styles.view}>
				<Text style={styles.date}>{date}:</Text>
				<Text style={styles.value}>{value}</Text>
			</View>
		</Shadow>
	);
};

const styles = StyleSheet.create({
	view: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		padding: 15,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	date: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.text,
	},
	value: {
		fontSize: 16,
		color: Colors.secondary,
	},
});