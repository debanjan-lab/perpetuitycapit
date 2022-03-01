import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardHeaderInner from '../../components/DashboardHeaderInner';
import DashboardListing from '../../components/DashboardListing';
import Colors from '../../constants/Colors';


class LoanDetails1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <DashboardHeader navigation={this.props.navigation} />
                <DashboardHeaderInner navigation={this.props.navigation} goBack={true} headerText='Loan Details' />
                <View style={{ paddingHorizontal: 35 }}>
                    <View style={styles.wrapper}>
                        <View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ marginTop: -15, marginLeft: 10 }}>
                                    <Image
                                        source={require('../../images/car.png')}
                                        style={styles.icon}
                                    />
                                </View>
                                <View style={{ marginTop: 10, marginRight: 8 }}>
                                    <Text style={{ color: Colors.mainTextColor }}>Amount Payable</Text>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#DC143C' }}>₹ 11,000</Text>
                                </View>
                            </View>
                            <View>
                                <Text>Mahindra Bolero - XL - 2019</Text>
                                <Text style={{ color: Colors.mainTextColor }}>LAN: 8900</Text>
                            </View>

                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.detailheading}>Loan Details</Text>
                </View>

                <View style={{ flex: 1, paddingHorizontal: 50 }}>
                    <DashboardListing
                        heading='Payment Date'
                        data='29/01/22'
                    />
                    <DashboardListing
                        heading='EMI Amount'
                        data='₹ 11,000'
                    />
                    <DashboardListing
                        heading='Total EMI Due'
                        data='6 months'
                    />
                    <DashboardListing
                        heading='Interest'
                        data='8.90%'
                    />
                    <DashboardListing
                        heading='LAN'
                        data='Sharmiloan'
                    />
                    <DashboardListing
                        heading='Loan Type'
                        data='Car Loan'
                    />
                    <DashboardListing
                        heading='Starting Date'
                        data='29 Oct,21'
                    />
                    <DashboardListing
                        heading='Ending Date'
                        data='29 Mar,21'

                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity>
                            <Text style={styles.btn}>Make Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )

    }
}
export default LoanDetails1;



const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFF0F5'

    },
    icon: {
        height: 90,
        width: 70,
        resizeMode: 'contain',
    },
    listmargin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.greyColor,
        paddingVertical: 10
    },
    btn: {
        backgroundColor: Colors.greenColor,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5,
        color: Colors.whiteColor
    },
    detailheading: {
        color: Colors.mainTextColor,
        marginTop: 15,
        marginBottom: 5,
        fontWeight: '500',
        marginLeft: 50
    }

})