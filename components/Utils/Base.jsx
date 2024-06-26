import { StyleSheet, View } from 'react-native'
import { Colors } from '../../const'

export const Base = ({ children }) => {
	return <View style={styles.baseView}>{children}</View>
}

const styles = StyleSheet.create({
	baseView: {
		flex: 1,
		gap: 20,
		padding: 15,
		backgroundColor: Colors.background,
	},
})
