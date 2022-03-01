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
    StyleSheet
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-simple-toast';
import Colors from '../../constants/Colors';
import AuthHeader from '../../components/AuthHeader';
import ButtonUtil from '../../components/button'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { doCheckOtp } from '../../redux/actions/OtpActions';
import { deviceToken } from '../../constants/Constants';
import { saveUserData } from '../../redux/actions/AuthActions';
import { resendOtp } from '../../redux/actions/OtpActions';
import { doLogin, doRegister } from '../../redux/actions/AuthActions';
const OTPModule = ({ setOtp }) => {
    return (
        <OTPInputView
            style={{ height: wp(20) }}
            pinCount={6}
            autoFocusOnLoad
            keyboardType='phone-pad'
            codeInputFieldStyle={styles.otpCodeInputFieldStyle}
            onCodeFilled={(code => setOtp(code))}
        />

    )
}

class OtpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            code: null,
            active: false,
            phone: null,
            navigation: null
        };
    }

    componentDidMount() {
        console.log("+++++++++++++", this.props)
        let phone = this.props?.auth?.data?.mobile || this.props?.auth?.input?.mobile;
        this.setState({ phone, navigation: this.props.route.params.navigation || '' })
        //alert(phone)
    }

    setOtp = (value) => {
        //alert(value)
        this.setState({
            code: value
        }, () => {
            if (this.state.code.length == 6) {
                this.setState({
                    active: true
                })
                this.verifyOtp()
            }
        })

    }

    verifyOtp() {
        this.setState({ loading: true })
        let name = this.props?.auth?.data?.name || this.props?.auth?.input?.name;
        let email = this.props?.auth?.data?.email || this.props?.auth?.input?.email;
        let country_code = this.props?.auth?.data?.country_code || this.props?.auth?.input?.country_code;
        let mobile = this.props?.auth?.data?.mobile || this.props?.auth?.input?.mobile;
        let sms_details = this.props?.auth?.data?.response?.details
        let otp = this.state.code;
        let user_id = this.props?.auth?.data?.user_id || 0;
        let device_token = deviceToken;
        let type = this.props?.auth?.data?.type || 1;
        let social_id = this.props?.auth?.data?.social_id;
        let obj = {
            name: name,
            email: email,
            country_code: country_code,
            mobile: mobile,
            sms_details: sms_details,
            otp: otp,
            user_id: user_id,
            device_token: device_token,
            type: type,
            social_id, social_id
        }
        this.props.doCheckOtp(obj).then(() => {
            this.setState({ loading: false })
            console.log("verifyOtp()", this.props)

            let status = this.props?.otp?.status;
            let message = this.props?.otp?.message;
            let payload = this.props?.otp?.data;
            if (status) {
                if (this.props?.otp?.data?.api_token) {
                    this.props.saveUserData(payload)
                }
            } else {
                Toast.show(message);
            }
        })
    }

    _resendOtp = () => {
        if (this.state.navigation == 'login') {
            let obj = {
                country_code: '+91',
                mobile: this.props?.auth?.data?.mobile,
                device_token: deviceToken,
                type: this.props?.auth?.data?.type || 1,
            }
            this.props.doLogin(obj).then(() => {
                console.log("****", this.props)
            })
        } else {
            // let obj = {
            //     country_code: '+91',
            //     mobile: this.props?.auth?.data?.mobile,
            //     device_token: deviceToken,
            //     type: 1,
            // }

            let obj = {
                country_code: '+91',
                name: this.props?.auth?.input?.name,
                email: this.props?.auth?.input?.email,
                terms_and_condition: 1,
                mobile: this.props?.auth?.input?.mobile,
                device_token: deviceToken,
                type: this.props?.auth?.input?.type || 1,
                social_id: this.props?.auth?.input?.social_id
            }


            this.props.doRegister(obj).then(() => {
                console.log("****", this.props)
            })
        }

    }



    render() {
        const { phone } = this.state
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ marginTop: hp(10) }} />
                <AuthHeader
                    headerText="Enter OTP"
                    subHeaderText={`We have sent OTP to ${phone}`}
                    logo={require('../../images/otp_logo.png')}

                />
                <View style={{ marginTop: hp(5) }} />
                <OTPModule setOtp={this.setOtp} />
                <View style={{ margin: hp(10) }} />
                <ButtonUtil active={true} label={'Verify'} loading={this.state.loading} onPress={() => this.verifyOtp()} />
                <View style={{ margin: 20 }} />
                <ButtonUtil textDecorationLine={true} label={'Resend OTP'} onPress={() => this._resendOtp()} />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
    doCheckOtp,
    saveUserData,
    doLogin,
    doRegister
}
export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    otpCodeInputFieldStyle: {
        height: wp(12),
        width: wp(12),
        backgroundColor: '#F1F6FC',
        borderWidth: 0,
        borderRadius: wp(2),
        fontFamily: fontSelector('regular'),
        fontSize: wp(3.5),
        color: Colors.mainTextColor,
    }

});
