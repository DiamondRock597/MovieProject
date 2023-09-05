import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "constants/colors";

export const BackButton: React.FC = () => {
    const navigation = useNavigation();

    const goBack = useCallback(() => navigation.goBack(), [navigation]);

    return <Ionicons onPress={goBack} name="arrow-back-sharp" size={35} color={Colors.Secondary} />;
};