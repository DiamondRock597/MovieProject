import { Colors } from "constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 40
    },
    headerTitle: {
        fontSize: 22,
        letterSpacing: 1,
        fontWeight: '500'
    },
    title: {
        fontSize: 18,
        letterSpacing: 1,
        fontWeight: '400'
    },
    uploadButton: {
        borderRadius: 10,
        marginVertical: 15
    },
    submitButton: {
        borderRadius: 10,
        borderColor: Colors.Secondary,
    },
    submitButtonTitle: {
        color: Colors.Secondary
    }
});