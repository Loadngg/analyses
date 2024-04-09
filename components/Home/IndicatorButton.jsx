import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Colors, NavEnum } from "../../const";
import AddIcon from "../icons/AddIcon";
import ChartIcon from "../icons/ChartIcon";
import { IconButton } from "../Utils/IconButton";

export const IndicatorButton = ({ title, value, unit, navigation, onLongPress }) => {
	return (
		<Shadow
			style={{ width: "100%" }}
			distance={2}
			startColor={Colors.shadow}
			containerViewStyle={{ marginVertical: 20 }}
			radius={10}
		>
			<TouchableOpacity
				onLongPress={onLongPress}
				style={styles.view}
				onPress={() => navigation.navigate(NavEnum.Indicator, { title, unit })}
			>
				<View style={styles.container}>
					<Text style={styles.text}>{title}</Text>
					<View>
						<Text style={[styles.value, styles.last]}>
							{value} {unit}
						</Text>
						<Text style={[styles.value, styles.prev]}>
							{value} {unit}
						</Text>
					</View>
				</View>
				<View style={styles.buttons}>
					<IconButton icon={<ChartIcon />} onPress={() => navigation.navigate(NavEnum.Chart, { title })} />
					<IconButton icon={<AddIcon />} />
				</View>
			</TouchableOpacity>
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
		justifyContent: "center",
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
		color: Colors.blue,
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
