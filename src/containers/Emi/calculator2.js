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
import PieChart from 'react-native-pie-chart';

class CalculateEmi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this._reload()
        });
    }

    _reload = () => {
        // const { screen } = this.props.route.params;
        console.log("this.props.route.params", this.props.route.params)
    }



    render() {

        const widthAndHeight = 250
        const series = [this.props.route?.params?.loanAmountValue, this.props.route?.params?.totinterest]
        const sliceColor = ['#1A5632', '#28AB5B']
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Emi Calculator"
                        navigation={this.props.navigation}
                        goBack={true}
                    />
                    <View style={styles.graphWrapper}>
                        <Text style={styles.text1}>Total amount payable</Text>
                        <Text style={styles.text2}>₹{Math.round(this.props.route?.params?.total_amount_payable)?.toLocaleString()}</Text>
                        <View style={{ margin: 20 }} />
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={series}
                            sliceColor={sliceColor}
                        />
                    </View>
                    <View style={styles.tagsWrapper}>
                        <View style={styles.tagsInner}>
                            <View style={styles.tagColor1} />
                            <View style={{ margin: 5 }} />
                            <Text style={styles.text1}>Principal Amount</Text>
                        </View>

                        <Text style={styles.textRight}>₹{Math.round(this.props.route?.params?.loanAmountValue)?.toLocaleString()}</Text>
                    </View>
                    <View style={styles.tagsWrapper}>
                        <View style={styles.tagsInner}>
                            <View style={styles.tagColor2} />
                            <View style={{ margin: 5 }} />
                            <Text style={styles.text1}>Total Interest</Text>
                        </View>
                        <Text style={styles.textRight}>₹{Math.round(this.props.route?.params?.totinterest)?.toLocaleString()}</Text>
                    </View>
                    <View style={styles.calculateEmiWrapper}>
                        <Text style={styles.calculateEmiText}>EMI Per Month</Text>
                        <Text style={styles.calculateEmiText}>₹{Math.round(this.props.route?.params?.emiamnt)?.toLocaleString()}</Text>
                    </View>
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
    text1: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000000'
    },
    text2: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000'
    },
    textRight: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A5632'
    },
    calculateEmiWrapper: {
        backgroundColor: Colors.lightGreen,
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        padding: 10
    },
    calculateEmiText: {
        color: '#000000',
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '700'
    },
    graphWrapper: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tagsWrapper: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tagsInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tagColor1: {
        height: 20,
        width: 40,
        backgroundColor: '#1A5632',
        borderRadius: 10
    },
    tagColor2: {
        height: 20,
        width: 40,
        backgroundColor: '#28AB5B',
        borderRadius: 10
    },



});
