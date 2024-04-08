import { Pressable, StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import ChartIcon from "../icons/ChartIcon";
import AddIcon from "../icons/AddIcon";
import { IconButton } from "../Utils/IconButton";
import { Colors, NavEnum } from "../../const";

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
					<Text style={styles.text}>{title}</Text>
					<View>
						<Text style={[styles.value, styles.last]}>{value}</Text>
						<Text style={[styles.value, styles.prev]}>{value}</Text>
					</View>
				</View>
				<View style={styles.buttons}>
					<IconButton icon={<ChartIcon />} onPress={() => navigation.navigate(NavEnum.Chart)}/>
					<IconButton icon={<AddIcon />} />
				</View>
			</Pressable>
		</Shadow>
	);
};

const styles = StyleSheet.create({
	view: {
		padding: 10,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		flexDirection: "column",
		gap: 5,
		alignItems: "flex-start",
		justifyContent: "center"
	},
	text: {
		fontSize: 19,
		fontWeight: "bold",
		color: Colors.text,
	},
	value: {
		color: Colors.secondary,
	},
	last: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#00a0ff",
	},
	prev: {
		fontSize: 13,
	},
	buttons: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
});
