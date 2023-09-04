import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        width: width * 0.42,
    },
    infoContainer: {
        paddingBottom: 15,
    },
    title: {
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: 1
    },
    value: {
        fontWeight: '600',
        letterSpacing: 1.5
    },
    buttonStyle: {
        borderRadius: 15,
        width: '90%'
    },
    titleButtonStyle: {
        fontSize: 14 ,
        letterSpacing: 0.5
    }
});