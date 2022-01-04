import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import Colors from '../../constants/Colors';
import AppStatusBar from '../../components/Statusbar';
import ErrorModal from '../../components/ErrorModal';
import axios from 'axios';
import { API, deviceToken } from '../../constants/Constants';

class OtpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            mobile: '',
            minutes: '01',
            seconds: '59',
            endTimer: false,
            code: '',
            isLoadingResend: false,
            userData: {},
            smsDetails: this.props.route.params.userData.response.details,
            isModalVisible: false,
            errorText: '',
        };
    }

    componentDidMount() {

        if (!this.state.endTimer) {
            this.interval = setInterval(() => {
                if (this.state.seconds > 0) {
                    this.setState({
                        seconds: this.state.seconds - 1
                    })
                }
                if (this.state.seconds == 0 && this.state.minutes > 0) {
                    this.setState({
                        minutes: '00',
                        seconds: '59'
                    }, () => this.setState({
                        seconds: this.state.seconds - 1
                    }))
                }
                if (this.state.seconds == 0 && this.state.minutes == 0) {
                    this.setState({
                        minutes: '00',
                        seconds: '00',
                        endTimer: true
                    })
                }
            }, 1000);
        }
    }

    verifyOtp() {
        if (this.state.code.length == 6) {
            console.log(this.props.route.params.userData);
            this.setState({
                isLoading: true,
            })
            var data = new FormData();
            if (this.props.route.params.screenName == 'login') {
                var userId = this.props.route.params.userData.user_id;
                var name = this.props.route.params.userData.name;
                var email = this.props.route.params.userData.email;
                //var countryCode = this.props.route.params.countryCode;
                //var smsDetails = this.props.route.params.userData.response.details;
                var type = 1;
                var sociaId = '';
            }
            else {
                var userId = 0;
                var name = this.props.route.params.userInput.name;
                var email = this.props.route.params.userInput.email;
                //var countryCode = this.props.route.params.userInput.countryCode;
                //var smsDetails = this.props.route.params.userData.response.details;
                var type = this.props.route.params.userInput.type;
                var sociaId = this.props.route.params.userInput.social_id;
            }
            data.append('name', name);
            data.append('email', email);
            data.append('country_code', '+91');
            data.append('mobile', this.props.route.params.mobile);
            data.append('sms_details', this.state.smsDetails);
            data.append('otp', this.state.code);
            data.append('user_id', userId);
            data.append('device_token', deviceToken);
            data.append('type', type);
            data.append('social_id', sociaId);
            console.log(data);
            axios
                .post(API + 'send-otp', data)
                .then(res => {
                    console.log('Get OTP verify data', res);
                    if ((res.data.message == "Registration Successfully" || res.data.message == "Login Successfully") && res.data.message != "Registration Successfully") {
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
                            routes: [{ name: 'DrawerScreen', params: null }],
                        })
                        //this.props.navigation.navigate('ApplyLoanScreen'));
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            errorText: res.data.message,
                            isModalVisible: true,
                            code: ''
                        })
                    }

                })
        }
        else {
            Toast.show('Please enter 6 digits your OTP');
        }
    }
    resendOtp() {
        //console.log('resend');
        if (this.props.route.params.screenName == 'login') {
            type = 1;
            socialId = '';
        }
        else {
            var type = this.props.route.params.userInput.type;
            var socialId = this.props.route.params.userInput.social_id;
        }
        this.setState({
            isLoadingResend: true,
        })
        var data = new FormData();
        data.append('country_code', this.props.route.params.countryCode);
        data.append('mobile', this.props.route.params.mobile);
        data.append('device_token', deviceToken);
        data.append('type', type);
        data.append('social_id', socialId);
        console.log('resend data', data);
        axios
            .post(API + 'resend-otp', data)
            .then(res => {
                console.log('Get resend OTP verify data', res);
                this.setState({
                    endTimer: false,
                    minutes: '01',
                    seconds: '59',
                    isLoadingResend: false,
                    code: '',
                    smsDetails: res.data.data.response.details
                })
            })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                    <View>
                        <AppStatusBar />
                        <View style={{ flexDirection: 'column', paddingTop: wp(25), alignItems: 'center', marginHorizontal: wp(10) }}>
                            <Image
                                source={require('../../images/otp_logo.png')}
                                style={{
                                    height: wp(36),
                                    width: wp(36),
                                    resizeMode: 'contain'
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: fontSelector('medium'),
                                    fontSize: this.props.headerText == 'Welcome' ? wp(6.5) : wp(5.5),
                                    color: Colors.greenColor,
                                    marginTop: wp(6)
                                }}>
                                Enter OTP
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp(2) }}>
                                <Text
                                    style={{
                                        fontFamily: fontSelector('regular'),
                                        fontSize: wp(3.5),
                                        color: Colors.subTextColor,
                                    }}>
                                    We have sent OTP to {this.props.route.params.countryCode} {this.props.route.params.mobile}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.goBack()}
                                    style={{ marginLeft: wp(2.5) }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: fontSelector('medium'),
                                            fontSize: wp(3.2),
                                            color: '#E86F12',

                                        }}
                                    >
                                        Edit
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                    <View
                        style={{
                            marginHorizontal: wp(6),
                            marginVertical: wp(6),
                        }}>
                        <OTPInputView
                            style={{ height: wp(25), marginBottom: wp(18) }}
                            pinCount={6}
                            autoFocusOnLoad
                            keyboardType='phone-pad'
                            codeInputFieldStyle={{
                                height: wp(12),
                                width: wp(12),
                                backgroundColor: '#F1F6FC',
                                borderWidth: 0,
                                borderRadius: wp(2),
                                fontFamily: fontSelector('regular'),
                                fontSize: wp(3.5),
                                color: Colors.mainTextColor,
                            }}
                            //codeInputHighlightStyle={{ borderColor: "#03DAC6", }}
                            onCodeFilled={(code => {
                                //console.log(`Code is ${code}, you are good to go!`)
                                this.setState({
                                    code: code
                                }, () => {
                                    if (this.state.code.length == 6) {
                                        this.verifyOtp()
                                    }
                                })
                            })}
                        />
                        <TouchableOpacity
                            onPress={() => this.verifyOtp()}
                            style={{
                                backgroundColor: Colors.greenColor,
                                alignItems: 'center',
                                paddingVertical: wp(3.5),
                                borderRadius: wp(7),
                                marginTop: wp(5)
                            }}
                        >
                            {!this.state.isLoading ?
                                <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.whiteColor, }}>Verify</Text> :
                                <ActivityIndicator size="small" color={Colors.whiteColor} />
                            }
                        </TouchableOpacity>
                        {this.state.endTimer ?
                            (!this.state.isLoading || !this.state.isLoadingResend ?
                                <TouchableOpacity
                                    onPress={() => this.resendOtp()}
                                >
                                    <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.greenColor, marginHorizontal: wp(2), textAlign: 'center', marginTop: wp(7) }}>Resend</Text>
                                </TouchableOpacity> : null)
                            :
                            <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.subTextColor, marginHorizontal: wp(2), textAlign: 'center', marginTop: wp(7) }}>Resend code in {this.state.minutes}:{this.state.seconds}</Text>
                        }

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

export default OtpScreen;