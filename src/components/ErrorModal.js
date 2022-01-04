import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput,
    Image
} from 'react-native';
import fontSelector from '../constants/FontSelectors';
import Modal from "react-native-modal";
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';


class ErrorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isModalVisible: false,
            countryAllCodes: [],
            searchText: '',
            selectedCode: '',
            countryId: '',
        };
    }
    componentDidMount() {
        //this.getCountryCodes();
        console.log('22222222', this.props.codeData);
    }

    toggleModal = (event) => {
        this.setState({ iisModalVisible: !this.state.isModalVisible }, () => this.props.toggleModal(this.state.isModalVisible))
        //event.preventDefault();
    }
    countryPressed = (code, country, id, index) => {
        this.props.onCountryPressed(code, country, id, index)
    }
    searchItem(text) {
        this.setState({
            searchText: text
        }, () => {

        })
    }
    render() {
        return (
            <Modal
                transparent={true}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                isVisible={this.props.isModalVisible}
                style={styles.centeredView}
                useNativeDriver={true}
                backdropOpacity={0.5}
                onBackButtonPress={() => this.toggleModal()}
                onBackdropPress={() => this.toggleModal()}
                statusBarTranslucent={true}
            >
                <View style={styles.modalView}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../images/error_icon.png')}
                            style={{ height: wp(15), width: wp(15), resizeMode: 'contain' }}
                        />
                        <Text style={{ color: '#D92410', fontSize: wp(3.7), fontFamily: fontSelector('regular'), marginTop: wp(3) }}>{this.props.title}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ErrorModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: wp(90),
        height: hp(25),
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: wp(3)
    },
    countryContainer: {
        marginHorizontal: wp(8),
        paddingVertical: wp(6),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countryText: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(3.8),
        color: Colors.mainTextColor
    }
})