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
import NoRecord from '../../components/NoRecord';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
import AppHeaderInner from '../../components/AppHeaderInner';
import { doLogout } from '../../redux/actions/AuthActions';
import { getTemporaryLoan, getLoanDetails } from '../../redux/actions/LoanActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
const Row = ({ value, onPress }) => {
    return (
        <TouchableOpacity style={styles.successRow} onPress={() => onPress(value?.loan_id)}>
            <Text style={styles.rowText}>Loan Id : {value?.loan_id?.toString()?.padStart(5, '0')}</Text>
            <Text style={styles.rowText}>Date Added : {moment(new Date(value?.created_at)).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </TouchableOpacity>
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
        getTemporaryLoan(obj).then((res) => {
            console.log("incomplete loans", res)
            // alert(res.message)
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
                        headerText="Temporary Saved Loans"
                        navigation={this.props.navigation}
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
});
