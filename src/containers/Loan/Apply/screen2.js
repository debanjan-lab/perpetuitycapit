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
import ApplyLoanPagination from './components/ApplyLoanPagination'
import ButtonUtil from '../../../components/button'
import { Picker } from '@react-native-picker/picker';
import ApplyLoanHeader from './components/Heading'
import FooterButton from './components/FooterBtn'
import { connect } from 'react-redux';
import { getStates } from '../../../redux/actions/StateActions';
import { getCities } from '../../../redux/actions/CityActions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveLoan } from '../../../redux/actions/LoanActions';
import Spinner from 'react-native-loading-spinner-overlay';
class LoanApplyScreen2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: true,
            loading: false,
            place_type: null,
            current_address: null,
            current_pincode: null,
            current_state: null,
            current_city: null,
            loadingCity: false,
            showLivingWith: false,
            living_with: null,
            monthly_rent: null,
            showDatePicker: false,
            staying_period: null,
            loan_id: 0

        };
    }
    componentDidMount() {

        setTimeout(() => {
            this.setState({
                loan_id: this.props.loan?.data?.loan_id,
                place_type: this.props.loan?.data?.place_type,
                current_address: this.props.loan?.data?.current_address,
                current_pincode: this.props.loan?.data?.current_pincode,
                current_state: this.props.loan?.data?.current_state,
                current_city: this.props.loan?.data?.current_city,
                living_with: this.props.loan?.data?.living_with,
                monthly_rent: this.props.loan?.data?.monthly_rent,
                staying_period: this.props.loan?.data?.staying_period,
                screenLoading: false,
            }, () => {
                this._getCity(this.state.current_state)
                //console.log("==========", this.props.loan?.data)
            })
        }, 1000);

    }

    _onchangeText = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    _getCity = (value) => {
        this.setState({ loadingCity: true })
        this.setState({ current_state: value }, () => {
            let obj = {
                token: this.props.auth.api_token,
                state_id: value
            }
            this.props.getCities(obj).then(() => {
                this.setState({ loadingCity: false })
            })
        })
    }

    _getLivingWith = (value) => {
        if (value == 'Rented') {
            this.setState({
                place_type: value,
                showLivingWith: true
            })
        } else {
            this.setState({
                place_type: value,
                showLivingWith: false
            })
        }
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
            staying_period: date,
            showDatePicker: false
        })
    }

    _goNext = (flag) => {

        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let loan_id = this.state.loan_id;
        let step = 2;
        let loan_apply = 0;
        let staying_period = this.state.staying_period;
        let current_address = this.state.current_address;
        let current_pincode = this.state.current_pincode;
        let current_state = this.state.current_state;
        let current_city = this.state.current_city;
        let living_with = this.state.living_with;
        let monthly_rent = this.state.monthly_rent;
        let place_type = this.state.place_type;

        let obj = {
            user_id: user_id,
            token: token,
            loan_id: loan_id,
            step: step,
            loan_apply: loan_apply,
            staying_period: staying_period,
            current_address: current_address,
            current_pincode: current_pincode,
            current_state: current_state,
            current_city: current_city,
            living_with: living_with,
            monthly_rent: monthly_rent,
            place_type: place_type
        }
        //console.log("step2 data", obj)
        this.props.saveLoan(obj).then((res) => {
            console.log("loan apply", this.props)
            let status = this.props.loan?.status;
            let message = this.props.loan?.message;
            if (status) {
                if (flag == 1) {
                    this.props.navigation.navigate('LoanApplyFinalScreen')
                } else {
                    this.props.navigation.navigate('LoanApplyScreen3')
                }

            } else {
                alert(message)
            }

        })
    }

    _applyLoan = () => {
        this._goNext(1)
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
                            heading={"Current Address"}
                            subHeading={"Please fill the details to continue"}

                        />
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.place_type}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._getLivingWith(itemValue)}
                            >
                                <Picker.Item color={Colors.mainTextColor} label="--Place to Stay--" value="" />
                                <Picker.Item color={Colors.mainTextColor} label="Rented" value="Rented" />
                                <Picker.Item color={Colors.mainTextColor} label="Own House" value="Own House" />
                                <Picker.Item color={Colors.mainTextColor} label="PG" value="PG" />
                                <Picker.Item color={Colors.mainTextColor} label="Company Accomodation" value="Company Accomodation" />
                            </Picker>
                        </View>


                        {
                            this.state.showLivingWith &&
                            <>
                                <View style={{ margin: 10 }} />
                                <View style={styles.pickerWrapper}>
                                    <Picker
                                        selectedValue={this.state.living_with}
                                        style={{ flex: 1 }}
                                        mode={"dialog"}
                                        onValueChange={(itemValue) => this.setState({ living_with: itemValue })}
                                    >
                                        <Picker.Item label="--Living With--" value="" />
                                        <Picker.Item label="Family" value="Family" />
                                        <Picker.Item label="Friends" value="Friends" />
                                        <Picker.Item label="Alone" value="Alone" />

                                    </Picker>
                                </View>
                            </>
                        }

                        {
                            this.state.showLivingWith &&
                            <>
                                <View style={{ margin: 10 }} />
                                <TextInputUtil
                                    placeHolder={'Monthly Rent'}
                                    keyboardType={"numeric"}
                                    prefix={null}
                                    hasDevider={false}
                                    onChangeText={(v) => this._onchangeText('monthly_rent', v)}
                                    value={this.state.monthly_rent}
                                    maxLength={5}

                                />
                            </>
                        }


                        {
                            this.state.showDatePicker &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={this.setDate}
                                maximumDate={new Date()}
                            />
                        }

                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Staying Period'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('staying_period', v)}
                            value={this.state.staying_period}
                            editable={false}
                            rightIcon={require('../../../images/calendar.png')}
                            onPressRightIcon={() => this.setState({ showDatePicker: true })}
                        />



                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Address'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('current_address', v)}
                            value={this.state.current_address}
                        />
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Pic Code'}
                            keyboardType={"numeric"}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('current_pincode', v)}
                            value={this.state.current_pincode}
                            maxLength={6}
                        />
                        <View style={{ margin: 10 }} />
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.current_state}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._getCity(itemValue)}
                            >
                                <Picker.Item color={Colors.mainTextColor} label="--Select State--" value="" />
                                {
                                    this.props.states.data.map((value, key) => {
                                        return (
                                            <Picker.Item color={Colors.mainTextColor} label={value.state_name} value={value.state_id} key={key} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>

                        <View style={{ margin: 10 }} />
                        {
                            !this.state.loadingCity &&
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={this.state.current_city}
                                    style={{ flex: 1 }}
                                    mode={"dialog"}
                                    onValueChange={(itemValue) => this.setState({ current_city: itemValue })}
                                >
                                    <Picker.Item color={Colors.mainTextColor} label="--Select City--" value="" />

                                    {
                                        this.props.cities.data.map((value, key) => {
                                            return (
                                                <Picker.Item label={value.city_name} value={value.city_id} key={key} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        }

                    </ScrollView>
                </View>
                <FooterButton
                    leftNavigation={() => this.props.navigation.navigate('LoanApplyScreen1')}
                    rightNavigation={() => this._goNext()}
                    leftButton={true}
                    applyLoanText={"Apply Loan"}
                    applyLoan={this._applyLoan}
                />
                <ApplyLoanPagination total={7} active={2} />
            </View>

        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        loan: state.loan,
        states: state.states,
        cities: state.cities
    };
};

const mapDispatchToProps = {
    saveLoan,
    getCities,
    getStates
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanApplyScreen2);

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
    icon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    footerWrapper: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    pickerWrapper: {
        flexDirection: 'row',
        backgroundColor: '#F1F6FC',
        borderRadius: wp(12),
        alignItems: 'center',
    }
});
