import React, { FC } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontSelector from '../../../../constants/FontSelectors';
import Colors from '../../../../constants/Colors';
const ApplyLoanHeader = ({ heading, subHeading }) => {
    return (
        <>
            <View>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.subHeading}>{subHeading}</Text>
            </View>
            <View style={{ marginTop: hp(5) }} />
        </>
    );
};

export default ApplyLoanHeader;


const styles = StyleSheet.create({
    heading: {
        color: Colors.greenColor,
        fontSize: wp(6),
        fontFamily: fontSelector('medium'),
    },
    subHeading: {
        color: '#D5D5D5',
        fontSize: wp(4),
        fontFamily: fontSelector('regular'),
        fontWeight: '700'
    },
});