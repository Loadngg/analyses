import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const BaseView = styled.View`
	flex: 1;
	gap: 20px;
	padding: 15px;
`;

export const Base = ({ children }) => {
	return (
		<BaseView>
			{children}
			<StatusBar theme="auto" />
		</BaseView>
	);
};
