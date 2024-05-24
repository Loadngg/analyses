import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../const'

export const TextButton = ({ text, ...props }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} {...props}>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
		borderRadius: 10,
		backgroundColor: Colors.blue,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: Colors.primary,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		padding: 10,
	},
})
