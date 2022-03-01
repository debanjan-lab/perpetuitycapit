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
const AuthHeader = ({ headerText, subHeaderText, logo, phone }) => {
    return (
        <>
            <AppStatusBar />
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <Text style={styles.heading}>{headerText}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text style={styles.headingSub}>{subHeaderText}</Text>
                    {
                        phone &&
                        <TouchableOpacity style={{ marginLeft: 10 }}>
                            <Text style={styles.headingSubEdit}>Edit</Text>
                        </TouchableOpacity>
                    }

                </View>


            </View>
        </>
    );
};

export default AuthHeader;


const styles = StyleSheet.create({
    heading: {
        fontFamily: fontSelector('medium'),
        fontSize: wp(6.5),
        color: Colors.greenColor, marginTop: wp(2)
    },
    headingSub: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(3.5),
        color: Colors.subTextColor,
        textAlign: 'center'
    },
    headingSubEdit: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(3.5),
        color: 'red',
    },

    logo: {
        height: wp(36),
        width: wp(36),
        resizeMode: 'contain'
    }
});