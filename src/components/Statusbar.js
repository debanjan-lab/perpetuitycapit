import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Colors from '../constants/Colors';

const AppStatusBar = () => {
    return (
        <StatusBar
            backgroundColor={Colors.whiteColor}
            translucent={true}
            barStyle={'dark-content'}
        />
    )
}

export default AppStatusBar;