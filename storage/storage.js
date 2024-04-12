import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const setIndicators = async (indicators) => {
	try {
		const jsonIndicators = JSON.stringify(indicators);
		await AsyncStorage.setItem("indicators", jsonIndicators);
	} catch (error) {
		Alert.alert("Error storing indicators:", error.message);
	}
};

const getIndicators = async () => {
	try {
		const jsonIndicators = await AsyncStorage.getItem("indicators");
		return jsonIndicators != null ? JSON.parse(jsonIndicators) : [];
	} catch (error) {
		Alert.alert("Error getting indicators:", error.message);
	}
};

const setIndicatorsItems = async (indicatorItems) => {
	try {
		const jsonIndicatorItems = JSON.stringify(indicatorItems);
		await AsyncStorage.setItem("indicatorItems", jsonIndicatorItems);
	} catch (error) {
		Alert.alert("Error storing indicatorItems:", error.message);
	}
};

const getIndicatorsItems = async () => {
	try {
		const jsonIndicatorItems = await AsyncStorage.getItem("indicatorItems");
		return jsonIndicatorItems != null ? JSON.parse(jsonIndicatorItems) : [];
	} catch (error) {
		Alert.alert("Error getting indicatorItems:", error.message);
	}
};

module.exports = { setIndicators, getIndicators, setIndicatorsItems, getIndicatorsItems };
