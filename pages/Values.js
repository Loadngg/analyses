import { Button, StyleSheet, Text, View } from "react-native";

function Values({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Значение</Text>
			<Button title="Перейти к графику" onPress={() => navigation.navigate("Chart")} />
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

export default Values;
