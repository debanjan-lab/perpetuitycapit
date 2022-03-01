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
import TextFieldComponent from '../../components/TextFieldComponent';
import ApplyLoanFooter from '../../components/ApplyLoanFooter';

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
                    <View style={{ marginHorizontal: wp(4) }}>
                        <TextFieldComponent
                            placeHolder="PAN Number"
                            rightIcon={false}
                        />
                        <TextFieldComponent
                            placeHolder="Name"
                            rightIcon={true}
                            type="cross"
                        />
                        <TextFieldComponent
                            placeHolder="DOB"
                            rightIcon={true}
                            type="calender"
                        />
                        <TextFieldComponent
                            placeHolder="Mobile Number"
                            rightIcon={false}
                            type="mobile"
                        />
                    </View>
                    <ApplyLoanFooter />
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