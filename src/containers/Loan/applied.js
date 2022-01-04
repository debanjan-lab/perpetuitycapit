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
import NoRecord from '../../components/NoRecord';
import { doLogout } from '../../redux/actions/AuthActions';
import { getLoanDetails, getAppliedLoan } from '../../redux/actions/LoanActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
const Row = ({ value, onPress }) => {
    return (
        <View style={styles.rowContainer}>
            <View style={styles.rowContainerHeader}>
                <Text style={styles.rowContainerHeaderLeft}>{moment(new Date(value?.created_at)).format('YYYY-MM-DD')}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        value?.status == 3 &&
                        <>
                            <Image
                                source={require('../../images/tick.png')}
                                style={styles.icon}
                            />
                            <View style={{ margin: 2 }} />
                            <Text style={styles.rowContainerHeaderRight}>Approved</Text>
                        </>
                    }
                    {
                        value?.status == 2 &&

                        <>
                            <Image
                                source={require('../../images/remove.png')}
                                style={styles.icon}
                            />
                            <View style={{ margin: 2 }} />
                            <Text style={styles.rowContainerHeaderRightRed}>Rejected</Text>
                        </>

                    }

                    {
                        (value?.status == 0 || value?.status == 1 || value?.status == 4) &&

                        <>
                            <Text style={styles.rowContainerHeaderRight}>Waiting</Text>
                        </>

                    }

                </View>
            </View>
            <View style={styles.rowContainerBody}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.rowContainerBodyLeft1}>Loan Type</Text>
                    <Text style={styles.rowContainerBodyRight1}>Amount</Text>
                </View>
                <View style={{ margin: 2 }} />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.rowContainerBodyLeft2}>{value?.loan_type}</Text>
                    <Text style={styles.rowContainerBodyRight2}>₹{((value?.loan_amount) * 1).toLocaleString()}</Text>
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
        getAppliedLoan(obj).then((res) => {
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
                        headerText="My Applied Loan"
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
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    rowContainer: {
        borderWidth: 1,
        borderColor: '#C7C7C7',
        borderRadius: 10,
        marginTop: 20,
    },
    rowContainerHeader: {
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#EEF9EF',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    rowContainerHeaderLeft: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 15
    },
    rowContainerHeaderRight: {
        color: '#1A5632',
        fontWeight: '700',
        fontSize: 15
    },
    rowContainerHeaderRightRed: {
        color: '#FC7D7B',
        fontWeight: '700',
        fontSize: 15
    },
    rowContainerBody: {
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FFFFFF'
    },
    rowContainerBodyLeft1: {
        color: '#C7C7C7',
        fontWeight: '700',
        fontSize: 15
    },
    rowContainerBodyRight1: {
        color: '#C7C7C7',
        fontWeight: '700',
        fontSize: 15
    },
    rowContainerBodyLeft2: {
        color: '#1A5632',
        fontWeight: '700',
        fontSize: 20
    },
    rowContainerBodyRight2: {
        color: '#1A5632',
        fontWeight: '700',
        fontSize: 20
    },


});
