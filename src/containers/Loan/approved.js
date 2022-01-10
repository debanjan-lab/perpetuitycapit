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
import AppHeader from '../../components/AppHeader';
import AppHeaderInner from '../../components/AppHeaderInner';
import { doLogout } from '../../redux/actions/AuthActions';
import { getLoanDetails, getApprovedLoan } from '../../redux/actions/LoanActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import NoRecord from '../../components/NoRecord';
const Row = ({ value, onPress }) => {
    return (

        <View style={styles.successRow}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.loanType}>Loan Type</Text>
                    <Text style={styles.loanTypeDecription}>{value?.loan_type} - ₹{((value?.ln_loan_amount) * 1).toLocaleString()}</Text>
                    <Text style={styles.dateText}>{moment(new Date(value?.approved_on)).format('YYYY-MM-DD')}</Text>
                </View>
                <View style={{ flex: .6, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                        <Image
                            source={require('../../images/transaction_history.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.repayButton}>
                        <Text style={styles.repayText}>Repay Interest</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </View>

    )
}

class TemporarySavedLoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: false,
            list: []
        };
    }
    componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this._reload()
        });
    }

    _reload = () => {
        this.setState({ screenLoading: true })
        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let obj = {
            user_id: user_id,
            token: token
        }
        getApprovedLoan(obj).then((res) => {
            console.log("incomplete loans", res)
            //  alert(res.message)
            this.setState({
                list: res.status ? res.data : [],
                screenLoading: false
            })
        })

    }

    _getDetails = (loan_id) => {
        //alert(loan_id)
        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let obj = {
            user_id: user_id,
            token: token,
            loan_id: loan_id
        }
        this.props.getLoanDetails(obj).then(res => {
            let steps = this.props?.loan?.data?.steps
            //alert(steps)
            const screen = `LoanApplyScreen${steps}`
            console.log(screen)
            this.props.navigation.navigate(screen)

        })
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Spinner visible={this.state.screenLoading} />
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Approved Loan"
                        navigation={this.props.navigation}
                        goBack={true}
                    />

                    <View style={{ padding: 20 }}>
                        {!this.state.screenLoading && this.state.list.length < 1 && <NoRecord />}
                        {
                            this.state.list.map((value, key) => {
                                return (
                                    <Row key={key} value={value} onPress={this._getDetails} />
                                )
                            })
                        }







                    </View>
                </View>
            </ScrollView>
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
    getLoanDetails
}


export default connect(mapStateToProps, mapDispatchToProps)(TemporarySavedLoan);


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    successRow: {
        backgroundColor: Colors.lightGreen,
        marginTop: 20,
        padding: 20,
        borderRadius: 10
    },
    rowText: {
        color: Colors.mainTextColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '500',
        padding: 5
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    repayButton: {
        padding: 8,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#1A5632',
        borderRadius: 5
    },
    repayText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    dateText: {
        color: '#1A5632',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10
    },
    loanType: {
        color: '#1A5632',
        fontSize: 15,
        fontWeight: '500',
    },
    loanTypeDecription: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        margin: 2
    }


});
