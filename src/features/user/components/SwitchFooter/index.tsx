import React from 'react';
import { Text, TouchableOpacityProps, TouchableOpacity } from 'react-native';

import { styles } from './styles'

interface SwitchFooterProps extends TouchableOpacityProps {
    title: string;
    subtitle: string;
}

export const SwitchFooter: React.FC<SwitchFooterProps> = React.memo(({ subtitle, title, ...touchableProps }) => (
    <TouchableOpacity style={styles.footer} hitSlop={styles.hitSlop} {...touchableProps} >
        <Text style={styles.footerText}>{title}
            <Text style={styles.boldFooterText}> {subtitle}</Text>
        </Text>
    </TouchableOpacity>
))