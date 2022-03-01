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
import ApplyLoanPagination from './components/ApplyLoanPagination'
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { saveLoan } from '../../../redux/actions/LoanActions';
class LoanApplyScreen4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: true,
            company_name: null,
            company_address: null,
            company_pincode: null,
            loan_id: 0
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loan_id: this.props.loan?.data?.loan_id,
                company_name: this.props.loan?.data?.company_name,
                company_address: this.props.loan?.data?.company_address,
                company_pincode: this.props.loan?.data?.company_pincode,
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
        let step = 4;
        let loan_apply = 0;
        let company_name = this.state.company_name;
        let company_address = this.state.company_address;
        let company_pincode = this.state.company_pincode;
        let obj = {
            user_id: user_id,
            token: token,
            loan_id: loan_id,
            step: step,
            loan_apply: loan_apply,
            company_name: company_name,
            company_address: company_address,
            company_pincode: company_pincode,
        }
        //console.log(obj)


        // this.props.navigation.navigate('LoanApplyScreen5')


        this.props.saveLoan(obj).then((res) => {
            console.log("loan apply", this.props)
            let status = this.props.loan?.status;
            let message = this.props.loan?.message;

            if (status) {
                if (flag == 1) {
                    this.props.navigation.navigate('LoanApplyFinalScreen')
                } else {
                    this.props.navigation.navigate('LoanApplyScreen5')
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
                            heading={"Work Address"}
                            subHeading={"Please fill the details to continue"}
                        />

                        <TextInputUtil
                            placeHolder={'Company Name'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('company_name', v)}
                            value={this.state.company_name}
                        />
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Address'}
                            keyboardType={null}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('company_address', v)}
                            value={this.state.company_address}
                        />
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Pin Code'}
                            keyboardType={'numeric'}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('company_pincode', v)}
                            value={this.state.company_pincode}
                            maxLength={6}
                        />


                    </ScrollView>
                </View>

                <FooterButton
                    leftNavigation={() => this.props.navigation.navigate('LoanApplyScreen3')}
                    rightNavigation={() => this._goNext()}
                    leftButton={true}
                    applyLoanText={"Apply Loan"}
                    applyLoan={this._applyLoan}
                />
                <ApplyLoanPagination total={7} active={4} />


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
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplyScreen4);



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
