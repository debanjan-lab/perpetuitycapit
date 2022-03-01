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
import ButtonUtil from '../../../../components/button'
const FooterButton = ({ leftNavigation, rightNavigation, leftButton, applyLoanText, applyLoan }) => {
    return (
        <View style={styles.footerWrapper}>
            {
                leftButton ?
                    <ButtonUtil
                        lesspaddingWithIcon={true}
                        label={null}
                        onPress={() => leftNavigation()}
                        leftIcon={require('../../../../images/left-arrow.png')}
                        rightIcon={null}
                    />
                    :
                    <View />
            }
            {applyLoanText && <TouchableOpacity onPress={() => applyLoan()}><Text style={styles.applyLoanText}>{applyLoanText}</Text></TouchableOpacity>}
            {
                rightNavigation &&
                <ButtonUtil
                    lesspaddingWithIcon={true}
                    onPress={() => rightNavigation()}
                    leftIcon={null}
                    rightIcon={require('../../../../images/right-arrow-angle.png')}
                />
            }
        </View>
    );
};

export default FooterButton;


const styles = StyleSheet.create({
    footerWrapper: {
        // height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center'
    },
    applyLoanText: {
        color: '#FFFFFF',
        backgroundColor: '#1A5632',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        fontWeight: '700',
        fontSize: 18
    }
});