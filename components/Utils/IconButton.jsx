import { Pressable, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "../../const";

export const IconButton = ({ icon, color, onPress }) => {
	return (
		<Shadow distance={5} startColor={Colors.shadow} containerViewStyle={{ marginVertical: 20 }} radius={5}>
			<Pressable style={[styles.iconButton, color]} onPress={onPress}>
				{icon}
			</Pressable>
		</Shadow>
	);
};

const styles = StyleSheet.create({
	iconButton: {
		padding: 5,
		borderRadius: 5,
		width: 35,
		height: 35,
		backgroundColor: Colors.primary,
	},
});
