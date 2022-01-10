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
    StyleSheet,
    PermissionsAndroid,
    Platform
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
import { saveLoanFinal } from '../../../redux/actions/LoanActions';
import ApplyLoanPagination from './components/ApplyLoanPagination'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
var bodyFormData = new FormData();
class LoanApplyScreen7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loan_id: 0,
            screenLoading: true,
            aadhar_driving_type: null,
            self_photo: null,
            pan_card: null,
            bank_statement: null,
            aadhar_front: null,
            aadhar_back: null,
            driving_licence: null,
            openActionSheet: false,
            image_type: null,
            imageResponse: null,
            default_card: 1,
        };
        this.myRef = React.createRef();
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loan_id: this.props.loan?.data?.loan_id,
                aadhar_driving_type: this.props.loan?.data?.aadhar_driving_type > 1 ? 2 : 1,
                self_photo: this.props.loan?.data?.self_photo,
                pan_card: this.props.loan?.data?.pan_card,
                bank_statement: this.props.loan?.data?.bank_statement,
                aadhar_front: this.props.loan?.data?.aadhar_front,
                aadhar_back: this.props.loan?.data?.aadhar_back,
                driving_licence: this.props.loan?.data?.driving_licence,
                screenLoading: false
            }, () => {
                console.log(this.state)
            })




        }, 1000);
    }

    _applyLoan = () => {
        this._goNext(1)
    }

    _toggleImage = (value) => {
        this.setState({
            image_type: value
        })
        this.myRef.current.focus();
    }

    _selecImageType = (value) => {
        if (value == 'camera') {
            this._requestCameraPermission()
        } else {
            launchImageLibrary({ noData: true }, (response) => {
                if (response.assets) {
                    console.log("response _selecImageType", response)
                    this.setState({
                        imageResponse: response?.assets[0]
                    }, () => {
                        this._saveImage()
                    })
                }
            });
        }

    }

    _requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera "
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                launchCamera({ noData: true }, (response) => {
                    // console.log(response);
                    if (response.assets) {
                        console.log("response", response)
                        this.setState({
                            imageResponse: response?.assets[0]
                        }, () => {
                            this._saveImage()
                        })
                    }
                });


            } else {
                //  console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    _saveImage = () => {
        if (this.state.image_type == 'selfie') {
            this.setState({
                self_photo: this.state.imageResponse
            })
        } else if (this.state.image_type == 'pan_card') {
            this.setState({
                pan_card: this.state.imageResponse
            })
        } else if (this.state.image_type == 'bank_statement') {
            this.setState({
                bank_statement: this.state.imageResponse
            })
        } else if (this.state.image_type == 'aadhar_front') {
            this.setState({
                aadhar_front: this.state.imageResponse
            })
        } else if (this.state.image_type == 'aadhar_back') {
            this.setState({
                aadhar_back: this.state.imageResponse
            })
        } else if (this.state.image_type == 'driving_licence') {
            this.setState({
                driving_licence: this.state.imageResponse
            })
        }

    }


    _goNext = (flag) => {
        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let loan_id = this.state.loan_id;
        let step = 7;
        let loan_apply = 0;
        let aadhar_driving_type = this.state.aadhar_driving_type;

        bodyFormData.append('user_id', user_id);
        bodyFormData.append('token', token);
        bodyFormData.append('loan_id', loan_id);
        bodyFormData.append('step', step);
        bodyFormData.append('loan_apply', loan_apply);
        bodyFormData.append('aadhar_driving_type', aadhar_driving_type);




        if (this.state.self_photo?.uri) {
            bodyFormData.append('self_photo', {
                uri: this.state.self_photo?.uri,
                name: this.state.self_photo?.fileName,
                type: this.state.self_photo?.type,
            });
        }


        if (this.state.pan_card?.uri) {
            bodyFormData.append('pan_card', {
                uri: this.state.pan_card?.uri,
                name: this.state.pan_card?.fileName,
                type: this.state.pan_card?.type,
            });
        }


        if (this.state.bank_statement?.uri) {
            bodyFormData.append('bank_statement', {
                uri: this.state.bank_statement?.uri,
                name: this.state.bank_statement?.fileName,
                type: this.state.bank_statement?.type,
            });
        }


        if (aadhar_driving_type == 1) {
            if (this.state.aadhar_front?.uri) {
                bodyFormData.append('aadhar_front', {
                    uri: this.state.aadhar_front?.uri,
                    name: this.state.aadhar_front?.fileName,
                    type: this.state.aadhar_front?.type,
                });
            }


            if (this.state.aadhar_back?.uri) {
                bodyFormData.append('aadhar_back', {
                    uri: this.state.aadhar_back?.uri,
                    name: this.state.aadhar_back?.fileName,
                    type: this.state.aadhar_back?.type,
                });
            }



        }
        else {

            if (this.state.driving_licence?.uri) {
                bodyFormData.append('driving_licence', {
                    uri: this.state.driving_licence?.uri,
                    name: this.state.driving_licence?.fileName,
                    type: this.state.driving_licence?.type,
                });
            }


        }

        //console.log(JSON.stringify(bodyFormData))



        let self_photo = this.state.self_photo?.uri;
        if (!self_photo && !this.state.self_photo) {
            alert('Selfie required')
            return false
        }

        let pan_card = this.state.pan_card?.uri;
        if (!pan_card && !this.state.pan_card) {
            alert('Pan card required')
            return false
        }

        let bank_statement = this.state.bank_statement?.uri;
        if (!bank_statement && !this.state.bank_statement) {
            alert('Bank statement required')
            return false
        }

        if (aadhar_driving_type == 1) {

            let aadhar_front = this.state.aadhar_front?.uri
            if (!aadhar_front && !this.state.aadhar_front) {
                alert('Aadhar front required')
                return false
            }

            let aadhar_back = this.state.aadhar_back?.uri
            if (!aadhar_back && !this.state.aadhar_back) {
                alert('Aadhar back required')
                return false
            }

        }
        else {
            let driving_licence = this.state.driving_licence?.uri
            if (!driving_licence && !this.state.driving_licence) {
                alert('Driving licence required')
                return false
            }
        }


        this.props.saveLoanFinal(bodyFormData, token).then((res) => {
            let status = this.props.loan?.status;
            let message = this.props.loan?.message;
            console.log("this.props.loan", this.props.loan)
            if (status) {
                if (flag == 1) {
                    this.props.navigation.navigate('LoanApplyFinalScreen')
                }
            } else {
                alert(message)
            }

        })
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
                            heading={"Upload Document"}
                            subHeading={"Please fill the details to continue"}
                        />

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.aadhar_driving_type}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this.setState({ aadhar_driving_type: itemValue })}
                            >
                                <Picker.Item label="--Loan Aadhar / Driving License--" value="" />
                                <Picker.Item label="Aadhar Card" value="1" />
                                <Picker.Item label="Driving Licence" value="2" />
                            </Picker>
                        </View>
                        <View style={{ margin: 20 }} />
                        {
                            this.state.aadhar_driving_type == 1 &&
                            <>
                                <Text style={styles.heading}>Aadhar Front</Text>
                                <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('aadhar_front')}>
                                    <Image source={{ uri: this.state.aadhar_front?.uri || this.state.aadhar_front }} style={styles.image} />

                                </TouchableOpacity>
                                <View style={{ margin: 20 }} />
                                <Text style={styles.heading}>Aadhar Back</Text>
                                <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('aadhar_back')}>
                                    <Image source={{ uri: this.state.aadhar_back?.uri || this.state.aadhar_back }} style={styles.image} />

                                </TouchableOpacity>
                            </>
                        }

                        {
                            this.state.aadhar_driving_type == 2 &&
                            <>
                                <Text style={styles.heading}>Driving Licence</Text>
                                <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('driving_licence')}>
                                    <Image source={{ uri: this.state.driving_licence?.uri || this.state.driving_licence }} style={styles.image} />

                                </TouchableOpacity>
                            </>
                        }




                        <View style={{ margin: 20 }} />
                        <Text style={styles.heading}>Upload selfie</Text>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('selfie')}>
                            <Image source={{ uri: this.state.self_photo?.uri || this.state.self_photo }} style={styles.image} />
                        </TouchableOpacity>

                        <View style={{ margin: 20 }} />

                        <Text style={styles.heading}>Pan Card</Text>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('pan_card')}>
                            <Image source={{ uri: this.state.pan_card?.uri || this.state.pan_card }} style={styles.image} />
                        </TouchableOpacity>

                        <View style={{ margin: 20 }} />

                        <Text style={styles.heading}>Bank Statement</Text>
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('bank_statement')}>
                            <Image source={{ uri: this.state.bank_statement?.uri || this.state.bank_statement }} style={styles.image} />

                        </TouchableOpacity>
                        <View style={{ height: 0, width: 0 }}>
                            <Picker
                                ref={this.myRef}
                                selectedValue={this.state.image_type}
                                style={{ flex: 0 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._selecImageType(itemValue)}
                            >
                                <Picker.Item label="Select Image" value="" />
                                <Picker.Item label="From Camera" value="camera" />
                                <Picker.Item label="From Storage" value="storage" />
                            </Picker>
                        </View>
                    </ScrollView>
                </View>
                <FooterButton
                    leftNavigation={() => this.props.navigation.navigate('LoanApplyScreen6')}
                    // rightNavigation={() => this._goNext()}
                    leftButton={true}
                    applyLoanText={"Apply Loan"}
                    applyLoan={this._applyLoan}
                />
                <ApplyLoanPagination total={7} active={7} />
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
    saveLoanFinal,
}
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplyScreen7);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    heading: {
        color: Colors.mainTextColor,
        fontSize: wp(5),
        fontFamily: fontSelector('medium'),
    },
    imageWrapper: {
        marginTop: 10,
        width: wp(50),
        height: wp(50),
        backgroundColor: '#F1F6FC',
        borderRadius: 10
    },
    image: {
        width: wp(50),
        height: wp(50),
        resizeMode: 'contain'
    },
    pickerWrapper: {
        flexDirection: 'row',
        backgroundColor: '#F1F6FC',
        borderRadius: wp(12),
        alignItems: 'center',
    }
});
