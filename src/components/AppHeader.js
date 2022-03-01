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
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
const AppHeader = ({ headerText, subHeaderText, logo, navigation, version }) => {
    return (
        <>
            <AppStatusBar />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Image
                        source={require('../images/drawer_icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileWrapper} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image
                        source={require('../images/profile_icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>{headerText}</Text>
                <Text style={styles.headingSub}>{subHeaderText}</Text>
                <Text style={styles.headingSub}>Version : {version}</Text>
            </View>
        </>
    );
};

export default AppHeader;


const styles = StyleSheet.create({
    heading: {
        fontFamily: fontSelector('medium'),
        fontSize: wp(5),
        color: Colors.greenColor,
        fontWeight: '700'
    },
    headingSub: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(4),
        color: Colors.subTextColor,
        textAlign: 'center',
        fontWeight: '700'
    },

    logo: {
        height: wp(80),
        width: wp(80),
        resizeMode: 'contain'
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    profileWrapper: {
        position: 'absolute',
        right: 0,
        top: -10,
        backgroundColor: '#EEF9EF',
        padding: 10,
        borderRadius: 50
    }
});