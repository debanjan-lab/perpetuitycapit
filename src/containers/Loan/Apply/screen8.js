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


class LoanApplyScreen8 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    componentDidMount() {
    }



    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <AppHeaderInner
                        headerText="Apply for loan"
                        navigation={this.props.navigation}
                    />
                    <View style={{ padding: 20 }}>
                        <ApplyLoanHeader
                            heading={"Upload Document"}
                            subHeading={"Please fill the details to continue"}
                        />
                        <Text style={styles.heading}>Upload selfie</Text>
                        <TouchableOpacity style={styles.imageWrapper}>

                        </TouchableOpacity>

                        <View style={{ margin: 20 }} />

                        <Text style={styles.heading}>Upload Aadhar / Driving licence</Text>
                        <TouchableOpacity style={styles.imageWrapper}>

                        </TouchableOpacity>

                        <View style={{ margin: 20 }} />

                        <Text style={styles.heading}>Upload PAN</Text>
                        <TouchableOpacity style={styles.imageWrapper}>

                        </TouchableOpacity>

                        <View style={{ margin: 20 }} />

                        <Text style={styles.heading}>Upload 6 Month Bank Statement</Text>
                        <TouchableOpacity style={styles.imageWrapper}>

                        </TouchableOpacity>

                    </View>
                </View>

                <FooterButton
                    leftNavigation={() => this.props.navigation.goBack()}
                    rightNavigation={() => this.props.navigation.navigate('LoanApplyFinalScreen')}
                    leftButton={true}
                />


            </ScrollView>

        )
    }
}
export default LoanApplyScreen8;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    icon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
});
