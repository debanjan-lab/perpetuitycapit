import React, { FC } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image
} from 'react-native';

const NoRecord = () => {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.rowNoRecord}>No Record found</Text>
        </View>
    );
};

export default NoRecord;


const styles = StyleSheet.create({
    rowContainer: {
        borderWidth: 1,
        borderColor: '#C7C7C7',
        borderRadius: 10
    },
    rowNoRecord: {
        color: '#C7C7C7',
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'center',
        padding: 20
    }
});