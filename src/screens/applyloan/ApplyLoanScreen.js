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
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import fontSelector from '../../constants/FontSelectors';
import Modal from "react-native-modal";
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import ParsedText from 'react-native-parsed-text';
import Colors from '../../constants/Colors';
import LoginHeader from '../../components/LoginHeader';
//import CountryModal from '../../components/CountryModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, deviceToken } from '../../constants/Constants';

class ApplyLoanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }
    async componentDidMount() {
        var userData = await AsyncStorage.getItem('userData');
        var userD = JSON.parse(userData);
        console.log('lllllllll', userD);
        this.setState({
            userName: userD.userName,
        })
    }
    logoutPressed = () => {
        console.log('pressed');
        AsyncStorage.setItem('userData', '')
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen', params: null }],
        })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{ marginTop: wp(10), alignItems: 'center' }}>
                    <Text>Welcome</Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.logoutPressed()}
                    style={{ marginTop: wp(10), alignItems: 'center' }}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
export default ApplyLoanScreen;