import React, { FC } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image
} from 'react-native';
import AppStatusBar from '../components/Statusbar';
import fontSelector from '../constants/FontSelectors';
import Colors from '../constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AppHeaderInner = ({ headerText, editText, onPressEdit, navigation, applyLoanText, applyLoan, goBack }) => {
    return (
        <>
            <AppStatusBar />
            <View style={styles.wrapper}>

                <TouchableOpacity onPress={() => goBack ? navigation.goBack() : navigation.navigate('DashboardScreen')}>
                    <Image
                        source={require('../images/back_icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', paddingRight: editText ? 0 : 20 }}>
                    <Text style={styles.heading}>{headerText}</Text>
                </View>



                {/* {editText && <TouchableOpacity onPress={() => onPressEdit()}><Text style={styles.editText}>{editText}</Text></TouchableOpacity>}
                {applyLoanText && <TouchableOpacity onPress={() => applyLoan()}><Text style={styles.applyLoanText}>{applyLoanText}</Text></TouchableOpacity>}
                 */}


                {applyLoanText && <TouchableOpacity onPress={() => applyLoan()}><Text style={styles.applyLoanText}>{applyLoanText}</Text></TouchableOpacity>}
                {editText && <TouchableOpacity onPress={() => onPressEdit()}><Text style={styles.editText}>{editText}</Text></TouchableOpacity>}

            </View>
        </>
    );
};

export default AppHeaderInner;


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: 'center'
    },
    heading: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(5),
        color: Colors.mainTextColor,
        fontWeight: '700',
    },
    editText: {
        fontFamily: fontSelector('regular'),
        fontSize: 15,
        color: 'red',
        fontWeight: '700',
        textAlign: 'center'
    },
    applyLoanText: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(4),
        color: Colors.greenColor,
        fontWeight: '700',
        textAlign: 'center'
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },

});