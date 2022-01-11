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
import Modal from "react-native-modal";
import fontSelector from '../../constants/FontSelectors';
import Colors from '../../constants/Colors';
import ButtonUtil from '../../components/button'
import TextInputUtil from '../../components/textInput'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/AuthActions';
import { getStates } from '../../redux/actions/StateActions';
import { getCities } from '../../redux/actions/CityActions';
import { updateLocation, getGeoLoaction } from '../../redux/actions/location';
import Geolocation from '@react-native-community/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';
import { clearApplyLoan } from '../../redux/actions/LoanActions';
import VersionNumber from 'react-native-version-number';
console.log(VersionNumber.buildVersion);
var options = {
    enableHighAccuracy: false,
};

function error(err) {
    //console.log(`ERROR(${err.code}): ${err.message}`);
}


class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this._reload()
        });
    }
    _reload = () => {
        this.setState({
            loading: true,
        }, () => {
            this.callLocation()
        })

    }


    callLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                this.setState({
                    longitude: currentLongitude,
                    latitude: currentLatitude,
                }, () => {
                    //console.log("location", this.state)

                    this._getProfile()


                });
            }, error, options);
    }

    _getProfile = () => {
        let obj = {
            token: this.props.auth.api_token
        }
        this.props.getProfile(obj).then(() => {
            this._updateLocation()

        })
    }

    _updateLocation = () => {
        // console.log("this.props.auth.api_token", this.props.auth.api_token)
        // console.log("this.props?.auth?.user_id", this.props?.auth?.user_id)
        let obj = {
            token: this.props?.auth?.api_token,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            user_id: this.props?.auth?.user_id,
        }
        getGeoLoaction(obj).then((res) => {
            obj['location'] = res
            //console.log("obj============>>>", obj)
            updateLocation(obj).then((res1) => {


                this._getCities()



            })

        })
    }



    _getStates = () => {
        let obj = {
            token: this.props.auth.api_token
        }
        this.props.getStates(obj).then(() => {
            //console.log("this.props", this.props)
            setTimeout(() => {
                this.setState({ loading: false })
            }, 1000);

        })
    }

    _getCities = () => {
        let obj = {
            token: this.props.auth.api_token,
            state_id: this.props.auth.state_id
        }
        this.props.getCities(obj).then(() => {

            this._getStates()


            //console.log("this.props", this.props)
        })
    }


    _applyForLoan = () => {

        let city_id = this.props.auth?.city_id;
        if (city_id == 0) {
            alert('Please update city in your profile!')
        } else {
            let is_email_active = this.props.auth?.is_email_active;
            if (is_email_active) {
                this.props.clearApplyLoan().then((res) => {
                    console.log(this.props)
                    this.props.navigation.navigate('LoanApplyScreen1', { start: 'new' })
                })

            } else {
                this.setState({ openModal: true });
            }
        }
    }

    _toggleModal = () => {
        this.setState(prevState => ({
            openModal: !prevState.openModal,
        }));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={{ flex: 1, padding: 20 }}>
                    <AppHeader
                        headerText="Hi welcome to Perpetuity Capital"
                        subHeaderText="Thanks for registering with Perpetuity Capital. Let's get started."
                        logo={require('../../images/home_icon.png')}
                        navigation={this.props.navigation}
                        version={VersionNumber.buildVersion}
                    />
                    <View style={{ marginTop: hp(10) }} />
                    <ButtonUtil lesspadding={true} active={true} label={'Apply For Loan'} loading={this.state.loading} onPress={() => this._applyForLoan()} />
                </View>

                <TouchableOpacity style={styles.calculateEmiWrapper} onPress={() => this.props.navigation.navigate('CalculateEmiScreen1')}>
                    <Text style={styles.calculateEmiText}>Calculate EMI</Text>
                </TouchableOpacity>


                <Modal
                    transparent={true}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    isVisible={this.state.openModal}
                    style={styles.centeredView}
                    useNativeDriver={true}
                    backdropOpacity={0.5}
                    onBackButtonPress={() => this._toggleModal()}
                    onBackdropPress={() => this._toggleModal()}
                    statusBarTranslucent={true}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.verifyModalHeader}>Please verify the email</Text>
                        <Text style={styles.verifyModalSubHeader}>Please go to the email and verify email ID before apply loan</Text>
                        <Image
                            source={require('../../images/error_icon.png')}
                            style={styles.verifyModalIcon}
                        />
                    </View>
                </Modal>


            </ScrollView>

        )
    }
}



const mapStateToProps = state => {
    return {
        auth: state.auth,
        states: state.states,
        loan: state.loan,
    };
};


const mapDispatchToProps = {
    getProfile,
    getStates,
    getCities,
    clearApplyLoan
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    calculateEmiWrapper: {
        height: 50,
        backgroundColor:
            Colors.lightGreen,
        justifyContent: 'center'
    },
    calculateEmiText: {
        color: Colors.greenColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        textAlign: 'center',
        fontWeight: '700'
    },
    centeredView: {
        flex: 1,
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: wp(90),
        height: hp(25),
        backgroundColor: "white",
        borderRadius: wp(3),
        padding: 20
    },
    verifyModalHeader: {
        color: '#1A5632',
        fontSize: wp(4),
        fontFamily: fontSelector('regular'),
        fontWeight: '700',
        textAlign: 'center'
    },
    verifyModalSubHeader: {
        color: '#C7C7C7',
        fontSize: wp(3.5),
        fontFamily: fontSelector('regular'),
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 10
    },
    verifyModalIcon: {
        height: wp(15),
        width: wp(15),
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});
