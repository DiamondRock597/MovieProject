import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { BottomSheet, Input, ListItem } from '@rneui/base'
import { SearchMethod } from 'constants/searchMethod'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles'

const list = [
    { title: SearchMethod.Title },
    { title: SearchMethod.Actor },
    { title: SearchMethod.Default }
]

interface SearchInputProps {
    selectedMethod: SearchMethod;
    onChangeText: (text: string) => void;
    setSelectedMethod: (value: SearchMethod) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ selectedMethod, setSelectedMethod, onChangeText }) => {
    const [isVisible, setIsVisible] = useState(false);

    const formatRightIcon = useMemo(() => (
        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.methodController}>
            <Text>{selectedMethod}</Text>
            <Ionicons name="caret-down" size={15} color="black" />
        </TouchableOpacity>
    ), [setIsVisible, selectedMethod]);

    const changeSelectedMethod = useCallback((value: SearchMethod) => () => {
        setSelectedMethod(value);
        setIsVisible(false);
    }, [setSelectedMethod, setIsVisible]);

    return (
        <View style={styles.container}>
            <Input rightIcon={formatRightIcon} placeholder='Search' onChangeText={onChangeText} />
            <BottomSheet isVisible={isVisible}>
                {list.map((method) => (
                    <ListItem key={`MethodItem-${method.title}`} onPress={changeSelectedMethod(method.title)} >
                        <ListItem.Content>
                            <ListItem.Title>{method.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </View>
    )
}
