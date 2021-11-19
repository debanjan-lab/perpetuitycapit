import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    ScrollView,
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import ApplyLoanHeader from '../../components/ApplyLoanHeader';
import ApplyLoanSubHeader from '../../components/ApplyLoanSubHeader';

class PersonalDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userId: '',
            apiToken: ''
        }
    }
    async componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    backgroundColor={Colors.whiteColor}
                    translucent={true}
                    barStyle={'dark-content'}
                />

                <ApplyLoanHeader
                    mainProps={this.props}
                />
                <ApplyLoanSubHeader />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: wp(4),
                            paddingVertical: wp(20)
                        }}
                    >
                        <Image
                            source={require('../../images/home_icon.png')}
                            style={{ height: wp(35), width: wp(70), }}
                        />
                        <Text
                            style={{
                                color: Colors.greenColor,
                                fontSize: wp(4.3),
                                fontFamily: fontSelector('medium'),
                                marginTop: wp(10),
                                marginBottom: wp(5)
                            }}
                        >
                            Hi welcome to Perpetuity Capital
                        </Text>
                        <Text
                            style={styles.subTextStyle}
                        >
                            Thanks for registering with Perpetuity Capital.
                        </Text>
                        <Text
                            style={styles.subTextStyle}
                        >
                            Let's get started.
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.greenColor,
                                paddingHorizontal: wp(12),
                                paddingVertical: wp(4),
                                borderRadius: wp(10),
                                marginTop: wp(12)
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.whiteColor,
                                    fontSize: wp(3.8),
                                    fontFamily: fontSelector('regular'),
                                    textAlign: 'center'
                                }}
                            >
                                Apply For Loan
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: Colors.lightGreen, paddingVertical: wp(5) }}>
                        <Text
                            style={{
                                color: Colors.greenColor,
                                fontSize: wp(4.3),
                                fontFamily: fontSelector('medium'),
                                textAlign: 'center'
                            }}
                        >
                            Calculate EMI
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
export default PersonalDetailsScreen;

const styles = StyleSheet.create({
    subTextStyle: {
        color: Colors.subTextColor,
        fontSize: wp(3.7),
        fontFamily: fontSelector('regular'),
        textAlign: 'center',
    },
})