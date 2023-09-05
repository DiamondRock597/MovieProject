import React, { useCallback, useMemo } from 'react';
import { BottomSheet, ListItem } from '@rneui/base';

import { MovieFormats } from 'models/movie';

interface MovieFormatPickerProps {
    isVisible: boolean;

    onRequestClose: () => void;
    setFormat: (value: MovieFormats) => void;
}

const list = [
    { title: MovieFormats.VHS },
    { title: MovieFormats.DVD },
    { title: MovieFormats.Bluray },
];

export const MovieFormatPicker: React.FC<MovieFormatPickerProps> = React.memo(({ onRequestClose, isVisible, setFormat }) => {
    const onPress = useCallback((title: MovieFormats) => () => {
        onRequestClose();
        setFormat(title);
    }, [onRequestClose, setFormat]);

    const modalProps = useMemo(() => ({ onRequestClose }), [onRequestClose]);

    return (
        <BottomSheet modalProps={modalProps} isVisible={isVisible}>
            {list.map((format) => (
                <ListItem key={`FormatItem-${format.title}`} onPress={onPress(format.title)}>
                    <ListItem.Content>
                        <ListItem.Title>{format.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
        </BottomSheet>
    )
})