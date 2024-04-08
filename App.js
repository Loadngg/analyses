import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "./components/Utils/IconButton";
import ChartIcon from "./components/icons/ChartIcon";
import { Colors, NavEnum } from "./const";
import { Home } from "./pages/Home";
import { Indicator } from "./pages/Indicator";

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
									// color={{ backgroundColor: "#bcd7ff" }}
									onPress={() => navigation.navigate(NavEnum.Indicator)}
								/>
							),
						})}
					/>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
