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
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
//import Modal from "react-native-modal";
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import ParsedText from 'react-native-parsed-text';
import Colors from '../../constants/Colors';
import LoginHeader from '../../components/LoginHeader';
//import CountryModal from '../../components/CountryModal';
import ErrorModal from '../../components/ErrorModal';
import { API, deviceToken } from '../../constants/Constants';

class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            mobile: '',
            name: '',
            email: '',
            checkbox: 0,
            isModalVisible: false,
            errorText: '',
            countryAllCodes: [],
            selectedCode: '91',
            countryId: '',
            socialId: '',
            type: 1,
        };
    }
    componentDidMount() {
        //this.getCountryCodes();
        if (this.props.route.params.googleInfo != '') {
            this.setState({
                name: this.props.route.params.googleInfo.givenName + ' ' + this.props.route.params.googleInfo.familyName,
                email: this.props.route.params.googleInfo.email,
                socialId: this.props.route.params.googleInfo.id,
                type: this.props.route.params.type
            })
        }

    }
    // getCountryCodes() {
    //     //console.log('qqqq', this.state.countryAllCodes);
    //     axios.get('https://foure.nodejsdapldevelopments.com/perpetuitycapital/public/api/v1/Auth/get-country-code')
    //         .then(response => {
    //             //console.log(response.data.data);
    //             var countryCodesTemp = response.data.data;
    //             //console.log(countryCodesTemp.length);
    //             var countryCodes = [];
    //             for (var i = 0; i < countryCodesTemp.length; i++) {
    //                 countryCodes.push({
    //                     index: i,
    //                     id: i + 1,
    //                     country: countryCodesTemp[i].country_name,
    //                     code: countryCodesTemp[i].country_code,
    //                     selected: 'no'
    //                 });
    //             }
    //             this.setState({
    //                 countryAllCodes: countryCodes
    //             })
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }



    validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());

    }

    userRegistration() {
        if (
            this.state.name == '' &&
            this.state.email == '' &&
            this.state.mobile == ''
        ) {
            Toast.show('Cannot leave a blank field');
        } else {

            if (this.state.name == '') {
                Toast.show('Please enter Name');
            } else if (this.state.email == '') {
                Toast.show('Please enter your Email');
            } else if (!this.validateEmail(this.state.email)) {
                Toast.show('Please enter valid Email');
            } else if (this.state.mobile == '') {
                Toast.show('Please enter your mobile number');
            } else if (this.state.mobile.length != 10) {
                Toast.show('Please enter a valid mobile number');
            } else if (!this.state.checkbox) {
                Toast.show('Please check terms and conditions');
            }
            else {
                this.setState({
                    isLoading: true,
                })
                var data = new FormData();
                data.append('name', this.state.name);
                data.append('email', this.state.email);
                data.append('country_code', '+91');
                data.append('mobile', this.state.mobile);
                data.append('terms_and_condition', this.state.checkbox);
                data.append('social_id', this.state.socialId);
                data.append('type', this.state.type);
                data.append('device_token', deviceToken);
                console.log(data);
                axios
                    .post(API + 'registration', data)
                    .then(res => {
                        console.log('get registration data', res);
                        if (res.data.message != "email already exist") {
                            if (res.data.message != "mobile number already exist") {
                                this.setState({ isLoading: false, }, () =>
                                    this.props.navigation.navigate('OtpScreen', { userData: res.data.data, mobile: this.state.mobile, countryCode: '+91', screenName: 'registration', userInput: res.data.input })
                                )
                                //console.log('ok');
                            }
                            else {
                                this.setState({
                                    isLoading: false,
                                    errorText: res.data.message,
                                    isModalVisible: true
                                })
                            }
                        }
                        else {
                            this.setState({
                                isLoading: false,
                                errorText: res.data.message,
                                isModalVisible: true
                            })
                        }

                    }).catch(err => {
                        console.log("error", err.response)
                    })
            }
        }
    }

    toggleModal = (childData) => {
        this.setState({
            isModalVisible: childData
        })
    }

    // onCountryPressed = (code, country, id, index) => {
    //     console.log('asdasd', code, country, id, index);

    //     let arrTemp = this.state.countryAllCodes
    //     arrTemp[index]["selected"] = 'yes'
    //     this.setState({
    //         countryAllCodes: arrTemp,
    //         selectedCode: code,
    //     }, () => console.log('1111111', this.state.countryAllCodes))
    // }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <ScrollView>
                    <LoginHeader
                        headerText="Create a New Account"
                        subHeaderText="Create an account so that you can manage yours loans"
                        mainProps={this.props}
                    />
                    <View
                        style={{
                            marginHorizontal: wp(6),
                            marginVertical: wp(6),
                        }}>
                        <TextInput
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                            placeholder='Name'
                            placeholderTextColor={Colors.subTextColor}
                            style={{
                                flex: 1,
                                color: Colors.mainTextColor,
                                fontFamily: fontSelector('regular'),
                                flexDirection: 'row',
                                backgroundColor: '#F1F6FC',
                                borderRadius: wp(12),
                                alignItems: 'center',
                                paddingLeft: wp(5),
                                marginTop: wp(5),
                            }}
                        />
                        <TextInput
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                            placeholder='Email'
                            placeholderTextColor={Colors.subTextColor}
                            style={{
                                flex: 1,
                                color: Colors.mainTextColor,
                                fontFamily: fontSelector('regular'),
                                flexDirection: 'row',
                                backgroundColor: '#F1F6FC',
                                borderRadius: wp(12),
                                alignItems: 'center',
                                paddingLeft: wp(5),
                                marginTop: wp(5),
                                marginBottom: wp(2)
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: '#F1F6FC',
                                borderRadius: wp(12),
                                alignItems: 'center',
                                marginTop: wp(3),
                                marginBottom: wp(3)
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.setState({ isModalVisible: true })}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: wp(5)
                                }}>
                                <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.mainTextColor, marginRight: wp(2) }}>+{this.state.selectedCode}</Text>
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
                                maxLength={10}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.checkbox == 0) {
                                    this.setState({ checkbox: 1 })
                                } else {
                                    this.setState({ checkbox: 0 })
                                }
                            }

                            }
                            style={{
                                marginVertical: wp(7),
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Image source={this.state.checkbox ? require('../../images/checkbox.png') : require('../../images/uncheck_box.png')} style={{ height: wp(4), width: wp(4), resizeMode: 'contain', marginTop: wp(1) }} />


                            <ParsedText
                                style={{
                                    fontFamily: fontSelector('medium'),
                                    fontSize: wp(3.3),
                                    color: Colors.mainTextColor,
                                    marginLeft: wp(3)
                                }}
                                parse={
                                    [
                                        {
                                            pattern: /User Consent Form/,
                                            style: { color: Colors.greenColor },
                                            //onPress: this.privacyPolicyPressed
                                        },
                                        {
                                            pattern: /Data Sharing Policy/,
                                            style: { color: Colors.greenColor },
                                            //onPress: this.privacyPolicyPressed
                                        },
                                        {
                                            pattern: /Terms and Conditions/,
                                            style: { color: Colors.greenColor },
                                            //onPress: this.privacyPolicyPressed
                                        },
                                        {
                                            pattern: /Privacy Policy/,
                                            style: { color: Colors.greenColor },
                                            //onPress: this.privacyPolicyPressed
                                        },
                                    ]
                                }
                            >I agree that all information provided by me is correct. I agree to the terms of User Consent Form and Data Sharing Policy. I also agree with Perpetuity Capital's Terms and Conditions and Privacy Policy
                            </ParsedText>


                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.userRegistration()}
                            style={{
                                backgroundColor: Colors.greenColor,
                                alignItems: 'center',
                                paddingVertical: wp(3.5),
                                borderRadius: wp(7),
                                //marginTop: wp(5)
                            }}
                        >
                            {!this.state.isLoading ?
                                <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.whiteColor, }}>Get OTP</Text> :
                                <ActivityIndicator size="small" color={Colors.whiteColor} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('LoginScreen')}
                            style={{ marginTop: wp(8), alignItems: 'center' }}
                        >
                            <Text style={{ fontFamily: fontSelector('medium'), fontSize: wp(3.8), color: Colors.greenColor, textDecorationLine: 'underline' }}>Already have an account</Text>
                        </TouchableOpacity>
                        {/* <CountryModal
                            isModalVisible={this.state.isModalVisible}
                            codeData={this.state.countryAllCodes}
                            toggleModal={this.toggleModal}
                            onCountryPressed={this.onCountryPressed}
                        /> */}
                        <ErrorModal
                            isModalVisible={this.state.isModalVisible}
                            title={this.state.errorText}
                            toggleModal={this.toggleModal}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }



}


export default RegistrationScreen;

