import { Button, StyleSheet, Text, View } from "react-native";

function Home({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Главный экран</Text>
			<Button title="Перейти к значению" onPress={() => navigation.navigate("Values")} />
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

export default Home;
