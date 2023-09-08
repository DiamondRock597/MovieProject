import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { Input } from '@rneui/base'
import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';

interface ActorsInputProps {
    actors: Array<string>;
    addActorInList: (value: string) => void;
}

export const ActorsInput: React.FC<ActorsInputProps> = ({ actors, addActorInList }) => {
    const [actorName, setActorName] = useState('');

    const onPress = useCallback(() => addActorInList(actorName), [addActorInList, actorName]);

    const rightIcon = useMemo(() => <Entypo onPress={onPress} name="plus" size={24} color="black" />, [onPress]);

    return (
        <>
            <Input
                value={actorName}
                onChangeText={setActorName}
                label='Actor'
                rightIcon={rightIcon}
                keyboardType='name-phone-pad'
            />
            <Text style={styles.title}>Actor's list:</Text>
            <FlatList
                style={styles.listContainer}
                data={actors}
                contentContainerStyle={styles.listContentContainer}
                keyExtractor={(item) => `AddedActor-${item}`}
                renderItem={({ item }) => <Text style={styles.listItemTitle}>{item}</Text>}
            />
        </>
    )
}