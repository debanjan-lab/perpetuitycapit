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

class CountryModal extends Component {
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
                    <View
                        style={{
                            backgroundColor: Colors.greenColor,
                            alignItems: 'center',
                            paddingVertical: wp(5),
                            borderTopLeftRadius: wp(3),
                            borderTopRightRadius: wp(3)
                        }}>
                        <Text
                            style={{
                                fontFamily: fontSelector('medium'),
                                fontSize: wp(4),
                                color: Colors.whiteColor
                            }}
                        >Select a Country</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#EEF9EF',
                            flexDirection: 'row',
                            borderRadius: wp(2),
                            alignItems: 'center',
                            marginTop: wp(5),
                            marginHorizontal: wp(5),
                            paddingHorizontal: wp(2)
                        }}
                    >
                        <TextInput
                            value={this.state.searchText}
                            onChangeText={text => this.searchItem(text)}
                            placeholder='Search'
                            placeholderTextColor={Colors.subTextColor}
                            style={{
                                flex: 1,
                                fontFamily: fontSelector('regular'),
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        />
                        <Image source={require('../images/search_icon.png')} style={{ height: wp(3.6), width: wp(3.6), resizeMode: 'contain' }} />
                    </View>
                    <FlatList
                        data={this.props.codeData}
                        renderItem={(item) => this.renderItem(item.item)}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                        keyExtractor={item => item.id}
                    />
                </View>
            </Modal>
        )
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                onPress={() => this.countryPressed(item.code, item.country, item.id, item.index)}
                style={item.selected == "no" ? styles.countryContainer : [styles.countryContainer, { fontFamily: fontSelector('medium') }]}
            >
                <Text style={styles.countryText}>{item.country}</Text>
                <Text style={styles.countryText}>+{item.code}</Text>
            </TouchableOpacity>
        )
    }
    ItemSeparatorComponent() {
        return (
            <View style={{ height: wp(0.15), marginHorizontal: wp(6), backgroundColor: '#E6E6E6' }} />
        )
    }
}

export default CountryModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: wp(90),
        height: hp(80),
        //alignItems: 'center',
        //justifyContent: 'center',
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