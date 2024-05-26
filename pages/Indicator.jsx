import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { IndicatorItem } from '../components/Indicator/IndicatorItem'
import { Base } from '../components/Utils/Base'
import { TextButton } from '../components/Utils/TextButton'
import { Colors, NavEnum } from '../const'
import { setIndicatorsItems } from '../storage/storage'

export const Indicator = ({ route, navigation }) => {
	const { title, values, unit, openModal } = route.params

	const [data, setData] = useState(values)
	const [date, setDate] = useState(new Date())
	const setIndicatorsItemData = async newData => {
		newData = newData.sort((a, b) => {
			const [dayA, monthA, yearA, hourA, minuteA, secondA] = a.key.split(/[\/\s:]/)
			const [dayB, monthB, yearB, hourB, minuteB, secondB] = b.key.split(/[\/\s:]/)
			const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA, secondA)
			const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB, secondB)
			return dateB - dateA
		})
		setData(newData)
		await setIndicatorsItems(newData)
	}

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	}, [])

	const [modalVisible, setModalVisible] = useState(openModal)
	const [indicatorItemValue, setIndicatorItemValue] = useState('')

	const hideModal = () => {
		setIndicatorItemValue('')
		setModalVisible(false)
	}

	const addIndicatorItem = () => {
		if (indicatorItemValue.length === 0) return Alert.alert('Ошибка', 'Вы не ввели значение')
		const regex = /^\d+([.,]\d+)?$/
		if (!regex.test(indicatorItemValue))
			return Alert.alert(
				'Ошибка',
				'Значение может содержать только целые значения, либо должны быть цифры до запятой и после'
			)
		setIndicatorsItemData([
			...data,
			{
				title: title,
				key: moment(date).format('DD/MM/YY HH:mm:ss'),
				value: indicatorItemValue.replace(/,/g, '.'),
			},
		])
		hideModal()
		if (!openModal) return
		navigation.navigate(NavEnum.Home)
	}

	const deleteIndicatorItem = key => {
		const updatedData = data.filter(item => item.key !== key || item.title !== title)
		setIndicatorsItemData(updatedData)
	}

	const handleLongPress = item => {
		Alert.alert(
			'Удалить',
			`Вы уверены, что хотите удалить эту запись? ${item.key} ${item.value}`,
			[
				{
					text: 'Отмена',
					style: 'cancel',
				},
				{
					text: 'Удалить',
					style: 'destructive',
					onPress: () => deleteIndicatorItem(item.key),
				},
			],
			{ cancelable: true }
		)
	}

	const showDatepicker = () => {
		DateTimePickerAndroid.open({
			value: date,
			onChange: (_, selectedDate) => {
				setDate(selectedDate)
			},
			mode: 'date',
			is24Hour: true,
		})
	}

	return (
		<Base>
			<Modal
				animationType={'fade'}
				transparent={true}
				visible={modalVisible}
				onSwipeCancel={hideModal}
				onRequestClose={hideModal}
			>
				<View style={styles.modalContainer} onPress={hideModal}>
					<Shadow distance={7} startColor={Colors.shadow} containerViewStyle={{ marginVertical: 20 }} radius={10}>
						<View style={styles.modalView}>
							<Text style={styles.modalDate}>{moment(date).format('DD/MM/YY')}</Text>
							<TextButton text={'Выбрать дату'} onPress={showDatepicker} />
							<TextInput
								style={styles.modalInput}
								onChangeText={setIndicatorItemValue}
								value={indicatorItemValue}
								keyboardType='numeric'
								placeholder='Значение'
							/>
							<TextButton text={'Добавить'} onPress={addIndicatorItem} />
						</View>
					</Shadow>
				</View>
			</Modal>

			{data.length !== 0 ? (
				<FlatList
					contentContainerStyle={{ gap: 15 }}
					data={data.filter(value => value.title === title)}
					renderItem={({ item }) => (
						<IndicatorItem
							key={item.key}
							onLongPress={() => handleLongPress(item)}
							date={moment(item.key, 'DD/MM/YY HH:mm:ss').format('DD/MM/YY')}
							value={item.value + ' ' + unit}
						/>
					)}
				/>
			) : (
				<Text>Записей не найдено. Создайте новую.</Text>
			)}
			<TextButton text={'Добавить'} onPress={() => setModalVisible(true)} />
		</Base>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.shadow,
	},
	modalView: {
		backgroundColor: Colors.background,
		borderRadius: 20,
		padding: 35,
		gap: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalDate: {
		width: '100%',
		fontSize: 18,
	},
	modalInput: {
		width: 250,
		height: 50,
		borderRadius: 10,
		padding: 10,
		color: Colors.text,
		backgroundColor: Colors.primary,
	},
})
