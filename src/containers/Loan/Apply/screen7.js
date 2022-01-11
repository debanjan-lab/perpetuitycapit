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
    Platform,
    Linking
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
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
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
            fileResponse: null,
            default_card: 1,


            self_photo_extension: null,
            pan_card_extension: null,
            bank_statement_extension: null,
            aadhar_front_extension: null,
            aadhar_back_extension: null,
            driving_licence_extension: null,

        };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this._reload()
        });
    }

    _reload = () => {
        this.setState({
            screenLoading: true,
        }, () => {

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
                }, () => {
                    let pan_card_extension = this.state?.pan_card?.split(/[\s.]+/);
                    pan_card_extension = pan_card_extension[pan_card_extension.length - 1]

                    let bank_statement_extension = this.state?.bank_statement?.split(/[\s.]+/);
                    bank_statement_extension = bank_statement_extension[bank_statement_extension.length - 1]

                    let aadhar_front_extension = this.state?.aadhar_front?.split(/[\s.]+/);
                    aadhar_front_extension = aadhar_front_extension[aadhar_front_extension.length - 1]

                    let aadhar_back_extension = this.state?.aadhar_back?.split(/[\s.]+/);
                    aadhar_back_extension = aadhar_back_extension[aadhar_back_extension.length - 1]

                    let driving_licence_extension = this.state?.driving_licence?.split(/[\s.]+/);
                    driving_licence_extension = driving_licence_extension[driving_licence_extension.length - 1]



                    this.setState({
                        pan_card_extension: pan_card_extension,
                        bank_statement_extension: bank_statement_extension,
                        aadhar_front_extension: aadhar_front_extension,
                        aadhar_back_extension: aadhar_back_extension,
                        driving_licence_extension: driving_licence_extension,
                        screenLoading: false
                    })

                })
            }, 1000)


        })
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

    _selecImageType = async (value) => {
        if (value == 'camera') {
            this._requestCameraPermission()
        } else {
            if (this.state.image_type == 'selfie') {
                DocumentPicker.pick({
                    allowMultiSelection: false,
                    type: [types.images],
                })
                    .then((pickerResult) => {
                        console.log('pickerResult', pickerResult)
                        this.setState({
                            fileResponse: pickerResult[0]
                        }, () => {
                            this._saveFile()
                        })
                    })
                    .catch((e) => {
                        console.log('error', e)
                    })
            } else {
                DocumentPicker.pick({
                    allowMultiSelection: false,
                    type: [types.pdf, types.images],
                })
                    .then((pickerResult) => {
                        console.log('pickerResult', pickerResult)
                        this.setState({
                            fileResponse: pickerResult[0]
                        }, () => {
                            this._saveFile()
                        })
                    })
                    .catch((e) => {
                        console.log('error', e)
                    })
            }



            // try {
            //     const pickerResult = await DocumentPicker.pickSingle({
            //         presentationStyle: 'fullScreen',
            //         copyTo: 'cachesDirectory',
            //     })
            //     console.log('pickerResult', pickerResult)
            // } catch (e) {

            //     console.log('error', e)
            // }





            // launchImageLibrary({ noData: true }, (response) => {
            //     if (response.assets) {
            //         console.log("response _selecImageType", response)
            //         this.setState({
            //             imageResponse: response?.assets[0]
            //         }, () => {
            //             this._saveImage()
            //         })
            //     }
            // });
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

    _saveFile = () => {
        let extention = '';
        if (this.state.image_type == 'selfie') {
            this.setState({
                self_photo: this.state.fileResponse,
            })
        }
        if (this.state.image_type == 'pan_card') {
            extention = this.state?.fileResponse?.name?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                pan_card: this.state.fileResponse,
                pan_card_extension: extention
            })
        } else if (this.state.image_type == 'bank_statement') {
            extention = this.state?.fileResponse?.name?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                bank_statement: this.state.fileResponse,
                bank_statement_extension: extention
            })
        } else if (this.state.image_type == 'aadhar_front') {
            extention = this.state?.fileResponse?.name?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                aadhar_front: this.state.fileResponse,
                aadhar_front_extension: extention
            })
        } else if (this.state.image_type == 'aadhar_back') {
            extention = this.state?.fileResponse?.name?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                aadhar_back: this.state.fileResponse,
                aadhar_back_extension: extention
            })
        } else if (this.state.image_type == 'driving_licence') {
            extention = this.state?.fileResponse?.name?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                driving_licence: this.state.fileResponse,
                driving_licence_extension: extention
            })
        }
    }

    _saveImage = () => {
        let extention = '';
        if (this.state.image_type == 'selfie') {
            extention = this.state?.imageResponse?.fileName?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                self_photo: this.state.imageResponse,
                selfie_extension: extention
            })
        } else if (this.state.image_type == 'pan_card') {
            extention = this.state?.imageResponse?.fileName?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                pan_card: this.state.imageResponse,
                pan_card_extension: extention
            })
        } else if (this.state.image_type == 'bank_statement') {
            extention = this.state?.imageResponse?.fileName?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                bank_statement: this.state.imageResponse,
                bank_statement_extension: extention
            })
        } else if (this.state.image_type == 'aadhar_front') {
            extention = this.state?.imageResponse?.fileName?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                aadhar_front: this.state.imageResponse,
                aadhar_front_extension: extention
            })
        } else if (this.state.image_type == 'aadhar_back') {
            extention = this.state?.imageResponse?.fileName?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                aadhar_back: this.state.imageResponse,
                aadhar_back_extension: extention
            })
        } else if (this.state.image_type == 'driving_licence') {
            extention = this.state?.imageResponse?.fileName?.split(/[\s.]+/)
            extention = extention[extention.length - 1]
            this.setState({
                driving_licence: this.state.imageResponse,
                driving_licence_extension: extention
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
                name: this.state.self_photo?.fileName || this.state.self_photo?.name,
                type: this.state.self_photo?.type,
            });
        }


        if (this.state.pan_card?.uri) {
            bodyFormData.append('pan_card', {
                uri: this.state.pan_card?.uri,
                name: this.state.pan_card?.fileName || this.state.pan_card?.name,
                type: this.state.pan_card?.type,
            });
        }


        if (this.state.bank_statement?.uri) {
            bodyFormData.append('bank_statement', {
                uri: this.state.bank_statement?.uri,
                name: this.state.bank_statement?.fileName || this.state.bank_statement?.name,
                type: this.state.bank_statement?.type,
            });
        }


        if (aadhar_driving_type == 1) {
            if (this.state.aadhar_front?.uri) {
                bodyFormData.append('aadhar_front', {
                    uri: this.state.aadhar_front?.uri,
                    name: this.state.aadhar_front?.fileName || this.state.aadhar_front?.name,
                    type: this.state.aadhar_front?.type,
                });
            }


            if (this.state.aadhar_back?.uri) {
                bodyFormData.append('aadhar_back', {
                    uri: this.state.aadhar_back?.uri,
                    name: this.state.aadhar_back?.fileName || this.state.aadhar_back?.name,
                    type: this.state.aadhar_back?.type,
                });
            }



        }
        else {

            if (this.state.driving_licence?.uri) {
                bodyFormData.append('driving_licence', {
                    uri: this.state.driving_licence?.uri,
                    name: this.state.driving_licence?.fileName || this.state.driving_licence?.name,
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

        console.log("bodyFormData", bodyFormData)

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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.heading}>Aadhar Front</Text>
                                    {/* {
                                        this.state.aadhar_front &&
                                        <TouchableOpacity onPress={() => Linking.openURL(this.state.aadhar_front)}>
                                            <Text style={styles.viewDetails}>View Details</Text>
                                        </TouchableOpacity>
                                    } */}
                                </View>

                                <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('aadhar_front')}>
                                    {
                                        (this.state.aadhar_front_extension != 'pdf') ?
                                            <Image source={{ uri: this.state.aadhar_front?.uri || this.state.aadhar_front }} style={styles.image} />
                                            :
                                            <Image source={require('../../../images/pdf.png')} style={styles.image} />
                                    }
                                </TouchableOpacity>
                                <View style={{ margin: 20 }} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.heading}>Aadhar Back</Text>
                                    {/* {
                                        this.state.aadhar_back &&
                                        <TouchableOpacity onPress={() => Linking.openURL(this.state.aadhar_back)}>
                                            <Text style={styles.viewDetails}>View Details</Text>
                                        </TouchableOpacity>
                                    } */}
                                </View>



                                <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('aadhar_back')}>
                                    {
                                        (this.state.aadhar_back_extension != 'pdf') ?
                                            <Image source={{ uri: this.state.aadhar_back?.uri || this.state.aadhar_back }} style={styles.image} />
                                            :
                                            <Image source={require('../../../images/pdf.png')} style={styles.image} />
                                    }
                                </TouchableOpacity>
                            </>
                        }

                        {
                            this.state.aadhar_driving_type == 2 &&
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.heading}>Driving Licence</Text>
                                    {/* {
                                        this.state.driving_licence &&
                                        <TouchableOpacity onPress={() => Linking.openURL(this.state.driving_licence)}>
                                            <Text style={styles.viewDetails}>View Details</Text>
                                        </TouchableOpacity>
                                    } */}

                                </View>

                                <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('driving_licence')}>
                                    {
                                        (this.state.driving_licence_extension != 'pdf') ?
                                            <Image source={{ uri: this.state.driving_licence?.uri || this.state.driving_licence }} style={styles.image} />
                                            :
                                            <Image source={require('../../../images/pdf.png')} style={styles.image} />
                                    }

                                </TouchableOpacity>
                            </>
                        }


                        <View style={{ margin: 20 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.heading}>Upload selfie</Text>
                            {/* {
                                this.state.self_photo &&
                                <TouchableOpacity onPress={() => Linking.openURL(this.state.self_photo)}>
                                    <Text style={styles.viewDetails}>View Details</Text>
                                </TouchableOpacity>
                            } */}

                        </View>

                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('selfie')}>
                            <Image source={{ uri: this.state.self_photo?.uri || this.state.self_photo }} style={styles.image} />
                        </TouchableOpacity>

                        <View style={{ margin: 20 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.heading}>Pan Card</Text>
                            {/* {
                                this.state.pan_card &&
                                <TouchableOpacity onPress={() => Linking.openURL(this.state.pan_card)}>
                                    <Text style={styles.viewDetails}>View Details</Text>
                                </TouchableOpacity>
                            } */}
                        </View>


                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('pan_card')}>
                            {
                                (this.state.pan_card_extension != 'pdf') ?
                                    <Image source={{ uri: this.state.pan_card?.uri || this.state.pan_card }} style={styles.image} />
                                    :
                                    <Image source={require('../../../images/pdf.png')} style={styles.image} />
                            }

                        </TouchableOpacity>

                        <View style={{ margin: 20 }} />


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.heading}>Bank Statement</Text>
                            {/* {
                                this.state.bank_statement &&
                                <TouchableOpacity onPress={() => Linking.openURL(this.state.bank_statement)}>
                                    <Text style={styles.viewDetails}>View Details</Text>
                                </TouchableOpacity>
                            } */}
                        </View>

                        <TouchableOpacity style={styles.imageWrapper} onPress={() => this._toggleImage('bank_statement')}>
                            {
                                (this.state.bank_statement_extension != 'pdf') ?
                                    <Image source={{ uri: this.state.bank_statement?.uri || this.state.bank_statement }} style={styles.image} />
                                    :
                                    <Image source={require('../../../images/pdf.png')} style={styles.image} />
                            }
                        </TouchableOpacity>
                        <View style={{ height: 0, width: 0 }}>
                            <Picker
                                ref={this.myRef}
                                selectedValue={this.state.image_type}
                                style={{ flex: 0 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._selecImageType(itemValue)}
                            >
                                <Picker.Item label="Select File (JPG / PNG / PDF)" value="" />
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
    viewDetails: {
        color: 'blue',
        fontSize: wp(4),
        fontFamily: fontSelector('bold'),
        fontWeight: '700'
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
