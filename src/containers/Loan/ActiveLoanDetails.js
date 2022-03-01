import React, { Component } from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity,ScrollView } from 'react-native'
import DashboardCard from '../../components/DashboardCard';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardHeaderInner from '../../components/DashboardHeaderInner';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import UpcomingPaymentList from '../../components/UpcomingPaymentList';
import DashboardListing from '../../components/DashboardListing';



const Listing = ({heading,data}) => {
    return (
        <View style={styles.border}>
            <View style={{ flexDirection: 'row' }}>

                <Text style={{ fontSize: 12 }}>{heading}</Text>
                <View style={styles.listHeading}></View></View>
            <Text style={styles.txt}>{data}</Text>
        </View>
    )
}
const Card = (props) =>{
    console.log('pppp',props)
    return(
  <View>
  {
      (!props.toggle1 && !props.toggle2) ?

      <DashboardCard>
      <TouchableOpacity onPress={() => props.onPress()}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
         
         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
         <View>
             <Text style={{ color: Colors.mainTextColor, fontWeight: 'bold' }}>{props.heading}</Text>
         </View>
         <View>
             <TouchableOpacity>
             <AntDesign name='downcircle' style={{ color: Colors.greenColor }} size={16} />
             </TouchableOpacity>
         </View>
     </View>
      
      </View>
      </TouchableOpacity>
  </DashboardCard>
 
  :
  <DashboardCard>
  <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
      <TouchableOpacity onPress={() => props.onPress()}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
              <Text style={{ color: Colors.mainTextColor, fontWeight: 'bold' }}>{props.heading}</Text>
          </View>
          <View>
              <AntDesign name='upcircle' style={{ color: Colors.greenColor }} size={16} />
          </View>
      </View>
      </TouchableOpacity>
      <View style={{marginTop:15}}>
      {props.children}
      </View>
  </View>
</DashboardCard>
  }
  </View>

    )
}

class ActiveLoanDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle1:false,
            toggle2:false
        }
    }
    render() {
        console.log('togglibg',this.state.toggle)
        return (
            <View style={styles.container}>
                <DashboardHeader
                    navigation={this.props.navigation}
                />
                <ScrollView  contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
                <DashboardHeaderInner
                    navigation={this.props.navigation}
                    goBack={true}
                    headerText='Your Loan - LAN: 8900'
                />
                <View style={{ paddingHorizontal: 35 }}>
                    <View style={styles.wrapper}>
                        <View style={styles.heading}>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 18, color: '#2F4F4F' }}>Mahindra Bolero -</Text>
                                <Text style={{ fontSize: 18, color: '#2F4F4F' }}>XL - 2019</Text>
                            </View>
                            <View style={{ marginTop: -15, marginLeft: 10 }}>
                                <Image
                                    source={require('../../images/car.png')}
                                    style={styles.icon}
                                />
                            </View>
                        </View>
                        <View style={[styles.heading, { paddingVertical: 20 }]}>
                            <Text style={{ fontSize: 12 }}>Loan Amount</Text>
                            <Text style={[styles.txt, { fontSize: 18 }]}>₹ 11,00,000</Text>
                        </View>

                        <Listing 
                        heading='Starting Date'
                        data = '29 Oct,21'
                        />
                        <Listing 
                        heading='Ending Date'
                        data = '29 Mar,21'
                        />
                        <Listing 
                        heading='Total EMI Paid'
                        data = '30/60'
                        />
                        <Listing 
                        heading='Total EMI Due'
                        data = '3'
                        />
                   
                    </View>
                </View>
                <Card heading='Upcoming Payments'
                 navigation={this.props.navigation} 
                 toggle1 = {this.state.toggle1} 
                 onPress={() => this.setState({ toggle1: !this.state.toggle1 })}
                 >

                <UpcomingPaymentList 
                loan_name='Car Loan' 
                loan_amount = '₹ 4500' 
                navigation = {this.props.navigation} 
                status = {true}/>
                </Card>
                <Card heading='Loan Details'
                navigation={this.props.navigation} 
                 toggle2 = {this.state.toggle2} 
                 onPress={() => this.setState({ toggle2: !this.state.toggle2 })}
                >
                 <DashboardListing heading='Payment Date' data='29/01/22'/>
                 <DashboardListing heading='EMI Amount' data='₹ 11,000'/>
                 <DashboardListing heading='Total EMI Due' data='6 months'/>
                 <DashboardListing heading='Interest' data='8.90%'/>
                </Card>
    
                <Card heading='Borrower Details'/>
                <Card heading='Terms and Conditions'/>
                </ScrollView>
            </View>
        )
    }
}

export default ActiveLoanDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20
    },
    wrapper: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.greyColor

    },
    icon: {
        height: 90,
        width: 70,
        resizeMode: 'contain',
    },
    listHeading: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.subTextColor,
        width: 180
    },
    border: {
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'space-between'

    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: Colors.subTextColor,
        borderBottomWidth: 1
    },
    txt: {
        fontSize: 12,
        color: Colors.mainTextColor,
        fontWeight: 'bold'
    }



})