import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Colors from '../constants/Colors';
console.log('statusBarHeight: ', StatusBar.currentHeight);
const AppStatusBar = () => {
    return (
        <>
            <StatusBar
                backgroundColor={"transparent"}
                translucent={true}
                barStyle={'dark-content'}
            />
            
        </>
    )
}

export default AppStatusBar;