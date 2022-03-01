import React, { Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import DashboardCard from '../../components/DashboardCard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../constants/Colors';
import PieChart from '../../components/PieChart';
import UpcomingPaymentList from '../../components/UpcomingPaymentList';



const Row = ({value,navigation}) =>{
return(
    
   <View>
   <UpcomingPaymentList loan_name = {value.loan} loan_amount = {value.amount} navigation = {navigation}/>
  
   </View>
)
}


class UpcomingPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{loan:'Car Loan',amount:'₹ 4500',day:'17'},
            {loan:'Car Loan',amount:'₹ 4500',day:'17'},
            {loan:'Car Loan',amount:'₹ 4500',day:'17'},
            {loan:'Car Loan',amount:'₹ 4500',day:'17'},
            {loan:'Car Loan',amount:'₹ 4500',day:'17'}
        ],
            toggle: false
        }
    }
    render() {
        console.log('poping',this.props.props.navigation)
        return (
            <View>
                <DashboardCard>
                    <View>
                        {
                            !this.state.toggle ?
                                <TouchableOpacity onPress={() => this.setState({ toggle: !this.state.toggle })}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ color: Colors.mainTextColor }}>Total Due Amount</Text>
                                            <Text style={{ fontSize: 22, fontWeight: '600', color: '#DC143C' }}>₹ 11,000</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <AntDesign name='upcircle' style={{ color: Colors.greenColor }} size={14} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                :
                                
                                    <View>
                                    <TouchableOpacity onPress={() => this.setState({ toggle: !this.state.toggle })}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ marginLeft: 105, alignItems: 'center' }}>
                                            <Text style={{ color: Colors.mainTextColor }}>Total Due Amount</Text>
                                            <Text style={{ fontSize: 22, fontWeight: '600', color: '#DC143C' }}>₹ 11,000</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <AntDesign name='downcircle' style={{ color: Colors.greenColor }} size={14} />
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                    <View>
                                    <Text style={{marginBottom:10}}>Upcoming Payment</Text>
                                    <View>
                                    {
                                        this.state.list.map((value, key) => {
                                            return (
                            
                                                    <Row key={key} value={value} navigation = {this.props.props.navigation} />
                                                
                                            )
                                        })
                                    }
                                    </View>
                                    </View>
                                    
                                    </View>
                               
                        }
                    </View>
                </DashboardCard>
            </View>
        )
    }
}

export default UpcomingPayment;

const styles = StyleSheet.create({
    btn: {
        fontSize: 12,
        backgroundColor: Colors.greenColor,
        paddingHorizontal: 14,
        paddingVertical: 5,
        color: Colors.whiteColor,
        borderRadius: 5
    },
})