import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorModal from '../../components/ErrorModal';
//import Modal from "react-native-modal";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import Colors from '../../constants/Colors';
import LoginHeader from '../../components/LoginHeader';
import axios from 'axios';
import { API, deviceToken } from '../../constants/Constants';

GoogleSignin.configure();

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            mobile: '',
            userGoogleInfo: {},
            userData: {},
            isModalVisible: false,
            errorText: ''
        };
    }
    componentDidMount() {
    }

    userLogin() {

        if (this.state.mobile == '') {
            Toast.show('Please enter your mobile number');
        } else if (this.state.mobile.length != 10) {
            Toast.show('Please enter a valid mobile number');
        }
        else {
            this.setState({
                isLoading: true,
            })
            var data = new FormData();
            data.append('country_code', '+91');
            data.append('mobile', this.state.mobile);
            data.append('device_token', deviceToken);
            data.append('type', 1);
            console.log(data);
            axios
                .post(API + 'login', data)
                .then(res => {
                    console.log('get Login data', res);
                    if (res.data.message != "no user found") {
                        this.setState({ isLoading: false, }, () =>
                            this.props.navigation.navigate('OtpScreen', { userData: res.data.data, mobile: this.state.mobile, countryCode: '+91', screenName: 'login' })
                        )
                    }
                    else {
                        //Toast.show(res.data.message);
                        this.setState({
                            isLoading: false,
                            errorText: res.data.message,
                            isModalVisible: true
                        })
                    }
                    //console.log('get Login data', res.data.data);
                })
        }

    }

    googleLogin = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //console.log(isSignedIn);
            this.setState({ userGoogleInfo: userInfo }, () => console.log('qqqqqqq', this.state.userGoogleInfo.user));

            this.setState({
                isLoading: true,
            })

            var data = new FormData();
            data.append('country_code', '');
            data.append('mobile', '');
            data.append('device_token', deviceToken);
            data.append('type', 2);
            data.append('social_id', this.state.userGoogleInfo.user.id);
            console.log(data);
            axios
                .post(API + 'login', data)
                .then(res => {
                    console.log('get Login data', res);
                    if (res.data.message == "no user found") {
                        this.setState({ isLoading: false, }, () =>
                            // this.props.navigation.navigate('OtpScreen', { userData: res.data.data, mobile: this.state.mobile, countryCode: '+91', screenName: 'login' })
                            this.props.navigation.navigate('RegistrationScreen', { googleInfo: this.state.userGoogleInfo.user, type: 2 })
                        )
                    }
                    else {
                        if (res.data.message == "Social Login Successfully") {
                            var userInfo = {
                                userId: res.data.data.user_id,
                                userName: res.data.data.name,
                                userEmail: res.data.data.email,
                                userAPIToken: res.data.data.api_token,
                                userCountryCode: res.data.data.country_code,
                                userMobile: res.data.data.mobile,
                            }
                            this.setState({
                                isLoading: false,
                                userData: userInfo
                            })
                            AsyncStorage.setItem('userData', JSON.stringify(this.state.userData))
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'ApplyLoanScreen', params: null }],
                            })
                            //this.props.navigation.navigate('ApplyLoanScreen'));
                        }
                        else {
                            this.setState({
                                isLoading: false,
                                errorText: res.data.message,
                                isModalVisible: true
                            })
                        }
                    }

                })

            // this.setState({
            //     isLoading: true,
            // })
            // var data = new FormData();
            // data.append('name', this.state.userGoogleInfo.user.givenName + ' ' + this.state.userGoogleInfo.user.familyName);
            // data.append('gmail_id', this.state.userGoogleInfo.user.id);
            // data.append('device_token', deviceToken);
            // //console.log(data);
            // axios
            //     .post(API + 'login-with-google', data)
            //     .then(res => {
            //         console.log('get Login data', res);
            //         this.setState({ isLoading: false, }, () =>
            //         //this.props.navigation.navigate('ApplyLoanScreen')
            //         {
            //             var userInfo = {
            //                 userId: res.data.data.user_id,
            //                 userName: res.data.data.name,
            //                 userEmail: res.data.data.email,
            //                 userAPIToken: res.data.data.api_token,
            //                 userCountryCode: res.data.data.country_code,
            //                 userMobile: res.data.data.mobile,
            //             }
            //             this.setState({
            //                 isLoading: false,
            //                 userData: userInfo
            //             }, () => console.log('jjjjjjjj', this.state.userData))
            //             AsyncStorage.setItem('userData', JSON.stringify(this.state.userData))
            //             this.props.navigation.reset({
            //                 index: 0,
            //                 routes: [{ name: 'ApplyLoanScreen', params: null }],
            //             })
            //         }
            //         )
            //         //console.log('get Login data', res.data.data);
            //     })

        } catch (error) {
            console.log(error);
        }
    }

    toggleModal = (childData) => {
        this.setState({
            isModalVisible: childData
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <ScrollView>
                    <LoginHeader
                        headerText="Welcome"
                        subHeaderText="Please log in to continue"
                        mainProps={this.props}
                    />
                    <View
                        style={{
                            marginHorizontal: wp(6),
                            marginVertical: wp(6),
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: '#F1F6FC',
                                borderRadius: wp(12),
                                alignItems: 'center',
                                marginVertical: wp(7)
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.setState({ isModalVisible: true })}
                                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp(5) }}
                            >
                                <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.mainTextColor, marginRight: wp(2) }}>+91</Text>
                                <Image source={require('../../images/down_arrow.png')} style={{ height: wp(2.5), width: wp(2), resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <View style={{ height: wp(7), backgroundColor: Colors.subTextColor, width: wp(0.3), marginHorizontal: wp(3) }} />
                            <TextInput
                                value={this.state.mobile}
                                onChangeText={text => this.setState({ mobile: text })}
                                placeholder='Mobile Number'
                                placeholderTextColor={Colors.subTextColor}
                                keyboardType='phone-pad'
                                style={{
                                    flex: 1,
                                    color: Colors.mainTextColor,
                                    fontFamily: fontSelector('regular')
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => !this.state.isLoading ? this.userLogin() : null}
                            style={{
                                backgroundColor: Colors.greenColor,
                                alignItems: 'center',
                                paddingVertical: wp(3.5),
                                borderRadius: wp(7),
                                marginTop: wp(5)
                            }}
                        >
                            {!this.state.isLoading ?
                                <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.whiteColor, }}>Get OTP</Text> :
                                <ActivityIndicator size="small" color={Colors.whiteColor} />
                            }
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: wp(8) }} >
                            <View style={{ height: wp(0.3), width: wp(12), backgroundColor: '#C7C7C7' }} />
                            <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.2), color: Colors.mainTextColor, marginHorizontal: wp(2) }}>Social Login</Text>
                            <View style={{ height: wp(0.3), width: wp(12), backgroundColor: '#C7C7C7' }} />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.googleLogin()}
                            style={{
                                flexDirection: 'row',
                                borderColor: Colors.greenColor,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: wp(3.5),
                                borderRadius: wp(7),
                            }}
                        >
                            <Image source={require('../../images/gmail_icon.png')} style={{ height: wp(4.2), width: wp(4.2), resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.8), color: Colors.mainTextColor, marginLeft: wp(2) }}>Continue with Gmail</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                borderColor: Colors.greenColor,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: wp(3.5),
                                borderRadius: wp(7),
                                marginTop: wp(4)
                            }}
                        >
                            <Image source={require('../../images/apple_icon.png')} style={{ height: wp(4.5), width: wp(4.5), resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.8), color: Colors.mainTextColor, marginLeft: wp(2) }}>Continue with Apple ID</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('RegistrationScreen', { googleInfo: '', type: 1 })}
                            style={{ marginTop: wp(20), alignItems: 'center' }}
                        >
                            <Text style={{ fontFamily: fontSelector('medium'), fontSize: wp(3.8), color: Colors.greenColor, textDecorationLine: 'underline' }}>Don't have an account</Text>
                        </TouchableOpacity>
                    </View>
                    <ErrorModal
                        isModalVisible={this.state.isModalVisible}
                        title={this.state.errorText}
                        toggleModal={this.toggleModal}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default LoginScreen;