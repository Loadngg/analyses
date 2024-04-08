import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "./components/Utils/IconButton";
import ChartIcon from "./components/icons/ChartIcon";
import { Colors, NavEnum } from "./const";
import { Home } from "./pages/Home";
import { Indicator } from "./pages/Indicator";
import { Chart } from "./pages/Chart";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Group screenOptions={{ headerStyle: { backgroundColor: Colors.background } }}>
					<Stack.Screen name={NavEnum.Home} component={Home} />
					<Stack.Screen
						name={NavEnum.Indicator}
						component={Indicator}
						options={({ navigation }) => ({
							headerRight: () => (
								<IconButton
									icon={<ChartIcon />}
									onPress={() => navigation.navigate(NavEnum.Chart)}
								/>
							),
						})}
					/>
					<Stack.Screen name={NavEnum.Chart} component={Chart} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
