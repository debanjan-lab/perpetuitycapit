import React from 'react';
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
import fontSelector from '../constants/FontSelectors';
import Colors from '../constants/Colors';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { doLogout } from '../redux/actions/AuthActions';
const Row = ({ label, icon, route, navigation }) => {
    const dispatch = useDispatch()
    console.log(navigation)


    const redirect = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())
        // navigation.navigate(route)
    }

    const logout = () => {
        //alert('logout')
        dispatch(doLogout())
    }

    return (
        <TouchableOpacity style={styles.rowContainer} onPress={() => icon ? redirect() : logout()}>
            {
                icon &&
                <>
                    <Image
                        source={icon}
                        style={styles.icon}
                    />
                    <View style={{ margin: 5 }} />
                </>
            }

            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#1A5632' }}>
            <View style={{ height: hp(35), backgroundColor: '#1A5632', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../images/side_menu_logo.png')}
                    style={{ height: wp(40), width: wp(40), resizeMode: 'contain' }}
                />
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Row label={'About Us'} icon={require('../images/about_us_icon.png')} route={'AboutUs'} navigation={props.navigation} />
                <Row label={'How it works'} icon={require('../images/how_it_works.png')} route={'HowItWorks'} navigation={props.navigation} />
                <Row label={'Terms and Conditions'} icon={require('../images/terms_&_conditions.png')} route={'TermsConditions'} navigation={props.navigation} />
                <Row label={'Privacy Policy'} icon={require('../images/privacy_policy_icon.png')} route={'PrivacyPolicy'} navigation={props.navigation} />
                <Row label={'Contact Us'} icon={require('../images/contact_us_icon.png')} route={'ContactUs'} navigation={props.navigation} />
            </View>
        </View>
    );
};

export default CustomDrawer;
const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        padding: 20,
        borderColor: '#F7F7F7',
        borderBottomWidth: 1,
        height: (hp(100) - hp(35)) / 6,
        alignItems: 'center'
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    label: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(4),
        color: Colors.mainTextColor,
        fontWeight: '700'
    }
});