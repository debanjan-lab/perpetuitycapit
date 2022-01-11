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
import fontSelector from '../../../constants/FontSelectors';
import Colors from '../../../constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeaderInner from '../../../components/AppHeaderInner';
import TextInputUtil from '../../../components/textInput'
import ButtonUtil from '../../../components/button'

import ApplyLoanHeader from './components/Heading'
import FooterButton from './components/FooterBtn'
import ApplyLoanPagination from './components/ApplyLoanPagination'
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { checkPan } from '../../../redux/actions/pan';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveLoan } from '../../../redux/actions/LoanActions';
import Spinner from 'react-native-loading-spinner-overlay';
class LoanApplyScreen1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: true,
            loading: false,
            pan: null,
            name: null,
            dob: null,
            status: null,
            aadharno: null,
            mobile: null,
            showDatePicker: false,
            selectedDate: new Date(),
            loan_id: 0

        };
    }
    componentDidMount() {
        const start = this.props?.route?.params?.start || 0;
        if (start) {
            this.setState({
                loan_id: 0,
                pan: null,
                name: null,
                dob: null,
                status: null,
                aadharno: null,
                mobile: null,
                screenLoading: false,
            })

        } else {
            setTimeout(() => {
                this.setState({
                    loan_id: this.props.loan?.data?.loan_id || 0,
                    pan: this.props?.loan?.data?.pan,
                    name: this.props?.loan?.data?.name,
                    dob: this.props?.loan?.data?.dob,
                    status: this.props?.loan?.data?.status,
                    aadharno: this.props?.loan?.data?.aadharno,
                    mobile: this.props.auth.mobile,
                    screenLoading: false,
                })
            }, 1000);

        }
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

    _checkPan = () => {
        this.setState({ loading: true })
        let obj = {
            token: this.props.auth.api_token,
            pan_number: this.state.pan
        }
        checkPan(obj).then(res => {
            this.setState({ loading: false })
            if (res.status) {
                let data = res.data;
                console.log("data", data)
                let full_name = data.full_name;
                this.setState({
                    name: full_name
                })

            } else {
                alert(res.message)
                this.setState({
                    name: null
                })
            }
        })
    }

    setDate = (event, date) => {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var date = day + '-' + month + '-' + year;
        console.log("date", date)
        this.setState({
            selectedDate: new Date(year, month - 1, day),
            dob: date,
            showDatePicker: false
        })
    }

    _togglDate = () => {
        this.setState(prevState => {
            return {
                showDatePicker: !prevState.showDatePicker
            }
        })
    }


    _goNext = () => {

        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let loan_id = this.state.loan_id;
        let step = 1;
        let name = this.state.name;
        let dob = this.state.dob;
        let pan_number = this.state.pan;
        let mobile = this.state.mobile;
        let status = this.state.status;
        let aadharno = this.state.aadharno;

        let obj = {
            user_id: user_id,
            token: token,
            loan_id: loan_id,
            step: step,
            name: name,
            dob: dob,
            pan_number: pan_number,
            mobile: mobile,
            status: status,
            aadharno: aadharno
        }
        this.props.saveLoan(obj).then((res) => {
            console.log("loan apply", this.props)
            let status = this.props.loan?.status;
            let message = this.props.loan?.message;
            if (status) {
                this.props.navigation.navigate('LoanApplyScreen2')
            } else {
                alert(message)
            }

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.screenLoading} />
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Apply for loan"
                        navigation={this.props.navigation}

                    />
                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <ApplyLoanHeader
                            heading={"Personal Details"}
                            subHeading={"Please fill the details to continue"}
                        />
                        <View>
                            <TextInputUtil
                                placeHolder={'PAN Number'}
                                keyboardType={null}
                                prefix={null}
                                hasDevider={false}
                                onChangeText={(v) => this._onchangeText('pan', v)}
                                value={this.state.pan}
                                maxLength={10}
                                autoCapitalize={"characters"}
                            />
                            {
                                this.state.loading &&
                                <View style={{ position: 'absolute', right: 10, top: '25%' }}>
                                    <ActivityIndicator color={'#1A5632'} />
                                </View>
                            }


                        </View>


                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Name'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('name', v)}
                            value={this.state.name}
                            editable={false}
                        />
                        <View style={{ margin: 10 }} />

                        {
                            this.state.showDatePicker &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.selectedDate}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={this.setDate}
                                maximumDate={new Date()}
                            />
                        }

                        <TextInputUtil
                            placeHolder={'Date of Birth'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('dob', v)}
                            value={this.state.dob}
                            editable={false}
                            rightIcon={require('../../../images/calendar.png')}
                            onPressRightIcon={() => this.setState({ showDatePicker: true })}
                        />

                        <View style={{ margin: 10 }} />
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.status}
                                style={{ flex: 1, }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this.setState({ status: itemValue })}
                            >
                                <Picker.Item color={Colors.mainTextColor} label="--Select Marital Status--" value="" />
                                <Picker.Item color={Colors.mainTextColor} label="Single" value="Unmarried" />
                                <Picker.Item color={Colors.mainTextColor} label="Married" value="Married" />
                                <Picker.Item color={Colors.mainTextColor} label="Divorced" value="Divorced" />
                            </Picker>
                        </View>

                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Aadhar No'}
                            keyboardType={"numeric"}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('aadharno', v)}
                            value={this.state.aadharno}
                            maxLength={12}
                            autoCapitalize={"characters"}

                        />


                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            prefix={'+91'}
                            keyboardType={'phone-pad'}
                            hasDevider={true}
                            onChangeText={this._onchangeText}
                            value={this.state.mobile}
                            maxLength={10}
                            editable={false}
                        />

                    </ScrollView>
                </View>
                <FooterButton
                    leftNavigation={() => this.props.navigation.goBack()}
                    rightNavigation={() => this._goNext()}
                    leftButton={false}
                />
                <ApplyLoanPagination total={7} active={1} />
            </View>

        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        loan: state.loan,
    };
};

const mapDispatchToProps = {
    saveLoan,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanApplyScreen1);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    heading: {
        color: Colors.greenColor,
        fontSize: wp(6),
        fontFamily: fontSelector('medium'),
    },
    subHeading: {
        color: '#D5D5D5',
        fontSize: wp(4),
        fontFamily: fontSelector('regular'),
        fontWeight: '700'
    },
    pickerWrapper: {
        flexDirection: 'row',
        backgroundColor: '#F1F6FC',
        borderRadius: wp(12),
        alignItems: 'center',
    }
});
