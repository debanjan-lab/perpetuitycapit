import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    ScrollView,
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import Modal from "react-native-modal";
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import AppStatusBar from '../../components/Statusbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, deviceToken } from '../../constants/Constants';

class ApplyLoanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userId: '',
            apiToken: ''
        }
    }
    async componentDidMount() {
        var userData = await AsyncStorage.getItem('userData');
        var userD = JSON.parse(userData);
        console.log('lllllllll', userD);
        this.setState({
            userName: userD.userName,
            userId: userD.userId,
            apiToken: userD.userAPIToken,
        })
    }
    logoutPressed = () => {
        console.log('pressed');

        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen', params: null }],
        })

        // var data = new FormData();
        // data.append('user_id', this.state.userId);
        // data.append('api_token', this.state.apiToken);
        // console.log(data);
        // axios
        //     .post(API + 'logout', data)
        //     .then(res => {
        //         console.log('Get OTP verify data', res);
        //         if (res.data.message == "Logout Successfully") {
        //             AsyncStorage.setItem('userData', '');
        //             this.props.navigation.reset({
        //                 index: 0,
        //                 routes: [{ name: 'LoginScreen', params: null }],
        //             })
        //         }
        //         else {
        //             console.log(res.data.message);
        //         }

        //     })

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <AppStatusBar />

                <View
                    style={{
                        marginTop: wp(8),
                        marginHorizontal: wp(4),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                    >
                        <Image
                            source={require('../../images/drawer_icon.png')}
                            style={{ height: wp(6), width: wp(6), resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.lightGreen,
                            padding: wp(1.5),
                            borderRadius: wp(5)
                        }}
                    >
                        <Image
                            source={require('../../images/profile_icon.png')}
                            style={{ height: wp(6), width: wp(6), resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>

                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: wp(4),
                            paddingVertical: wp(20)
                        }}
                    >

                        <Image
                            source={require('../../images/home_icon.png')}
                            style={{ height: wp(35), width: wp(70), }}
                        />
                        <Text
                            style={{
                                color: Colors.greenColor,
                                fontSize: wp(4.3),
                                fontFamily: fontSelector('medium'),
                                marginTop: wp(10),
                                marginBottom: wp(5)
                            }}
                        >
                            Hi welcome to Perpetuity Capital
                        </Text>
                        <Text
                            style={styles.subTextStyle}
                        >
                            Thanks for registering with Perpetuity Capital.
                        </Text>
                        <Text
                            style={styles.subTextStyle}
                        >
                            Let's get started.
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ApplyLoanStack')}
                            style={{
                                backgroundColor: Colors.greenColor,
                                paddingHorizontal: wp(12),
                                paddingVertical: wp(4),
                                borderRadius: wp(10),
                                marginTop: wp(12)
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.whiteColor,
                                    fontSize: wp(3.8),
                                    fontFamily: fontSelector('regular'),
                                    textAlign: 'center'
                                }}
                            >
                                Apply For Loan
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: Colors.lightGreen, paddingVertical: wp(5) }}>
                        <Text
                            style={{
                                color: Colors.greenColor,
                                fontSize: wp(4.3),
                                fontFamily: fontSelector('medium'),
                                textAlign: 'center'
                            }}
                        >
                            Calculate EMI
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
export default ApplyLoanScreen;

const styles = StyleSheet.create({
    subTextStyle: {
        color: Colors.subTextColor,
        fontSize: wp(3.7),
        fontFamily: fontSelector('regular'),
        textAlign: 'center',
    },
})