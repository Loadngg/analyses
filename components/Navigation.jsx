import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors, NavEnum } from "../const";
import { Home } from "../pages/Home";
import { Indicator } from "../pages/Indicator";
import { ChartScreen } from "../pages/Chart";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Group screenOptions={{ headerStyle: { backgroundColor: Colors.background } }}>
					<Stack.Screen name={NavEnum.Home} component={Home} />
					<Stack.Screen name={NavEnum.Indicator} component={Indicator} />
					<Stack.Screen name={NavEnum.Chart} component={ChartScreen} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
