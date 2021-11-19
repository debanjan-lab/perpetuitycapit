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
import Colors from '../constants/Colors';

const titleData = [
    {
        'id': 1,
        'title': 'Profile',
    },
    {
        'id': 2,
        'title': 'Booking History',
    },
    {
        'id': 3,
        'title': 'Payment History',
    },
    {
        'id': 4,
        'title': 'Reviews',
    },
    {
        'id': 5,
        'title': 'Support',
    },
    {
        'id': 6,
        'title': 'Log Out',
    },
]

export function DrawerContent(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.greyColor }}>

            <View style={{ flex: 1, backgroundColor: Colors.blueColor, paddingTop: wp(10) }}>
                {/* <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{ marginLeft: wp(5) }}>
                    <Image source={require('../images/back_icon.png')} style={{ height: wp(4), width: wp(4), resizeMode: 'contain' }} />
                </TouchableOpacity> */}
                <View style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: '#B7B7B7', padding: wp(8), borderRadius: 50, borderWidth: 1, borderColor: Colors.whiteColor }}>
                    <Image source={require('../images/side_menu_logo.png')} style={{ height: wp(8), width: wp(8), resizeMode: 'contain', }} />
                </View>
                <View style={[styles.headerTextContainer, { marginTop: wp(5) }]}>
                    <Text style={[styles.headerText, { fontSize: 11 }]}>98******25</Text>
                </View>
                <View style={[styles.headerTextContainer, { marginTop: wp(1.5) }]}>
                    <Text style={[styles.headerText, { fontSize: 16 }]}>Hi there Emilia!</Text>
                </View>
            </View>
            <View style={{ flex: 2.7 }}>
                {titleData.map((data, index) => {
                    return (
                        <View style={{ paddingLeft: wp(7), }}>
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
                                style={{ paddingVertical: wp(6) }}
                            >
                                <Text style={{ color: Colors.blueColor, fontSize: 14, fontWeight: 'bold' }}>{data.title}</Text>
                            </TouchableOpacity>
                            <View style={{ backgroundColor: '#D6DBDF', height: 1 }} />
                        </View>
                    )
                })}
            </View>
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