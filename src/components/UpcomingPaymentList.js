import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import PieChart from '../components/PieChart';

 const UpcomingPaymentList = ({loan_name,loan_amount,navigation,status}) => {
  return (
    <View>
   <View style={styles.heading}>
   <View style={{marginLeft:15}}>
   <Text style={{fontSize:12,color:Colors.mainTextColor}}>{loan_name}</Text>
   <Text style={{fontSize:11,color: '#DC143C'}}>{loan_amount}</Text>
   </View>
   <View style={styles.graphContainer}>
   <View style={{flexDirection:'row',justifyContent:'space-between'}}>

   <View style={{marginTop:12}}>
   <PieChart radius={15} innerRadius = {11} daysLeft = {17} />
   </View>
   <View style={{marginRight:10,marginTop:9}}>
   <Text style={{fontSize:8}}>Days left</Text>
   </View>

   </View>
   </View>
   <View>
   <TouchableOpacity onPress={() => navigation.navigate('LoanDetails1')}>
       <Text style={styles.btn}>Pay Now</Text>
   </TouchableOpacity>
</View>
   </View>
   {
       status == null &&
       <View style={styles.border}>
   </View>
}
   </View>
  )
}
export default UpcomingPaymentList;


const styles = StyleSheet.create({
    btn: {
        fontSize: 12,
        backgroundColor: Colors.greenColor,
        paddingHorizontal: 14,
        paddingVertical: 5,
        color: Colors.whiteColor,
        borderRadius: 5
    },
    graphContainer:{
        height:40,
        width:85,
        borderRadius:10,
        borderColor:Colors.mainTextColor,
        backgroundColor:Colors.greyColor,
        marginLeft:40,
        padding:5
    },
    heading:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    border:{
        marginVertical:20,
        borderWidth:0.2,
        borderColor:Colors.greyColor
    }
})
