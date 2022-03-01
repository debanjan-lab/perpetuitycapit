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
import ApplyLoanPagination from './components/ApplyLoanPagination'
import TextInputUtil from '../../../components/textInput'
import ButtonUtil from '../../../components/button'
import { Picker } from '@react-native-picker/picker';
import ApplyLoanHeader from './components/Heading'
import FooterButton from './components/FooterBtn'
import { connect } from 'react-redux';
import { saveLoan } from '../../../redux/actions/LoanActions';
import Spinner from 'react-native-loading-spinner-overlay';
class LoanApplyScreen3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: true,
            loading: false,
            education_type: null,
            occupation_type: null,
            experience: null,
            loan_id: 0
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loan_id: this.props.loan?.data?.loan_id,
                education_type: this.props.loan?.data?.education_type,
                occupation_type: this.props.loan?.data?.occupation_type,
                experience: this.props.loan?.data?.experience,
                screenLoading: false
            })
        }, 1000);
    }


    _goNext = (flag) => {
        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let loan_id = this.state.loan_id;
        let step = 3;
        let loan_apply = 0;
        let occupation_type = this.state.occupation_type;
        let experience = this.state.experience;
        let education_type = this.state.education_type;
        let obj = {
            user_id: user_id,
            token: token,
            loan_id: loan_id,
            step: step,
            loan_apply: loan_apply,
            occupation_type: occupation_type,
            experience: experience,
            education_type: education_type,
        }
        console.log(obj)
        this.props.saveLoan(obj).then((res) => {
            console.log("loan apply", this.props)
            let status = this.props.loan?.status;
            let message = this.props.loan?.message;

            if (status) {
                if (flag == 1) {
                    this.props.navigation.navigate('LoanApplyFinalScreen')
                } else {
                    this.props.navigation.navigate('LoanApplyScreen4')
                }

            } else {
                alert(message)
            }

        })
    }

    _onchangeText = (field, value) => {
        this.setState({
            [field]: value
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
                            heading={"Education & Work"}
                            subHeading={"Please fill the details to continue"}

                        />
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.education_type}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this.setState({ education_type: itemValue })}
                            >
                                <Picker.Item color={Colors.mainTextColor} label="--Select Education Type--" value="" />
                                <Picker.Item color={Colors.mainTextColor} label="High School" value="High School" />
                                <Picker.Item color={Colors.mainTextColor} label="Graduate" value="Graduate" />
                                <Picker.Item color={Colors.mainTextColor} label="Post Graduate" value="Post Graduate" />
                            </Picker>
                        </View>
                        <View style={{ margin: 10 }} />
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.occupation_type}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this.setState({ occupation_type: itemValue })}
                            >
                                <Picker.Item color={Colors.mainTextColor} label="--Occupation Type--" value="" />
                                <Picker.Item color={Colors.mainTextColor} label="Salaried" value="Salaried" />
                                <Picker.Item color={Colors.mainTextColor} label="Self Employed" value="Self Employed" />
                            </Picker>
                        </View>
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Total Number of Experaince'}
                            keyboardType={"numeric"}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('experience', v)}
                            value={this.state.experience}
                            maxLength={2}
                        />
                    </ScrollView>
                </View>
                <FooterButton
                    leftNavigation={() => this.props.navigation.navigate('LoanApplyScreen2')}
                    rightNavigation={() => this._goNext()}
                    leftButton={true}
                    applyLoanText={"Apply Loan"}
                    applyLoan={this._applyLoan}
                />
                <ApplyLoanPagination total={7} active={3} />
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
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplyScreen3);


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
