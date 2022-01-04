import React, { Component } from 'react';
import {
    StatusBar,
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import fontSelector from '../../constants/FontSelectors';

const titleData = [
    {
        'id': 1,
        'title': 'About Us',
        'image': '../../images/about_us_icon.png'
    },
    {
        'id': 2,
        'title': 'How It Works',
        'image': '../../images/how_it_works.png'
    },
    {
        'id': 3,
        'title': 'Terms & Conditions',
        'image': '../../images/terms_&_conditions.png'
    },
    {
        'id': 4,
        'title': 'Privacy Policy',
        'image': '../../images/privacy_policy_icon.png'
    },
    {
        'id': 5,
        'title': 'Contact Us',
        'image': '../../images/contact_us_icon.png'
    },
    {
        'id': 6,
        'title': 'Log Out',
    },
]

export function DrawerContent(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.greyColor }}>
            {/* <StatusBar hidden /> */}
            <ScrollView>
                <View style={{ backgroundColor: Colors.greenColor, justifyContent: 'center', paddingVertical: wp(15) }}>
                    <View style={{ alignItems: 'center', }}>
                        <Image source={require('../../images/side_menu_logo.png')} style={{ height: wp(30), width: wp(30), resizeMode: 'contain', }} />
                    </View>

                </View>
                <View>
                    {titleData.map((data, index) => {
                        return (
                            <View style={{ paddingLeft: wp(7), flexDirection: 'row', alignItems: 'center' }}>
                                {data.id != 6 ?
                                    <Image
                                        source={data.id == 1 ? require('../../images/about_us_icon.png') : data.id == 2 ? require('../../images/how_it_works.png') : data.id == 3 ? require('../../images/terms_&_conditions.png') : data.id == 4 ? require('../../images/privacy_policy_icon.png') : data.id == 5 ? require('../../images/contact_us_icon.png') : null}
                                        style={{ height: wp(5.7), width: wp(5.7), resizeMode: 'contain' }}
                                    />
                                    :
                                    <View styles={{ width: wp(5), height: wp(5), backgroundColor: 'red' }} />
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        if (data.id == 1) {
                                            props.navigation.navigate('AccountScreen')
                                        }
                                        if (data.id == 2) {
                                            props.navigation.navigate('BookingHistoryScreen')
                                        }
                                    }
                                    }
                                    style={{ paddingVertical: wp(6), marginLeft: wp(3) }}
                                >
                                    <Text style={{ color: Colors.mainTextColor, fontSize: wp(3.8), fontFamily: fontSelector('bold') }}>{data.title}</Text>
                                </TouchableOpacity>
                                <View style={{ backgroundColor: '#D6DBDF', height: 1 }} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTextContainer: {
        alignItems: 'center',
    },
    headerText: {
        color: Colors.whiteColor
    }
})