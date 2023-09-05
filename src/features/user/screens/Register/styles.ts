import { Colors } from "constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 28,
        paddingVertical: 20
    },
    content: {
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 30,
    },
    buttonStyle: {
        width: '70%',
        padding: 5,
        backgroundColor: Colors.Secondary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        color: Colors.Primary
    }
})