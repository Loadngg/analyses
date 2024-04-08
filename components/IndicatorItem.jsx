import styled from "styled-components/native";

const IndicatorItemView = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 5px;
`;

const IndicatorItemDate = styled.Text`
	font-size: 18px;
	font-weight: 700;
`;

const IndicatorItemValue = styled.Text`
	font-size: 16px;
`;

export const IndicatorItem = ({ date, value }) => {
	return (
		<IndicatorItemView>
			<IndicatorItemDate>{date}:</IndicatorItemDate>
			<IndicatorItemValue>{value}</IndicatorItemValue>
		</IndicatorItemView>
	);
};
