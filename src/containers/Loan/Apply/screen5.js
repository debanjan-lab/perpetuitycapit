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
import { Picker } from '@react-native-picker/picker';
import ApplyLoanHeader from './components/Heading'
import FooterButton from './components/FooterBtn'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { saveLoan } from '../../../redux/actions/LoanActions';
import ApplyLoanPagination from './components/ApplyLoanPagination'
class LoanApplyScreen5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loan_id: 0,
            screenLoading: true,
            number_of_dependency: null,
            net_monthly_income: null,
            last_annual_turn_over: null,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loan_id: this.props.loan?.data?.loan_id,
                last_annual_turn_over: this.props.loan?.data?.last_annual_turn_over,
                net_monthly_income: this.props.loan?.data?.net_monthly_income,
                number_of_dependency: this.props.loan?.data?.number_of_dependency,
                screenLoading: false
            })
        }, 1000);
    }

    _onchangeText = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    _goNext = (flag) => {
        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let loan_id = this.state.loan_id;
        let step = 5;
        let loan_apply = 0;
        let net_monthly_income = this.state.net_monthly_income;
        let number_of_dependency = this.state.number_of_dependency;
        let last_annual_turn_over = this.state.last_annual_turn_over;
        let obj = {
            user_id: user_id,
            token: token,
            loan_id: loan_id,
            step: step,
            loan_apply: loan_apply,
            net_monthly_income: net_monthly_income,
            number_of_dependency: number_of_dependency,
            last_annual_turn_over: last_annual_turn_over
        }
        //console.log(obj)


        //this.props.navigation.navigate('LoanApplyScreen6')


        this.props.saveLoan(obj).then((res) => {
            console.log("loan apply", this.props)

            let status = this.props.loan?.status;
            let message = this.props.loan?.message;

            if (status) {
                if (flag == 1) {
                    this.props.navigation.navigate('LoanApplyFinalScreen')
                } else {
                    this.props.navigation.navigate('LoanApplyScreen6')
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
        let occupation_type = this.props?.loan?.data?.occupation_type;
        if (occupation_type == 'Salaried') {

        } else {

        }
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
                            heading={"Income Details"}
                            subHeading={"Please fill the details to continue"}
                        />
                        {
                            occupation_type == 'Salaried' ?
                                <TextInputUtil
                                    placeHolder={'Net Monthly Income'}
                                    keyboardType={'numeric'}
                                    prefix={null}
                                    hasDevider={false}
                                    onChangeText={(v) => this._onchangeText('net_monthly_income', v)}
                                    value={this.state.net_monthly_income}
                                    maxLength={6}
                                />
                                :
                                <TextInputUtil
                                    placeHolder={'Last Annual Turn over'}
                                    keyboardType={'numeric'}
                                    prefix={null}
                                    hasDevider={false}
                                    onChangeText={(v) => this._onchangeText('last_annual_turn_over', v)}
                                    value={this.state.last_annual_turn_over}
                                />
                        }

                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Number of Dependencies'}
                            keyboardType={'numeric'}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('number_of_dependency', v)}
                            value={this.state.number_of_dependency}
                        />
                    </ScrollView>
                </View>

                <FooterButton
                    leftNavigation={() => this.props.navigation.navigate('LoanApplyScreen4')}
                    rightNavigation={() => this._goNext()}
                    leftButton={true}
                    applyLoanText={"Apply Loan"}
                    applyLoan={this._applyLoan}
                />
                <ApplyLoanPagination total={7} active={5} />

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
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplyScreen5);



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
