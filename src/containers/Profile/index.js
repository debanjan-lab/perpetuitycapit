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
import { connect } from 'react-redux';
const Row = ({ onPress, isSuccess, label, iconLeft, iconRight, hasRightIcon }) => {
    return (
        <TouchableOpacity style={isSuccess ? styles.successRow : styles.errorRow} onPress={() => onPress()}>
            {iconLeft && <><Image source={iconLeft} style={styles.icon} /><View style={{ margin: 5 }} /></>}
            <Text style={styles.rowText}>{label}</Text>
            <View style={{ flex: 1 }} />
            {
                hasRightIcon && <Image source={require('../../images/next.png')} style={styles.icon} />
            }

        </TouchableOpacity>
    )
}

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    componentDidMount() {
    }


    doLogout = () => {
        this.props.doLogout()
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="My Profile"
                        navigation={this.props.navigation}
                    />
                    <View style={{ padding: 20 }}>
                        <Row label={"Profile Details"} hasRightIcon={true} isSuccess={true} iconLeft={require('../../images/profile_icon.png')} onPress={() => this.props.navigation.navigate('ProfileDetailsScreen')} />
                        <Row label={"Temporary Saved Loans"} hasRightIcon={true} isSuccess={true} iconLeft={require('../../images/terms_&_conditions.png')} onPress={() => this.props.navigation.navigate('TemporarySavedLoan')} />
                        <Row label={"My applied Loan"} hasRightIcon={true} isSuccess={true} iconLeft={require('../../images/my_applied_loan.png')} onPress={() => this.props.navigation.navigate('AppliedLoan')} />
                        <Row label={"My approved Loan"} hasRightIcon={true} isSuccess={true} iconLeft={require('../../images/my_approved_loan.png')} onPress={() => this.props.navigation.navigate('ApprovedLoan')} />
                        <Row label={"Transaction History"} hasRightIcon={true} isSuccess={true} iconLeft={require('../../images/transaction_history.png')} onPress={() => this.props.navigation.navigate('TransactionHistory')} />
                        <Row label={"Logout"} hasRightIcon={false} isSuccess={false} iconLeft={require('../../images/logout.png')} onPress={() => this.doLogout()} />
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = {
    doLogout,
}
export default connect(null, mapDispatchToProps)(ProfileScreen);
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    successRow: {
        backgroundColor: Colors.lightGreen,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    errorRow: {
        backgroundColor: '#FFE6E6',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    rowText: {
        color: Colors.mainTextColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '700',
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
});
