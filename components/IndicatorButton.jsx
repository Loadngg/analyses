import styled from "styled-components/native";

const IndicatorButtonView = styled.Pressable`
	padding: 15px;
	background-color: ${(props) => (props.$pressed ? "#acacac" : "#dfdfdf")};
	border-radius: 10px;
`;

const IndicatorButtonText = styled.Text`
	font-size: 20px;
	font-weight: bold;
`;

export const IndicatorButton = ({ title, navigation, navigateTo }) => {
	return (
		<IndicatorButtonView onPress={() => navigation.navigate(navigateTo)} $pressed>
			<IndicatorButtonText>{title}</IndicatorButtonText>
		</IndicatorButtonView>
	);
};
