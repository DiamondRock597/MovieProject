import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

import { Movie } from 'models/movie';
import { Colors } from 'constants/colors';

import { styles } from './styles';
import { RootNavigationProp, RootStackRoutes } from 'navigation/types';

interface MovieCardProps {
    item: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = React.memo(({ item }) => {
    const navigation = useNavigation<RootNavigationProp>();

    const navigateToDetails = useCallback(() => navigation.navigate(RootStackRoutes.MovieDetails, {
        movieId: item.id
    }), [navigation, item]);

    return (
        <Card containerStyle={styles.container}>
            <Card.Title numberOfLines={1}>{item.title}</Card.Title>
            <Card.Divider />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Year: <Text style={styles.value}>{item.year}</Text></Text>
                <Text style={styles.title}>Format: <Text style={styles.value}>{item.format}</Text></Text>
            </View>
            <Button
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleButtonStyle}
                size='md'
                title='Learn more...'
                color={Colors.SecondaryLight}
                onPress={navigateToDetails}
            />
        </Card>
    )
})