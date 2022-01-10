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
import Slider from '@react-native-community/slider';
import { getEmiData } from '../../redux/actions/emi';
import Spinner from 'react-native-loading-spinner-overlay';
class CalculateEmi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loanAmountValue: 0,
            minLoanAmount: 0,
            maxLoanAmount: 0,

            interestRateValue: 0,
            minInterestRate: 0,
            maxInterestRate: 0,

            tenureValue: 0,
            minTenure: 0,
            maxTenure: 0,
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
            getEmiData().then(res => {
                console.log("emi", res)
                this.setState({
                    loanAmountValue: this.state.loanAmountValue || res.result[0].loanAmount_min,
                    minLoanAmount: res.result[0].loanAmount_min,
                    maxLoanAmount: res.result[0].loanAmount_max,
                    tenureValue: this.state.tenureValue || res.result[1].tenure_min,
                    minTenure: res.result[1].tenure_min,
                    maxTenure: res.result[1].tenure_max,
                    interestRateValue: this.state.interestRateValue || res.result[2].interest_min,
                    minInterestRate: res.result[2].interest_min,
                    maxInterestRate: res.result[2].interest_max,
                    loading: false
                })
                // console.log("emi", res)
            })
        })
    }

    _numberToString = (num) => {
        let postfix = '';
        let getnum = num
        if (num > 999) {
            getnum = num / 1000
            postfix = 'K'
        }
        if (num > 99999) {
            getnum = num / 100000
            postfix = 'Lac'
        }
        getnum = getnum.toFixed(2)

        return `${getnum} ${postfix}`
    }

    _calculateEMI = (value, field) => {

        this.setState({
            [field]: value
        }, () => {
            var lnamnt = this.state.loanAmountValue;
            var lninterest = this.state.interestRateValue;
            var mytenure = this.state.tenureValue;
            var inrate = parseFloat((lninterest * mytenure) / 100);
            var totinterest = parseFloat(lnamnt * inrate);
            var emiamnt = parseInt((totinterest + lnamnt) / (mytenure * 12));
            var total_amount_payable = parseInt(totinterest + lnamnt);
            this.setState({
                inrate,
                totinterest,
                emiamnt,
                total_amount_payable
            })
        })
    }

    _doCalculateEMI = () => {
        var lnamnt = this.state.loanAmountValue;
        var lninterest = this.state.interestRateValue;
        var mytenure = this.state.tenureValue;
        var inrate = parseFloat((lninterest * mytenure) / 100);
        var totinterest = parseFloat(lnamnt * inrate);
        var emiamnt = parseInt((totinterest + lnamnt) / (mytenure * 12));
        var total_amount_payable = parseInt(totinterest + lnamnt);
        var loanAmountValue = this.state.loanAmountValue


        this.props.navigation.navigate('CalculateEmiScreen2', { inrate: inrate, totinterest, totinterest, emiamnt: emiamnt, total_amount_payable: total_amount_payable, loanAmountValue: loanAmountValue })
    }



    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Emi Calculator"
                        navigation={this.props.navigation}
                    />

                    <View style={{ padding: 20, }}>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.activeText}>Loan Amount</Text>
                            <View style={styles.headerRightWrapper}>
                                <Text style={styles.activeText}>₹{this._numberToString(this.state.loanAmountValue)}</Text>
                            </View>
                        </View>
                        <View style={{ margin: 5 }} />
                        <Slider
                            thumbTintColor="#1A5632"
                            minimumValue={this.state.minLoanAmount}
                            maximumValue={this.state.maxLoanAmount}
                            minimumTrackTintColor="#1A5632"
                            maximumTrackTintColor="#000000"
                            onSlidingComplete={value => this._calculateEMI(value, 'loanAmountValue')}
                            step={1}
                        />
                        <View style={styles.headerWrapper}>
                            <Text style={styles.inActiveText}>₹{this._numberToString(this.state.minLoanAmount)}</Text>
                            <View style={styles.footerRightWrapper}>
                                <Text style={styles.inActiveText}>₹{this._numberToString(this.state.maxLoanAmount)}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 20, }}>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.activeText}>Interest Rate(P.a)</Text>
                            <View style={styles.headerRightWrapper}>
                                <Text style={styles.activeText}>{this.state.interestRateValue}</Text>
                            </View>
                        </View>
                        <View style={{ margin: 5 }} />
                        <Slider
                            thumbTintColor="#1A5632"
                            minimumValue={this.state.minInterestRate}
                            maximumValue={this.state.maxInterestRate}
                            minimumTrackTintColor="#1A5632"
                            maximumTrackTintColor="#000000"
                            onSlidingComplete={value => this._calculateEMI(value, 'interestRateValue')}
                            step={1}
                        />
                        <View style={styles.headerWrapper}>
                            <Text style={styles.inActiveText}>{this.state.minInterestRate}</Text>
                            <View style={styles.footerRightWrapper}>
                                <Text style={styles.inActiveText}>{this.state.maxInterestRate}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 20, }}>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.activeText}>Tenure (Years)</Text>
                            <View style={styles.headerRightWrapper}>
                                <Text style={styles.activeText}>{this.state.tenureValue}</Text>
                            </View>
                        </View>
                        <View style={{ margin: 5 }} />
                        <Slider
                            thumbTintColor="#1A5632"
                            minimumValue={this.state.minTenure}
                            maximumValue={this.state.maxTenure}
                            minimumTrackTintColor="#1A5632"
                            maximumTrackTintColor="#000000"
                            onSlidingComplete={value => this._calculateEMI(value, 'tenureValue')}
                            step={1}
                        />
                        <View style={styles.headerWrapper}>
                            <Text style={styles.inActiveText}>{this.state.minTenure}</Text>
                            <View style={styles.footerRightWrapper}>
                                <Text style={styles.inActiveText}>{this.state.maxTenure}</Text>
                            </View>
                        </View>
                    </View>
                </View>



                <View style={{ padding: 20 }}>
                    <ButtonUtil
                        active={true}
                        label={'Calculate Emi'}
                        onPress={() => this._doCalculateEMI()}
                    />
                </View>
            </ScrollView>

        )
    }
}
export default CalculateEmi;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    activeText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A5632'
    },
    inActiveText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#C7C7C7'
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

    headerRightWrapper: {
        backgroundColor: '#EEF9EF',
        padding: 10
    },
    footerRightWrapper: {
        paddingRight: 10
    },
});
