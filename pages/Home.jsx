import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { IndicatorButton } from '../components/Home/IndicatorButton'
import { Base } from '../components/Utils/Base'
import { Loading } from '../components/Utils/Loading'
import { TextButton } from '../components/Utils/TextButton'
import { Colors } from '../const'
import { getIndicators, getIndicatorsItems, setIndicators, setIndicatorsItems } from '../storage/storage'

export const Home = ({ navigation }) => {
	const [data, setData] = useState([])
	const [indicatorValues, setIndicatorValues] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [modalButtonText, setModalButtonText] = useState('Добавить')
	const [modalVisible, setModalVisible] = useState(false)
	const [oldIndicatorTitle, setOldIndicatorTitle] = useState('')
	const [indicatorTitle, setIndicatorTitle] = useState('')
	const [unit, setUnit] = useState('')
	const [min, setMin] = useState('')
	const [max, setMax] = useState('')
	const isFocused = useIsFocused()

	const setIndicatorsData = async newData => {
		setData(newData)
		await setIndicators(newData)
	}

	const setIndicatorsValuesData = async newData => {
		setIndicatorValues(newData)
		await setIndicatorsItems(newData)
	}

	const getData = async () => {
		if (!isFocused) {
			setIsLoading(false)
			return
		}

		setIsLoading(true)
		const indicators = await getIndicators()
		const unsortedValues = await getIndicatorsItems()

		let values = []
		if (unsortedValues.length > 0) {
			values = unsortedValues.sort((a, b) => {
				const [dayA, monthA, yearA, hourA, minuteA, secondA] = a.key.split(/[\/\s:]/)
				const [dayB, monthB, yearB, hourB, minuteB, secondB] = b.key.split(/[\/\s:]/)
				const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA, secondA)
				const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB, secondB)
				return dateB - dateA
			})
		}

		setData(indicators)
		setIndicatorValues(values)
		setIsLoading(false)
	}

	useEffect(() => {
		getData()
	}, [isFocused])

	const valueRegex = /^\d+([.,]\d+)?$/

	const hideModal = () => {
		setIndicatorTitle('')
		setUnit('')
		setMin('')
		setMax('')
		setModalVisible(false)
	}

	const validateIndicator = () => {
		if (indicatorTitle.length === 0) return [Alert.alert('Ошибка', 'Вы не ввели название категории'), false]

		if (!valueRegex.test(min) || !valueRegex.test(max)) {
			return [
				Alert.alert(
					'Ошибка',
					'Мин. и Макс. могут содержать только целые значения, либо должны быть цифры до запятой и после'
				),
				false,
			]
		}

		return [null, true]
	}

	const addIndicator = () => {
		const [_, state] = validateIndicator()
		if (!state) return

		const existingObject = data.find(obj => obj.key === indicatorTitle)
		if (existingObject) return [Alert.alert('Ошибка', 'Такая категория уже существует'), false]

		setIndicatorsData([
			...data,
			{ key: indicatorTitle, unit: unit, min: min.replace(/,/g, '.'), max: max.replace(/,/g, '.') },
		])
		hideModal()
		Alert.alert('Успешно', 'Категория добавлена')
	}

	const deleteIndicator = key => {
		const updatedData = data.filter(item => item.key !== key)
		const updatedValues = indicatorValues.filter(item => item.title !== key)
		setIndicatorsData(updatedData)
		setIndicatorsValuesData(updatedValues)
	}

	const editIndicatorModal = key => {
		const indicator = data.find(obj => obj.key === key)
		setOldIndicatorTitle(indicator.key)
		setIndicatorTitle(indicator.key)
		setUnit(indicator.unit)
		setMin(indicator.min)
		setMax(indicator.max)

		setModalButtonText('Изменить')
		setModalVisible(true)
	}

	const editIndicator = () => {
		const index = data.findIndex(obj => obj.key === indicatorTitle)

		const [_, state] = validateIndicator()
		if (!state) return

		const existingObject = data.find(obj => obj.key === indicatorTitle && obj.key !== oldIndicatorTitle)
		if (existingObject) Alert.alert('Ошибка', 'Такая категория уже существует')

		data.splice(index, 1, {
			...data[index],
			...{ key: indicatorTitle, unit: unit, min: min.replace(/,/g, '.'), max: max.replace(/,/g, '.') },
		})

		const updatedValues = indicatorValues.map(item => {
			return {
				title: item.title === oldIndicatorTitle ? indicatorTitle : item.title,
				key: item.key,
				value: item.value,
			}
		})

		setIndicatorsData(data)
		setIndicatorsValuesData(updatedValues)
		hideModal()
		Alert.alert('Успешно', 'Изменения сохранены')
	}

	const deleteAlert = key => {
		Alert.alert(
			'Удалить',
			'Вы уверены, что хотите удалить эту категорию?',
			[
				{
					text: 'Отмена',
					style: 'cancel',
				},
				{
					text: 'Удалить',
					style: 'destructive',
					onPress: () => deleteIndicator(key),
				},
			],
			{ cancelable: true }
		)
	}

	const handleLongPress = key => {
		Alert.alert(
			'Что вы хотите сделать?',
			'Вы хотите удалить или редактировать эту категорию?',
			[
				{
					text: 'Отмена',
					style: 'cancel',
				},
				{
					text: 'Удалить',
					style: 'destructive',
					onPress: () => deleteAlert(key),
				},
				{
					text: 'Редактировать',
					style: 'default',
					onPress: () => editIndicatorModal(key),
				},
			],
			{ cancelable: true }
		)
	}

	const addButtonOnPress = () => {
		setModalButtonText('Добавить')
		setModalVisible(true)
	}

	if (isLoading) {
		return <Loading />
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
							<TextInput
								style={styles.modalInput}
								onChangeText={setIndicatorTitle}
								value={indicatorTitle}
								placeholder='Название категории'
							/>
							<TextInput
								style={styles.modalInput}
								onChangeText={setUnit}
								value={unit}
								placeholder='Единица измерения'
							/>
							<TextInput
								style={styles.modalInput}
								onChangeText={setMin}
								value={min}
								keyboardType='numeric'
								placeholder='Норма: минимум'
							/>
							<TextInput
								style={styles.modalInput}
								onChangeText={setMax}
								value={max}
								keyboardType='numeric'
								placeholder='Норма: максимум'
							/>
							<TextButton
								text={modalButtonText}
								onPress={modalButtonText === 'Добавить' ? addIndicator : editIndicator}
							/>
						</View>
					</Shadow>
				</View>
			</Modal>

			{data.length !== 0 ? (
				<FlatList
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}
					contentContainerStyle={{ gap: 15 }}
					data={data}
					renderItem={({ item }) => (
						<IndicatorButton
							onLongPress={() => handleLongPress(item.key)}
							title={item.key}
							values={indicatorValues}
							unit={item.unit}
							navigation={navigation}
						/>
					)}
				/>
			) : (
				<Text>Категорий не найдено. Создайте новую.</Text>
			)}

			<TextButton text={'Добавить'} onPress={addButtonOnPress} />
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
	modalInput: {
		width: 250,
		height: 50,
		borderRadius: 10,
		padding: 10,
		color: Colors.text,
		backgroundColor: Colors.primary,
	},
})
