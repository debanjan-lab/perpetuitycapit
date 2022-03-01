import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppHeaderUpper from '../../components/AppHeaderUpper';
import DashboardCard from '../../components/DashboardCard';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardHeaderInner from '../../components/DashboardHeaderInner';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';



const Row = ({ value,status,navigation}) => {
    {console.log('navigation',navigation)}
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ color: Colors.mainTextColor }}>{value.carName}</Text>
                    <Text style={{ color: Colors.mainTextColor }}>{value.carType}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 11, color: Colors.mainTextColor, marginLeft: 20 }}>LAN:{value.Lan}</Text>
                    <Image
                        source={require('../../images/scooty.png')}
                        style={styles.icon}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontSize: 12 }}>Loan amount</Text>
                    <Text style={{ color: Colors.mainTextColor, fontSize: 20, fontWeight: '500' }}>₹ {value.carAmount}</Text>
                </View>
                {
                    status == 1 ?
                        <View style={{ marginTop: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ActiveLoanDetails')}>
                                <Text style={styles.activeBtn}>View More</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ marginTop: 5 }}>
                            <View>
                                <View style={{ marginLeft: 43 }}><Text style={{ fontSize: 12 }}>Status</Text></View>
                                <View style={styles.appliedBtn}>
                                    <TouchableOpacity>
                                        <Text style={{ color: Colors.whiteColor }}>Reviewing</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                }
            </View>
        </View>
    )
}

class MyLoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ActiveList: [{ carName: 'Mahindra Bolero', carType: 'XL-2019', carAmount: '11,00,000', Lan: '8900' }, { carName: 'Honda Active', carType: '6G', carAmount: '30,000', Lan: '8900' }, { carName: 'Honda Active', carType: '6G', carAmount: '30,000', Lan: '8900' }, { carName: 'Honda Active', carType: '6G', carAmount: '30,000', Lan: '8900' }],
            AppliedList: [{ carName: 'Maruti Suzuki', carType: 'Swift Dzire', carAmount: '1,00,000', Lan: '8900' }, { carName: 'Tata 407', carType: 'Gold SFC', carAmount: '15,00,000', Lan: '8900' }]
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <DashboardHeader navigation={this.props.navigation} />
                <DashboardHeaderInner navigation={this.props.navigation} goBack={true} headerText = 'My Loans' />

                <View>
                    <Text style={styles.activeHeading}>Active Loan</Text>
                    {
                        this.state.ActiveList.map((value, key) => {
                            return (
                                <DashboardCard>
                                    <Row key={key} value={value} status={1} navigation={this.props.navigation} />
                                </DashboardCard>
                            )
                        })
                    }
                </View>
                <View>
                    <Text style={styles.appliedHeading}>Applied Loan</Text>
                    {
                        this.state.AppliedList.map((value, key) => {
                            return (
                                <DashboardCard>
                                    <Row key={key} value={value} status={2} navigation={this.props.navigation} />
                                </DashboardCard>
                            )
                        })
                    }
                </View>

            </ScrollView>
        )
    }
}

export default MyLoan;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingBottom:20
    },
    icon: {
        height: wp(15),
        width: wp(17),
        resizeMode: 'contain',

    },
    activeBtn: {
        fontSize: 12,
        backgroundColor: Colors.greenColor,
        paddingHorizontal: 14,
        paddingVertical: 8,
        color: Colors.whiteColor,
        borderRadius: 5
    },
    appliedBtn: {
        backgroundColor: Colors.yellowColor,
        paddingHorizontal: 8,
        paddingVertical: 1.7,
        borderRadius: 5
    },
    activeHeading: {
        marginLeft: 45,
        marginBottom: -10,
        marginTop: 20,
        color: Colors.greenColor,
        fontWeight: 'bold',
        fontSize: 15
    },
    appliedHeading: {
        marginLeft: 45,
        marginBottom: -6,
        marginTop: 20,
        color: Colors.greenColor,
        fontWeight: 'bold',
        fontSize: 15
    }

})