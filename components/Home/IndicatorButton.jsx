import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Shadow} from "react-native-shadow-2";
import {Colors, NavEnum} from "../../const";
import AddIcon from "../icons/AddIcon";
import ChartIcon from "../icons/ChartIcon";
import {IconButton} from "../Utils/IconButton";

export const IndicatorButton = ({title, values, unit, navigation, onLongPress}) => {
    const data = values.filter((value) => value.title === title);
    return (
        <Shadow
            style={{width: "100%"}}
            distance={2}
            startColor={Colors.shadow}
            containerViewStyle={{marginVertical: 20}}
            radius={10}
        >
            <TouchableOpacity
                onLongPress={onLongPress}
                style={styles.view}
                onPress={() => navigation.navigate(NavEnum.Indicator, {title, values, unit, openModal: false})}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>{title}</Text>
                    {data.length !== 0 ? (
                        <View>
                            <Text style={[styles.value, styles.last]}>
                                {data[0].value} {unit}
                            </Text>
                            {data.length > 1 ? (
                                <Text style={[styles.value, styles.prev]}>{data[1].value + " " + unit}</Text>
                            ) : (
                                <></>
                            )}
                        </View>
                    ) : (
                        <Text style={[styles.value, styles.last]}>Записей нет</Text>
                    )}
                </View>
                <View style={styles.buttons}>
                    <IconButton
                        icon={<ChartIcon/>}
                        onPress={() => navigation.navigate(NavEnum.Chart, {data: data, title: title})}
                    />
                    <IconButton
                        icon={<AddIcon/>}
                        onPress={() => navigation.navigate(NavEnum.Indicator, {title, values, unit, openModal: true})}
                    />
                </View>
            </TouchableOpacity>
        </Shadow>
    );
};

const styles = StyleSheet.create({
    view: {
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        flexDirection: "column",
        gap: 5,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    text: {
        fontSize: 19,
        fontWeight: "bold",
        color: Colors.text,
    },
    value: {
        color: Colors.secondary,
    },
    last: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.blue,
    },
    prev: {
        fontSize: 13,
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
});
