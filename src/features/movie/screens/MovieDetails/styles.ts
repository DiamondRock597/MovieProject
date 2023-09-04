import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.4,
    },
    headerTitle: {
        fontSize: 24,
        letterSpacing: 1,
        fontWeight: '400',
        width: '70%'
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    contentContainer: {
        flexGrow: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    sectionTitle: {
        fontSize: 22,
        letterSpacing: 1.2,
    },
    detailsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        lineHeight: 30,
        letterSpacing: 1
    },
    value: {
        fontWeight: '600',
        letterSpacing: 1.5
    },
    image: {
        width: '100%',
        height: '30%'
    }
})