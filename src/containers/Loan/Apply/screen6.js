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
    Alert
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
import { saveLoan } from '../../../redux/actions/LoanActions';
import ApplyLoanPagination from './components/ApplyLoanPagination'
import { getBrands } from '../../../redux/actions/brand';
import { getModels } from '../../../redux/actions/model';
class LoanApplyScreen6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenLoading: true,
            loan_type: null,
            vehicle_type: null,
            brands: [],
            vehicle_brand: null,
            models: [],
            model_no: null,
            vehicle_price: null,
            loan_tenure: null,
            loan_amount: null,
            loan_id: 0,
        };
    }



    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loan_id: this.props.loan?.data?.loan_id,
                loan_type: this.props.loan?.data?.loan_type,
                vehicle_type: this.props.loan?.data?.vehicle_type,
                vehicle_brand: this.props.loan?.data?.vehicle_brand,
                vehicle_price: this.props.loan?.data?.vehicle_price,
                loan_tenure: this.props.loan?.data?.loan_tenure,
                loan_amount: this.props.loan?.data?.loan_amount,
                screenLoading: false
            }, () => {
                if (this.state.loan_type !== '') {
                    this._geBrand(this.state.loan_type)
                }
                // if (this.state.vehicle_brand !== '') {
                //     this._getModel(this.state.vehicle_brand)
                // }


            })

        }, 1000);
    }


    _onchangeText = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    _goNext = (flag) => {
        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let loan_id = this.state.loan_id;
        let step = 6;
        let loan_apply = 0;
        let loan_type = this.state.loan_type;
        let vehicle_type = this.state.vehicle_type;
        let vehicle_brand = this.state.vehicle_brand;
        let model_no = this.state.model_no;
        let vehicle_price = this.state.vehicle_price;
        let loan_tenure = this.state.loan_tenure;
        let loan_amount = this.state.loan_amount;
        let obj = {
            user_id: user_id,
            token: token,
            loan_id: loan_id,
            step: step,
            loan_apply: loan_apply,
            loan_type: loan_type,
            vehicle_type: vehicle_type,
            vehicle_brand: vehicle_brand,
            model_no: model_no,
            vehicle_price: vehicle_price,
            loan_tenure: loan_tenure,
            loan_amount: loan_amount
        }
        // console.log(obj)
        // return false


        //this.props.navigation.navigate('LoanApplyScreen7')

        if (loan_amount > (vehicle_price * 90) / 100) {
            Alert.alert('Loan amount cannot be greater that 90% of Vehicle price!')
            return false
        }



        this.props.saveLoan(obj).then((res) => {
            console.log("loan apply", this.props)
            let status = this.props.loan?.status;
            let message = this.props.loan?.message;
            if (status) {
                if (flag == 1) {
                    this.props.navigation.navigate('LoanApplyFinalScreen')
                } else {
                    this.props.navigation.navigate('LoanApplyScreen7')
                }

            } else {
                alert(message)
            }


        })
    }

    _applyLoan = () => {
        this._goNext(1)
    }


    _geBrand = (value) => {
        this.setState({
            loan_type: value
        })
        let token = this.props.auth.api_token;
        let user_id = this.props.auth.user_id;
        let obj = {
            token: token,
            loan_type: value,
            user_id: user_id
        }
        getBrands(obj).then((res) => {
            this.setState({
                brands: res.data,
            }, () => {
                this._getModel(this.state.vehicle_brand)
            })

        })
    }

    _getModel = (value) => {
        this.setState({
            vehicle_brand: value,
            model_no: null
        })
        let token = this.props.auth.api_token;
        let user_id = this.props.auth.user_id;
        let obj = {
            token: token,
            brand_id: value,
            user_id: user_id,
            loan_type: this.state.loan_type
        }
        getModels(obj).then((res) => {
            this.setState({
                models: res?.data || [],

            }, () => {
                if (this.state.models.length > 0) {
                    this.setState({
                        model_no: this.props.loan?.data?.model_no
                    })
                }
            })

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
                            heading={"Vehicle Details & Loan Details"}
                            subHeading={"Please fill the details to continue"}
                        />
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.loan_type}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._geBrand(itemValue)}
                            >
                                <Picker.Item label="--Loan Type--" value="" />
                                <Picker.Item label="Car Loans" value="Car Loans" />
                                <Picker.Item label="Two-Wheeler Loans" value="Two-Wheeler Loans" />
                                <Picker.Item label="Commercial Vehicle Loans (Taxi)" value="Commercial Vehicle Loans (Taxi)" />
                                <Picker.Item label="Commercial Vehicle Loans (Truck)" value="Commercial Vehicle Loans (Truck)" />
                            </Picker>
                        </View>

                        <View style={{ margin: 10 }} />

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.vehicle_type}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this.setState({ vehicle_type: itemValue })}
                            >
                                <Picker.Item label="--Vehicle Type--" value="" />
                                <Picker.Item label="Brand New" value="Brand New" />
                                <Picker.Item label="Used" value="Used" />
                            </Picker>
                        </View>

                        <View style={{ margin: 10 }} />

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.vehicle_brand}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this._getModel(itemValue)}
                            >
                                <Picker.Item label="--Select Brand--" value="" />
                                {
                                    this.state.brands?.map((value, key) => {
                                        return (
                                            <Picker.Item key={key} label={value.brand_name} value={value.id} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>

                        <View style={{ margin: 10 }} />

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={this.state.model_no}
                                style={{ flex: 1 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => this.setState({ model_no: itemValue })}
                            >
                                <Picker.Item label="--Select Model--" value="" />
                                {
                                    this.state.models?.map((value, key) => {
                                        return (
                                            <Picker.Item key={key} label={value.model_name} value={value.id} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Vehicle Price'}
                            keyboardType={'numeric'}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('vehicle_price', v)}
                            value={this.state.vehicle_price?.toString()}
                        />
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Loan tenure'}
                            keyboardType={'numeric'}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('loan_tenure', v)}
                            value={this.state.loan_tenure?.toString()}
                        />
                        <View style={{ margin: 10 }} />
                        <TextInputUtil
                            placeHolder={'Loan amount'}
                            keyboardType={'numeric'}
                            prefix={null}
                            hasDevider={false}
                            onChangeText={(v) => this._onchangeText('loan_amount', v)}
                            value={this.state.loan_amount?.toString()}
                        />

                    </ScrollView>
                </View>

                <FooterButton
                    leftNavigation={() => this.props.navigation.navigate('LoanApplyScreen5')}
                    rightNavigation={() => this._goNext()}
                    leftButton={true}
                    applyLoanText={"Apply Loan"}
                    applyLoan={this._applyLoan}
                />
                <ApplyLoanPagination total={7} active={6} />


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
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplyScreen6);




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
