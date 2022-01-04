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
class CalculateEmi extends Component {
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
                        headerText="Emi Calculator"
                        navigation={this.props.navigation}
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
    }
});
