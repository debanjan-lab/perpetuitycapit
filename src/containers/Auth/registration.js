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
    StyleSheet
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import Colors from '../../constants/Colors';
import ButtonUtil from '../../components/button'
import TextInputUtil from '../../components/textInput'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AuthHeader from '../../components/AuthHeader';
import CheckBox from '@react-native-community/checkbox';
import ParsedText from 'react-native-parsed-text';
import Toast from 'react-native-simple-toast';
import { deviceToken } from '../../constants/Constants';
import { doRegister } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';
class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: null,
            email: null,
            phone: null,
            checked: false
        };
    }
    componentDidMount() {
        this.setState({
            name: `${this.props?.route?.params?.googleInfo?.givenName || ''} ${this.props?.route?.params?.googleInfo?.familyName || ''}`,
            email: this.props?.route?.params?.googleInfo?.email || '',
            socialId: this.props?.route?.params?.googleInfo?.id,
            type: this.props?.route?.params?.type || 1
        })
    }


    userRegistration() {
        if (this.state.name == '' || this.state.email == '' || this.state.phone == '') {
            Toast.show('Cannot leave a blank field');
        } else {
            if (!this.state.checked) {
                Toast.show('Please check terms and conditions');
            }
            else {
                this.setState({
                    isLoading: true,
                })
                let obj = {
                    name: this.state.name,
                    email: this.state.email,
                    country_code: '+91',
                    terms_and_condition: 1,
                    mobile: this.state.phone,
                    device_token: deviceToken,
                    type: this.state.type,
                    social_id: this.state.socialId
                }
                // console.log("obj", obj)
                this.props.doRegister(obj).then(() => {
                    console.log("---------------", this.props)

                    this.props.navigation.navigate('AuthOtpScreen', { navigation: 'register' })
                })

            }
        }
    }



    _setToggleCheckBox = (value) => {
        //alert(value)

        this.setState((prevState) => ({
            checked: !prevState.checked
        }));

    }

    _onchangeText = (field, value) => {
        this.setState({
            [field]: value
        }, () => {
            if (field == 'pan' && value.length == 10) {
                this._checkPan()
            }
        })
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ marginTop: hp(5) }} />
                <AuthHeader
                    headerText="Create a New Account"
                    subHeaderText="Create an account so that you can manage yours loans"
                    logo={require('../../images/logo.png')}
                />
                <View style={{ marginTop: hp(5) }} />
                <TextInputUtil
                    placeHolder={'Name'}
                    keyboardType={null}
                    prefix={null}
                    hasDevider={false}
                    value={this.state.name}
                    onChangeText={(v) => this._onchangeText('name', v)}
                />
                <View style={{ margin: 10 }} />
                <TextInputUtil
                    placeHolder={'Email'}
                    keyboardType={null}
                    prefix={null}
                    hasDevider={false}
                    onChangeText={(v) => this._onchangeText('email', v)}
                    value={this.state.email} />
                <View style={{ margin: 10 }} />
                <TextInputUtil
                    placeHolder={'Phone'}
                    keyboardType={'phone-pad'}
                    prefix={'+91'}
                    hasDevider={true}
                    onChangeText={(v) => this._onchangeText('phone', v)}
                    value={this.state.phone}
                    maxLength={10} />
                <View style={{ margin: 10 }} />
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        tintColors={this.state.checked ? '#1A5632' : '#FFFFFF'}
                        onFillColor={'#1A5632'}
                        disabled={false}
                        value={this.state.checked}
                        onValueChange={() => this._setToggleCheckBox()}
                    />
                    <ParsedText
                        onPress={() => this._setToggleCheckBox()}
                        style={styles.termsConditionTxt}
                        parse={
                            [
                                {
                                    pattern: /User Consent Form/,
                                    style: { color: Colors.greenColor },
                                },
                                {
                                    pattern: /Data Sharing Policy/,
                                    style: { color: Colors.greenColor },
                                },
                                {
                                    pattern: /Terms and Conditions/,
                                    style: { color: Colors.greenColor },
                                },
                                {
                                    pattern: /Privacy Policy/,
                                    style: { color: Colors.greenColor },
                                },
                            ]
                        }
                    >I agree that all information provided by me is correct. I agree to the terms of User Consent Form and Data Sharing Policy. I also agree with Perpetuity Capital's Terms and Conditions and Privacy Policy
                    </ParsedText>
                </View>
                <View style={{ margin: 10 }} />
                <ButtonUtil active={this.state.checked} label={'Get OTP'} loading={this.state.loading} onPress={() => this.userRegistration()} />

                <View style={{ margin: 10 }} />
                <ButtonUtil textDecorationLine={true} label={'Already have account'} onPress={() => this.props.navigation.navigate('AuthLoginScreen')} />
            </ScrollView>

        )
    }
}

const mapStateToProps = (state) => state.auth;
const mapDispatchToProps = {
    doRegister,
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    termsConditionTxt: {
        fontFamily: fontSelector('medium'),
        fontSize: wp(3.3),
        color: Colors.mainTextColor,
        marginLeft: wp(3),
        marginRight: wp(3),
    }
});
