import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./pages/Home";
import { Indicator } from "./pages/Indicator";
import { NavEnum } from "./const";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name={NavEnum.Home} component={Home} />
				<Stack.Screen name={NavEnum.Indicator} component={Indicator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
