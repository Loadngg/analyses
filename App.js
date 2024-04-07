import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Values from "./pages/Values";
import Chart from "./pages/Chart";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Values" component={Values} />
				<Stack.Screen name="Chart" component={Chart} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
