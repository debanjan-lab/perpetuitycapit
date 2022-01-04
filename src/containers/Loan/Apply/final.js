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
import ButtonUtil from '../../../components/button'

import { connect } from 'react-redux';
import { finalApplyLoan } from '../../../redux/actions/LoanActions';

import Spinner from 'react-native-loading-spinner-overlay';
const Row = ({ heading, description, index, navigation }) => {
    const screen = `LoanApplyScreen${index}`
    console.log(screen)
    return (
        <View style={styles.detailsRow}>
            <View style={styles.detailsRowSub}>
                <Text style={styles.detailsRowHeading}>{heading}</Text>
                <TouchableOpacity onPress={() => navigation.navigate(screen)}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.detailsRowDescription}>{description}</Text>
        </View>
    )
}


class LoanApplyFinalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: true,
            loading: false,
            list: [],
            maxStep: 1
        };
    }
    componentDidMount() {
        console.log("================", this.props.loan)
        setTimeout(() => {
            this.setState({
                maxStep: this.props.loan?.data?.steps,
                screenLoading: false,
            })
        }, 1000);
    }


    _finalApplyLoan = () => {
        let obj = {
            token: this.props.auth.api_token,
            user_id: this.props.auth.user_id,
            loan_id: this.props.loan?.data?.loan_id
        }
        finalApplyLoan(obj).then(res => {
            console.log(res)
            alert(res.message)
            this.props.navigation.navigate('DashboardScreen')
        })
    }

    _getHeading = (k) => {
        let headerText = ''
        if (k == 0) {
            headerText = 'Personal Details'
        }
        if (k == 1) {
            headerText = 'Current Address'
        }
        if (k == 2) {
            headerText = 'Education & Work'
        }
        if (k == 3) {
            headerText = 'Work Address'
        }
        if (k == 4) {
            headerText = 'Income Details'
        }
        if (k == 5) {
            headerText = 'Vehicle Details'
        }

        return (
            <View style={styles.mainHeadingWrapper}>
                <Text style={styles.mainHeadingText}>{headerText}</Text>
            </View>
        )
    }

    _getData = (k) => {
        if (k == 0) {
            return (
                <>
                    <Row
                        heading={"PAN Number"}
                        description={this.props.loan?.data?.pan}
                        index={1}
                        navigation={this.props.navigation}
                    />
                    <Row
                        heading={"Full Name"}
                        description={this.props.loan?.data?.name}
                        index={1}
                        navigation={this.props.navigation}
                    />
                    <Row
                        heading={"DOB"}
                        description={this.props.loan?.data?.dob}
                        index={1}
                        navigation={this.props.navigation}
                    />
                    <Row
                        heading={"Mobile Number"}
                        description={this.props.loan?.data?.mobile}
                        index={1}
                        navigation={this.props.navigation}
                    />
                </>
            )
        }
        if (k == 1) {
            return (
                <>
                    <Row
                        heading={"Place of Stay"}
                        description={this.props.loan?.data?.place_type}
                        index={2}
                        navigation={this.props.navigation}
                    />
                    <Row
                        heading={"Address"}
                        description={this.props.loan?.data?.current_address}
                        index={2}
                        navigation={this.props.navigation}
                    />
                    <Row
                        heading={"Pin Code"}
                        description={this.props.loan?.data?.current_pincode}
                        index={2}
                        navigation={this.props.navigation}
                    />
                    <Row
                        heading={"Select City"}
                        index={2}
                        description={this.props.cities.data.find(value => value.city_id == this.props.loan?.data?.current_city)?.city_name}
                        navigation={this.props.navigation}
                    />
                </>
            )
        }
        if (k == 2) {
            return (
                <>
                    <Row
                        index={3}
                        heading={"Select education type"}
                        description={this.props.loan?.data?.education_type}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={3}
                        heading={"Choose work type"}
                        description={this.props.loan?.data?.occupation_type}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={3}
                        heading={"Total Number of experiance"}
                        description={this.props.loan?.data?.experience}
                        navigation={this.props.navigation}
                    />
                </>
            )
        }
        if (k == 3) {
            return (
                <>
                    <Row
                        index={4}
                        heading={"Company Name"}
                        description={this.props.loan?.data?.company_name}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={4}
                        heading={"Company Address"}
                        description={this.props.loan?.data?.company_address}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={4}
                        heading={"Company Pin Code"}
                        description={this.props.loan?.data?.company_pincode}
                        navigation={this.props.navigation}
                    />
                </>
            )
        }
        if (k == 4) {
            return (
                <>
                    <Row
                        index={5}
                        heading={"Net Monthy income"}
                        description={this.props.loan?.data?.net_monthly_income}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={5}
                        heading={"Number of Dependacies"}
                        description={this.props.loan?.data?.number_of_dependency}
                        navigation={this.props.navigation}
                    />
                </>
            )
        }
        if (k == 5) {
            return (
                <>
                    <Row
                        index={6}
                        heading={"Loan Type"}
                        description={this.props.loan?.data?.loan_type}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={6}
                        heading={"Vehicle Type"}
                        description={this.props.loan?.data?.vehicle_type}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={6}
                        heading={"Brand Name"}
                        description={this.props.loan?.data?.vehicle_brand}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={6}
                        heading={"Model Name"}
                        description={this.props.loan?.data?.model_no}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={6}
                        heading={"Vehicle Price"}
                        description={this.props.loan?.data?.vehicle_price}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={6}
                        heading={"Loan Tenure"}
                        description={this.props.loan?.data?.loan_tenure}
                        navigation={this.props.navigation}
                    />
                    <Row
                        index={6}
                        heading={"Loan Amount"}
                        description={this.props.loan?.data?.loan_amount}
                        navigation={this.props.navigation}
                    />
                </>
            )
        }
    }



    render() {
        const arr = new Array(this.state.maxStep).fill(0)
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Spinner visible={this.state.screenLoading} />
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Apply for loan"
                        navigation={this.props.navigation}

                    />

                    {
                        arr.map((v, k) => {
                            return (
                                <View key={k}>
                                    {this._getHeading(k)}
                                    {this._getData(k)}
                                </View>
                            )
                        })
                    }

                    <View style={{ padding: 20 }}>
                        <ButtonUtil
                            active={true}
                            label={'Apply Loan'}
                            loading={this.state.loading}
                            onPress={() => this._finalApplyLoan()} />

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
        states: state.states,
        cities: state.cities
    };
};

export default connect(mapStateToProps, null)(LoanApplyFinalScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    mainHeadingWrapper: {
        height: 50,
        backgroundColor: Colors.lightGreen,
        justifyContent: 'center'
    },
    mainHeadingText: {
        color: Colors.greenColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '700',
        paddingLeft: 20,
    },
    detailsRow: {
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 5
    },
    detailsRowSub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsRowHeading: {
        color: Colors.subTextColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '500',
    },
    detailsRowDescription: {
        color: Colors.mainTextColor,
        fontSize: wp(5),
        fontFamily: fontSelector('medium'),
        fontWeight: '500',
        marginTop: 2
    },
    editText: {
        color: '#EB812F',
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '700',
    }
});
