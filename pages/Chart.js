import { StyleSheet, Text, View } from "react-native";

function Chart() {
	return (
		<View style={styles.container}>
			<Text>График</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Chart;
