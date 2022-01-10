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
import { vefifyEmail } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';
class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    componentDidMount() {
        console.log("==================", this.props)

    }
    _vefifyEmail = () => {
        let obj = {
            token: this.props.auth.api_token,
            user_id: this.props.auth.user_id,
            email: this.props.auth.email
        }
        this.props.vefifyEmail(obj).then(res => {

        })
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Profile Details"
                        navigation={this.props.navigation}
                        editText={'Edit'}
                        onPressEdit={() => this.props.navigation.navigate('ProfileEditScreen')}
                        goBack={true}
                    />
                    <View style={{ padding: 20 }}>
                        <View style={{ marginTop: hp(5) }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.heading}>Applicant Name</Text>
                                <View style={{ marginTop: hp(1) }} />
                                <Text style={styles.subHeading}>{this.props.auth.name}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: hp(5) }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.heading}>Email</Text>
                                <View style={{ marginTop: hp(1) }} />
                                <Text style={styles.subHeading}>{this.props.auth.email}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {
                                    this.props.auth.is_email_active ?
                                        <>
                                            <Image source={require('../../images/tick.png')} style={styles.icon} />
                                            <Text style={styles.verifyedText}>Verified</Text>
                                        </>
                                        :
                                        <TouchableOpacity style={styles.verifyWrapper} onPress={() => this._vefifyEmail()}>
                                            <Image source={require('../../images/information.png')} style={styles.icon} />
                                            <Text style={styles.verifyText}>Verify</Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={{ marginTop: hp(5) }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.heading}>State</Text>
                                <View style={{ marginTop: hp(1) }} />
                                <Text style={styles.subHeading}>
                                    {this.props.states.data.find(value => value.state_id == this.props.auth.state_id)?.state_name}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: hp(5) }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.heading}>City</Text>
                                <View style={{ marginTop: hp(1) }} />
                                <Text style={styles.subHeading}>
                                    {this.props.cities.data.find(value => value.city_id == this.props.auth.city_id)?.city_name}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: hp(5) }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.heading}>Pincode</Text>
                                <View style={{ marginTop: hp(1) }} />
                                <Text style={styles.subHeading}>
                                    {this.props.auth.pincode}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: hp(5) }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.heading}>Current Address</Text>
                                <View style={{ marginTop: hp(1) }} />
                                <Text style={styles.subHeading}>
                                    {this.props.auth.current_location}
                                </Text>
                            </View>
                        </View>

                    </View>

                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        states: state.states,
        cities: state.cities
    };
};


const mapDispatchToProps = {
    vefifyEmail
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    heading: {
        color: '#C7C7C7',
        fontSize: wp(4.3),
        fontFamily: fontSelector('regular'),
        fontWeight: '700',
    },
    subHeading: {
        color: Colors.mainTextColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('regular'),
        fontWeight: '700',
    },
    icon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    verifyedText: {
        color: Colors.greenColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '700',
        marginLeft: 10
    },
    verifyText: {
        color: '#898989',
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '700',
        marginLeft: 10
    },
    verifyWrapper: {
        marginLeft: 20,
        width: wp(20),
        flexDirection: 'row',
        alignItems: 'center'
    }


});
